/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetcher } from '@/lib/fetcher';
import { DialogClose } from '@radix-ui/react-dialog';
import { LoaderCircle, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

interface Warung {
  id: number;
  name: string;
  address: string;
}

interface WarungFormData {
  name: string;
  address: string;
}

export default function DataWarung() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarung, setSelectedWarung] = useState<Warung | null>(null);

  const { data, error, mutate } = useSWR<Warung[]>(`${import.meta.env.VITE_BASE_URL}/api/kuliner/warung?page=${currentPage}&limit=10`, fetcher);

  const { register: addRegister, handleSubmit: handleAddSubmit, reset: resetAddForm } = useForm<WarungFormData>();
  const { register: updateRegister, handleSubmit: handleUpdateSubmit, reset: resetUpdateForm } = useForm<WarungFormData>();

  const token = sessionStorage.getItem('authToken');

  if (error) {
    return (
      <div className="w-[80rem] h-screen flex items-center justify-center">
        <p>Gagal memuat data</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-[80rem] h-screen flex items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  const filteredWarung = data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(data.length / 10);

  const onAddSubmit = async (formData: WarungFormData) => {
    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/kuliner/warung`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.text();
      console.log('Response body:', responseData);

      if (response.ok) {
        toast.success('Data Berhasil Ditambahkan');
        mutate();
        resetAddForm();
      } else {
        toast.error(`Gagal menambah data: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error detail:', err);
      toast.error('Terjadi kesalahan saat menambah data');
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateSubmit = async (formData: WarungFormData) => {
    if (!selectedWarung) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/kuliner/warung/${selectedWarung.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Data Berhasil Diupdate');
        mutate();
        setSelectedWarung(null);
        resetUpdateForm();
      } else {
        toast.error(`Gagal mengupdate data: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error detail:', err);
      toast.error('Terjadi kesalahan saat mengupdate data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/kuliner/warung/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.text();
      console.log('Response body:', responseData);

      if (response.ok) {
        toast.success('Data Berhasil Dihapus');
        mutate();
      } else {
        toast.error(`Gagal menghapus data: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error detail:', err);
      toast.error('Terjadi kesalahan saat menghapus data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 mt-4 max-w-6xl">
      <h1 className="font-bold text-2xl">Data Warung</h1>

      <div className="mt-6">
        <div className="flex justify-between w-[60rem]">
          <Input placeholder="Search..." className="w-96" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          <Dialog>
            <DialogTrigger asChild>
              <Button>Tambah</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Data</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit(onAddSubmit)} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="add-name">Nama</label>
                  <Input id="add-name" placeholder="Nama Warung" {...addRegister('name', { required: true })} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="add-address">Alamat</label>
                  <Input id="add-address" placeholder="Alamat Warung" {...addRegister('address', { required: true })} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <LoaderCircle className="animate-spin" /> : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-4 border rounded-md pb-2">
        <Table>
          <TableCaption>Daftar Data Warung</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center">Nama</TableHead>
              <TableHead className="text-center">Alamat</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWarung.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.address}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Konfirmasi Hapus?</DialogTitle>
                        </DialogHeader>
                        <p>Apakah Anda yakin ingin menghapus data ini?</p>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                          <Button variant="destructive" disabled={isLoading} onClick={() => handleDelete(item.id)}>
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Hapus'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={selectedWarung?.id === item.id} onOpenChange={(open) => !open && setSelectedWarung(null)}>
                      <DialogTrigger asChild>
                        <Button variant="default" className="bg-green-500 hover:bg-green-400" onClick={() => setSelectedWarung(item)}>
                          <Pencil />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Data Warung</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdateSubmit(onUpdateSubmit)} className="flex flex-col gap-3">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="update-name">Nama</label>
                            <Input id="update-name" placeholder="Nama Warung" defaultValue={selectedWarung?.name} {...updateRegister('name', { required: true })} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="update-address">Alamat</label>
                            <Input id="update-address" placeholder="Alamat Warung" defaultValue={selectedWarung?.address} {...updateRegister('address', { required: true })} />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Update'}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredWarung.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Data Tidak Ada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer hover:bg-black hover:text-white" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'bg-black text-white' : 'cursor-pointer hover:bg-black hover:text-white'}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext className="cursor-pointer hover:bg-black hover:text-white" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
