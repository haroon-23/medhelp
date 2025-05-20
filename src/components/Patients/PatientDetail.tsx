
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Calendar, FileText, Pills, User, UserPlus, Phone, Mail, FileSearch } from 'lucide-react';
import { PatientData } from './PatientCard';

interface PatientDetailProps {
  patient: PatientData;
  onClose: () => void;
}

const PatientDetail = ({ patient, onClose }: PatientDetailProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Inactive":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Urgent":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-b pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{patient.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{patient.id}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Patient Details</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Date of Birth</h4>
                    <p>{patient.dateOfBirth}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Phone</h4>
                    <p>{patient.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Email</h4>
                    <p>{patient.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Last Visit</h4>
                    <p>{patient.lastVisit}</p>
                  </div>
                </div>
                
                {patient.nextAppointment && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Next Appointment</h4>
                      <p>{patient.nextAppointment}</p>
                    </div>
                  </div>
                )}
                
                {patient.insuranceProvider && (
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Insurance</h4>
                      <p>{patient.insuranceProvider}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Alert className="mt-6">
              <FileSearch className="h-4 w-4" />
              <AlertTitle>Medical History Summary</AlertTitle>
              <AlertDescription>
                Patient has regular check-ups and is maintaining all recommended preventive care.
                No significant health concerns noted in recent visits.
              </AlertDescription>
            </Alert>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="records">
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th>
                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Provider</th>
                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">Annual Checkup</td>
                    <td className="px-4 py-2">{patient.lastVisit}</td>
                    <td className="px-4 py-2">Dr. Sarah Johnson</td>
                    <td className="px-4 py-2">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Blood Work</td>
                    <td className="px-4 py-2">10/01/2024</td>
                    <td className="px-4 py-2">Dr. James Wilson</td>
                    <td className="px-4 py-2">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Prescription</td>
                    <td className="px-4 py-2">09/15/2024</td>
                    <td className="px-4 py-2">Dr. Michael Chen</td>
                    <td className="px-4 py-2">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="appointments">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {patient.nextAppointment ? (
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Next Appointment</h4>
                      <p className="text-muted-foreground">{patient.nextAppointment}</p>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h4 className="text-lg font-medium">No upcoming appointments</h4>
                  <p className="text-muted-foreground mb-4">Schedule an appointment for this patient</p>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="insurance">
          <CardContent className="pt-6">
            {patient.insuranceProvider ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium">{patient.insuranceProvider}</h4>
                  <p className="text-muted-foreground">Policy #: IL-{patient.id}-2024</p>
                  <div className="mt-2 flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Verify Coverage</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <h4 className="text-lg font-medium">No insurance information</h4>
                <p className="text-muted-foreground mb-4">Add insurance details for this patient</p>
                <Button>Add Insurance</Button>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Pills className="h-4 w-4 mr-1" />
            Prescriptions
          </Button>
        </div>
        <div>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-1" />
            Add Record
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientDetail;
