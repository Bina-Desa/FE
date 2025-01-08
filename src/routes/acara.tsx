/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useSWR from 'swr';
import CarouselWrapper from '@/components/ui/image-carousel';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { fetcher } from '@/lib/fetcher';
import { MdLocationOn } from 'react-icons/md';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { IoIosArrowForward } from 'react-icons/io';
import { Helmet } from 'react-helmet';

export default function Acara() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/event?page=${currentPage}&limit=10`, fetcher);

  if (error) return <p>Error loading data</p>;

  const sortedEvents = isLoading ? [] : data?.data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const events = sortedEvents?.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    date: format(new Date(item.date), 'dd MMMM yyyy'),
    image: JSON.parse(item.image),
  }));

  const totalPages = data?.totalPages;

  return (
    <div className="min-h-screen py-28 bg-gray-100">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Acara</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Berbagai <span className="text-green-500">Acara</span>
        </h1>
        <p className="text-zinc-500">Temukan berbagai acara menarik dan seru</p>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
        {isLoading
          ? [1, 2, 3].map((i, index) => (
              <div key={index} className="p-3 pb-5 rounded-md animate-pulse">
                <div className="h-72 bg-slate-200 rounded-md"></div>
                <div className="h-4 bg-slate-200 w-1/2 mt-4"></div>
                <div className="h-4 bg-slate-200 w-1/3 mt-2"></div>
                <div className="h-4 bg-slate-200 w-1/4 mt-2"></div>
              </div>
            ))
          : events?.map((event: any) => (
              <div key={event.id} className="bg-white p-3 pb-5 shadow-md rounded-md hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
                <div>
                  <CarouselWrapper images={event.image} />
                </div>
                <p className="mt-4 text-green-500 font-bold text-2xl">{event.title}</p>
                <p className="text-md mt-2 line-clamp-2 w-full text-md text-zinc-500">{event.description}</p>
                <div className="flex gap-4">
                  <p className="flex text-md items-center gap-2 mt-3 text-sm">
                    <Calendar className="text-green-500" size={18} /> {event.date}
                  </p>
                  <p className="flex text-md items-center gap-2 mt-3 text-sm">
                    <MdLocationOn className="text-red-500 text-xl" /> {event.location}
                  </p>
                </div>
                <a href={`/acara/${event.id}`} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1" rel="noopener noreferrer">
                  Lihat Detail <IoIosArrowForward />
                </a>
              </div>
            ))}
      </div>

      {/* Pagination */}
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
  );
}
