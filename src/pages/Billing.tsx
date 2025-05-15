
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Search, Filter, Calendar, ArrowDownUp, Plus, FileText, CheckSquare, File, X } from 'lucide-react';
import { toast } from 'sonner';

interface BillingRecord {
  id: string;
  patientName: string;
  patientId: string;
  serviceDate: string;
  description: string;
  amount: number;
  insuranceProvider: string;
  status: 'paid' | 'pending' | 'denied';
  claimNumber?: string;
}

const billingSampleData: BillingRecord[] = [
  {
    id: 'bill1',
    patientName: 'John Doe',
    patientId: 'P12345',
    serviceDate: '2025-04-10',
    description: 'Annual Physical',
    amount: 250.00,
    insuranceProvider: 'Blue Cross',
    status: 'paid',
    claimNumber: 'BC-2025-04578'
  },
  {
    id: 'bill2',
    patientName: 'Emily Wilson',
    patientId: 'P67890',
    serviceDate: '2025-04-15',
    description: 'Lab Work - Comprehensive Panel',
    amount: 175.50,
    insuranceProvider: 'Aetna',
    status: 'pending',
    claimNumber: 'AE-2025-12354'
  },
  {
    id: 'bill3',
    patientName: 'Maria Rodriguez',
    patientId: 'P34567',
    serviceDate: '2025-04-12',
    description: 'Cardiology Consultation',
    amount: 350.00,
    insuranceProvider: 'Medicare',
    status: 'paid',
    claimNumber: 'MC-2025-78542'
  },
  {
    id: 'bill4',
    patientName: 'Robert Garcia',
    patientId: 'P23456',
    serviceDate: '2025-04-18',
    description: 'MRI - Shoulder',
    amount: 1250.75,
    insuranceProvider: 'United Healthcare',
    status: 'denied',
    claimNumber: 'UH-2025-96325'
  },
  {
    id: 'bill5',
    patientName: 'Lisa Johnson',
    patientId: 'P78901',
    serviceDate: '2025-04-20',
    description: 'Urgent Care Visit',
    amount: 125.00,
    insuranceProvider: 'Cigna',
    status: 'paid',
    claimNumber: 'CG-2025-36541'
  },
  {
    id: 'bill6',
    patientName: 'John Doe',
    patientId: 'P12345',
    serviceDate: '2025-04-25',
    description: 'Follow-up Visit',
    amount: 150.00,
    insuranceProvider: 'Blue Cross',
    status: 'pending',
    claimNumber: 'BC-2025-04895'
  },
];

const Billing = () => {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(billingSampleData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setBillingRecords(billingSampleData);
      return;
    }
    
    const filteredRecords = billingSampleData.filter(record => 
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.claimNumber && record.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setBillingRecords(filteredRecords);
    toast.info(`Found ${filteredRecords.length} matching billing records`);
  };

  const getStatusBadge = (status: 'paid' | 'pending' | 'denied') => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckSquare className="mr-1 h-3 w-3" /> Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><File className="mr-1 h-3 w-3" /> Pending</Badge>;
      case 'denied':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><X className="mr-1 h-3 w-3" /> Denied</Badge>;
    }
  };

  const totalPaid = billingRecords
    .filter(record => record.status === 'paid')
    .reduce((sum, record) => sum + record.amount, 0);
  
  const totalPending = billingRecords
    .filter(record => record.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);

  return (
    <AppLayout title="Billing">
      <div className="space-y-6">
        {/* Billing Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-green-100 rounded">
                  <DollarSign className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold">${totalPaid.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-yellow-100 rounded">
                  <File className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Insurance Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-blue-100 rounded">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold">{billingRecords.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Billing Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Billing Records</CardTitle>
                <CardDescription className="mt-1">
                  Manage patient billing and insurance claims
                </CardDescription>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search patient or claim #" 
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
                    New Claim
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="all">All Claims</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="denied">Denied</TabsTrigger>
                </TabsList>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="amount-high">Amount (High-Low)</SelectItem>
                    <SelectItem value="amount-low">Amount (Low-High)</SelectItem>
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
                            <div className="flex items-center">
                              Patient
                              <ArrowDownUp className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Patient ID
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            <div className="flex items-center">
                              Service Date
                              <ArrowDownUp className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Description
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                            <div className="flex items-center justify-end">
                              Amount
                              <ArrowDownUp className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Insurance
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {billingRecords.map((record) => (
                          <tr key={record.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle font-medium">{record.patientName}</td>
                            <td className="p-4 align-middle">{record.patientId}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                {record.serviceDate}
                              </div>
                            </td>
                            <td className="p-4 align-middle">{record.description}</td>
                            <td className="p-4 align-middle text-right font-medium">
                              ${record.amount.toFixed(2)}
                            </td>
                            <td className="p-4 align-middle">{record.insuranceProvider}</td>
                            <td className="p-4 align-middle">
                              {getStatusBadge(record.status)}
                            </td>
                            <td className="p-4 align-middle text-right">
                              <Button variant="ghost" size="sm">Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paid" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Paid Claims</p>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Pending Claims</p>
                </div>
              </TabsContent>

              <TabsContent value="denied" className="mt-4">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Filter applied: Denied Claims</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{billingRecords.length}</span> billing records
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

export default Billing;
