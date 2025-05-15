import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Calendar, Stethoscope, Pill, Plus, Filter, Check, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  date: string;
  provider: string;
  status: 'complete' | 'pending' | 'draft';
}

const demoRecords: MedicalRecord[] = [
  {
    id: 'rec1',
    patientName: 'John Doe',
    patientId: 'P12345',
    recordType: 'Clinical Notes',
    date: '2025-04-28',
    provider: 'Dr. Sarah Johnson',
    status: 'complete',
  },
  {
    id: 'rec2',
    patientName: 'Emily Wilson',
    patientId: 'P67890',
    recordType: 'Lab Results',
    date: '2025-04-27',
    provider: 'Dr. Michael Chen',
    status: 'complete',
  },
  {
    id: 'rec3',
    patientName: 'Robert Garcia',
    patientId: 'P23456',
    recordType: 'Radiology',
    date: '2025-04-28',
    provider: 'Dr. Sarah Johnson',
    status: 'pending',
  },
  {
    id: 'rec4',
    patientName: 'Lisa Johnson',
    patientId: 'P78901',
    recordType: 'Prescription',
    date: '2025-04-26',
    provider: 'Dr. James Wilson',
    status: 'complete',
  },
  {
    id: 'rec5',
    patientName: 'John Doe',
    patientId: 'P12345',
    recordType: 'Discharge Summary',
    date: '2025-04-20',
    provider: 'Dr. Sarah Johnson',
    status: 'complete',
  },
  {
    id: 'rec6',
    patientName: 'Maria Rodriguez',
    patientId: 'P34567',
    recordType: 'Clinical Notes',
    date: '2025-04-28',
    provider: 'Dr. James Wilson',
    status: 'draft',
  },
];

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(demoRecords);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setRecords(demoRecords);
      return;
    }
    
    const filteredRecords = demoRecords.filter(record => 
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setRecords(filteredRecords);
    toast.info(`Found ${filteredRecords.length} matching records`);
  };

  const getStatusBadge = (status: 'complete' | 'pending' | 'draft') => {
    switch (status) {
      case 'complete':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Check className="mr-1 h-3 w-3" /> Complete</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>;
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'Clinical Notes':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'Lab Results':
        return <Stethoscope className="h-4 w-4 text-purple-600" />;
      case 'Radiology':
        return <FileText className="h-4 w-4 text-indigo-600" />;
      case 'Prescription':
        return <Pill className="h-4 w-4 text-green-600" />;
      case 'Discharge Summary':
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <AppLayout title="Medical Records">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription className="mt-1">
                  View and manage patient medical records securely
                </CardDescription>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search patient name or ID" 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="secondary">Search</Button>
                </form>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Record
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="all">All Records</TabsTrigger>
                  <TabsTrigger value="clinical">Clinical Notes</TabsTrigger>
                  <TabsTrigger value="labs">Lab Results</TabsTrigger>
                  <TabsTrigger value="imaging">Imaging</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                </TabsList>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="patient-az">Patient (A-Z)</SelectItem>
                    <SelectItem value="patient-za">Patient (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Record Type
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Patient
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Patient ID
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Date
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Provider
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {records.map((record) => (
                          <tr key={record.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">
                              <div className="flex items-center">
                                {getRecordTypeIcon(record.recordType)}
                                <span className="ml-2">{record.recordType}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle font-medium">{record.patientName}</td>
                            <td className="p-4 align-middle">{record.patientId}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                {record.date}
                              </div>
                            </td>
                            <td className="p-4 align-middle">{record.provider}</td>
                            <td className="p-4 align-middle">
                              {getStatusBadge(record.status)}
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm">Edit</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* Other tab contents would follow the same pattern */}
              <TabsContent value="clinical" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Clinical Notes</p>
                </div>
              </TabsContent>
              <TabsContent value="labs" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Lab Results</p>
                </div>
              </TabsContent>
              <TabsContent value="imaging" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Imaging</p>
                </div>
              </TabsContent>
              <TabsContent value="prescriptions" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Prescriptions</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{records.length}</span> records
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MedicalRecords;
