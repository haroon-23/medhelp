
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Pill, UserPlus } from 'lucide-react';

const PatientDetailFooter = () => {
  const navigate = useNavigate();
  
  return (
    <CardFooter className="border-t p-4 flex justify-between">
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          Export Data
        </Button>
        <Button variant="outline" size="sm">
          <Pill className="h-4 w-4 mr-1" />
          Prescriptions
        </Button>
      </div>
      <div>
        <Button 
          size="sm"
          onClick={() => navigate('/patient-onboarding')}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add Patient
        </Button>
      </div>
    </CardFooter>
  );
};

export default PatientDetailFooter;
