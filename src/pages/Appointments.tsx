
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import CalendarIntegration from '@/components/Appointments/CalendarIntegration';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Plus, Filter, FileText } from 'lucide-react';

interface AppointmentType {
  id: string;
  title: string;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: string;
}

const appointmentsData: AppointmentType[] = [
  {
    id: 'apt1',
    title: 'Annual Physical',
    patient: 'John Doe',
    doctor: 'Dr. Sarah Johnson',
    date: '2025-05-16',
    time: '10:00 AM',
    status: 'scheduled',
    type: 'Check-up'
  },
  {
    id: 'apt2',
    title: 'Follow-up Consultation',
    patient: 'Emily Wilson',
    doctor: 'Dr. Michael Chen',
    date: '2025-05-16',
    time: '11:30 AM',
    status: 'scheduled',
    type: 'Follow-up'
  },
  {
    id: 'apt3',
    title: 'Vaccination',
    patient: 'Robert Garcia',
    doctor: 'Dr. James Wilson',
    date: '2025-05-16',
    time: '01:45 PM',
    status: 'scheduled',
    type: 'Procedure'
  },
  {
    id: 'apt4',
    title: 'Dermatology Consultation',
    patient: 'Maria Rodriguez',
    doctor: 'Dr. Sarah Johnson',
    date: '2025-05-15',
    time: '09:15 AM',
    status: 'completed',
    type: 'Specialist'
  },
  {
    id: 'apt5',
    title: 'Blood Work',
    patient: 'Lisa Johnson',
    doctor: 'Dr. Michael Chen',
    date: '2025-05-15',
    time: '10:30 AM',
    status: 'completed',
    type: 'Lab'
  },
  {
    id: 'apt6',
    title: 'Cardiology Follow-up',
    patient: 'John Doe',
    doctor: 'Dr. James Wilson',
    date: '2025-05-14',
    time: '02:00 PM',
    status: 'no-show',
    type: 'Specialist'
  },
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showCalIntegration, setShowCalIntegration] = useState(false);

  const getStatusBadge = (status: AppointmentType['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case 'no-show':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">No Show</Badge>;
    }
  };

  // Filter appointments based on active tab
  const getFilteredAppointments = () => {
    switch (activeTab) {
      case 'upcoming':
        return appointmentsData.filter(apt => apt.status === 'scheduled');
      case 'past':
        return appointmentsData.filter(apt => apt.status === 'completed');
      case 'cancelled':
        return appointmentsData.filter(apt => ['cancelled', 'no-show'].includes(apt.status));
      case 'all':
      default:
        return appointmentsData;
    }
  };

  return (
    <AppLayout title="Appointments">
      <div className="space-y-6">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => {
              setShowAppointmentForm(true);
              setShowCalIntegration(false);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
            <Button variant="outline" onClick={() => {
              setShowCalIntegration(true);
              setShowAppointmentForm(false);
            }}>
              <Calendar className="h-4 w-4 mr-2" />
              Calendar Integration
            </Button>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Forms */}
        {showAppointmentForm && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule Appointment</CardTitle>
              <CardDescription>Enter appointment details below</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentForm />
            </CardContent>
            <CardFooter className="border-t pt-5">
              <Button variant="outline" className="ml-auto" onClick={() => setShowAppointmentForm(false)}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        )}

        {showCalIntegration && <CalendarIntegration />}

        {/* Appointments list */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              Manage all patient appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Appointment
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Patient
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Provider
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Date & Time
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
                        {getFilteredAppointments().length > 0 ? (
                          getFilteredAppointments().map((appointment) => (
                            <tr key={appointment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle">
                                <div>
                                  <div className="font-medium truncate max-w-[150px]">{appointment.title}</div>
                                  <div className="text-xs text-muted-foreground">{appointment.type}</div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="truncate max-w-[120px]">{appointment.patient}</span>
                                </div>
                              </td>
                              <td className="p-4 align-middle truncate max-w-[150px]">{appointment.doctor}</td>
                              <td className="p-4 align-middle">
                                <div className="flex flex-col">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {appointment.date}
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {appointment.time}
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                {getStatusBadge(appointment.status)}
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                  <Button variant="ghost" size="sm">Cancel</Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <Calendar className="h-8 w-8 mb-2" />
                                <p>No appointments found</p>
                                <Button 
                                  variant="link" 
                                  onClick={() => {
                                    setShowAppointmentForm(true);
                                    setShowCalIntegration(false);
                                  }}
                                >
                                  Schedule a new appointment
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-5">
            <Button variant="outline" className="ml-auto">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Appointments;
