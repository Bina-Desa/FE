import { Link } from 'react-router-dom';
import { kuliner } from '@/data/dummyData';

export default function Kuliner() {
  return (
    <div className="min-h-screen py-28 bg-gray-100">
      <div className="text-center">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Kuliner <span className="text-green-500">Kebon Ayu</span>
        </h1>
        <p className="text-zinc-500">Temukan berbagai tempat kuliner yang lezat</p>
      </div>

      <div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6 my-10 max-w-6xl mx-auto px-4">
          {kuliner.map((warung) => (
            <div
              key={warung.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={warung.gambar_warung}
                alt={`Gambar ${warung.nama_warung}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                {/* Membatasi title menjadi 1 baris */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">{warung.nama_warung}</h2>
                
                {/* Membatasi deskripsi menjadi 3 baris */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{warung.deskripsi}</p>
                
                <Link
                  to={`/kuliner/${warung.id}`}
                  className="mt-4 inline-block bg-green-500 text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-green-600"
                >
                  Lihat Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
