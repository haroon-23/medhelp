
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileCheck } from 'lucide-react';

// Mock data for demo purposes
const recentPatients = [
  { 
    id: 'PT-1001', 
    name: 'Robert Chen', 
    status: 'Scheduled', 
    appointmentTime: '10:30 AM', 
    reason: 'Annual checkup'
  },
  { 
    id: 'PT-1002', 
    name: 'Lisa Johnson', 
    status: 'Waiting', 
    appointmentTime: '11:00 AM', 
    reason: 'Follow-up'
  },
  { 
    id: 'PT-1003', 
    name: 'Marcus Williams', 
    status: 'In Progress', 
    appointmentTime: '11:30 AM', 
    reason: 'Lab results'
  },
  { 
    id: 'PT-1004', 
    name: 'Emma Garcia', 
    status: 'Completed', 
    appointmentTime: '09:15 AM', 
    reason: 'Prescription refill'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Scheduled':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
    case 'Waiting':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Waiting</Badge>;
    case 'In Progress':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Progress</Badge>;
    case 'Completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const PatientSummary = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Today's Patients</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-8">
          <Calendar className="mr-1 h-3 w-3" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">{patient.id}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(patient.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span>{patient.appointmentTime}</span>
                  </div>
                </TableCell>
                <TableCell>{patient.reason}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <FileCheck className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PatientSummary;
