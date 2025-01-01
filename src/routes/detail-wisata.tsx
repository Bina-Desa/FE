/* eslint-disable @typescript-eslint/no-explicit-any */
import CarouselWrapper from '@/components/ui/image-carousel';
import { fetcher } from '@/lib/fetcher';
import { FiExternalLink } from 'react-icons/fi';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

export default function DetailWisata() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useSWR(id ? `${import.meta.env.VITE_BASE_URL}/api/destinations/${id}` : null, fetcher);

  const wisata = data?.data
    ? {
        nama: data.data.name || 'Nama tidak tersedia',
        kategori: data.data.category || 'Kategori tidak tersedia',
        gmaps: data.data.gmaps || '#',
        deskripsiPanjang: data.data.longdeskripsi || 'Deskripsi tidak tersedia',
        fasilitas: (() => {
          try {
            return JSON.parse(data.data.fasilitas) || [];
          } catch {
            return [];
          }
        })(),
        image: (() => {
          try {
            return JSON.parse(data.data.image) || [];
          } catch {
            return [];
          }
        })(),
      }
    : null;

  if (error) return <div className="text-red-500">Gagal memuat data.</div>;
  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-28">
      <div className="">
        <CarouselWrapper images={wisata?.image} height="[30rem]" />
      </div>
      <div className="mt-10">
        <h1 className="font-bold text-2xl">{wisata?.nama}</h1>
        <div className="flex gap-2 items-center mt-4">
          <p className="bg-green-500 text-sm rounded-full text-white px-4 py-0.5">{wisata?.kategori}</p>
          <a href={wisata?.gmaps} target="_blank" rel="noopener noreferrer" className="bg-blue-500 flex items-center gap-1.5 text-sm rounded-full text-white px-4 py-0.5">
            Lihat Google Maps <FiExternalLink />
          </a>
        </div>
        <p className="mt-4">{wisata?.deskripsiPanjang}</p>
        <p className="font-bold text-2xl mt-6">Fasilitas</p>
        <div className="flex gap-6 flex-wrap mt-4">
          {wisata?.fasilitas.map((item: string, index: number) => (
            <p key={index} className="flex items-center gap-2">
              <span className="text-green-500">
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
