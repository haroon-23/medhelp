
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Calendar, Phone, Mail, FileText, FileSearch } from 'lucide-react';
import { PatientData } from '../PatientCard';

interface DetailsTabProps {
  patient: PatientData;
}

const DetailsTab = ({ patient }: DetailsTabProps) => {
  return (
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
  );
};

export default DetailsTab;
