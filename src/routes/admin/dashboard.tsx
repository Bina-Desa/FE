import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

export default function Dashboard() {
  const { data: wisata } = useSWR(import.meta.env.VITE_BASE_URL + '/api/destinations', fetcher);
  const { data: kuliner } = useSWR(import.meta.env.VITE_BASE_URL + '/api/kuliner/product', fetcher);
  const { data: warung } = useSWR(import.meta.env.VITE_BASE_URL + '/api/kuliner/warung', fetcher);
  const { data: event } = useSWR(import.meta.env.VITE_BASE_URL + '/api/event', fetcher);

  return (
    <div className="max-w-full px-4">
      <div className="mt-4">
        <p className="font-bold text-2xl">Dashboard</p>
        <div className="mt-4 ">
          <p>Overview</p>
          <div>
            <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-14 max-sm:gap-6">
              <div className="border-t py-4">
                <p className="text-md">Jumlah Data Wisata</p>
                <p className="font-bold text-3xl mt-3">{wisata && wisata.data.length}</p>
                <p className="text-xs p-1 px-2 mt-3 bg-zinc-200 rounded-md w-max">Terbaru</p>
              </div>
              <div className="border-t py-4">
                <p className="text-md">Jumlah Data Kuliner</p>
                <p className="font-bold text-3xl mt-3">{kuliner && kuliner.items.length}</p>
                <p className="text-xs p-1 px-2 mt-3 bg-zinc-200 rounded-md w-max">Terbaru</p>
              </div>
              <div className="border-t py-4">
                <p className="text-md">Jumlah Data Warung</p>
                <p className="font-bold text-3xl mt-3">{warung && warung.length}</p>
                <p className="text-xs p-1 px-2 mt-3 bg-zinc-200 rounded-md w-max">Terbaru</p>
              </div>
              <div className="border-t py-4">
                <p className="text-md">Jumlah Data Acara</p>
                <p className="font-bold text-3xl mt-3">{event && event.data.length}</p>
                <p className="text-xs p-1 px-2 mt-3 bg-zinc-200 rounded-md w-max">Terbaru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
