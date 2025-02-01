import CarouselWrapper from '@/components/ui/image-carousel';
import { fetcher } from '@/lib/fetcher';
import { Helmet } from 'react-helmet';
import { IoLocation } from 'react-icons/io5';
import { MdOutlineEvent } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

export default function DetailWisata() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useSWR(id ? `${import.meta.env.VITE_BASE_URL}/api/event/${id}` : null, fetcher);

  if (error) return <div className="text-red-500">Gagal memuat data.</div>;
  if (!data) return <div className="text-gray-500">Memuat...</div>;

  const wisata = data.data;

  const title = wisata?.title || 'Nama tidak tersedia';
  const description = wisata?.description || 'Deskripsi tidak tersedia';
  const location = wisata?.location || 'Lokasi tidak tersedia';
  const date = wisata?.date
    ? new Date(wisata.date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Tanggal tidak tersedia';
  const images = (() => {
    try {
      return JSON.parse(wisata.image) || [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="max-w-4xl mx-auto px-4 py-28">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Detail Wisata</title>
      </Helmet>

      <div className="bg-white p-4 rounded-md">
        <div>
          <CarouselWrapper images={images} height="[30rem]" />
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-2xl">{title}</h1>

          <div className="flex gap-6 mt-4 text-sm">
            <p className="flex items-center gap-2 text-base">
              <span className="font-semibold text-red-500">
                <IoLocation />
              </span>
              {location}
            </p>
            <p className="flex items-center gap-2 text-base">
              <span className="font-semibold text-green-500">
                <MdOutlineEvent />
              </span>
              {date}
            </p>
          </div>
          <p className="mt-6 leading-relaxed whitespace-pre-wrap">{description}</p>
        </div>
      </div>
    </div>
  );
}
