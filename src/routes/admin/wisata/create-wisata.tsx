/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchControl } from '../components/search-place';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

interface LocationInfo {
  latitude: number;
  longitude: number;
  label: string;
}

type Wisata = {
  name: string;
  category: string;
  latitude: string;
  longitude: string;
  gmaps: string;
  shortdeskripsi: string;
  longdeskripsi: string;
  image: string[];
  fasilitas: string[];
};

export default function CreateWisata() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-6.9999568, 113.3793574]);
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fasilitasOptions = ['Kamar Mandi', 'WiFi', 'Tempat Sholat', 'Spot Foto', 'Tempat Makan'];

  const { register, handleSubmit, setValue } = useForm<Wisata>();

  const onSubmit: SubmitHandler<Wisata> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('latitude', locationInfo?.latitude.toString() || '');
    formData.append('longitude', locationInfo?.longitude.toString() || '');
    formData.append('gmaps', data.gmaps);
    formData.append('shortdeskripsi', data.shortdeskripsi);
    formData.append('longdeskripsi', data.longdeskripsi);
    fasilitas.forEach((item) => formData.append('fasilitas[]', item));
    images.forEach((img, index) => formData.append(`image_${index}`, img));

    const token = localStorage.getItem('authToken');

    const response = await fetch(import.meta.env.VITE_BASE_URL + '/api/destinations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      toast.success('Data berhasil ditambahkan.');
    } else {
      toast.error('Data gagal ditambahkan.');
    }

    setIsLoading(false);

    console.log(formData);
  };

  const handleAddFasilitas = (newFasilitas: string) => {
    if (newFasilitas.trim() && !fasilitas.includes(newFasilitas)) {
      setFasilitas([...fasilitas, newFasilitas]);
    }
  };

  const handleRemoveFasilitas = (index: number) => {
    setFasilitas(fasilitas.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 2 - images.length);
      const newImages = fileArray.map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const toggleFasilitasOption = (option: string) => {
    if (!fasilitas.includes(option)) {
      setFasilitas([...fasilitas, option]);
    }
  };

  return (
    <div className="px-4 mt-6">
      <p className="font-bold text-xl">Tambah Data Wisata</p>
      <div className="mt-4 w-full">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-7xl w-[60rem] flex justify-between gap-4 max-md:flex col ">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Nama</label>
                <Input placeholder="Masukan nama wisata" className="w-full" {...register('name')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Kategori</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori wisata" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wisata Alam" onClick={() => setValue('category', 'Wisata Alam')}>
                      Wisata Alam
                    </SelectItem>
                    <SelectItem value="Wisata Kuliner" onClick={() => setValue('category', 'Wisata Kuliner')}>
                      Wisata Kuliner
                    </SelectItem>
                    <SelectItem value="Wisata Budaya" onClick={() => setValue('category', 'Wisata Budaya')}>
                      Wisata Budaya
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Deskripsi Singkat</label>
                <Textarea {...register('shortdeskripsi')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Deskripsi Lengkap</label>
                <Textarea {...register('longdeskripsi')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Gambar (max 2)</label>
                <Input type="file" multiple accept=".png, .jpeg, .jpg" onChange={handleImageUpload} disabled={images.length >= 2} />
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded" />
                      <span className="absolute top-0 right-0 text-sm bg-red-500 cursor-pointer hover:bg-red-600 rounded-full text-white px-2 py-0.5" onClick={() => setImages(images.filter((_, i) => i !== index))}>
                        X
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Fasilitas</label>
                {/* Input Manual */}
                <div className="flex gap-2 items-center">
                  <Input id="fasilitasInput" placeholder="Tambah fasilitas wisata" />
                  <Button
                    onClick={() => {
                      const fasilitasInput = document.getElementById('fasilitasInput') as HTMLInputElement;
                      handleAddFasilitas(fasilitasInput.value);
                      fasilitasInput.value = '';
                    }}
                    type="button"
                  >
                    Tambah
                  </Button>
                </div>
                {/* Checkbox Fasilitas */}
                <div className="flex flex-wrap gap-4 mt-2">
                  {fasilitasOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <input type="checkbox" id={option} onChange={() => toggleFasilitasOption(option)} />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
                {/* List Manual Fasilitas */}
                <div className="flex gap-2 flex-wrap mt-2">
                  {fasilitas
                    .filter((item) => !fasilitasOptions.includes(item)) // Filter hanya fasilitas manual
                    .map((fasilitasItem, index) => (
                      <div key={index} className="bg-blue-500 px-4 py-1 rounded-full flex items-center justify-between gap-2 cursor-pointer text-white " onClick={() => handleRemoveFasilitas(index)}>
                        <span>
                          {fasilitasItem} <span className="text-xs">X</span>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full min-h-[240px]">
                <label htmlFor="" className="pb-2">
                  Lokasi
                </label>
                <Input placeholder="Masukan link google maps" className="mt-2" {...register('gmaps')} />
                <MapContainer center={mapCenter} zoom={3} style={{ height: '225px', width: '100%', borderRadius: '10px', marginTop: '10px' }}>
                  <SearchControl setLocationInfo={setLocationInfo} />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                  {locationInfo && (
                    <Marker position={[locationInfo.latitude, locationInfo.longitude]}>
                      <Popup>{locationInfo.label}</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4 mb-10" type="submit" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Tambah Data'}
          </Button>
        </form>
      </div>
    </div>
  );
}
