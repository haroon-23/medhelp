
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const MedicalRecords = () => {
  const mockPatientRecords = [
    {
      id: 'REC-001',
      patientName: 'John Doe',
      patientId: 'PAT-1248',
      recordType: 'Lab Results',
      date: '2025-05-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'Reviewed'
    },
    {
      id: 'REC-002',
      patientName: 'Emily Wilson',
      patientId: 'PAT-1249',
      recordType: 'Prescription',
      date: '2025-05-09',
      doctor: 'Dr. Michael Chen',
      status: 'Pending'
    },
    {
      id: 'REC-003',
      patientName: 'Robert Brown',
      patientId: 'PAT-1252',
      recordType: 'Imaging',
      date: '2025-05-08',
      doctor: 'Dr. Sarah Johnson',
      status: 'Reviewed'
    },
    {
      id: 'REC-004',
      patientName: 'Maria Garcia',
      patientId: 'PAT-1255',
      recordType: 'Visit Notes',
      date: '2025-05-07',
      doctor: 'Dr. James Wilson',
      status: 'Reviewed'
    },
    {
      id: 'REC-005',
      patientName: 'David Lee',
      patientId: 'PAT-1260',
      recordType: 'Lab Results',
      date: '2025-05-06',
      doctor: 'Dr. Michael Chen',
      status: 'Pending'
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
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Record
          </Button>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
            </TabsList>
            
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

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="px-6 py-4">
                <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground">
                  <div>Record ID</div>
                  <div>Patient</div>
                  <div>Record Type</div>
                  <div>Date</div>
                  <div>Provider</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockPatientRecords.map((record) => (
                    <div key={record.id} className="grid grid-cols-7 items-center px-6 py-4 hover:bg-muted/50">
                      <div className="font-medium">{record.id}</div>
                      <div>
                        <div className="font-medium">{record.patientName}</div>
                        <div className="text-xs text-muted-foreground">{record.patientId}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{record.recordType}</span>
                      </div>
                      <div>{record.date}</div>
                      <div>{record.doctor}</div>
                      <div>
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          record.status === "Reviewed" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-yellow-50 text-yellow-700"
                        )}>
                          {record.status}
                        </span>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Pending Records</h3>
                <p className="text-muted-foreground mt-2">
                  View records that require your review
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviewed" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Reviewed Records</h3>
                <p className="text-muted-foreground mt-2">
                  View records that have been reviewed
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MedicalRecords;
