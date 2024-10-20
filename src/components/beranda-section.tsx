import { tempatWisata } from '@/data/dummyData';
import { Helmet } from 'react-helmet';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel.tsx';
import HeroSection from './ui/hero-section';
import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoLocationOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';

interface WisataAlam {
  nama: string;
  lokasi: {
    lat: string;
    long: string;
    gmaps: string;
  };
  deskripsi: string;
  image: string[];
}

export default function BerandaSection() {
  return (
    <>
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Beranda</title>
      </Helmet>

      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 mt-[35rem] max-md:mt-[20rem]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Tempat <span className="text-green-500">Wisata</span>
          </h1>
          <p className="text-zinc-400">Temukan berbagai tempat yang menarik</p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {tempatWisata.map((wisata: WisataAlam, index: number) => (
            <div key={index} className="bg-white shadow-md rounded-md p-3 pb-6 relative">
              <CarouselWrapper images={wisata.image} />
              <div className="">
                <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsi}</p>
                <a href={wisata.lokasi.gmaps} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" target="_blank" rel="noopener noreferrer">
                  Lihat Maps <IoLocationOutline />
                </a>
              </div>
            </div>
          ))}
        </div>

        <a href="/tempat-wisata" className="flex  text-sm mx-auto px-4 py-2 items-center text-green-500 underline rounded-md w-max justify-center">
          Lihat Semua Wisata <IoIosArrowForward />
        </a>
      </div>
    </>
  );
}
function CarouselWrapper({ images }: { images: string[] }) {
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
                <img src={image} className="rounded-md" />
                {/* Shadow Gradient */}
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
