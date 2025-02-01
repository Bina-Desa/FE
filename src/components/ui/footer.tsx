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
        <div className="flex gap-10 justify-between items-center max-sm:flex-col max-sm:gap-10 max-sm:items-baseline max-md:flex-col">
          <div className="w-10/12 max-md:w-full">
            <div className="mt-4">
              <p className="text-xl font-bold">Form Kritk dan Saran</p>
              <p className="text-sm mt-2 mb-6">Lengkapi form berikut untuk mengirimkan kritik dan saran</p>
              <form action="mailto:kebonayudev@gmail.com" method="post" encType="text/plain">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Nama</label>
                  <Input placeholder="Nama anda" className="w-full text-black" required name="name" />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="email">Email</label>
                  <Input placeholder="alamatemail@email.com" className="w-full text-black" required type="email" name="email" />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="email">Pesan</label>
                  <Textarea placeholder="Masukan kritik atau saran" cols={10} className="w-full text-black" required name="comment" />
                </div>
                <Button className="mt-4 bg-white w-full text-black hover:bg-transparent hover:border px-6 border border-white hover:border-white hover:text-white" type="submit" value={'Send'}>
                  Kirim
                </Button>
              </form>
            </div>
          </div>
          <div className="w-10/12 max-md:w-full max-md:flex-col-reverse flex flex-col gap-4">
            <div>
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
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9848953049955!2d116.10206550966797!3d-8.692983488514912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdbddcf92518ef%3A0xc19d8aa1235a3045!2sWisata%20Kuliner%20Kebon%20Ayu!5e0!3m2!1sid!2sid!4v1736187717399!5m2!1sid!2sid"
                height="265"
                loading="lazy"
                className="rounded-md w-full shadow-md"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
