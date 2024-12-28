/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchControl } from '../components/search-place';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

export default function UpdateWisata() {
  const { id } = useParams<{ id: string }>();

  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-6.9999568, 113.3793574]);
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fasilitasOptions = ['Kamar Mandi', 'WiFi', 'Tempat Sholat', 'Spot Foto', 'Tempat Makan'];

  const { register, handleSubmit, setValue } = useForm<Wisata>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/destinations/${id}`);
        const data = response.data.data;
        setValue('name', data.name);
        setValue('category', data.category);
        setValue('latitude', data.latitude);
        setValue('longitude', data.longitude);
        setValue('gmaps', data.gmaps);
        setValue('shortdeskripsi', data.shortdeskripsi);
        setValue('longdeskripsi', data.longdeskripsi);
        setFasilitas(JSON.parse(data.fasilitas));
        setImageFiles(JSON.parse(data.image));

        const imageUrls = JSON.parse(data.image).map((img:any) => `${import.meta.env.VITE_BASE_URL}${img}`);
        setImagePreview(imageUrls);

        setLocationInfo({ latitude: data.latitude, longitude: data.longitude, label: data.gmaps });
        setMapCenter([parseFloat(data.latitude), parseFloat(data.longitude)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [setValue]);

  const onSubmit: SubmitHandler<Wisata> = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('latitude', locationInfo ? locationInfo.latitude.toString() : '');
      formData.append('longitude', locationInfo ? locationInfo.longitude.toString() : '');
      formData.append('gmaps', data.gmaps);
      formData.append('shortdeskripsi', data.shortdeskripsi);
      formData.append('longdeskripsi', data.longdeskripsi);
      formData.append('fasilitas', JSON.stringify(fasilitas));
      imageFiles.forEach((file) => {
        formData.append('image', file);
      });

      const token = sessionStorage.getItem('authToken');

      const response = await fetch(import.meta.env.VITE_BASE_URL + `/api/destinations/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Data berhasil diupdate.');
        setTimeout(() => {
          window.location.href = '/admin/wisata';
        }, 1000);
      } else {
        throw new Error('Failed to add data');
      }
    } catch (error) {
      toast.error('Data gagal diupdate.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
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
      const fileArray = Array.from(files).slice(0, 2 - imageFiles.length);

      // Store the actual files
      setImageFiles((prevFiles) => [...prevFiles, ...fileArray]);

      // Create preview URLs
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const toggleFasilitasOption = (option: string) => {
    if (!fasilitas.includes(option)) {
      setFasilitas([...fasilitas, option]);
    } else {
      setFasilitas(fasilitas.filter((item) => item !== option));
    }
  };

  return (
    <div className="px-4 mt-6">
      <p className="font-bold text-xl">Tambah Data Wisata</p>
      <div className="mt-4 w-full">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-7xl w-[60rem] flex justify-between gap-4 max-md:flex col">
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
                <Input type="file" multiple accept=".png, .jpeg, .jpg" onChange={handleImageUpload} disabled={imageFiles.length >= 2} />
                <div className="flex gap-2 flex-wrap">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded" />
                      <span className="absolute top-0 right-0 text-sm bg-red-500 cursor-pointer hover:bg-red-600 rounded-full text-white px-2 py-0.5" onClick={() => handleRemoveImage(index)}>
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
                <div className="flex flex-wrap gap-4 mt-2">
                  {fasilitasOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <input type="checkbox" id={option} checked={fasilitas.includes(option)} onChange={() => toggleFasilitasOption(option)} />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {fasilitas
                    .filter((item) => !fasilitasOptions.includes(item))
                    .map((fasilitasItem, index) => (
                      <div key={index} className="bg-blue-500 px-4 py-1 rounded-full flex items-center justify-between gap-2 cursor-pointer text-white" onClick={() => handleRemoveFasilitas(index)}>
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
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Update Data'}
          </Button>
        </form>
      </div>
    </div>
  );
}
