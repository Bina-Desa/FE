import { tempatWisata } from '@/data/dummyData';
import { Helmet } from 'react-helmet';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel.tsx';
import HeroSection from './ui/hero-section';

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
            <div key={index} className="bg-white shadow-md rounded-md p-3 pb-6">
              <div>
                <Carousel>
                  <CarouselContent>
                    {wisata.image.map((image: string, index: number) => (
                      <CarouselItem key={index}>
                        <img src={image} className="rounded-md" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className=''>
                  <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                  <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsi}</p>
                  <a href={wisata.lokasi.gmaps} className="bg-green-500 px-4 py-1.5 rounded-md text-white mt-4 text-sm">
                    Lihat Maps
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
