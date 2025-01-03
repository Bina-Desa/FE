import { ArrowRight, CalendarDays, HandPlatter, Home, MapPinHouse, Store } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
        <Button onClick={handleLogout} variant={'destructive'}>
          Logout <ArrowRight />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
