import { useParams } from 'react-router-dom';
import { kuliner } from '@/data/dummyData';
import { HeartIcon, MapPinIcon, StarIcon } from 'lucide-react';
import { Helmet } from 'react-helmet';

const formatRupiah = (amount: string): string => {
  const number = parseFloat(amount);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function DetailKuliner() {
  const { id } = useParams<{ id: string }>();
  const warung = kuliner.find((item) => item.id === Number(id));

  if (!warung) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-gray-600">Warung tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Detail Kuliner</title>
      </Helmet>

      <div className="relative max-w-6xl mx-auto px-4 mt-6">
        <div className="relative h-72 md:h-96">
          <img src={warung.gambar_warung} alt={`Gambar ${warung.nama_warung}`} className="absolute inset-0 w-full h-full object-cover rounded-lg" />

          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{warung.nama_warung}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                <span>4.5</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 mr-1" />
                <span>2.3 km</span>
              </div>
            </div>
          </div>
          <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all">
            <HeartIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <p className="text-gray-600 mb-6">{warung.deskripsi}</p>

        <h2 className="text-2xl font-bold mb-6 border-b pb-3">Menu {warung.nama_warung}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {warung.menu.map((menuItem, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="relative h-48 w-full">
                <img
                  src={menuItem[2]} // Foto menu
                  alt={`Gambar ${menuItem[0]}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{menuItem[0]}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">{formatRupiah(menuItem[1])}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
