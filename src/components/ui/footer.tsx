import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-green-500 text-white pt-10 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        {' '}
        <div className="flex gap-10 justify-between items-center max-sm:flex-col max-sm:gap-10 max-sm:items-baseline ">
          <div className="w-10/12 max-md:w-full">
            <div className="mt-4">
              <p className="text-xl font-bold">Form Kritk dan Saran</p>
              <p className="text-sm mt-2 mb-6">Lengkapi form berikut untuk mengirimkan kritik dan saran</p>
              <form action="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <Input placeholder="alamatemail@email.com" className="w-full" />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="email">Pesan</label>
                  <Textarea placeholder="Masukan kritik atau saran" cols={10} className="w-full" />
                </div>
                <Button className="mt-4 bg-white w-full text-black hover:bg-transparent hover:border px-6 border border-white hover:border-white hover:text-white" type="submit">
                  Kirim
                </Button>
              </form>
            </div>
          </div>
          <div className="w-10/12  max-md:w-full">
            <p className="text-2xl font-bold">Desa Wisata Kebon Ayu</p>
            <p className="mt-2 mb-4">Desa Kebon Ayu, Kecamatan Gerung, Kabupaten Lombok Barat, Provinsi NTB</p>
            <p>Ikut Media Sosial Kami</p>
            <div className="flex gap-4 items-center mt-3">
              <a href="https://www.instagram.com/desawisata_kebonayu_/" target="_blank">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://www.facebook.com/kebon%20ayu" target="_blank">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="https://www.youtube.com/@pokdarwisbidadari8913" target="_blank">
                <FaYoutube className="text-2xl" />
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
