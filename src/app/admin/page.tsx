'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import ImageUpload from '@/components/ImageUpload';
import { SiteSettings, Service, Case } from '@/types';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'settings' | 'services' | 'cases'>('settings');

  // Data states
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    const checkAuth = () => {
      const auth = document.cookie.includes('admin_auth=true');
      if (auth) setIsAuthenticated(true);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    const { data: settingsData } = await supabase.from('site_settings').select('*').single();
    const { data: servicesData } = await supabase.from('services').select('*').order('id');
    const { data: casesData } = await supabase.from('cases').select('*').order('id');
    
    setSettings(settingsData);
    setServices(servicesData || []);
    setCases(casesData || []);
  };

  const handleLogin = () => {
    if (password === 'admin123') {
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      setIsAuthenticated(true);
    } else {
      alert('密码错误');
    }
  };

  const updateSettings = async () => {
    if (!settings) return;
    const { error } = await supabase.from('site_settings').upsert(settings);
    if (error) alert('保存失败');
    else alert('保存成功');
  };

  const updateService = async (service: Service) => {
    const { error } = await supabase.from('services').update(service).eq('id', service.id);
    if (error) alert('保存失败');
    else alert('保存成功');
  };

  const addCase = async () => {
    const newCase = { title: '新案例', description: '描述', image_url_1: '', image_url_2: '' };
    const { data, error } = await supabase.from('cases').insert(newCase).select().single();
    if (error) {
      alert('添加失败');
      return;
    }
    if (data) setCases([...cases, data]);
  };

  const updateCase = async (item: Case) => {
    const { error } = await supabase.from('cases').update(item).eq('id', item.id);
    if (error) alert('保存失败');
    else alert('保存成功');
  };
  
  const deleteCase = async (id: number) => {
    if (!confirm('确定删除?')) return;
    const { error } = await supabase.from('cases').delete().eq('id', id);
    if (!error) setCases(cases.filter(c => c.id !== id));
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">后台登录</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="请输入密码"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">管理后台</h1>
          <button onClick={() => { document.cookie = 'admin_auth=; max-age=0'; setIsAuthenticated(false); }} className="text-red-600">退出登录</button>
        </div>

        <div className="flex space-x-4 mb-8 border-b">
          {(['settings', 'services', 'cases'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'text-gray-500'}`}
            >
              {tab === 'settings' ? '全站设置' : tab === 'services' ? '服务管理' : '案例管理'}
            </button>
          ))}
        </div>

        {activeTab === 'settings' && settings && (
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-bold mb-4">首屏 & 创始人</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主标题</label>
                <input
                  value={settings.hero_title}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">首屏背景图</label>
                <ImageUpload value={settings.hero_image_url} onUpload={(url) => setSettings({ ...settings, hero_image_url: url })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">创始人姓名</label>
                <input
                  value={settings.founder_name}
                  onChange={(e) => setSettings({ ...settings, founder_name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">创始人照片</label>
                <ImageUpload value={settings.founder_image_1} onUpload={(url) => setSettings({ ...settings, founder_image_1: url })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">创始人介绍</label>
                <textarea
                  value={settings.founder_intro}
                  onChange={(e) => setSettings({ ...settings, founder_intro: e.target.value })}
                  className="w-full p-2 border rounded h-32"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">二维码</label>
                <ImageUpload value={settings.qr_code_url} onUpload={(url) => setSettings({ ...settings, qr_code_url: url })} />
              </div>
            </div>
            <button onClick={updateSettings} className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <Save size={16} /> 保存设置
            </button>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <input
                    value={service.title}
                    onChange={(e) => {
                      const newServices = services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s);
                      setServices(newServices);
                    }}
                    className="w-full p-2 border rounded font-bold"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => {
                      const newServices = services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s);
                      setServices(newServices);
                    }}
                    className="w-full p-2 border rounded h-24"
                  />
                  <input
                    value={service.price_info}
                    onChange={(e) => {
                      const newServices = services.map(s => s.id === service.id ? { ...s, price_info: e.target.value } : s);
                      setServices(newServices);
                    }}
                    className="w-full p-2 border rounded text-indigo-600"
                  />
                </div>
                <div className="w-full md:w-48 space-y-2">
                  <p className="text-sm font-medium text-gray-700">封面图</p>
                  <ImageUpload 
                    value={service.cover_image} 
                    onUpload={(url) => {
                       const newServices = services.map(s => s.id === service.id ? { ...s, cover_image: url } : s);
                       setServices(newServices);
                    }} 
                  />
                  <button onClick={() => updateService(service)} className="w-full bg-indigo-600 text-white px-3 py-1 rounded mt-4 text-sm">
                    保存
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <button onClick={addCase} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 mb-4">
              <Plus size={16} /> 新增案例
            </button>
            {cases.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-4">
                    <input
                      value={item.title}
                      onChange={(e) => {
                        const newCases = cases.map(c => c.id === item.id ? { ...c, title: e.target.value } : c);
                        setCases(newCases);
                      }}
                      className="w-full p-2 border rounded font-bold"
                      placeholder="标题"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newCases = cases.map(c => c.id === item.id ? { ...c, description: e.target.value } : c);
                        setCases(newCases);
                      }}
                      className="w-full p-2 border rounded h-24"
                      placeholder="描述"
                    />
                  </div>
                  <div className="space-y-4">
                     <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">图片 1</p>
                      <ImageUpload 
                        value={item.image_url_1} 
                        onUpload={(url) => {
                          const newCases = cases.map(c => c.id === item.id ? { ...c, image_url_1: url } : c);
                          setCases(newCases);
                        }} 
                      />
                     </div>
                     <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">图片 2</p>
                      <ImageUpload 
                        value={item.image_url_2} 
                        onUpload={(url) => {
                          const newCases = cases.map(c => c.id === item.id ? { ...c, image_url_2: url } : c);
                          setCases(newCases);
                        }} 
                      />
                     </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => deleteCase(item.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                    <Trash2 size={14} /> 删除
                  </button>
                  <button onClick={() => updateCase(item)} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                    <Save size={14} /> 保存
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
