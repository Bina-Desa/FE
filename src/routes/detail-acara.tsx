import { useParams } from 'react-router-dom';
import { acaraList } from '@/data/dummyData';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

export default function DetailAcara() {
  const { id = '0' } = useParams<{ id: string }>();
  const acara = acaraList.find((item) => item.id === parseInt(id, 10));

  if (!acara) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Acara tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-28">
      {/* Gambar Acara */}
      <div>
        <img
          src={acara.image}
          alt={acara.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Detail Acara */}
      <div className="mt-10">
        <h1 className="font-bold text-2xl">{acara.title}</h1>
        <div className="flex flex-wrap gap-4 items-center mt-4">
          {/* Tanggal Acara */}
          <div className="flex items-center gap-2">
            <FiCalendar className="text-green-500" />
            <span className="text-gray-700">{new Date(acara.eventDate).toLocaleDateString('id-ID')}</span>
          </div>

          {/* Lokasi Acara */}
          <div className="flex items-center gap-2">
            <FiMapPin className="text-blue-500" />
            <span className="text-gray-700">{acara.location}</span>
          </div>
        </div>

        {/* Deskripsi Acara */}
        <p className="mt-6 text-gray-600">{acara.description}</p>

        {/* Informasi Tambahan (Jika Ada) */}
       
      </div>

      {/* Tombol Kembali */}
      <div className="mt-10">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
