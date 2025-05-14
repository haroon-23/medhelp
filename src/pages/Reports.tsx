
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, Download, Filter, Printer } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for charts
const patientDemographicsData = [
  { name: '0-18', value: 120 },
  { name: '19-35', value: 210 },
  { name: '36-50', value: 180 },
  { name: '51-65', value: 230 },
  { name: '65+', value: 170 }
];

const appointmentTrendsData = [
  { name: 'Jan', appointments: 45 },
  { name: 'Feb', appointments: 52 },
  { name: 'Mar', appointments: 48 },
  { name: 'Apr', appointments: 61 },
  { name: 'May', appointments: 55 },
  { name: 'Jun', appointments: 67 },
  { name: 'Jul', appointments: 70 },
  { name: 'Aug', appointments: 72 },
  { name: 'Sep', appointments: 68 },
  { name: 'Oct', appointments: 80 },
  { name: 'Nov', appointments: 74 },
  { name: 'Dec', appointments: 62 }
];

const patientVisitsData = [
  { name: 'New Patients', visits: 124 },
  { name: 'Follow-ups', visits: 275 },
  { name: 'Annual Physicals', visits: 86 },
  { name: 'Specialist Visits', visits: 142 },
  { name: 'Lab Work', visits: 97 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  return (
    <AppLayout title="Reports & Analytics">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <p className="text-sm text-muted-foreground">
              View and generate reports on patient data and clinic metrics
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-1 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-1 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patient Reports</TabsTrigger>
            <TabsTrigger value="appointments">Appointment Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Patient Demographics</CardTitle>
                  <CardDescription>Age distribution of patient population</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={patientDemographicsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {patientDemographicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Appointment Trends</CardTitle>
                  <CardDescription>Monthly appointment volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={appointmentTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="appointments" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2} 
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Visit Types</CardTitle>
                  <CardDescription>Distribution of appointment reasons</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={patientVisitsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="visits" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Available Reports</CardTitle>
                <CardDescription>Access and generate common reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Patient Demographics Report",
                      description: "Age, gender, and location breakdown of patients",
                      updated: "Updated daily"
                    },
                    {
                      title: "Appointment Analytics",
                      description: "No-show rates, cancellations, and scheduling patterns",
                      updated: "Updated weekly"
                    },
                    {
                      title: "Provider Productivity",
                      description: "Patient volume and care metrics by provider",
                      updated: "Updated daily"
                    },
                    {
                      title: "Revenue Analysis",
                      description: "Billing and payment collection data",
                      updated: "Updated daily"
                    },
                    {
                      title: "Insurance Claims Report",
                      description: "Status of submitted claims and denials",
                      updated: "Updated daily"
                    },
                    {
                      title: "HIPAA Compliance Audit",
                      description: "System access logs and security checks",
                      updated: "Updated daily"
                    }
                  ].map((report, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "flex flex-col p-4 border rounded-lg hover:bg-accent/50 cursor-pointer",
                        index === 0 && "border-primary"
                      )}
                    >
                      <div className="flex items-start mb-2">
                        <div className="p-2 rounded-full bg-primary/10 mr-3">
                          <FileCheck className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{report.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2 text-xs text-muted-foreground">
                        <span>{report.updated}</span>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="patients" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Reports</CardTitle>
                <CardDescription>
                  Detailed reports on patient data and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Patient reports content will be implemented in the next iteration.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Reports</CardTitle>
                <CardDescription>
                  Reports on scheduling, attendance, and provider productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Appointment reports content will be implemented in the next iteration.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Reports;
