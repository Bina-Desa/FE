import { tempatWisata } from '@/data/dummyData';
import CarouselWrapper from '@/components/ui/image-carousel';
import { IoLocationOutline } from 'react-icons/io5';

interface WisataAlam {
  nama: string;
  lokasi: {
    lat: string;
    long: string;
    gmaps: string;
  };
  deskripsiPendek: string;
  image: string[];
}

export default function kuliner() {
  return (
    <div className="min-h-screen py-28">
      <div className="text-center">
        <h1 className="text-center text-3xl font-bold">
          Kuliner <span className="text-green-500">Kebon Ayu</span>
        </h1>
        <p className="text-zinc-400">Temukan berbagai tempat kuliner yang lezat</p>
      </div>

      <div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {tempatWisata.map((wisata: WisataAlam, index: number) => (
            <a href="" key={index} className="bg-white shadow-md rounded-md p-3 pb-6 relative hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
              <CarouselWrapper images={wisata.image} />
              <div className="">
                <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsiPendek}</p>
                <a href={wisata.lokasi.gmaps} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" target="_blank" rel="noopener noreferrer">
                  Lihat Detail <IoLocationOutline />
                </a>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
