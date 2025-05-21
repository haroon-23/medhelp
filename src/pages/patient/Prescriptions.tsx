
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Prescription, Clock, CalendarCheck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const PatientPrescriptions = () => {
  const activePrescriptions = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      instructions: 'Take one tablet by mouth once daily for high blood pressure.',
      prescribed: '2024-02-15',
      doctor: 'Dr. Sarah Johnson',
      refills: 2,
      lastFilled: '2024-04-01',
      daysSupply: 30,
      daysLeft: 16,
      pharmacy: 'MediCare Pharmacy',
      status: 'active'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      instructions: 'Take one tablet by mouth twice daily with meals for diabetes.',
      prescribed: '2023-09-10',
      doctor: 'Dr. Michael Lee',
      refills: 3,
      lastFilled: '2024-03-15',
      daysSupply: 30,
      daysLeft: 0,
      pharmacy: 'MediCare Pharmacy',
      status: 'refill-due'
    },
    {
      id: '3',
      name: 'Cetirizine',
      dosage: '10mg',
      frequency: 'As needed',
      instructions: 'Take one tablet by mouth once daily as needed for allergies.',
      prescribed: '2023-11-20',
      doctor: 'Dr. Emily Roberts',
      refills: 5,
      lastFilled: '2024-03-01',
      daysSupply: 30,
      daysLeft: 8,
      pharmacy: 'QuickRx',
      status: 'active'
    }
  ];
  
  const pastPrescriptions = [
    {
      id: '4',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      instructions: 'Take one capsule by mouth three times daily for 10 days to treat infection.',
      prescribed: '2023-08-22',
      doctor: 'Dr. Emily Roberts',
      refills: 0,
      lastFilled: '2023-08-22',
      pharmacy: 'MediCare Pharmacy',
      status: 'completed'
    },
    {
      id: '5',
      name: 'Prednisone',
      dosage: '20mg',
      frequency: 'Once daily, tapering',
      instructions: 'Take as directed with tapering dose over 10 days.',
      prescribed: '2023-05-15',
      doctor: 'Dr. Sarah Johnson',
      refills: 0,
      lastFilled: '2023-05-15',
      pharmacy: 'QuickRx',
      status: 'completed'
    }
  ];

  const handleRefillRequest = (id) => {
    // In a real app, this would send a refill request
    console.log(`Requesting refill for prescription ID: ${id}`);
  };

  return (
    <AppLayout title="My Prescriptions">
      <div className="space-y-6">
        <Tabs defaultValue="active">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          {/* Active Prescriptions Tab */}
          <TabsContent value="active" className="space-y-6">
            {activePrescriptions.map((prescription) => (
              <Card key={prescription.id} className={cn(
                prescription.status === 'refill-due' && 'border-amber-300'
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{prescription.name}</CardTitle>
                        <span className="text-lg text-muted-foreground">{prescription.dosage}</span>
                        {prescription.status === 'refill-due' && (
                          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Refill Due
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {prescription.frequency} • Prescribed by {prescription.doctor}
                      </CardDescription>
                    </div>
                    {prescription.status === 'refill-due' ? (
                      <Button 
                        onClick={() => handleRefillRequest(prescription.id)}
                        className="gap-1"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Request Refill
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => handleRefillRequest(prescription.id)}
                        className="gap-1"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Request Refill
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-md text-sm">
                      {prescription.instructions}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Prescribed</p>
                        <p className="font-medium flex items-center gap-1">
                          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                          {prescription.prescribed}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Last Filled</p>
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {prescription.lastFilled}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Refills Remaining</p>
                        <p className="font-medium">{prescription.refills}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Pharmacy</p>
                        <p className="font-medium">{prescription.pharmacy}</p>
                      </div>
                    </div>
                    
                    {prescription.daysLeft !== undefined && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">Supply Remaining</p>
                          <p className="text-sm font-medium">
                            {prescription.daysLeft} of {prescription.daysSupply} days
                          </p>
                        </div>
                        <Progress 
                          value={(prescription.daysLeft / prescription.daysSupply) * 100} 
                          className={cn(
                            prescription.daysLeft < 5 ? "bg-red-100" : "bg-muted",
                            "h-2"
                          )}
                          indicatorClassName={cn(
                            prescription.daysLeft < 5 ? "bg-red-500" : "bg-primary"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {activePrescriptions.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Prescription className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Prescriptions</h3>
                  <p className="text-sm text-muted-foreground">
                    You don't have any active prescriptions at this time.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Prescription History Tab */}
          <TabsContent value="history" className="space-y-6">
            {pastPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="opacity-80">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{prescription.name}</CardTitle>
                        <span className="text-lg text-muted-foreground">{prescription.dosage}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <CardDescription>
                        {prescription.frequency} • Prescribed by {prescription.doctor}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-md text-sm">
                      {prescription.instructions}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Prescribed</p>
                        <p className="font-medium flex items-center gap-1">
                          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                          {prescription.prescribed}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Last Filled</p>
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {prescription.lastFilled}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Pharmacy</p>
                        <p className="font-medium">{prescription.pharmacy}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PatientPrescriptions;
