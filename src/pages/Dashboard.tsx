import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import PatientSummary from '@/components/Dashboard/PatientSummary';
import { Activity, Calendar, Clock, FileCheck, User, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for charts
const weeklyAppointmentsData = [
  { name: 'Mon', appointments: 14 },
  { name: 'Tue', appointments: 19 },
  { name: 'Wed', appointments: 16 },
  { name: 'Thu', appointments: 21 },
  { name: 'Fri', appointments: 18 },
  { name: 'Sat', appointments: 8 },
  { name: 'Sun', appointments: 0 },
];

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Patients" 
            value="1,248" 
            description="Active patient records" 
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Appointments Today" 
            value="24" 
            description="8 completed, 16 remaining" 
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard 
            title="Avg. Wait Time" 
            value="14 min" 
            description="2 min decrease from last week" 
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard 
            title="Completed Records" 
            value="18" 
            description="Medical records updated today" 
            icon={FileCheck}
            trend={{ value: 3, isPositive: false }}
          />
        </section>
        
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <PatientSummary />
          
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-md font-medium">Weekly Appointments</CardTitle>
              <CardDescription>Appointment distribution for current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[230px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAppointmentsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-md font-medium">Recent Activity</CardTitle>
              <CardDescription>System logs and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  {
                    action: "Patient record updated",
                    user: "Dr. Sarah Johnson",
                    time: "10 minutes ago",
                    icon: FileCheck
                  },
                  {
                    action: "New appointment scheduled",
                    user: "Nurse Michael Rodriguez",
                    time: "25 minutes ago",
                    icon: Calendar
                  },
                  {
                    action: "Lab results uploaded",
                    user: "Lab Tech Jamie Smith",
                    time: "1 hour ago",
                    icon: Activity
                  },
                  {
                    action: "New patient registered",
                    user: "Receptionist Lisa Wong",
                    time: "2 hours ago",
                    icon: User
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{item.action}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{item.user}</span>
                        <span className="mx-1">•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-md font-medium">Upcoming Tasks</CardTitle>
              <CardDescription>Scheduled tasks and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  {
                    task: "Review lab results for Marcus Williams",
                    priority: "High",
                    dueDate: "Today, 2:00 PM"
                  },
                  {
                    task: "Follow up with patient Lisa Johnson about medication",
                    priority: "Medium",
                    dueDate: "Today, 4:30 PM"
                  },
                  {
                    task: "Complete medical certification for Robert Chen",
                    priority: "Medium",
                    dueDate: "Tomorrow, 10:00 AM"
                  },
                  {
                    task: "Team meeting - Quarterly review",
                    priority: "Low",
                    dueDate: "Friday, 1:00 PM"
                  },
                  {
                    task: "HIPAA compliance training session",
                    priority: "High",
                    dueDate: "Friday, 3:00 PM"
                  }
                ].map((task, i) => (
                  <li key={i} className="flex items-center justify-between p-3 border rounded-md bg-background">
                    <div>
                      <p className="font-medium text-sm">{task.task}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      task.priority === "High" ? "bg-red-50 text-red-700" :
                      task.priority === "Medium" ? "bg-yellow-50 text-yellow-700" :
                      "bg-green-50 text-green-700"
                    )}>
                      {task.priority}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
