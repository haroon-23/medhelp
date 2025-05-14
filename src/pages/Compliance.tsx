
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertCircle, FileCheck, Clock, Calendar } from 'lucide-react';

const Compliance = () => {
  return (
    <AppLayout title="HIPAA Compliance">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">HIPAA Compliance Center</h2>
            <p className="text-muted-foreground">
              Monitor and manage your organization's HIPAA compliance
            </p>
          </div>
          <Button className="gap-1">
            <FileCheck className="h-4 w-4" />
            Run Compliance Check
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Compliance Score</CardTitle>
              <CardDescription>Overall HIPAA compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-6">
                <div className="relative h-36 w-36">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.92)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">92%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Risk Assessment</CardTitle>
              <CardDescription>Policy and security assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Security Safeguards</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Privacy Policies</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Staff Training</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Full Report</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
              <CardDescription>Compliance tasks to complete</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-full">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Staff HIPAA Training Update</p>
                    <p className="text-xs text-muted-foreground">Due in 5 days</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-green-50 text-green-600 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Security Audit Complete</p>
                    <p className="text-xs text-muted-foreground">Completed yesterday</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-red-50 text-red-600 rounded-full">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Privacy Notice Update</p>
                    <p className="text-xs text-muted-foreground">Overdue by 2 days</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Tasks</Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="policies">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="training">Staff Training</TabsTrigger>
            <TabsTrigger value="breaches">Breach Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="policies" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>HIPAA Policies and Procedures</CardTitle>
                <CardDescription>
                  Manage all your HIPAA-related policies and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Privacy Policy",
                      description: "Rules for handling PHI",
                      lastUpdated: "April 15, 2025",
                      status: "Up to date"
                    },
                    {
                      title: "Security Policy",
                      description: "Technical safeguards and controls",
                      lastUpdated: "March 28, 2025",
                      status: "Up to date"
                    },
                    {
                      title: "Breach Notification",
                      description: "Procedures for breach notification",
                      lastUpdated: "February 12, 2025",
                      status: "Review needed"
                    },
                    {
                      title: "Business Associate Agreements",
                      description: "Contracts with third parties",
                      lastUpdated: "January 30, 2025",
                      status: "Up to date"
                    }
                  ].map((policy, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{policy.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          policy.status === "Up to date" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-yellow-50 text-yellow-700"
                        }`}>
                          {policy.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{policy.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Updated: {policy.lastUpdated}</span>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>
                  Track access to PHI and system activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Audit Log Monitoring</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    This section displays audit logs for monitoring who accessed patient information,
                    when it was accessed, and what actions were performed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Training</CardTitle>
                <CardDescription>
                  Manage HIPAA training for staff members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Training Management</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Track training completion, schedule new training sessions,
                    and ensure all staff members are compliant with HIPAA regulations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="breaches" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Breach Management</CardTitle>
                <CardDescription>
                  Monitor and respond to potential data breaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Active Breaches</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    There are currently no active breach incidents.
                    This section would display breach reports, response activities,
                    and notification procedures if any were present.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Compliance;
