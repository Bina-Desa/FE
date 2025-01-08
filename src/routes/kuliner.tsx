/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useSWR from 'swr';
import CarouselWrapper from '@/components/ui/image-carousel';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { BsShop } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { fetcher } from '@/lib/fetcher';
import { Helmet } from 'react-helmet';

export default function Kuliner() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/kuliner/product?page=${currentPage}&limit=10`, fetcher);

  if (error) return <p>Error loading data</p>;

  const products =
    data?.items?.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: JSON.parse(item.image),
      warung: {
        name: item.Warung?.name || 'Tidak Diketahui',
        address: item.Warung?.address || 'Tidak Diketahui',
      },
    })) || [];

  const totalPages = data?.totalPages || 1;

  return (
    <div className="min-h-screen py-28 bg-gray-100">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Kuliner</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Kuliner <span className="text-green-500">Kebon Ayu</span>
        </h1>
        <p className="text-zinc-500">Temukan berbagai tempat kuliner yang lezat</p>
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
          : products.map((product: any) => (
              <div key={product.id} className="bg-white p-3 shadow-md rounded-md hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
                <div>
                  <CarouselWrapper images={product.image} />
                </div>
                <p className="mt-4 text-green-500 font-bold text-2xl">{product.name}</p>
                <p className="font-bold">Rp. {product.price}</p>
                <p className="text-md mt-2">{product.description}</p>
                <div className="mt-3 flex items-center gap-4">
                  <p className="flex text-md items-center gap-2">
                    <BsShop className="text-green-500" /> {product.warung.name}
                  </p>
                  <p className="flex text-md items-center gap-2">
                    <MdLocationOn className="text-red-500" /> {product.warung.address}
                  </p>
                </div>
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
