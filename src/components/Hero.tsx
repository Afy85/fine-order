import { SiteSettings } from '@/types';
import SafeImage from './ui/SafeImage';

interface HeroProps {
  settings: SiteSettings | null;
}

export default function Hero({ settings }: HeroProps) {
  if (!settings) return null;

  return (
    <div className="relative w-full h-[50vh] md:h-auto md:aspect-video flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <SafeImage
          src={settings.hero_image_url}
          alt={settings.hero_title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="hero-title text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-white mb-6">
          {settings.hero_title}
        </h1>
      </div>
    </div>
  );
}
