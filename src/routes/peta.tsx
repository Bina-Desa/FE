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
import { LuExternalLink } from 'react-icons/lu';
import L from 'leaflet';

export default function PetaTempatWisata() {
  const defaultPosition: [number, number] = [-8.6924989, 116.1063038];
  const [selectedTempat, setSelectedTempat] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMarkerClick = (tempat: any) => {
    setSelectedTempat(tempat);
    setDrawerOpen(true);
  };

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
              icon={redIcon}
              eventHandlers={{
                click: () => handleMarkerClick(tempat),
              }}
            ></Marker>
          ))}
        </MapContainer>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <div className="max-w-xl lg:max-w-7xl mx-auto px-4 text-left">
                <DrawerTitle className="px-4">Informasi Wisata</DrawerTitle>
                <ScrollArea className="h-[30rem] lg:h-max lg:pb-14 max-w-4xl mt-6 rounded-md px-4 lg:flex-col lg:w-full ">
                  <div className="lg:flex lg:gap-8 lg:items-center">
                    <div className="w-full">
                      <CarouselWrapper images={selectedTempat?.image} />
                    </div>
                    <div className="w-full">
                      <div className="flex gap-2 mt-4">
                        <p className="text-xs bg-green-500 px-4 py-2 rounded-full text-white w-max">{selectedTempat?.kategori}</p>
                        <a href={selectedTempat?.lokasi.gmaps} className="bg-blue-500 hover:bg-blue-600 rounded-full text-white w-max px-4 text-xs flex items-center gap-2">
                          Lihat Google Maps <LuExternalLink />
                        </a>
                      </div>
                      <p className="text-xl font-bold mt-5 lg:mt-3 ">{selectedTempat?.nama}</p>

                      <p className="mt-2 text-justify text-sm">{selectedTempat?.deskripsiPanjang}</p>
                      <p className="font-bold text-lg mt-4">Fasilitas</p>
                      <div className="flex flex-wrap gap-4 mt-4">
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
