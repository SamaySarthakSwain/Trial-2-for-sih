
'use client';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, TrafficCone, AlertTriangle, Construction } from 'lucide-react';

const notifications = [
    {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        title: "Heavy Traffic on Aska Road",
        description: "Consider alternative routes due to congestion near the main junction.",
        time: "15m ago"
    },
    {
        icon: <TrafficCone className="w-5 h-5 text-orange-500" />,
        title: "Minor Collision at Gajapati Nagar",
        description: "A minor accident has been reported. Emergency services are on site.",
        time: "45m ago"
    },
    {
        icon: <Construction className="w-5 h-5 text-blue-500" />,
        title: "Roadwork near Kamapalli",
        description: "Lane closures are in effect for the next 2 hours. Expect delays.",
        time: "2h ago"
    },
    {
        icon: <Bell className="w-5 h-5 text-gray-400" />,
        title: "System Update",
        description: "Road Guardian has been updated with the latest safety protocols.",
        time: "1d ago"
    }
]

export default function NotificationsPage() {
  return (
    <SidebarInset className="flex flex-col gap-4 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <SidebarTrigger className="md:hidden" />
      </header>
      <main className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Stay informed about traffic and safety alerts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border-b">
                    <div className="flex-shrink-0">{notification.icon}</div>
                    <div className="flex-1">
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}
