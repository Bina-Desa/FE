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

interface WisataAlam {
  id: number;
  nama: string;
  lokasi: {
    lat: string;
    long: string;
    gmaps: string;
  };
  deskripsiPendek: string;
  image: string[];
}

export default function DataWisata() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/destinations?page=${currentPage}&limit=10`, fetcher);
  const [isLoading, setIsLoading] = useState(false);

  if (error) {
    return <div className="text-center text-red-500">Gagal memuat data.</div>;
  }

  if (!data) {
    return <div className="text-center">Memuat...</div>;
  }

  const wisata = data?.data?.map((item: any) => ({
    id: item.id,
    nama: item.name,
    lokasi: {
      lat: item.location.latitude,
      long: item.location.longitude,
      gmaps: item.location.gmaps,
    },
    deskripsiPendek: item.shortdeskripsi,
    image: JSON.parse(item.image),
  }));

  const totalPages = data?.totalPages || 1;

  const token = localStorage.getItem('authToken');

  const handleDelete = async (id: number) => {
    if (!token) {
      toast.error('Token tidak ditemukan');
      return;
    }

    try {
      setIsLoading(true);
      const url = `${import.meta.env.VITE_BASE_URL}/api/destinations/${id}`;

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

  const showToast = () => {
    toast.success('Test');
  };

  return (
    <div className="px-4 mt-4 max-w-6xl">
      <p className="font-bold text-2xl cursor-pointer" onClick={showToast}>
        Data Wisata
      </p>

      <div className="mt-6">
        <div className="flex justify-between">
          <Input placeholder="Search..." className="w-96" />
          <a href="/admin/wisata/create">
            <Button>Tambah Data </Button>
          </a>
        </div>
      </div>
      <div className="mt-4 max-w-6xl border rounded-md pb-2">
        <Table className="max-w-6xl w-full">
          <TableCaption>Daftar Data WIsata.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Gambar</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wisata &&
              wisata.map((item: WisataAlam, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={import.meta.env.VITE_BASE_URL + item.image[0]} alt={item.nama} className="w-20 h-16 object-cover rounded-md" />
                  </TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>
                    <a href={item.lokasi.gmaps} target="_blank" className="text-sm py-1 px-2 rounded-md bg-blue-500 text-white">
                      Lihat lokasi
                    </a>
                  </TableCell>
                  <TableCell>{item.deskripsiPendek}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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
                      <a href={`/wisata/update/${item.id}`}>
                        <Button variant={'default'} className="bg-green-500 hover:bg-green-400">
                          <Pencil />
                        </Button>
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
