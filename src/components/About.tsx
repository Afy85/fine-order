import { SiteSettings } from '@/types';
import SafeImage from './ui/SafeImage';

interface AboutProps {
  settings: SiteSettings | null;
}

export default function About({ settings }: AboutProps) {
  if (!settings) return null;

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <SafeImage 
                src={settings.founder_image_1} 
                alt={settings.founder_name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">关于创始人</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{settings.founder_name}</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {settings.founder_intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
