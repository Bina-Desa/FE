/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = icon;

interface LocationInfo {
  latitude: number;
  longitude: number;
  label: string;
}

export const SearchControl: React.FC<{ setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfo | null>> }> = ({ setLocationInfo }) => {
  const map = useMap();
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    const searchControl = GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: true,
      marker: {
        icon: icon,
      },
      popupFormat: ({ result }: any) => result.label,
      resultFormat: ({ result }: any) => result.label,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (e: any) => {
      if (e && e.location) {
        const locationData: LocationInfo = {
          latitude: e.location.y,
          longitude: e.location.x,
          label: e.location.label || e.location.label,
        };

        setLocationInfo(locationData);
        console.log('Location Found:', locationData);
      }
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, setLocationInfo]);

  return null;
};