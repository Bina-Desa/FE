import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-green-500 text-white pt-10 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        {' '}
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-6 max-sm:items-baseline">
          <div>
            <p className="text-2xl font-bold">Desa Wisata Kebon Ayu</p>
            <p className="mt-3">Desa Kebon Ayu, Kecamatan Gerung, Kabupaten Lombok Barat, Provinsi NTB</p>
          </div>
          <div>
            <p>Ikut Media Sosial Kami</p>
            <div className="flex gap-4 items-center mt-3">
              <a href="https://www.instagram.com/desawisata_kebonayu_/" target="_blank">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/kebon%20ayu" target="_blank">
                <FaFacebook />
              </a>
              <a href="https://www.youtube.com/@pokdarwisbidadari8913" target="_blank">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-14">
          <p className="text-sm mt-4 text-center">© {currentYear} Genbi UBG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
