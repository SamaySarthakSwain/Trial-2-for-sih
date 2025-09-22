
'use client';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const accidentData = [
    {
      id: 'ACC-001',
      date: '2024-07-20',
      time: '14:30',
      location: 'Gajapati Nagar',
      severity: 'Minor',
      details: 'Minor collision with another vehicle. No injuries reported.',
    },
    {
      id: 'ACC-002',
      date: '2024-07-18',
      time: '09:15',
      location: 'Aska Road',
      severity: 'Moderate',
      details: 'Rear-ended at a red light. Minor whiplash reported.',
    },
    {
      id: 'ACC-003',
      date: '2024-07-15',
      time: '17:45',
      location: 'Khodasingi',
      severity: 'Low',
      details: 'Scratched vehicle while parking. No other parties involved.',
    },
     {
      id: 'ACC-004',
      date: '2024-07-12',
      time: '20:00',
      location: 'Hillpatna',
      severity: 'High',
      details: 'Head-on collision. Airbags deployed. Authorities contacted.',
    },
  ];

export default function AccidentLogsPage() {
  return (
    <SidebarInset className="flex flex-col gap-4 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Accident Logs</h1>
        <SidebarTrigger className="md:hidden" />
      </header>
      <main className="flex-1">
        <Card>
            <CardHeader>
                <CardTitle>Recorded Incidents</CardTitle>
                <CardDescription>A log of all past traffic incidents and accidents.</CardDescription>
            </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accidentData.map((accident) => (
                  <TableRow key={accident.id}>
                    <TableCell className="font-medium">{accident.id}</TableCell>
                    <TableCell>{accident.date} {accident.time}</TableCell>
                    <TableCell>{accident.location}</TableCell>
                    <TableCell>
                        <Badge variant={
                            accident.severity === 'High' ? 'destructive' 
                            : accident.severity === 'Moderate' ? 'secondary'
                            : 'default'
                        }>
                            {accident.severity}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">{accident.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}
