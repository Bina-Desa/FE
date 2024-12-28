/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { fetcher } from '@/lib/fetcher';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string[];
  warungId: string;
  category: string;
};

export default function CreateKuliner() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarungId, setSelectedWarungId] = useState('');

  const { register, handleSubmit, setValue, watch } = useForm<Product>();
  const selectedCategory = watch('category');

  const { data: warung } = useSWR(import.meta.env.VITE_BASE_URL + '/api/kuliner/warung', fetcher);

  const handleWarungSelect = (warungName: string) => {
    const selectedWarung = warung.find((item: any) => item.name === warungName);
    if (selectedWarung) {
      setSelectedWarungId(selectedWarung.id);
      setValue('warungId', selectedWarung.id);
    }
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('warungId', selectedWarungId); // Use the stored warungId
      formData.append('category', data.category);
      imageFiles.forEach((file) => {
        formData.append('image', file);
      });

      const token = sessionStorage.getItem('authToken');

      const response = await fetch(import.meta.env.VITE_BASE_URL + '/api/kuliner/product', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Data berhasil ditambahkan.');
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
      setImageFiles((prevFiles) => [...prevFiles, ...fileArray]);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
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
                <Input placeholder="Masukan nama product" className="w-full" {...register('name')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Harga</label>
                <Input placeholder="Masukan harga" className="w-full" {...register('price')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Deskripsi</label>
                <Textarea {...register('description')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Kategori</label>
                <Select onValueChange={(value) => setValue('category', value)} value={selectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Makanan">Makanan</SelectItem>
                    <SelectItem value="Minuman">Minuman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Warung</label>
                <Select onValueChange={handleWarungSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Warung" />
                  </SelectTrigger>
                  <SelectContent>
                    {warung &&
                      warung.map((item: any) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
