import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './components/sidebar';
import { useAuth } from '@/hooks/useAuth';

export default function AdminRoot() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <p>Login dulu genk</p>;
  }

  return (
    <div className="bg-white">
      <Toaster richColors position="top-center" theme="light" />
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-white">
          <SidebarTrigger />
          <div className='pb-4'>
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
