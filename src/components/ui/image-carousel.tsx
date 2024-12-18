import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

export default function CarouselWrapper({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <img src={import.meta.env.VITE_BASE_URL + image} className="rounded-md w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent rounded-b-md opacity-60"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        {Array.from({ length: count }).map((_, dotIndex) => (
          <GoDotFill key={dotIndex} className={`text-lg cursor-pointer ${current === dotIndex + 1 ? 'text-green-500' : 'text-gray-400 opacity-50'}`} onClick={() => api?.scrollTo(dotIndex)} />
        ))}
      </div>
    </div>
  );
}
