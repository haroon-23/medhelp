
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Filter, Plus, Calendar, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const MedicalRecords = () => {
  // Sample data for patients' medical records
  const records = [
    {
      id: 'MR-001',
      patient: 'John Doe',
      dateCreated: '2025-05-10',
      lastUpdated: '2025-05-14',
      recordType: 'Consultation',
      doctor: 'Dr. Sarah Johnson',
      status: 'Complete'
    },
    {
      id: 'MR-002',
      patient: 'Emily Wilson',
      dateCreated: '2025-05-08',
      lastUpdated: '2025-05-13',
      recordType: 'Lab Results',
      doctor: 'Dr. Sarah Johnson',
      status: 'Pending Review'
    },
    {
      id: 'MR-003',
      patient: 'Robert Brown',
      dateCreated: '2025-05-05',
      lastUpdated: '2025-05-12',
      recordType: 'Surgery',
      doctor: 'Dr. Michael Chen',
      status: 'Complete'
    },
    {
      id: 'MR-004',
      patient: 'Maria Garcia',
      dateCreated: '2025-05-03',
      lastUpdated: '2025-05-11',
      recordType: 'Prescription',
      doctor: 'Dr. Sarah Johnson',
      status: 'Active'
    },
    {
      id: 'MR-005',
      patient: 'David Lee',
      dateCreated: '2025-05-01',
      lastUpdated: '2025-05-10',
      recordType: 'Follow-up',
      doctor: 'Dr. Lisa Rodriguez',
      status: 'Scheduled'
    }
  ];

  return (
    <AppLayout title="Medical Records">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>
            <p className="text-muted-foreground">
              View and manage patient medical records
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              New Record
            </Button>
            <Button variant="outline" className="gap-1">
              <FileText className="h-4 w-4" />
              Generate SOAP Notes
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search records..."
                className="pl-8 w-[250px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.patient}</TableCell>
                    <TableCell>{record.recordType}</TableCell>
                    <TableCell>{record.dateCreated}</TableCell>
                    <TableCell>{record.lastUpdated}</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          record.status === "Complete" && "border-green-500 text-green-700 bg-green-50",
                          record.status === "Pending Review" && "border-yellow-500 text-yellow-700 bg-yellow-50",
                          record.status === "Active" && "border-blue-500 text-blue-700 bg-blue-50",
                          record.status === "Scheduled" && "border-purple-500 text-purple-700 bg-purple-50"
                        )}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MedicalRecords;
