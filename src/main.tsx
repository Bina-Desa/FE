import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Acara from './routes/acara.tsx';
import Kuliner from './routes/kuliner.tsx';
import Peta from './routes/peta.tsx';
import Root from './routes/root.tsx';
import TempatWisata from './routes/tempat-wisata.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/peta',
        element: <Peta />,
      },
      {
        path: '/tempat-wisata',
        element: <TempatWisata />,
      },
      {
        path: '/kuliner',
        element: <Kuliner />,
      },
      {
        path: '/acara',
        element: <Acara />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
