/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsShop } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import useSWR from 'swr';
import HeroSection from './ui/hero-section';
import CarouselWrapper from './ui/image-carousel';

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

export default function BerandaSection() {
  const { data: dataWisata } = useSWR(import.meta.env.VITE_BASE_URL + '/api/destinations', fetcher);

  const wisata = dataWisata?.data.map((item: any) => ({
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

  const { data: dataProducts } = useSWR(import.meta.env.VITE_BASE_URL + '/api/kuliner/product', fetcher);

  const products = dataProducts?.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    image: JSON.parse(item.image),
    warung: {
      name: item.Warung.name,
      address: item.Warung.address,
    },
  }));

  const [openItems, setOpenItems] = useState(['item-0']);

  const toggleItem = (value: any) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Beranda</title>
      </Helmet>

      <HeroSection />

      {/* Wisata Section */}
      <div className="max-w-7xl mx-auto px-4 mt-[35rem] max-md:mt-[20rem]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Tempat <span className="text-green-500">Wisata</span>
          </h1>
          <p className="text-zinc-500">Temukan berbagai tempat yang menarik</p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {wisata &&
            wisata.slice(0, 3).map((wisata: WisataAlam, index: number) => (
              <a key={index} href={`tempat-wisata/${wisata.id}`} className="bg-white shadow-md rounded-md p-3 pb-6 relative hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
                <CarouselWrapper images={wisata.image} height="80" />
                <div>
                  <p className="font-bold text-lg mt-4">{wisata.nama}</p>
                  <p className="text-md text-zinc-500 mb-4 line-clamp-3">{wisata.deskripsiPendek}</p>
                  <a href={`tempat-wisata/${wisata.id}`} className="bg-green-500 px-4 py-2 rounded-md text-white mt-4 text-sm hover:bg-green-600 flex items-center w-max gap-1">
                    Lihat Detail <IoIosArrowForward />
                  </a>
                </div>
              </a>
            ))}
        </div>

        <div className="flex max-w-6xl justify-end px-4 mx-auto">
          <a href="/tempat-wisata" className="flex mb-10 text-sm px-6 py-2 items-center text-green-500 rounded-md w-max justify-center border border-green-500 hover:bg-green-500 hover:text-white transition-all duration-150">
            Lihat Semua Wisata <IoIosArrowForward />
          </a>
        </div>
      </div>

      {/* Kuliner Section */}
      <div className="max-w-7xl mx-auto px-4 mt-14">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Kuliner <span className="text-green-500">Khas</span>
          </h1>
          <p className="text-zinc-500">Temukan berbagai makanan yang lezat</p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 max-w-6xl mx-auto px-4">
          {products &&
            products.slice(0, 3).map((product: any, index: number) => (
              <div key={index} className="bg-white p-3 shadow-md rounded-md hover:ring-green-500 hover:ring-2 transition-all duration-300 cursor-pointer">
                <CarouselWrapper images={product.image} height="80" />
                <p className="mt-4 text-green-500 font-bold text-2xl">{product.name}</p>
                <p className="font-bold">Rp. {product.price}</p>
                <p className="text-md mt-2 line-clamp-3">{product.description}</p>
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

        <div className="flex max-w-6xl justify-end px-4 mx-auto">
          <a href="/kuliner" className="flex mb-10 text-sm px-6 py-2 items-center text-green-500 rounded-md w-max justify-center border border-green-500 hover:bg-green-500 hover:text-white transition-all duration-150">
            Lihat Semua Kuliner <IoIosArrowForward />
          </a>
        </div>
      </div>

      <div className="mt-10 px-4">
        <div className="bg-white rounded-md shadow-md p-4 max-w-6xl mx-auto flex items-center gap-6 max-md:flex-col">
          <div>
            <img src="https://jadesta.kemenparekraf.go.id/imgpost/118434.jpg" alt="" className="rounded-md" />
          </div>
          <div>
            <p className="font-bold text-3xl max-md:text-2xl">
              Mengenal Desa Wisata <span className="text-green-500">Kebon Ayu</span>
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <p className="leading-relaxed">
                Desa Wisata Kebon Ayu adalah sebuah desa wisata yang berada di Kabupaten Lombok Barat, Nusa Tenggara Barat. Desa ini memiliki berbagai tempat wisata yang menarik dan berbagai kuliner khas yang lezat.
              </p>
              <p className="leading-relaxed">Ada berbagai tempat wisata yang menarik di Desa Wisata Kebon Ayu, seperti Wisata Kuliner Tradisional, Agro Wisata Golden Melon, Wisata Jembatan Gantung, dan berbagai tempat wisata lainnya.</p>
              <a href="/profil" className="border border-green-500 text-green-500 px-4 py-1.5 rounded-full w-max text-sm mt-6 hover:bg-green-500 hover:text-white transition-all duration-200">
                Selengkapnya
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold">FAQ</h1>
          <p className="text-zinc-500">Temukan jawaban dari pertanyaan anda</p>
        </div>
        <div>
          <div className="max-w-6xl bg-white p-4 rounded-md shadow-md mx-auto my-10">
            <Accordion className="w-full" type="multiple" value={openItems}>
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left" onClick={() => toggleItem(`item-${index}`)}>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

const faq = [
  {
    question: 'Apa itu Desa Wisata Kebon Ayu?',
    answer: 'Desa Wisata Kebon Ayu adalah sebuah desa wisata yang berada di Kabupaten Lombok Barat, Nusa Tenggara Barat. Desa ini memiliki berbagai tempat wisata yang menarik dan berbagai kuliner khas yang lezat.',
  },
  {
    question: 'Apa saja tempat wisata yang ada di Desa Wisata Kebon Ayu?',
    answer: 'Ada berbagai tempat wisata yang menarik di Desa Wisata Kebon Ayu seperti Wisata Kuliner Tradisional, Agro Wisata Golden Melon, Wisata Jembatan Gantung, dan berbagai tempat wisata lainnya.',
  },
  {
    question: 'Apa saja kegiatan yang bisa dilakukan di Desa Wisata Kebon Ayu?',
    answer: 'Ada berbagai kegiatan yang bisa dilakukan di Desa Wisata Kebon Ayu, seperti berjalan-jalan menikmati pemandangan, berbelanja oleh-oleh, meninkmati kuliner tradisonal dan berbagai kegiatan lainnya.',
  },
  {
    question: 'Apa saja kuliner khas yang ada di Desa Wisata Kebon Ayu?',
    answer: 'Ada berbagai kuliner khas yang ada di Desa Wisata Kebon Ayu, seperti Sate Lombok, Ayam Taliwang, Plecing Kangkung, dan berbagai kuliner khas lainnya.',
  },
];
