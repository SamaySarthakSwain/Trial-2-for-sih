
'use client';

import { useState, useRef, useEffect } from 'react';
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
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import {
  FileText,
  User,
  Bell,
  Map,
  Shield,
  Siren,
  Camera,
  HeartPulse,
  Thermometer,
  Cloudy,
  Waypoints
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function Dashboard() {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this app.',
          });
        }
      }
    };

    getCameraPermission();
  }, [toast]);


  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Black Box</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <User />
                  Driver
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText />
                  Accident Logs
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Bell />
                  Notifications
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/1/40/40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col gap-4 p-4 md:p-6">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Driver Dashboard</h1>
            <SidebarTrigger className="md:hidden" />
          </header>
          <main className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Live Map & Route</CardTitle>
                  <CardDescription>
                    Real-time traffic and safest route suggestion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <iframe
                      src="https://maps.google.com/maps?q=Berhampur,Odisha&t=&z=13&ie=UTF8&iwloc=&output=embed&layer=t"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Real-time Speed
                    </CardTitle>
                     <Waypoints className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">68 km/h</div>
                    <p className="text-xs text-muted-foreground">
                      GPS data synced
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pre-Collision Alert
                    </CardTitle>
                    <Siren className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">No Alert</Badge>
                     <p className="text-xs text-muted-foreground mt-2">
                      Ultrasonic sensors are active
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                  <CardHeader>
                    <CardTitle>Driver Status</CardTitle>
                     <CardDescription>
                      Live feed from the driver-facing camera.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video bg-muted rounded-md">
                       <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        <Badge variant={hasCameraPermission ? 'default' : 'destructive'} className="bg-opacity-70 backdrop-blur-sm">
                           <Camera className="w-3 h-3 mr-1" /> {hasCameraPermission ? 'Live' : 'No Camera'}
                        </Badge>
                      </div>
                    </div>
                     {hasCameraPermission === false && (
                        <Alert variant="destructive" className="mt-4">
                          <AlertTitle>Camera Access Required</AlertTitle>
                          <AlertDescription>
                            Please allow camera access for driver monitoring.
                          </AlertDescription>
                        </Alert>
                      )}
                  </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Status</CardTitle>
                  <CardDescription>
                    Post-accident analysis and actions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-md border">
                     <HeartPulse className="w-8 h-8 text-primary" />
                     <div>
                       <p className="font-semibold">Driver Condition</p>
                       <p className="text-sm text-muted-foreground">Awaiting Analysis...</p>
                     </div>
                  </div>
                   <div className="flex items-center gap-4 p-4 rounded-md border">
                     <Thermometer className="w-8 h-8 text-primary" />
                     <div>
                       <p className="font-semibold">Impact Sensor</p>
                       <p className="text-sm text-muted-foreground">Nominal</p>
                     </div>
                  </div>
                   <div className="flex items-center gap-4 p-4 rounded-md border">
                     <Cloudy className="w-8 h-8 text-primary" />
                     <div>
                       <p className="font-semibold">Airbag Status</p>
                       <p className="text-sm text-muted-foreground">Not Deployed</p>
                     </div>
                  </div>
                  <Button size="lg" variant="destructive" disabled>
                    <Siren className="mr-2 h-4 w-4" />
                    Report Accident
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
          <Toaster />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
