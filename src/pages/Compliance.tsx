
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertCircle, Info, Clipboard, FileText, AlertTriangle, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const Compliance = () => {
  const complianceScore = 85;
  const requiredItems = [
    { id: 1, title: 'Privacy Policy', status: 'complete', description: 'Updated and compliant with HIPAA requirements' },
    { id: 2, title: 'Security Risk Assessment', status: 'complete', description: 'Annual review completed' },
    { id: 3, title: 'Employee Training', status: 'pending', description: '3 staff members need to complete training' },
    { id: 4, title: 'Business Associate Agreements', status: 'complete', description: 'All vendors have signed BAAs' },
    { id: 5, title: 'Breach Notification Plan', status: 'complete', description: 'Plan updated and tested' }
  ];

  const riskItems = [
    { id: 1, title: 'Password Policy Compliance', severity: 'medium', description: 'Some accounts not meeting complexity requirements' },
    { id: 2, title: 'Audit Logging', severity: 'low', description: 'Review audit logs more frequently' },
    { id: 3, title: 'Encryption at Rest', severity: 'low', description: 'All systems using approved encryption' }
  ];

  return (
    <AppLayout title="HIPAA Compliance">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">HIPAA Compliance</h2>
            <p className="text-muted-foreground">
              Monitor and manage your organization's HIPAA compliance status
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-1">
              <Shield className="h-4 w-4" />
              Run Assessment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Compliance Score</CardTitle>
              <CardDescription>Last updated: May 14, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-muted mb-4">
                  <div className={cn(
                    "text-2xl font-bold",
                    complianceScore >= 90 ? "text-green-600" :
                    complianceScore >= 70 ? "text-yellow-600" :
                    "text-red-600"
                  )}>
                    {complianceScore}%
                  </div>
                  <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={complianceScore >= 90 ? "rgb(22 163 74)" :
                              complianceScore >= 70 ? "rgb(202 138 4)" :
                              "rgb(220 38 38)"}
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * complianceScore / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className={cn(
                  "text-sm font-medium rounded-full px-3 py-1",
                  complianceScore >= 90 ? "bg-green-50 text-green-700" :
                  complianceScore >= 70 ? "bg-yellow-50 text-yellow-700" :
                  "bg-red-50 text-red-700"
                )}>
                  {complianceScore >= 90 ? "Excellent" :
                   complianceScore >= 70 ? "Good" :
                   "Needs Attention"}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Required Tasks</CardTitle>
              <CardDescription>HIPAA compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Completed</div>
                  <div className="text-sm">4/5</div>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Risk Assessment</CardTitle>
              <CardDescription>Identified security risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-green-600">1</div>
                    <div className="text-xs text-muted-foreground">High</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-yellow-600">1</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-blue-600">2</div>
                    <div className="text-xs text-muted-foreground">Low</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Risks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>HIPAA Requirements</CardTitle>
              <CardDescription>Status of required compliance items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requiredItems.map((item) => (
                  <div key={item.id} className="flex items-start p-3 border rounded-lg">
                    <div className={cn(
                      "p-2 rounded-full mr-3",
                      item.status === 'complete' ? "bg-green-50" : "bg-yellow-50"
                    )}>
                      {item.status === 'complete' ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                        <Button 
                          variant={item.status === 'complete' ? "ghost" : "outline"} 
                          size="sm"
                        >
                          {item.status === 'complete' ? 'View' : 'Complete'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Risks</CardTitle>
              <CardDescription>Identified issues to address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskItems.map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={cn(
                        "p-1 rounded-full mr-2",
                        item.severity === 'high' ? "bg-red-50" :
                        item.severity === 'medium' ? "bg-yellow-50" :
                        "bg-blue-50"
                      )}>
                        <AlertTriangle className={cn(
                          "h-4 w-4",
                          item.severity === 'high' ? "text-red-600" :
                          item.severity === 'medium' ? "text-yellow-600" :
                          "text-blue-600"
                        )} />
                      </div>
                      <div className="flex-1 font-medium">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full uppercase",
                          item.severity === 'high' ? "bg-red-50 text-red-700" :
                          item.severity === 'medium' ? "bg-yellow-50 text-yellow-700" :
                          "bg-blue-50 text-blue-700"
                        )}>
                          {item.severity}
                        </span>
                        <span className="ml-2">{item.title}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground ml-7">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                View All Risks
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Compliance;
