/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import CarouselWrapper from '@/components/ui/image-carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { tempatWisata } from '@/data/dummyData';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { FaCheckCircle } from 'react-icons/fa';

export default function PetaTempatWisata() {
  const defaultPosition: [number, number] = [-8.6924989, 116.1063038];
  const [selectedTempat, setSelectedTempat] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMarkerClick = (tempat: any) => {
    setSelectedTempat(tempat);
    setDrawerOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Tempat Wisata | Peta</title>
      </Helmet>

      <div>
        <MapContainer center={defaultPosition} zoom={15} style={{ height: '100vh', width: '100%', zIndex: 1 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {tempatWisata.map((tempat, index) => (
            <Marker
              key={index}
              position={[parseFloat(tempat.lokasi.lat), parseFloat(tempat.lokasi.long)]}
              eventHandlers={{
                click: () => handleMarkerClick(tempat),
              }}
            ></Marker>
          ))}
        </MapContainer>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <div className="max-w-xl mx-auto px-4 text-left">
                <DrawerTitle className="px-4">Informasi Wisata</DrawerTitle>
                <ScrollArea className="h-[30rem] max-w-4xl mt-6 rounded-md px-4">
                  <div className="">
                    <div className="w-full">
                      <CarouselWrapper images={selectedTempat?.image} />
                    </div>
                    <p className="mt-4 text-xs bg-green-500 px-4 py-1 rounded-full text-white w-max">{selectedTempat?.kategori}</p>
                    <p className='text-xl font-bold mt-5  '>{selectedTempat?.nama}</p>

                    <p className="mt-2 text-justify text-sm">{selectedTempat?.deskripsiPanjang}</p>
                    <div>
                      <p className="font-bold text-lg mt-4">Fasilitas</p>
                      <div className="flex flex-wrap gap-6 mt-4">
                        {selectedTempat?.fasilitas.map((fasilitas: string, index: number) => (
                          <p key={index} className="flex gap-2 items-center">
                            <FaCheckCircle className="text-green-500" /> {fasilitas}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
