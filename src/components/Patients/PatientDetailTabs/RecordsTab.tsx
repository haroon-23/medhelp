
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PatientData } from '../PatientCard';

interface RecordsTabProps {
  patient: PatientData;
}

const RecordsTab = ({ patient }: RecordsTabProps) => {
  return (
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
  );
};

export default RecordsTab;
