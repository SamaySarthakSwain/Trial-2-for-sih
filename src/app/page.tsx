
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getRoutes, RouteDetails } from '@/ai/flows/get-routes-flow';
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
  Waypoints,
  Route
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function Dashboard() {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [routes, setRoutes] = useState<RouteDetails[] | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  
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

  const handleFindRoute = async () => {
    if (!startPoint || !endPoint) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter both a starting and ending point.',
      });
      return;
    }
    setLoadingRoute(true);
    setRoutes(null);
    try {
      const result = await getRoutes({ start: startPoint, end: endPoint });
      setRoutes(result.routes);
    } catch (error) {
      console.error('Error finding route:', error);
      toast({
        variant: 'destructive',
        title: 'Error Finding Route',
        description: 'Could not fetch route suggestions. Please try again later.',
      });
    } finally {
      setLoadingRoute(false);
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
              <span className="text-lg font-semibold">Road Guardian</span>
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
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      Nearby Reports
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
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
                  <div className="flex flex-col gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input 
                        placeholder="Start Point" 
                        value={startPoint}
                        onChange={(e) => setStartPoint(e.target.value)}
                      />
                      <Input 
                        placeholder="End Point" 
                        value={endPoint}
                        onChange={(e) => setEndPoint(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleFindRoute} disabled={loadingRoute}>
                      {loadingRoute ? 'Finding Route...' : 'Find Route'}
                    </Button>
                    <div className="relative h-[400px] w-full bg-muted rounded-md overflow-hidden">
                      <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60032.9597799539!2d84.75538464973802!3d19.30390999581895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d5113645e5863%3A0x631523d42013146!2sBrahmapur%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&layer=t">
                      </iframe>
                    </div>
                    {routes && (
                      <div className="flex flex-col gap-4 mt-4">
                         <h3 className="text-lg font-semibold">Suggested Routes</h3>
                        {routes.map((route, index) => (
                           <Card key={index}>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                  <Route className="w-5 h-5" />
                                  Route {index + 1}: {route.summary}
                                  {(route.isFastest || route.isSafest) && (
                                    <div className="flex gap-2">
                                      {route.isFastest && <Badge variant="secondary">Fastest</Badge>}
                                      {route.isSafest && <Badge>Safest</Badge>}
                                    </div>
                                  )}
                                </CardTitle>
                                <CardDescription>{route.duration}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">{route.details}</p>
                              </CardContent>
                           </Card>
                        ))}
                      </div>
                    )}
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

    