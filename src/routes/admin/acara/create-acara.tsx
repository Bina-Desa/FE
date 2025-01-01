/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Acara {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string[];
}

export default function CreateAcara() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<Acara>();

  const onSubmit: SubmitHandler<Acara> = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append JSON data
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('date', data.date);
      imageFiles.forEach((file) => {
        formData.append('image', file);
      });

      const token = sessionStorage.getItem('authToken');

      const response = await fetch(import.meta.env.VITE_BASE_URL + '/api/event', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Data berhasil ditambahkan.');
        setTimeout(() => {
          window.location.href = '/admin/acara';
        }, 1000);
      } else {
        throw new Error('Failed to add data');
      }
    } catch (error) {
      toast.error('Data gagal ditambahkan.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="px-4 mt-6">
      <p className="font-bold text-xl">Tambah Data Acara</p>
      <div className="mt-4 w-full">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-7xl w-[60rem] flex justify-between gap-4 max-md:flex col">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Title</label>
                <Input placeholder="Masukan nama acara" className="w-full" {...register('title')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Deskripsi</label>
                <Textarea placeholder="Masukan deskripsi acara" className="w-full" {...register('description')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Lokasi</label>
                <Input placeholder="Masukan lokasi acara" className="w-full" {...register('location')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Tanggal Acara</label>
                <Input type="date" className="w-full" {...register('date')} />
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
          </div>
          <Button className="w-full mt-4 mb-10" type="submit" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Tambah Data'}
          </Button>
        </form>
      </div>
    </div>
  );
}
