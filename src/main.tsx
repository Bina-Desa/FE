import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root.tsx';
import Peta from './routes/peta.tsx';
import TempatWisata from './routes/tempat-wisata.tsx';
import Kuliner from './routes/kuliner.tsx';
import Acara from './routes/acara.tsx';
import LoginPage from './routes/admin/login.tsx';
import AdminDashboard from './routes/admin/dashboard.tsx';
import DetailWisata from './routes/detail-wisata.tsx';
// Definisi router utama
const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: '/',
    element: <Root />,
    children: [
      { path: 'peta', element: <Peta /> },
      { path: 'tempat-wisata', element: <TempatWisata /> },
      { path: 'tempat-wisata/:id', element: <DetailWisata /> },
      { path: 'kuliner', element: <Kuliner /> },
      { path: 'acara', element: <Acara /> },
    ],
  },

  // ADMIN ROUTES
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/adminDashboard',
    element: <AdminDashboard />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
