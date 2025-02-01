import { Helmet } from 'react-helmet';

export default function Profil() {
  return (
    <div className="pt-28">
      <Helmet>
        <title>Desa Wisata Kebon Ayu | Profil</title>
      </Helmet>

      <div className="flex items-center flex-col justify-center">
        <p className="font-bold text-3xl">
          Profil <span className="text-green-500">Kebon Ayu</span>
        </p>
        <p className="text-zinc-500">Mengenal lebih dekat desa wisata kebon ayu</p>
      </div>
      <div className="px-4">
        <div className="max-w-6xl mx-auto py-6 px-4 bg-white rounded-md my-10 shadow-sm">
          <div className="pb-10">
            <img src="/images/header.jpg" alt="" className="rounded-md h-[30rem] w-full object-cover" />
          </div>
          <div className="w-full">
            <p>
              Desa Kebon Ayu berada di Kecamatan Gerung, Kabupaten Lombok Barat, Provinsi Nusa Tenggara Barat. Desa ini memiliki keindahan alam yang memukau dan beragam kesenian budaya yang terus dijaga dan dilestarikan secara
              turun-temurun.
            </p>
            <br /> <p>Dikelilingi oleh pemandangan alam yang hijau, mulai dari sawah yang luas hingga perbukitan yang menyejukkan mata.</p>
            <p>Desa ini terdiri dari tujuh dusun dengan luas wilayah 734,66 hektar dan jumlah penduduk sekitar 6.600 jiwa, yang sebagian besar bekerja sebagai petani.</p> <br />
            <p>
              Desa Kebon Ayu terkenal sebagai kampung budaya, dengan berbagai atraksi seni dan budaya seperti gamelan, wayang kulit, presean, pengrajin tenun, dan anyaman bambu. Selain itu, terdapat wisata heritage berupa jembatan gantung
              yang telah berdiri sejak tahun 1932.
            </p>
            <br /> <p>Desa ini juga menawarkan wisata kebun bambu dan agro wisata golden melon, di mana pengunjung dapat menikmati pengalaman memetik melon langsung dari kebun.</p> <br />
            <p> Berbagai produk ekonomi kreatif juga dikembangkan di Desa Kebon Ayu, seperti kerajinan wayang kulit, anyaman bambu, olahan jamur tiram, dan kopi. Produk-produk ini menjadi unggulan desa wisata ini. </p> <br />
            <p>Koordinasi antar lembaga terus dilakukan untuk mewujudkan Sapta Pesona Desa Wisata, yaitu aman, tertib, bersih, sejuk, indah, ramah, dan meninggalkan kenangan yang berkesan.</p> <br />
          </div>
        </div>
      </div>
    </div>
  );
}
