/* eslint-disable @typescript-eslint/no-explicit-any */
import CarouselWrapper from '@/components/ui/image-carousel';
import { fetcher } from '@/lib/fetcher';
import { IoLocationOutline } from 'react-icons/io5';
import useSWR from 'swr';
import { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
  const { data } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/destinations?page=${currentPage}&limit=10`, fetcher);

  const wisata = data?.data.map((item: any) => ({
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

  const totalPages = data.totalPages;

  return (
    <div className="min-h-screen py-28">
      <div className="text-center">
        <h1 className="text-center text-3xl font-bold">
          Tempat <span className="text-green-500">Wisata</span>
        </h1>
        <p className="text-zinc-400">Temukan berbagai tempat wisata yang menarik</p>
      </div>

      <div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {wisata &&
            wisata.map((wisata: WisataAlam, index: number) => (
              <a href={`tempat-wisata/${wisata.id}`} key={index} className="bg-white shadow-md rounded-md p-3 pb-6 relative hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
                <CarouselWrapper images={wisata.image} />
                <div className="">
                  <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                  <p className="text-sm text-zinc-500 mb-4">{wisata.deskripsiPendek}</p>
                  <a href={`tempat-wisata/${wisata.id}`} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" target="_blank" rel="noopener noreferrer">
                    Lihat Detail <IoLocationOutline />
                  </a>
                </div>
              </a>
            ))}
        </div>

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
      </div>
    </div>
  );
}
