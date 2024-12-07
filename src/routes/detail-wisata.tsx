import { useParams } from 'react-router-dom';
import { tempatWisata } from '@/data/dummyData';
import CarouselWrapper from '@/components/ui/image-carousel';
import { FiExternalLink } from 'react-icons/fi';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
export default function DetailWisata() {
  const { id = '0' } = useParams<{ id: string }>();
  const wisata = tempatWisata.find((item) => item.id === parseInt(id, 10));

  if (!wisata) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Wisata tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-28">
      <div>
        <CarouselWrapper images={wisata.image} />
      </div>
      <div className="mt-10">
        <h1 className="font-bold text-2xl">{wisata.nama}</h1>
        <div className="flex gap-2 items-center mt-4">
          <p className="bg-green-500 text-sm rounded-full text-white px-4 py-0.5">{wisata.kategori}</p>
          <a href={wisata.lokasi.gmaps} className="bg-blue-500 flex items-center gap-1.5 text-sm rounded-full text-white px-4 py-0.5">
            Lihat google maps <FiExternalLink />
          </a>
        </div>
        <p className='mt-4'>{wisata.deskripsiPanjang}</p>
        <div className='flex gap-6 flex-wrap mt-4'>
          {wisata.fasilitas.map((item, index) => (
            <p key={index} className='flex items-center gap-2'>
              <span className='text-green-500'>
                <IoCheckmarkCircleSharp />
              </span>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
