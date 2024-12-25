import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppSidebar } from './components/sidebar';

export default function AdminRoot() {
  const [loading, setLoading] = useState(true);
  const authToken = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [authToken, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Memuat...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Toaster richColors position="top-center" theme="light" />
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-white">
          <SidebarTrigger />
          <div className="pb-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
