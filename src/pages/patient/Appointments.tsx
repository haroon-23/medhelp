
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const PatientAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      time: '10:30 AM',
      type: 'Follow-up',
      location: 'Main Hospital, Room 305'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Lee',
      specialty: 'General Practitioner',
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: '09:15 AM',
      type: 'Check-up',
      location: 'Downtown Clinic, Room 12'
    }
  ];
  
  const pastAppointments = [
    {
      id: '3',
      doctor: 'Dr. Emily Roberts',
      specialty: 'Dermatologist',
      date: new Date(Date.now() - 86400000 * 14), // 14 days ago
      time: '02:00 PM',
      type: 'Consultation',
      location: 'Main Hospital, Room 210'
    },
    {
      id: '4',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: new Date(Date.now() - 86400000 * 30), // 30 days ago
      time: '11:45 AM',
      type: 'Initial Consultation',
      location: 'Main Hospital, Room 305'
    }
  ];

  const availableSlots = [
    { time: '9:00 AM', available: true },
    { time: '9:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '1:30 PM', available: false },
    { time: '2:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '3:30 PM', available: false }
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      image: 'https://unavatar.io/sarah.johnson'
    },
    {
      id: '2',
      name: 'Dr. Michael Lee',
      specialty: 'General Practitioner',
      image: 'https://unavatar.io/michael.lee'
    },
    {
      id: '3',
      name: 'Dr. Emily Roberts',
      specialty: 'Dermatologist',
      image: 'https://unavatar.io/emily.roberts'
    }
  ];

  return (
    <AppLayout title="My Appointments">
      <div className="space-y-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="schedule">Schedule New</TabsTrigger>
          </TabsList>
          
          {/* Upcoming Appointments Tab */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row border-b last:border-b-0">
                    <div className="p-4 md:w-[200px] bg-muted/40 border-b md:border-b-0 md:border-r flex items-center justify-center">
                      <div className="flex flex-col items-center text-center">
                        <CalendarIcon className="h-5 w-5 mb-2 text-primary" />
                        <div className="text-sm font-medium">
                          {appointment.date.toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-slate-500" />
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-base">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        
                        <Badge className="ml-auto">{appointment.type}</Badge>
                      </div>
                      
                      <div className="text-sm mt-3 border-t pt-3">
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium text-foreground">Location:</span> {appointment.location}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                            Cancel
                          </Button>
                          <Button size="sm" className="ml-auto">Check In</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {upcomingAppointments.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Upcoming Appointments</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    You don't have any scheduled appointments.
                  </p>
                  <Button onClick={() => document.querySelector('[data-value="schedule"]')?.click()}>
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Past Appointments Tab */}
          <TabsContent value="past" className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="opacity-80">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row border-b last:border-b-0">
                    <div className="p-4 md:w-[200px] bg-muted/30 border-b md:border-b-0 md:border-r flex items-center justify-center">
                      <div className="flex flex-col items-center text-center">
                        <CalendarIcon className="h-5 w-5 mb-2 text-slate-500" />
                        <div className="text-sm font-medium">
                          {appointment.date.toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-slate-500" />
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-base">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        
                        <Badge variant="outline" className="ml-auto">{appointment.type}</Badge>
                      </div>
                      
                      <div className="text-sm mt-3 border-t pt-3">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Location:</span> {appointment.location}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button size="sm" variant="outline">View Summary</Button>
                          <Button size="sm" variant="default" className="ml-auto">Schedule Follow-up</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Schedule New Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose a Doctor</CardTitle>
                    <CardDescription>Select a healthcare provider for your appointment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {doctors.map((doctor) => (
                      <div 
                        key={doctor.id} 
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 hover:border-accent cursor-pointer"
                      >
                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-slate-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Available Time Slots</CardTitle>
                    <CardDescription>Select a time for your appointment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot, i) => (
                        <Button 
                          key={i} 
                          variant={slot.available ? "outline" : "ghost"} 
                          className={cn(
                            "text-center justify-center py-2 h-auto",
                            !slot.available && "line-through opacity-50 cursor-not-allowed"
                          )}
                          disabled={!slot.available}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="w-full"
                      disabled={{ before: new Date() }}
                    />
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Appointment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Doctor</p>
                      <p className="font-medium">Select a doctor</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">
                        {date ? date.toLocaleDateString() : "Select a date"} - Select a time
                      </p>
                    </div>
                    <Button className="w-full" disabled={!date}>
                      Confirm Appointment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PatientAppointments;
