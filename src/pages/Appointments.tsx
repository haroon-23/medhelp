
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock appointment data
const appointments = [
  {
    id: "APT-1001",
    patientName: "Robert Chen",
    patientId: "PT-1001",
    date: new Date(2024, 10, 15, 10, 30),
    type: "Follow-up",
    status: "Scheduled",
    doctor: "Dr. Sarah Johnson"
  },
  {
    id: "APT-1002",
    patientName: "Lisa Johnson",
    patientId: "PT-1002",
    date: new Date(2024, 10, 16, 11, 0),
    type: "New Patient",
    status: "Confirmed",
    doctor: "Dr. James Peterson"
  },
  {
    id: "APT-1003",
    patientName: "Marcus Williams",
    patientId: "PT-1003",
    date: new Date(2024, 10, 15, 14, 15),
    type: "Annual Physical",
    status: "Scheduled",
    doctor: "Dr. Sarah Johnson"
  },
  {
    id: "APT-1004",
    patientName: "Emma Garcia",
    patientId: "PT-1004",
    date: new Date(2024, 10, 17, 9, 0),
    type: "Lab Work",
    status: "Pending",
    doctor: "Dr. Michael Thompson"
  }
];

const Appointments = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'Confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'Cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Filter appointments by selected date
  const filteredAppointments = appointments.filter(appointment => {
    if (!date) return true;
    
    return (
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear()
    );
  });
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <AppLayout title="Appointments">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Calendar</h2>
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                  </DialogHeader>
                  <AppointmentForm />
                </DialogContent>
              </Dialog>
            </div>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Upcoming Schedule</h3>
              <div className="space-y-2">
                {filteredAppointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground px-2 py-4 text-center">
                    No appointments scheduled for this date
                  </p>
                ) : (
                  filteredAppointments.map(appointment => (
                    <div 
                      key={appointment.id} 
                      className="p-2 border rounded-md text-sm hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{formatTime(appointment.date)}</span>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div>{appointment.patientName}</div>
                      <div className="text-xs text-muted-foreground">{appointment.type}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'All Appointments'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredAppointments.length} appointments scheduled
                </p>
              </div>
              
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg",
                      appointment.status === "Confirmed" && "border-l-4 border-l-green-500",
                      appointment.status === "Pending" && "border-l-4 border-l-yellow-500",
                      appointment.status === "Scheduled" && "border-l-4 border-l-blue-500",
                      appointment.status === "Cancelled" && "border-l-4 border-l-red-500"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-0">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{appointment.patientName}</h3>
                          <span className="text-xs text-muted-foreground">{appointment.patientId}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground mr-1">Time:</span>
                            {formatTime(appointment.date)}
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground mr-1">Type:</span>
                            {appointment.type}
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground mr-1">Doctor:</span>
                            {appointment.doctor}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {getStatusBadge(appointment.status)}
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full p-3 bg-muted">
                    <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No appointments found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No appointments scheduled for this date.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule New Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Schedule New Appointment</DialogTitle>
                      </DialogHeader>
                      <AppointmentForm />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Appointments;
