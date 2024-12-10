import { Link } from 'react-router-dom';
import { acaraList } from '@/data/dummyData';

export default function Acara() {
  return (
    <div className="min-h-screen py-28 bg-gray-100">
      <div className="text-center">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Event <span className="text-green-500">Kebon Ayu</span>
        </h1>
        <p className="text-zinc-500">Temukan berbagai acara menarik di Kebon Ayu</p>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 my-10 max-w-6xl mx-auto px-4">
          {acaraList.map((acara) => (
            <div
              key={acara.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={acara.image}
                alt={`Gambar ${acara.title}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                {/* Membatasi title menjadi 1 baris */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">{acara.title}</h2>
                
                {/* Membatasi deskripsi menjadi 1 baris dan tidak wrap */}
                <p className="text-sm text-gray-600 mt-2 truncate">{acara.description}</p>
                
                {/* Tanggal Acara tetap 1 baris */}
                <p className="text-sm text-gray-500 mt-2 truncate">
                  Tanggal: {new Date(acara.eventDate).toLocaleDateString('id-ID')}
                </p>

                {/* Lokasi Acara tetap 1 baris */}
                <p className="text-sm text-gray-500 mt-2 truncate">
                  Lokasi: {acara.location}
                </p>

                <Link
                  to={`/acara/${acara.id}`}
                  className="mt-4 inline-block bg-green-500 text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-green-600"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
