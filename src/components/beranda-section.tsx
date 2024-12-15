import { tempatWisata } from '@/data/dummyData';
import { Helmet } from 'react-helmet';
import HeroSection from './ui/hero-section';
import { IoIosArrowForward } from 'react-icons/io';
import CarouselWrapper from './ui/image-carousel';

interface WisataAlam {
  id: number;
  nama: string;
  lokasi: {
    lat: string;
    long: string;
    gmaps: string;
  };
  deskripsiPendek: string;
  image: string[];
}

export default function BerandaSection() {
  return (
    <div className="w-full">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Beranda</title>
      </Helmet>

      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 mt-[35rem] max-md:mt-[20rem]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Tempat <span className="text-green-500">Wisata</span>
          </h1>
          <p className="text-zinc-500">Temukan berbagai tempat yang menarik</p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {tempatWisata.map((wisata: WisataAlam, index: number) => (
            <a href={`tempat-wisata/${wisata.id}`} key={index} className="bg-white shadow-md rounded-md p-3 pb-6 relative hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
              <CarouselWrapper images={wisata.image} />
              <div className="">
                <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsiPendek}</p>
                <a href={`tempat-wisata/${wisata.id}`} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" target="_blank" rel="noopener noreferrer">
                  Lihat Detail <IoIosArrowForward />
                </a>
              </div>
            </a>
          ))}
        </div>

        <div className="flex max-w-6xl justify-end px-4 mx-auto">
          <a href="/tempat-wisata" className="flex mb-10 text-sm px-6 py-2 items-center text-green-500  rounded-md w-max justify-center border border-green-500  hover:bg-green-500 hover:text-white transition-all duration-150">
            Lihat Semua Wisata <IoIosArrowForward />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-14">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Kuliner <span className="text-green-500">Khas</span>
          </h1>
          <p className="text-zinc-500">Temukan berbagai makanan yang lezat</p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {tempatWisata.map((wisata: WisataAlam, index: number) => (
            <a href={`tempat-wisata/${wisata.id}`} key={index} className="bg-white shadow-md rounded-md p-3 pb-6 relative hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
              <CarouselWrapper images={wisata.image} />
              <div className="">
                <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsiPendek}</p>
                <a href={`tempat-wisata/${wisata.id}`} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" target="_blank" rel="noopener noreferrer">
                  Lihat Detail <IoIosArrowForward />
                </a>
              </div>
            </a>
          ))}
        </div>

        <div className="flex max-w-6xl justify-end px-4 mx-auto">
          <a href="/kuliner" className="flex mb-10 text-sm px-6 py-2 items-center text-green-500  rounded-md w-max justify-center border border-green-500 hover:bg-green-500 hover:text-white transition-all duration-150">
            Lihat Semua Kuliner
            <IoIosArrowForward />
          </a>
        </div>
      </div>
    </div>
  );
}
