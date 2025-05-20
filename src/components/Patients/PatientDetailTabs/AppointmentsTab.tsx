
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { PatientData } from '../PatientCard';

interface AppointmentsTabProps {
  patient: PatientData;
}

const AppointmentsTab = ({ patient }: AppointmentsTabProps) => {
  return (
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
  );
};

export default AppointmentsTab;
