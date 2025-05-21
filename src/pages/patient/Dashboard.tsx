
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  FileText, 
  Prescription, 
  MessageSquare, 
  Bell, 
  User,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const navigate = useNavigate();
  
  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      time: '10:30 AM',
      type: 'Follow-up'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Lee',
      specialty: 'General Practitioner',
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: '09:15 AM',
      type: 'Check-up'
    }
  ];
  
  const prescriptions = [
    {
      id: '1',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Twice daily',
      remaining: '7 days'
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      remaining: '23 days'
    }
  ];

  const recentMessages = [
    {
      id: '1',
      from: 'Dr. Sarah Johnson',
      subject: 'Follow-up on your recent visit',
      time: '2 days ago'
    },
    {
      id: '2',
      from: 'Lab Results',
      subject: 'Your recent blood work results are available',
      time: '4 days ago'
    }
  ];

  const vitals = {
    bloodPressure: '120/80',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    oxygenSaturation: '98%',
    weight: '165 lbs',
    lastUpdated: '2 weeks ago'
  };

  return (
    <AppLayout title="Patient Dashboard">
      <div className="grid gap-6">
        {/* Welcome Section */}
        <Card className="border-none bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome, Jane Smith</CardTitle>
            <CardDescription>
              Here's a summary of your health information and upcoming appointments
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled medical visits</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigate('/patient/appointments')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="mr-4 p-3 rounded-full bg-blue-100">
                        <CalendarIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex text-xs text-muted-foreground mt-1">
                          <span>
                            {appointment.date.toLocaleDateString(undefined, {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{appointment.time}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">Reschedule</Button>
                        <Button size="sm" className="text-xs">Check In</Button>
                      </div>
                    </div>
                  ))}
                  
                  {upcomingAppointments.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">You have no upcoming appointments</p>
                      <Button className="mt-2" onClick={() => navigate('/patient/appointments/schedule')}>
                        Schedule Now
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/patient/appointments/schedule')}>
                  Schedule New Appointment
                </Button>
              </CardFooter>
            </Card>

            {/* Prescriptions & Medications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Current Medications</CardTitle>
                  <CardDescription>Your active prescriptions</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigate('/patient/prescriptions')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="mr-4 p-3 rounded-full bg-green-100">
                        <Prescription className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{prescription.name}</p>
                        <div className="flex text-xs text-muted-foreground mt-1">
                          <span>{prescription.dosage}</span>
                          <span className="mx-2">•</span>
                          <span>{prescription.frequency}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
                        {prescription.remaining}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/patient/prescriptions/refill')}>
                  Request Refill
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - 1/3 width */}
          <div className="space-y-6">
            {/* Vital Signs Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vital Signs</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Last updated: {vitals.lastUpdated}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Blood Pressure</span>
                    </div>
                    <span className="font-medium">{vitals.bloodPressure}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Heart Rate</span>
                    </div>
                    <span className="font-medium">{vitals.heartRate}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <span className="font-medium">{vitals.temperature}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Oxygen Saturation</span>
                    </div>
                    <span className="font-medium">{vitals.oxygenSaturation}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Weight</span>
                    </div>
                    <span className="font-medium">{vitals.weight}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/patient/records')}>
                  View Medical History
                </Button>
              </CardFooter>
            </Card>
            
            {/* Calendar Card */}
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
            </Card>
            
            {/* Messages Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest communications</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => navigate('/patient/messages')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="mr-3 p-2 rounded-full bg-blue-100">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{message.from}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{message.subject}</p>
                        <p className="text-xs text-muted-foreground">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/patient/messages/new')}>
                  New Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatientDashboard;
