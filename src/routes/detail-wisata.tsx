/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { fetcher } from '@/lib/fetcher';
import { Helmet } from 'react-helmet';
import { FiExternalLink } from 'react-icons/fi';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import { GoDotFill } from 'react-icons/go';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

export default function DetailWisata() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useSWR(id ? `${import.meta.env.VITE_BASE_URL}/api/destinations/${id}` : null, fetcher);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
    <div className="max-w-4xl mx-auto px-4 py-28">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Detail Wisata</title>
      </Helmet>

      <div className="bg-white p-4 rounded-md shadow-sm">
        <div className="">
          <div className="relative">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {wisata?.image.map((images: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative flex justify-center rounded-md">
                      <img src={import.meta.env.VITE_BASE_URL + images} className="absolute inset-0 w-full h-full object-cover blur-sm rounded-md brightness-90" aria-hidden="true" />

                      <div className="relative z-10 max-md:mx-0 mx-4">
                        <img src={import.meta.env.VITE_BASE_URL + images} className="rounded-md min-h-[30rem] object-cover max-h-[30rem] my-3 max-md:my-0 shadow-md" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent rounded-b-md opacity-60 z-20"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              {count > 1 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  {Array.from({ length: count }).map((_, dotIndex) => (
                    <GoDotFill key={dotIndex} className={`text-lg cursor-pointer ${current === dotIndex + 1 ? 'text-green-500' : 'text-gray-400 opacity-50'}`} onClick={() => api?.scrollTo(dotIndex)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-2xl">{wisata?.nama}</h1>
          <div className="flex gap-2 items-center mt-4">
            <p className="bg-green-500 text-sm rounded-full text-white px-4 py-0.5">{wisata?.kategori}</p>
            <a href={wisata?.gmaps} target="_blank" rel="noopener noreferrer" className="bg-blue-500 flex items-center gap-1.5 text-sm rounded-full text-white px-4 py-0.5">
              Lihat Google Maps <FiExternalLink />
            </a>
          </div>
          <p className="mt-4 leading-relaxed whitespace-pre-wrap">{wisata?.deskripsiPanjang}</p>
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
    </div>
  );
}
