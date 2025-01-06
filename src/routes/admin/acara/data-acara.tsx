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
import { toast } from 'sonner';
import useSWR from 'swr';
import { format } from 'date-fns';
import { IoWarningOutline } from 'react-icons/io5';

interface Acara {
  id: number;
  title: string;
  description: string;
  location: string;
  date: any;
  image: string[];
}

export default function DataAcara() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/event?page=${currentPage}&limit=10`, fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (error) {
    return (
      <div className="w-[80vw] mx-auto h-screen flex items-center justify-center">
        <div className="text-center w-full flex gap-2 justify-center items-center text-red-500">
          <p className="">Gagal Memuat data</p>
          <IoWarningOutline />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-[80vw] mx-auto h-screen flex items-center justify-center">
        <div className="text-center w-full flex gap-2 justify-center items-center">
          <p>Memuat...</p>
          <LoaderCircle className="animate-spin" />
        </div>
      </div>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const acara = data?.data?.map((item: any) => {
    const parsedDate = new Date(item.date);
    const formattedDate = !isNaN(parsedDate.getTime()) ? format(parsedDate, 'dd MMMM yyyy') : 'Tanggal tidak valid';

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      location: item.location,
      date: formattedDate,
      image: JSON.parse(item.image),
    };
  });

  const filteredAcara = acara.filter((item: Acara) => item.title?.toLowerCase().includes(searchQuery));

  const totalPages = data?.totalPages || 1;

  const token = sessionStorage.getItem('authToken');

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }

    try {
      setIsLoading(true);
      const url = `${import.meta.env.VITE_BASE_URL}/api/event/${id}`;

      const response = await fetch(url, {
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
      <p className="font-bold text-2xl ">Data acara</p>

      <div className="mt-6 w-[60rem]">
        <div className="flex justify-between">
          <Input placeholder="Search..." className="w-96" value={searchQuery} onChange={handleSearchChange} />
          <a href="/admin/acara/create">
            <Button>Tambah Data </Button>
          </a>
        </div>
      </div>
      <div className="mt-4 max-w-6xl border rounded-md pb-2">
        <Table className="max-w-6xl w-full">
          <TableCaption>Daftar Data acara.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Gambar</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Kategori</TableHead>
              <TableHead className="text-center">Tanggal Acara</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAcara &&
              filteredAcara.map((item: Acara, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={import.meta.env.VITE_BASE_URL + item.image[0]} alt={item.title} className="w-20 h-16 object-cover rounded-md" />
                  </TableCell>
                  <TableCell className="text-center">{item.title}</TableCell>
                  <TableCell className="text-center">{item.location}</TableCell>
                  <TableCell className="text-center">{item.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      <Dialog>
                        <DialogTrigger>
                          <Button variant={'destructive'}>
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
                              <Button variant={'outline'}>Batal</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading} variant={'destructive'} onClick={() => handleDelete(item.id)}>
                              <p className="text-center">{isLoading ? <LoaderCircle className="animate-spin" /> : 'Hapus'}</p>
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <a href={`/admin/acara/update/${item.id}`}>
                        <Button variant={'default'} className="bg-green-500 hover:bg-green-400">
                          <Pencil />
                        </Button>
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow className="text-center py-4 mx-auto">
              <TableCell colSpan={5}> {filteredAcara.length <= 0 ? <p>Data Tidak Ada</p> : ''}</TableCell>
            </TableRow>
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
            <PaginationNext onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} className="cursor-pointer hover:bg-black hover:text-white" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
