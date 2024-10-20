export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-green-500 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {' '}
        <div>
          <p className="text-2xl font-bold">Desa Wisata Kebon Ayu</p>
          <p className="mt-4">Desa Kebon Ayu, Kecamatan Gerung, Kabupaten Lombok Barat, Provinsi NTB</p>
        </div>
        <div className="border-t mt-14">
          <p className="text-sm mt-4 text-center">© {currentYear} Genbi UBG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
