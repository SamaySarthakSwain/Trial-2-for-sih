
'use client';

import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FileText,
  User,
  Bell,
  Settings,
  Shield,
} from 'lucide-react';

import DriverPage from './driver/page';
import AccidentLogsPage from './accident-logs/page';
import NotificationsPage from './notifications/page';
import SettingsPage from './settings/page';


export default function Dashboard() {
  const [activePage, setActivePage] = useState('driver');

  const renderPage = () => {
    switch (activePage) {
      case 'driver':
        return <DriverPage />;
      case 'accident-logs':
        return <AccidentLogsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DriverPage />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">SafeX</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === 'driver'} onClick={() => setActivePage('driver')}>
                  <User />
                  Driver
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === 'accident-logs'} onClick={() => setActivePage('accident-logs')}>
                  <FileText />
                  Accident Logs
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === 'notifications'} onClick={() => setActivePage('notifications')}>
                  <Bell />
                  Notifications
                </SidebarMenuButton>
              </SidebarMenuItem>
                 <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === 'settings'} onClick={() => setActivePage('settings')}>
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/1/40/40" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <span>Samay Sarthak Swain</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        {renderPage()}
      </div>
    </SidebarProvider>
  );
}
