'use client';

import { Case } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import SafeImage from './ui/SafeImage';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CasesCarouselProps {
  cases: Case[];
}

export default function CasesCarousel({ cases }: CasesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="cases" className="py-20 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">收纳案例</h2>
        
        <div className="relative group px-0 md:px-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {cases.map((item) => (
                <div key={item.id} className="flex-[0_0_100%] min-w-0 px-2 md:px-4">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* 相框容器：响应式固定高度、白底与淡灰边框、圆角，适配横竖版与透明背景 */}
                      <div className="relative h-72 md:h-96 bg-white border border-gray-100 rounded-lg">
                        <SafeImage 
                          src={item.image_url_1} 
                          alt={`${item.title} 1`}
                          fill
                          className="object-contain object-center"
                        />
                      </div>
                      {/* 相框容器：响应式固定高度、白底与淡灰边框、圆角，适配横竖版与透明背景 */}
                      <div className="relative h-72 md:h-96 bg-white border border-gray-100 rounded-lg">
                        <SafeImage 
                          src={item.image_url_2} 
                          alt={`${item.title} 2`}
                          fill
                          className="object-contain object-center"
                        />
                      </div>
                    </div>
                    <div className="p-6 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollPrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all hidden md:block"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
