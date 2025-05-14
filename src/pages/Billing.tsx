
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, Download, CreditCard, DollarSign, FileText, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Billing = () => {
  const invoices = [
    {
      id: 'INV-001',
      patient: 'John Doe',
      date: '2025-05-10',
      amount: 245.00,
      status: 'Paid',
      items: [
        { description: 'Office Visit', amount: 150.00 },
        { description: 'Lab Tests', amount: 95.00 }
      ]
    },
    {
      id: 'INV-002',
      patient: 'Emily Wilson',
      date: '2025-05-09',
      amount: 175.00,
      status: 'Pending',
      items: [
        { description: 'Follow-up Visit', amount: 125.00 },
        { description: 'Prescription', amount: 50.00 }
      ]
    },
    {
      id: 'INV-003',
      patient: 'Robert Brown',
      date: '2025-05-08',
      amount: 350.00,
      status: 'Overdue',
      items: [
        { description: 'Specialist Consultation', amount: 250.00 },
        { description: 'Imaging', amount: 100.00 }
      ]
    },
    {
      id: 'INV-004',
      patient: 'Maria Garcia',
      date: '2025-05-07',
      amount: 125.00,
      status: 'Paid',
      items: [
        { description: 'Vaccination', amount: 75.00 },
        { description: 'Office Visit', amount: 50.00 }
      ]
    },
    {
      id: 'INV-005',
      patient: 'David Lee',
      date: '2025-05-06',
      amount: 215.00,
      status: 'Pending',
      items: [
        { description: 'Physical Therapy', amount: 185.00 },
        { description: 'Medical Supplies', amount: 30.00 }
      ]
    }
  ];

  return (
    <AppLayout title="Billing">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Billing & Invoices</h2>
            <p className="text-muted-foreground">
              Manage patient billing and financial transactions
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
              <CardDescription>Current Month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-primary/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$24,568</div>
                    <div className="text-xs text-muted-foreground">+12% from last month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Outstanding</CardTitle>
              <CardDescription>Unpaid Invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-yellow-50 rounded-full">
                    <Wallet className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$4,250</div>
                    <div className="text-xs text-muted-foreground">12 invoices pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Insurance Claims</CardTitle>
              <CardDescription>Processing Status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-blue-50 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">28</div>
                    <div className="text-xs text-muted-foreground">8 pending approval</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Invoices</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.patient}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              invoice.status === "Paid" && "border-green-500 text-green-700 bg-green-50",
                              invoice.status === "Pending" && "border-yellow-500 text-yellow-700 bg-yellow-50",
                              invoice.status === "Overdue" && "border-red-500 text-red-700 bg-red-50"
                            )}
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <CreditCard className="h-4 w-4 mr-1" />
                              Pay
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="text-xs text-muted-foreground">
                  Showing 5 of 24 invoices
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardContent className="py-6">
                <div className="text-center">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Pending Invoices</h3>
                  <p className="text-muted-foreground mt-2">
                    View and manage invoices awaiting payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="paid">
            <Card>
              <CardContent className="py-6">
                <div className="text-center">
                  <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Paid Invoices</h3>
                  <p className="text-muted-foreground mt-2">
                    View and manage invoices that have been paid
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="overdue">
            <Card>
              <CardContent className="py-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Overdue Invoices</h3>
                  <p className="text-muted-foreground mt-2">
                    View and manage overdue invoices
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Billing;
