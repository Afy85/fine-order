import { Service } from '@/types';
import SafeImage from './ui/SafeImage';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">服务内容</h2>
        {/* 使用 CSS Grid：桌面端 3 列并排，移动端单列；同时控制列间距 */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 md:gap-6">
          {services.map((service) => (
            // 卡片容器样式优化：垂直居中、浅灰背景、圆角与内边距最小化
            <div
              key={service.id}
              className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 小图标形式的封面图，保持比例与圆角，移动端更小，桌面稍大 */}
              <SafeImage
                src={service.cover_image}
                alt={service.title}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
              />
              {/* 文本排版紧凑，标题中等字号加粗，描述为次要信息 */}
              <h3 className="mt-2 font-bold text-lg text-gray-900 text-center">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-500 text-center whitespace-pre-wrap">
                {service.description}
              </p>
              {/* 价格信息保持醒目但紧凑的展示 */}
              <div className="mt-2 text-sm md:text-base font-semibold text-indigo-600 text-center">
                {service.price_info}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
