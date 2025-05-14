
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Headphones, Mic, ArrowUpRight, Clock, Users, Bot, Check, X, BarChart as BarChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const VoiceBotAnalytics = () => {
  // Mock data for call volume by day
  const callVolumeData = [
    { day: 'Mon', calls: 42 },
    { day: 'Tue', calls: 58 },
    { day: 'Wed', calls: 65 },
    { day: 'Thu', calls: 74 },
    { day: 'Fri', calls: 62 },
    { day: 'Sat', calls: 38 },
    { day: 'Sun', calls: 25 }
  ];

  // Mock data for call duration
  const callDurationData = [
    { hour: '8AM', avgDuration: 2.1 },
    { hour: '9AM', avgDuration: 3.4 },
    { hour: '10AM', avgDuration: 4.2 },
    { hour: '11AM', avgDuration: 3.8 },
    { hour: '12PM', avgDuration: 2.5 },
    { hour: '1PM', avgDuration: 2.9 },
    { hour: '2PM', avgDuration: 3.6 },
    { hour: '3PM', avgDuration: 4.1 },
    { hour: '4PM', avgDuration: 3.7 },
    { hour: '5PM', avgDuration: 2.8 }
  ];

  // Mock data for call outcomes
  const callOutcomesData = [
    { name: 'Appointment Scheduled', value: 45 },
    { name: 'Information Provided', value: 30 },
    { name: 'Transferred to Human', value: 15 },
    { name: 'Follow-up Required', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Mock data for recent calls
  const recentCalls = [
    {
      id: 'CALL-001',
      patient: 'John Doe',
      dateTime: '2025-05-14 10:15 AM',
      duration: '4:32',
      outcome: 'Appointment Scheduled',
      satisfaction: 'High'
    },
    {
      id: 'CALL-002',
      patient: 'Emily Wilson',
      dateTime: '2025-05-14 09:30 AM',
      duration: '3:45',
      outcome: 'Information Provided',
      satisfaction: 'Medium'
    },
    {
      id: 'CALL-003',
      patient: 'Robert Brown',
      dateTime: '2025-05-13 02:45 PM',
      duration: '5:12',
      outcome: 'Transferred to Human',
      satisfaction: 'Low'
    },
    {
      id: 'CALL-004',
      patient: 'Maria Garcia',
      dateTime: '2025-05-13 11:20 AM',
      duration: '2:50',
      outcome: 'Follow-up Required',
      satisfaction: 'Medium'
    },
    {
      id: 'CALL-005',
      patient: 'David Lee',
      dateTime: '2025-05-13 10:05 AM',
      duration: '3:18',
      outcome: 'Appointment Scheduled',
      satisfaction: 'High'
    }
  ];

  return (
    <AppLayout title="Voice Bot Analytics">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Voice Bot Analytics</h2>
            <p className="text-muted-foreground">
              Monitor and analyze your Retell AI voice bot performance
            </p>
          </div>
          <Button>
            <Headphones className="h-4 w-4 mr-2" />
            Configure Voice Bot
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Calls</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">364</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>12% increase</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg. Duration</CardTitle>
              <CardDescription>Per call</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3:24</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>minutes:seconds</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Resolution Rate</CardTitle>
              <CardDescription>Without human transfer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>5% increase</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Unique Patients</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">278</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>76% of total calls</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Call Volume by Day</CardTitle>
              <CardDescription>Number of voice bot calls per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={callVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Average Call Duration</CardTitle>
              <CardDescription>Average duration in minutes by hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={callDurationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avgDuration" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Call Outcomes</CardTitle>
              <CardDescription>Distribution of call results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={callOutcomesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {callOutcomesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Voice Bot Calls</CardTitle>
              <CardDescription>Latest interactions with patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-start p-3 border rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full mr-4">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-y-0 gap-x-4 flex-1">
                      <div className="md:col-span-2">
                        <div className="font-medium">{call.patient}</div>
                        <div className="text-xs text-muted-foreground">{call.dateTime}</div>
                      </div>
                      <div>
                        <div className="text-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          {call.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">{call.outcome}</div>
                      </div>
                      <div>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          call.satisfaction === "High" && "bg-green-50 text-green-700",
                          call.satisfaction === "Medium" && "bg-yellow-50 text-yellow-700",
                          call.satisfaction === "Low" && "bg-red-50 text-red-700"
                        )}>
                          {call.satisfaction}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default VoiceBotAnalytics;
