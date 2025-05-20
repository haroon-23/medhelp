
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const timeSlots = [
  "09:00 AM", "09:30 AM", 
  "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

const appointmentTypes = [
  { value: "new-patient", label: "New Patient Visit" },
  { value: "follow-up", label: "Follow-up Visit" },
  { value: "annual", label: "Annual Physical" },
  { value: "urgent", label: "Urgent Care" },
  { value: "specialist", label: "Specialist Consultation" },
  { value: "lab", label: "Lab Work" },
];

// Mock data for existing appointments to test conflict checking
const existingAppointments = [
  { date: '2025-05-25', time: '10:00 AM', doctor: 'Dr. Sarah Johnson' },
  { date: '2025-05-25', time: '11:00 AM', doctor: 'Dr. Sarah Johnson' },
  { date: '2025-05-26', time: '09:30 AM', doctor: 'Dr. Michael Chen' },
];

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [doctor, setDoctor] = useState<string>('Dr. Sarah Johnson');
  const [hasConflict, setHasConflict] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // Check for appointment conflicts
  const checkConflicts = () => {
    if (!date || !time || !doctor) return;
    
    setIsChecking(true);
    
    // Format the selected date to compare with existing appointments
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Simulate API call to check conflicts
    setTimeout(() => {
      const conflict = existingAppointments.some(
        apt => apt.date === formattedDate && apt.time === time && apt.doctor === doctor
      );
      
      setHasConflict(conflict);
      setIsChecking(false);
      
      if (conflict) {
        toast.warning(`Conflict detected for ${time} with ${doctor}`);
      } else {
        toast.success('Time slot is available');
      }
    }, 500);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (time && doctor && newDate) {
      checkConflicts();
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (date && doctor && newTime) {
      checkConflicts();
    }
  };

  const handleDoctorChange = (newDoctor: string) => {
    setDoctor(newDoctor);
    if (date && time && newDoctor) {
      checkConflicts();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasConflict) {
      toast.error('Please resolve the appointment conflict before scheduling');
      return;
    }
    
    if (!patientId || !patientName || !date || !time || !type || !reason) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Simulate API call to schedule appointment
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1000)),
      {
        loading: 'Scheduling appointment...',
        success: 'Appointment scheduled successfully!',
        error: 'Failed to schedule appointment.'
      }
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Schedule Appointment</h2>
        <p className="text-sm text-muted-foreground">
          Enter appointment details below
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input 
              id="patientId" 
              placeholder="Enter patient ID" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input 
              id="patientName" 
              placeholder="Enter patient name" 
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <Label>Provider</Label>
            <Select value={doctor} onValueChange={handleDoctorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="form-group">
            <Label>Appointment Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <Label>Appointment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="form-group">
            <Label>Appointment Time</Label>
            <Select value={time} onValueChange={handleTimeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{time}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasConflict && (
          <Alert variant="destructive" className="bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Appointment Conflict</AlertTitle>
            <AlertDescription>
              There is already an appointment scheduled with {doctor} at this time.
              Please select a different time or provider.
            </AlertDescription>
          </Alert>
        )}
        
        {!hasConflict && date && time && (
          <Alert className="bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-700">Time Slot Available</AlertTitle>
            <AlertDescription className="text-green-600">
              This time slot is available for booking.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="form-group">
          <Label htmlFor="reason">Reason for Visit</Label>
          <Textarea 
            id="reason" 
            placeholder="Enter details about the appointment" 
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={hasConflict || isChecking}>
          Schedule Appointment
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
