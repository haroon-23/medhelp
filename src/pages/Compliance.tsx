
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertCircle, Clock, FileCheck, User, Lock, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'at-risk' | 'pending';
  category: 'privacy' | 'security' | 'technical' | 'administrative';
  dueDate?: string;
  assignedTo?: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: 'comp1',
    title: 'Annual HIPAA Staff Training',
    description: 'Ensure all staff members have completed their annual HIPAA training and certification.',
    status: 'completed',
    category: 'administrative',
    dueDate: '2025-06-15',
    assignedTo: 'HR Department',
  },
  {
    id: 'comp2',
    title: 'Password Policy Compliance',
    description: 'Verify all user accounts meet password complexity requirements and rotation schedules.',
    status: 'at-risk',
    category: 'security',
    dueDate: '2025-05-20',
    assignedTo: 'IT Security',
  },
  {
    id: 'comp3',
    title: 'Electronic PHI Encryption',
    description: 'Verify all PHI is properly encrypted at rest and in transit per HIPAA requirements.',
    status: 'completed',
    category: 'technical',
    dueDate: '2025-04-30',
    assignedTo: 'IT Security',
  },
  {
    id: 'comp4',
    title: 'Patient Privacy Notice Updates',
    description: 'Review and update patient privacy notices to reflect current practices and policies.',
    status: 'pending',
    category: 'privacy',
    dueDate: '2025-05-31',
    assignedTo: 'Legal Department',
  },
  {
    id: 'comp5',
    title: 'Access Control Audit',
    description: 'Review and validate appropriate access controls for all users accessing PHI.',
    status: 'pending',
    category: 'security',
    dueDate: '2025-06-10',
    assignedTo: 'Compliance Officer',
  },
  {
    id: 'comp6',
    title: 'Business Associate Agreements',
    description: 'Review and update all BAAs with vendors who have access to PHI.',
    status: 'at-risk',
    category: 'administrative',
    dueDate: '2025-05-25',
    assignedTo: 'Legal Department',
  },
];

const Compliance = () => {
  const [tasks, setTasks] = useState<ComplianceItem[]>(complianceItems);
  const [activeTab, setActiveTab] = useState('overview');
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const atRiskTasks = tasks.filter(task => task.status === 'at-risk').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  const complianceScore = Math.round((completedTasks / tasks.length) * 100);

  const handleMarkAsComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: 'completed' as const } : task
    ));
    toast.success('Task marked as completed');
  };

  const getStatusBadge = (status: 'completed' | 'at-risk' | 'pending') => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="mr-1 h-3 w-3" /> Completed</Badge>;
      case 'at-risk':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><AlertCircle className="mr-1 h-3 w-3" /> At Risk</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
    }
  };

  return (
    <AppLayout title="HIPAA Compliance">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Compliance Summary */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Compliance Dashboard
              </CardTitle>
              <CardDescription>
                Overview of your organization's HIPAA compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Compliance Score</span>
                    <span className="text-sm font-medium">{complianceScore}%</span>
                  </div>
                  <Progress value={complianceScore} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-medium text-green-700 flex items-center mb-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </div>
                    <div className="text-2xl font-bold text-green-700">{completedTasks}</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="font-medium text-yellow-700 flex items-center mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      Pending
                    </div>
                    <div className="text-2xl font-bold text-yellow-700">{pendingTasks}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="font-medium text-red-700 flex items-center mb-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      At Risk
                    </div>
                    <div className="text-2xl font-bold text-red-700">{atRiskTasks}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">Upcoming Deadlines</h4>
                  <div className="space-y-3">
                    {tasks
                      .filter(task => task.status !== 'completed')
                      .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
                      .slice(0, 3)
                      .map(task => (
                        <div key={task.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              task.status === 'at-risk' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                            <span className="text-sm">{task.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button size="sm" className="ml-auto">
                Download Report
              </Button>
            </CardFooter>
          </Card>

          {/* HIPAA Requirements */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2 text-primary" />
                Key Requirements
              </CardTitle>
              <CardDescription>
                Essential HIPAA requirements your organization must meet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-50 mr-3">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Privacy Rule</h4>
                    <p className="text-xs text-muted-foreground">Protections for PHI and patient rights</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-50 mr-3">
                    <Lock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Security Rule</h4>
                    <p className="text-xs text-muted-foreground">Administrative, physical & technical safeguards</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-50 mr-3">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Breach Notification</h4>
                    <p className="text-xs text-muted-foreground">Reporting processes for data breaches</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-orange-50 mr-3">
                    <FileText className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Documentation</h4>
                    <p className="text-xs text-muted-foreground">Required policies and procedures</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <h4 className="text-sm font-medium mb-2">Compliance Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Security Risk Analysis</span>
                    <span className="font-medium">January 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Required Training</span>
                    <span className="font-medium">May 30, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Policy Review Due</span>
                    <span className="font-medium">June 15, 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button size="sm" variant="outline">
                View HIPAA Guidelines
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Compliance Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Tasks</CardTitle>
            <CardDescription>
              Track and manage your organization's HIPAA compliance tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="administrative">Administrative</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="physical">Physical</TabsTrigger>
                <TabsTrigger value="at-risk">At Risk</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Task
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Category
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Due Date
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Assigned To
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {tasks.map((task) => (
                          <tr key={task.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">
                              <div>
                                <div className="font-medium">{task.title}</div>
                                <div className="text-xs text-muted-foreground">{task.description}</div>
                              </div>
                            </td>
                            <td className="p-4 align-middle capitalize">{task.category}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                {task.dueDate || 'N/A'}
                              </div>
                            </td>
                            <td className="p-4 align-middle">{task.assignedTo || 'Unassigned'}</td>
                            <td className="p-4 align-middle">
                              {getStatusBadge(task.status)}
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex space-x-2">
                                {task.status !== 'completed' ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleMarkAsComplete(task.id)}
                                  >
                                    Complete
                                  </Button>
                                ) : (
                                  <Button variant="ghost" size="sm" disabled>
                                    Completed
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">Details</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* Filter tabs just show a filtered version of the same content */}
              <TabsContent value="administrative">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Filtered by: Administrative Tasks
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="technical">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Filtered by: Technical Tasks
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="physical">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Filtered by: Physical Safeguards
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="at-risk">
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Filtered by: At Risk Tasks
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{tasks.length}</span> compliance tasks
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Export Tasks</Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Compliance;
