
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  status: "Active" | "Inactive" | "New" | "Urgent";
  insuranceProvider?: string;
}

interface PatientCardProps {
  patient: PatientData;
  className?: string;
}

const PatientCard = ({ patient, className }: PatientCardProps) => {
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
    <Card className={cn("patient-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{patient.name}</h3>
              <p className="text-xs text-muted-foreground">{patient.id}</p>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(patient.status)}>
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Date of Birth</p>
            <p>{patient.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Phone</p>
            <p>{patient.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground text-xs">Email</p>
            <p className="truncate">{patient.email}</p>
          </div>
          {patient.insuranceProvider && (
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs">Insurance</p>
              <p>{patient.insuranceProvider}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground text-xs">Last Visit</p>
            <p>{patient.lastVisit}</p>
          </div>
          {patient.nextAppointment && (
            <div>
              <p className="text-muted-foreground text-xs">Next Appointment</p>
              <p>{patient.nextAppointment}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm">
          <FileCheck className="h-4 w-4 mr-1" />
          View Records
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-1" />
          Schedule
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
