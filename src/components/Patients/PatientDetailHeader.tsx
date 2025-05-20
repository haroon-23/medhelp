
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { PatientData } from './PatientCard';
import { getStatusColor } from './utils/statusUtils';

interface PatientDetailHeaderProps {
  patient: PatientData;
  onClose: () => void;
}

const PatientDetailHeader = ({ patient, onClose }: PatientDetailHeaderProps) => {
  return (
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
  );
};

export default PatientDetailHeader;
