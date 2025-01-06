/* eslint-disable @typescript-eslint/no-unused-vars */
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
};

export default function UpdateKuliner() {
  const { id } = useParams();
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarungId, setSelectedWarungId] = useState('');
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { register, handleSubmit, setValue } = useForm<Product>();

  const { data: warung } = useSWR(import.meta.env.VITE_BASE_URL + '/api/kuliner/warung', fetcher);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/kuliner/product/${id}`);
        const data = response.data;
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('price', data.price);
        setValue('warungId', data.warungId);
        setSelectedWarungId(data.warungId);

        // Handle image data
        let parsedImages = [];
        try {
          parsedImages = JSON.parse(data.image);
        } catch {
          parsedImages = Array.isArray(data.image) ? data.image : [];
        }

        setOldImages(parsedImages);
        setImagePreview(parsedImages.map((image: string) => (image.startsWith('http') ? image : import.meta.env.VITE_BASE_URL + image)));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch product data');
      }
    }

    fetchData();
  }, [setValue, id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const maxNewImages = 2 - (oldImages.length + newImageFiles.length);
      if (maxNewImages <= 0) {
        toast.error('Maximum 2 images allowed');
        return;
      }

      const fileArray = Array.from(files).slice(0, maxNewImages);
      const validFiles = fileArray.filter((file) => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024);

      if (validFiles.length !== fileArray.length) {
        toast.error('Some files were skipped. Please use images under 5MB');
      }

      setNewImageFiles((prev) => [...prev, ...validFiles]);

      // Create and add preview URLs
      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (index < oldImages.length) {
      // Removing an old image
      setOldImages((prev) => prev.filter((_, i) => i !== index));
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Removing a new image
      const newIndex = index - oldImages.length;
      setNewImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      URL.revokeObjectURL(imagePreview[index]); // Clean up the URL
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setIsLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      const formData = new FormData();

      // Append basic data
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('warungId', selectedWarungId);

      // Append old images
      formData.append('oldImages', JSON.stringify(oldImages));

      // Append new image files
      newImageFiles.forEach((file, index) => {
        formData.append(`newImages`, file);
      });

      const response = await fetch(import.meta.env.VITE_BASE_URL + `/api/kuliner/product/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const result = await response.json();
      toast.success('Data berhasil diperbarui');

      if (result) {
        window.location.href = '/admin/kuliner';
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update product');
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
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="max-w-7xl w-[60rem] flex justify-between gap-4 max-md:flex col">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nama</label>
                <Input id="name" placeholder="Masukan nama product" className="w-full" {...register('name', { required: true })} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="price">Harga</label>
                <Input id="price" placeholder="Masukan harga" className="w-full" {...register('price', { required: true })} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description">Deskripsi</label>
                <Textarea id="description" {...register('description', { required: true })} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="warung">Warung</label>
                <Select value={getSelectedWarungName()} onValueChange={handleWarungSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Warung" />
                  </SelectTrigger>
                  <SelectContent>
                    {warung?.map((item: any) => (
                      <SelectItem key={item.id} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="images">Gambar (max 2)</label>
                <Input id="images" type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={oldImages.length + newImageFiles.length >= 2} />
                <div className="flex gap-2 flex-wrap">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded" />
                      <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600" onClick={() => handleRemoveImage(index)}>
                        ×
                      </button>
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
