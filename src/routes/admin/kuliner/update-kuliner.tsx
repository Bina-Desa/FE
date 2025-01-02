/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { fetcher } from '@/lib/fetcher';
import { LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string[];
  warungId: string;
  category: string;
};

export default function UpdateKuliner() {
  const { id } = useParams();
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarungId, setSelectedWarungId] = useState('');
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { register, handleSubmit, setValue, watch } = useForm<Product>();
  const selectedCategory = watch('category');

  const { data: warung } = useSWR(import.meta.env.VITE_BASE_URL + '/api/kuliner/warung', fetcher);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/kuliner/product/${id}`);
        const data = response.data;
        setValue('name', data.name);
        setValue('category', data.category);
        setValue('description', data.description);
        setValue('price', data.price);
        const parsedImages = JSON.parse(data.image).filter((item: any) => typeof item === 'string');
        setOldImages(parsedImages);
        setImagePreview(parsedImages.map((image: string) => import.meta.env.VITE_BASE_URL + image));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [setValue, id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 2 - (oldImages.length + newImageFiles.length));
      const validFiles = fileArray.filter((file) => file instanceof File);
      setNewImageFiles((prev) => [...prev, ...validFiles]);
      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (index < oldImages.length) {
      setOldImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - oldImages.length;
      setNewImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      URL.revokeObjectURL(imagePreview[index]);
    }
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setIsLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('warungId', selectedWarungId);

      const combinedImages = [...oldImages];
      formData.append('image', JSON.stringify(combinedImages));

      newImageFiles.forEach((file) => {
        formData.append('image', file);
      });

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await fetch(import.meta.env.VITE_BASE_URL + `/api/kuliner/product/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Data berhasil diperbarui.');
      } else {
        throw new Error('Failed to update data');
      }
    } catch (error) {
      toast.error('Data gagal diperbarui.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedWarungName = () => {
    if (warung && selectedWarungId) {
      const selected = warung.find((item: any) => item.id === selectedWarungId);
      return selected?.name || '';
    }
    return '';
  };

  const handleWarungSelect = (warungName: string) => {
    const selectedWarung = warung?.find((item: any) => item.name === warungName);
    if (selectedWarung) {
      setSelectedWarungId(selectedWarung.id);
      setValue('warungId', selectedWarung.id);
    }
  };

  return (
    <div className="px-4 mt-6">
      <p className="font-bold text-xl">Update Data Kuliner</p>
      <div className="mt-4 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Select onValueChange={(value) => setValue('category', value)} value={selectedCategory} defaultValue={selectedCategory}>
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
                <Select onValueChange={handleWarungSelect} value={getSelectedWarungName()}>
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
                <Input type="file" multiple accept=".png, .jpeg, .jpg" onChange={handleImageUpload} disabled={oldImages.length + newImageFiles.length >= 2} />
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
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Update Data'}
          </Button>
        </form>
      </div>
    </div>
  );
}
