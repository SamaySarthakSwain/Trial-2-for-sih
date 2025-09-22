
'use client';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <SidebarInset className="flex flex-col gap-4 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <SidebarTrigger className="md:hidden" />
      </header>
      <main className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="traffic-alerts">Real-time Traffic Alerts</Label>
              <Switch id="traffic-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="collision-alerts">Pre-Collision Warnings</Label>
              <Switch id="collision-alerts" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <Label htmlFor="system-updates">System Update Notifications</Label>
              <Switch id="system-updates" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Samay Sarthak Swain" />
             </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="samay@example.com" />
             </div>
             <Button>Update Profile</Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your app experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                    <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                </Select>
             </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                 <Select>
                    <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                         <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
             </div>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}
