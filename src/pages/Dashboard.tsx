import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import PatientSummary from '@/components/Dashboard/PatientSummary';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Users, FileText, DollarSign, Shield, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import SOAPNotesGenerator from '@/components/AI/SOAPNotesGenerator';
import CalendarIntegration from '@/components/Appointments/CalendarIntegration';
import { AreaChart, BarChart } from '@/components/Dashboard/Charts';

const areaChartData = [
  {
    date: '01/23',
    patients: 12,
  },
  {
    date: '02/23',
    patients: 15,
  },
  {
    date: '03/23',
    patients: 19,
  },
  {
    date: '04/23',
    patients: 18,
  },
  {
    date: '05/23',
    patients: 15,
  },
  {
    date: '06/23',
    patients: 21,
  },
  {
    date: '07/23',
    patients: 18,
  },
  {
    date: '08/23',
    patients: 23,
  },
  {
    date: '09/23',
    patients: 25,
  },
  {
    date: '10/23',
    patients: 27,
  },
  {
    date: '11/23',
    patients: 32,
  },
  {
    date: '12/23',
    patients: 30,
  },
];

const barChartData = [
  {
    name: 'Mon',
    total: 12,
  },
  {
    name: 'Tue',
    total: 18,
  },
  {
    name: 'Wed',
    total: 16,
  },
  {
    name: 'Thu',
    total: 14,
  },
  {
    name: 'Fri',
    total: 19,
  },
  {
    name: 'Sat',
    total: 8,
  },
  {
    name: 'Sun',
    total: 4,
  },
];

interface Appointment {
  id: string;
  patient: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const todaysAppts: Appointment[] = [
  {
    id: '1',
    patient: 'John Doe',
    date: new Date(),
    time: '09:00 AM',
    type: 'Check-up',
    status: 'scheduled',
  },
  {
    id: '2',
    patient: 'Jane Smith',
    date: new Date(),
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'scheduled',
  },
  {
    id: '3',
    patient: 'Robert Johnson',
    date: new Date(),
    time: '01:15 PM',
    type: 'Consultation',
    status: 'scheduled',
  },
];

const Dashboard = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [userRole, setUserRole] = useState<string>('admin');
  
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const renderAIFeatures = () => {
    if (userRole === 'admin' || userRole === 'doctor') {
      return (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SOAPNotesGenerator />
            <CalendarIntegration />
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">AI Features</CardTitle>
                <CardDescription>
                  Powered by MediSecure AI Assistant
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-2">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-md">SOAP Notes</CardTitle>
                    <CardDescription className="text-xs">
                      AI-generated clinical notes
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      Generate Notes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-2">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-md">Patient Q&A</CardTitle>
                    <CardDescription className="text-xs">
                      Answer staff questions
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View Questions
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-2">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-md">Voice Bot</CardTitle>
                    <CardDescription className="text-xs">
                      Call analytics & transcription
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </>
      );
    }
    return null;
  };

  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Total Patients" 
            value="2,840" 
            description="154 new this month"
            trend={{ value: 12, isPositive: true }}
            icon={<Users />}
          />
          <StatsCard 
            title="Appointments" 
            value="120" 
            description="32 scheduled today"
            trend={{ value: 8, isPositive: true }}
            icon={<CalendarIcon />}
          />
          <StatsCard 
            title="Average Wait Time" 
            value="8.4 min" 
            description="2.1 min lower than last month"
            trend={{ value: 18, isPositive: false }}
            icon={<Clock />}
          />
          <StatsCard 
            title="Revenue" 
            value="$24,315" 
            description="$4,142 more than last month"
            trend={{ value: 20, isPositive: true }}
            icon={<DollarSign />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart 
                  data={areaChartData} 
                  categories={['patients']} 
                  colors={['blue']} 
                />
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Visits This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={barChartData} 
                  categories={['total']} 
                  colors={['blue']} 
                />
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysAppts.map((appt) => (
                  <div key={appt.id} className="flex items-center p-3 border rounded-lg">
                    <div className="mr-4 p-3 rounded-full bg-muted">
                      <Users className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{appt.patient}</p>
                      <div className="flex text-xs text-muted-foreground">
                        <span>{appt.time}</span>
                        <span className="mx-2">•</span>
                        <span>{appt.type}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        appt.status === 'scheduled' && 'border-blue-500 text-blue-700 bg-blue-50',
                        appt.status === 'completed' && 'border-green-500 text-green-700 bg-green-50',
                        appt.status === 'cancelled' && 'border-red-500 text-red-700 bg-red-50'
                      )}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="ghost" className="w-full">View All Appointments</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                className="w-full"
              />
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="ghost" className="w-full">View Schedule</Button>
            </CardFooter>
          </Card>
        </div>
        
        <PatientSummary />
        
        {renderAIFeatures()}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
