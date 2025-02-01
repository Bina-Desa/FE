import BerandaSection from '@/components/beranda-section';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import ScrollToTop from '@/utils/scroll-top';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { Outlet, useLocation } from 'react-router-dom';

export default function Root() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {location.pathname === '/' ? (
        <div>
          <BerandaSection />
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-14 right-10 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 border border-white cursor-pointer z-10"
      >
        <IoLogoWhatsapp size={24} />
      </a>
    </>
  );
}
