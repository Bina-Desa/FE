/* eslint-disable @typescript-eslint/no-explicit-any */
import CarouselWrapper from '@/components/ui/image-carousel';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { fetcher } from '@/lib/fetcher';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import useSWR from 'swr';

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

export default function TempatWisata() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/destinations?page=${currentPage}&limit=10`, fetcher);

  if (error) {
    return <div className="text-center text-red-500">Gagal memuat data.</div>;
  }

  const wisata = data?.data?.map((item: any) => ({
    id: item.id,
    nama: item.name,
    lokasi: {
      lat: item.location.latitude,
      long: item.location.longitude,
      gmaps: item.location.gmaps,
    },
    deskripsiPendek: item.shortdeskripsi,
    image: JSON.parse(item.image),
  }));

  const totalPages = data?.totalPages || 1;

  return (
    <div className="min-h-screen py-28">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Tempat Wisata</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-center text-3xl font-bold">
          Tempat <span className="text-green-500">Wisata</span>
        </h1>
        <p className="text-zinc-500">Temukan berbagai tempat wisata yang menarik</p>
      </div>

      <div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {isLoading ? (
            [1, 2, 3].map((_i, index) => (
              <div key={index} className="p-3 bg-white pb-5 rounded-md animate-pulse">
                <div className="h-72 bg-slate-200 rounded-md"></div>
                <div className="h-4 bg-slate-200 w-1/2 mt-4"></div>
                <div className="h-4 bg-slate-200 w-1/3 mt-2"></div>
                <div className="h-4 bg-slate-200 w-1/4 mt-2"></div>
              </div>
            ))
          ) : wisata?.length > 0 ? (
            wisata?.map((wisata: WisataAlam) => (
              <a href={`tempat-wisata/${wisata.id}`} key={wisata.id} className="bg-white shadow-md rounded-md p-3 pb-6 relative hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
                <CarouselWrapper images={wisata.image} height="80" />
                <div>
                  <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                  <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsiPendek}</p>
                  <a href={`tempat-wisata/${wisata.id}`} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" rel="noopener noreferrer">
                    Lihat Detail <ChevronRight size={'14'} />
                  </a>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center text-center py-20">
              <p className="text-lg  mt-4">Belum ada tempat wisata yang tersedia</p>
            </div>
          )}
        </div>

        {wisata?.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="cursor-pointer hover:bg-green-500 hover:text-white" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'bg-green-500 text-white' : 'cursor-pointer hover:bg-green-500 hover:text-white'}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} className="cursor-pointer hover:bg-green-500 hover:text-white" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
