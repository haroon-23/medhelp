
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientData } from './PatientCard';
import PatientDetailHeader from './PatientDetailHeader';
import DetailsTab from './PatientDetailTabs/DetailsTab';
import RecordsTab from './PatientDetailTabs/RecordsTab';
import AppointmentsTab from './PatientDetailTabs/AppointmentsTab';
import InsuranceTab from './PatientDetailTabs/InsuranceTab';
import PatientDetailFooter from './PatientDetailFooter';

interface PatientDetailProps {
  patient: PatientData;
  onClose: () => void;
}

const PatientDetail = ({ patient, onClose }: PatientDetailProps) => {
  return (
    <Card className="w-full">
      <PatientDetailHeader patient={patient} onClose={onClose} />
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Patient Details</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <DetailsTab patient={patient} />
        </TabsContent>
        
        <TabsContent value="records">
          <RecordsTab patient={patient} />
        </TabsContent>
        
        <TabsContent value="appointments">
          <AppointmentsTab patient={patient} />
        </TabsContent>
        
        <TabsContent value="insurance">
          <InsuranceTab patient={patient} />
        </TabsContent>
      </Tabs>
      
      <PatientDetailFooter />
    </Card>
  );
};

export default PatientDetail;
