
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { PatientData } from '../PatientCard';

interface InsuranceTabProps {
  patient: PatientData;
}

const InsuranceTab = ({ patient }: InsuranceTabProps) => {
  return (
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
  );
};

export default InsuranceTab;
