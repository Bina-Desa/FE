import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Acara from './routes/acara.tsx';
import AdminRoot from './routes/admin/admin-root.tsx';
import Dashboard from './routes/admin/dashboard.tsx';
import DetailAcara from './routes/detail-acara.tsx';
import DetailKuliner from './routes/detail-kuliner.tsx';
import DetailWisata from './routes/detail-wisata.tsx';
import Kuliner from './routes/kuliner.tsx';
import Peta from './routes/peta.tsx';
import Profil from './routes/profil.tsx';
import Root from './routes/root.tsx';
import TempatWisata from './routes/tempat-wisata.tsx';
import DataWisata from './routes/admin/wisata/data-wisata.tsx';
import CreateWisata from './routes/admin/wisata/create-wisata.tsx';
import UpdateWisata from './routes/admin/wisata/update-wisata.tsx';
import LoginPage from './routes/admin/login.tsx';
import DataKuliner from './routes/admin/kuliner/data-kuliner.tsx';
import CreateKuliner from './routes/admin/kuliner/create-kuliner.tsx';
import UpdateKuliner from './routes/admin/kuliner/update-kuliner.tsx';
import DataWarung from './routes/admin/warung/data-warung.tsx';
import DataAcara from './routes/admin/acara/data-acara.tsx';
import CreateAcara from './routes/admin/acara/create-acara.tsx';
import UpdateAcara from './routes/admin/acara/update-acara.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: 'peta', element: <Peta /> },
      { path: 'tempat-wisata', element: <TempatWisata /> },
      { path: 'tempat-wisata/:id', element: <DetailWisata /> },
      { path: 'kuliner', element: <Kuliner /> },
      { path: 'kuliner/:id', element: <DetailKuliner /> },
      { path: 'acara', element: <Acara /> },
      { path: 'acara/:id', element: <DetailAcara /> },
      { path: 'profil', element: <Profil /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'wisata',
        element: <DataWisata />,
      },
      { path: 'wisata/create', element: <CreateWisata /> },
      { path: 'wisata/update/:id', element: <UpdateWisata /> },
      {
        path: 'kuliner',
        element: <DataKuliner />,
      },
      { path: 'kuliner/create', element: <CreateKuliner /> },
      { path: 'kuliner/update/:id', element: <UpdateKuliner /> },
      {
        path: 'warung',
        element: <DataWarung />,
      },
      {
        path: 'acara',
        element: <DataAcara />,
      },
      { path: 'acara/create', element: <CreateAcara /> },
      { path: 'acara/update/:id', element: <UpdateAcara /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
