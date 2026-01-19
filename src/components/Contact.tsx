import { SiteSettings } from '@/types';
import SafeImage from './ui/SafeImage';

interface ContactProps {
  settings: SiteSettings | null;
}

export default function Contact({ settings }: ContactProps) {
  if (!settings) return null;

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h2>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-2">
              <SafeImage 
                src={settings.qr_code_url} 
                alt="WeChat QR Code"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-500">扫码添加微信</p>
          </div>
          <div className="text-base text-center">
            <span className="font-medium text-gray-500">电话：</span>
            <a href={`tel:${settings.phone}`} className="text-indigo-600 hover:underline">{settings.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
