import { CalendarDays, ChevronRight, HandPlatter, Home, MapPinHouse, Store, User2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { DialogClose } from '@radix-ui/react-dialog';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: Home,
  },
  {
    title: 'Wisata',
    url: '/admin/wisata',
    icon: MapPinHouse,
  },
  {
    title: 'Kuliner',
    url: '/admin/kuliner',
    icon: HandPlatter,
  },
  {
    title: 'Warung',
    url: '/admin/warung',
    icon: Store,
  },
  {
    title: 'Acara',
    url: '/admin/acara',
    icon: CalendarDays,
  },
];

export function AppSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    window.location.href = '/';
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 border rounded-md p-3 items-center bg-white cursor-pointer">
                <User2Icon />
                <div>
                  <p className="text-medium">Admin</p>
                  <p className="text-xs text-zinc-400">anda login sebagai admin</p>
                </div>
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max" side="right" align="start">
              <Dialog>
                <DialogTrigger className='w-full'>
                  <Button variant="destructive" className="w-full ">
                    Logout <ChevronRight />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>Apakah anda yakin ingin keluar?</DialogDescription>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleLogout}>
                      Ya
                    </Button>
                    <DialogClose asChild>
                      <Button variant="secondary">Tidak</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
