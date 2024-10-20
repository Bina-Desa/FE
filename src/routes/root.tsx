import BerandaSection from '@/components/beranda-section';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { Outlet, useLocation } from 'react-router-dom';
export default function Root() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {location.pathname === '/' ? (
        <div>
          <BerandaSection />
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
}
