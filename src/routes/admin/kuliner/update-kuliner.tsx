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
  const { id } = useParams(); // Get the product ID from URL
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarungId, setSelectedWarungId] = useState('');

  const { register, handleSubmit, setValue, watch, reset } = useForm<Product>();
  const selectedCategory = watch('category');

  // Fetch existing product data
  const { data: product } = useSWR(id ? `${import.meta.env.VITE_BASE_URL}/api/kuliner/product/${id}` : null, fetcher);

  // Fetch warung list
  const { data: warung } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/kuliner/warung`, fetcher);

  // Initialize form with existing data
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        warungId: product.warungId,
      });

      setSelectedWarungId(product.warungId);
      const imageUrls = JSON.parse(product.image).map((img: any) => `${import.meta.env.VITE_BASE_URL}${img}`);
      setImagePreview(imageUrls);
      setImageFiles(JSON.parse(product.image));
    }
  }, [product, reset]);

  const handleWarungSelect = (warungName: string) => {
    const selectedWarung = warung?.find((item: any) => item.name === warungName);
    if (selectedWarung) {
      setSelectedWarungId(selectedWarung.id);
      setValue('warungId', selectedWarung.id);
    }
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append form data
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('warungId', selectedWarungId);
      formData.append('category', data.category);

      // Append only new images
      imageFiles.forEach((file) => {
        formData.append('image', file);
      });

      // If there are existing images that weren't removed, append their URLs
      imagePreview
        .filter((url) => !url.startsWith('blob:')) // Only include existing URLs, not new file previews
        .forEach((url) => {
          formData.append('existingImages', url);
        });

      const token = sessionStorage.getItem('authToken');

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/kuliner/product/${id}`, {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const totalImages = imagePreview.length + imageFiles.length;
      const remainingSlots = 2 - totalImages;
      const fileArray = Array.from(files).slice(0, remainingSlots);

      setImageFiles((prevFiles) => [...prevFiles, ...fileArray]);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const isExistingImage = !imagePreview[index].startsWith('blob:');

    if (isExistingImage) {
      // Remove existing image from preview
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove new image from both files and preview
      const previewIndex = index - (imagePreview.length - imageFiles.length);
      setImageFiles((prev) => prev.filter((_, i) => i !== previewIndex));
      URL.revokeObjectURL(imagePreview[index]);
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Get selected warung name for display
  const getSelectedWarungName = () => {
    if (warung && selectedWarungId) {
      const selected = warung.find((item: any) => item.id === selectedWarungId);
      return selected?.name || '';
    }
    return '';
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
                <Input type="file" multiple accept=".png, .jpeg, .jpg" onChange={handleImageUpload} disabled={imagePreview.length >= 2} />
                <div className="flex gap-2 flex-wrap">
                  {imagePreview &&
                    imagePreview.map((preview, index) => (
                      <div key={index} className="relative">
                        <img src={preview.startsWith('blob:') ? preview : preview} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded" />
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
