
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
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
            <Input id="patientId" placeholder="Enter patient ID" />
          </div>
          
          <div className="form-group">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input id="patientName" placeholder="Enter patient name" />
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="form-group">
            <Label>Appointment Time</Label>
            <Select>
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
        
        <div className="form-group">
          <Label>Appointment Type</Label>
          <Select>
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
        
        <div className="form-group">
          <Label htmlFor="reason">Reason for Visit</Label>
          <Textarea 
            id="reason" 
            placeholder="Enter details about the appointment" 
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button>Schedule Appointment</Button>
      </div>
    </div>
  );
};

export default AppointmentForm;
