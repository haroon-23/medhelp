
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clipboard, Pill, FileChart, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PatientRecords = () => {
  const [activeTab, setActiveTab] = useState('summary');

  const diagnoses = [
    { id: '1', condition: 'Hypertension', date: '2024-02-15', doctor: 'Dr. Sarah Johnson', status: 'Active' },
    { id: '2', condition: 'Type 2 Diabetes', date: '2023-09-10', doctor: 'Dr. Michael Lee', status: 'Active' },
    { id: '3', condition: 'Seasonal Allergies', date: '2022-05-20', doctor: 'Dr. Emily Roberts', status: 'Recurring' },
    { id: '4', condition: 'Bronchitis', date: '2022-01-05', doctor: 'Dr. Michael Lee', status: 'Resolved' }
  ];
  
  const medications = [
    { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-02-15', endDate: null },
    { id: '2', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-09-10', endDate: null },
    { id: '3', name: 'Cetirizine', dosage: '10mg', frequency: 'As needed', startDate: '2022-05-20', endDate: null },
    { id: '4', name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', startDate: '2022-01-05', endDate: '2022-01-15' }
  ];
  
  const labTests = [
    { 
      id: '1', 
      name: 'Complete Blood Count', 
      date: '2024-04-10', 
      doctor: 'Dr. Sarah Johnson',
      results: [
        { name: 'WBC', value: '7.5', unit: '10^3/μL', normal: '4.5-11.0', flag: 'normal' },
        { name: 'RBC', value: '5.2', unit: '10^6/μL', normal: '4.5-5.9', flag: 'normal' },
        { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', normal: '13.5-17.5', flag: 'normal' },
        { name: 'Hematocrit', value: '42', unit: '%', normal: '41-50', flag: 'normal' },
        { name: 'Platelets', value: '250', unit: '10^3/μL', normal: '150-450', flag: 'normal' }
      ]
    },
    { 
      id: '2', 
      name: 'Lipid Panel', 
      date: '2024-04-10', 
      doctor: 'Dr. Sarah Johnson',
      results: [
        { name: 'Total Cholesterol', value: '210', unit: 'mg/dL', normal: '<200', flag: 'high' },
        { name: 'LDL', value: '130', unit: 'mg/dL', normal: '<100', flag: 'high' },
        { name: 'HDL', value: '45', unit: 'mg/dL', normal: '>40', flag: 'normal' },
        { name: 'Triglycerides', value: '150', unit: 'mg/dL', normal: '<150', flag: 'normal' }
      ]
    },
    { 
      id: '3', 
      name: 'HbA1c', 
      date: '2024-03-22', 
      doctor: 'Dr. Michael Lee',
      results: [
        { name: 'HbA1c', value: '6.8', unit: '%', normal: '<5.7', flag: 'high' }
      ]
    }
  ];

  const visits = [
    { 
      id: '1', 
      type: 'Check-up', 
      date: '2024-04-10',
      doctor: 'Dr. Sarah Johnson',
      notes: 'Patient presents for routine follow-up. Blood pressure is well-controlled on current medication. Discussed diet and exercise habits. Ordered lipid panel and CBC.',
      vitals: { bp: '125/82', hr: '72', temp: '98.6', weight: '165' }
    },
    { 
      id: '2', 
      type: 'Follow-up', 
      date: '2023-11-15',
      doctor: 'Dr. Michael Lee',
      notes: 'Follow-up for diabetes management. Reviewed blood glucose logs. Patient reports consistent readings. Continuing current medications.',
      vitals: { bp: '128/84', hr: '75', temp: '98.4', weight: '168' }
    },
    { 
      id: '3', 
      type: 'Urgent Care', 
      date: '2023-08-22',
      doctor: 'Dr. Emily Roberts',
      notes: 'Patient presents with sinus infection symptoms. Prescribed amoxicillin for 10 days. Recommended increased fluid intake and rest.',
      vitals: { bp: '132/85', hr: '82', temp: '99.8', weight: '165' }
    }
  ];

  return (
    <AppLayout title="My Medical Records">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="visits">Visit History</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            {/* Medical Conditions Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Diagnoses & Conditions</span>
                    </CardTitle>
                    <CardDescription>Your medical conditions and diagnoses</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diagnoses.map((diagnosis) => (
                    <div key={diagnosis.id} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-medium">{diagnosis.condition}</p>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <span>Diagnosed: {diagnosis.date}</span>
                          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                          <span>By: {diagnosis.doctor}</span>
                        </div>
                      </div>
                      <Badge 
                        className={cn(
                          diagnosis.status === 'Active' && 'bg-blue-100 text-blue-700 border-blue-200',
                          diagnosis.status === 'Resolved' && 'bg-green-100 text-green-700 border-green-200',
                          diagnosis.status === 'Recurring' && 'bg-amber-100 text-amber-700 border-amber-200'
                        )}
                      >
                        {diagnosis.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Medications Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-primary" />
                      <span>Medications</span>
                    </CardTitle>
                    <CardDescription>Your current and past medications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication) => (
                    <div key={medication.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-medium">{medication.name} ({medication.dosage})</p>
                        <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span>Started: {medication.startDate}</span>
                          {medication.endDate && (
                            <span className="ml-2">
                              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground mx-1"></span>
                              Ended: {medication.endDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={medication.endDate ? "bg-slate-100" : "bg-green-100 text-green-700 border-green-200"}
                      >
                        {medication.endDate ? "Completed" : "Active"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Lab Results */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileChart className="h-5 w-5 text-primary" />
                      <span>Recent Lab Results</span>
                    </CardTitle>
                    <CardDescription>Your most recent laboratory test results</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('labs')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labTests.slice(0, 2).map((test) => (
                    <div key={test.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <div className="text-xs text-muted-foreground">
                            <span>{test.date}</span>
                            <span className="mx-1">•</span>
                            <span>{test.doctor}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Download className="h-4 w-4" />
                          <span className="text-xs">PDF</span>
                        </Button>
                      </div>
                      
                      <div className="mt-3 text-sm">
                        <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground border-b pb-1">
                          <div className="col-span-2">Test</div>
                          <div>Result</div>
                          <div>Units</div>
                          <div>Range</div>
                        </div>
                        {test.results.slice(0, 3).map((result, idx) => (
                          <div key={idx} className="grid grid-cols-5 py-1 text-xs border-b last:border-b-0">
                            <div className="col-span-2 font-medium">{result.name}</div>
                            <div className={cn(
                              result.flag === 'high' && 'text-red-600',
                              result.flag === 'low' && 'text-amber-600'
                            )}>
                              {result.value}
                            </div>
                            <div>{result.unit}</div>
                            <div>{result.normal}</div>
                          </div>
                        ))}
                        
                        {test.results.length > 3 && (
                          <div className="text-center py-1 mt-1">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0" 
                              onClick={() => setActiveTab('labs')}
                            >
                              See {test.results.length - 3} more results
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('labs')}>
                  View All Lab Results
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Visit History Tab */}
          <TabsContent value="visits" className="space-y-6">
            {visits.map((visit) => (
              <Card key={visit.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={visit.type === 'Urgent Care' ? 'destructive' : 'default'}>
                          {visit.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{visit.date}</span>
                      </div>
                      <CardTitle>{visit.doctor}</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Download className="h-4 w-4" />
                      <span className="text-xs">Summary</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <h4 className="text-sm font-medium mb-1">Visit Notes</h4>
                      <p className="text-sm">{visit.notes}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Vital Signs</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">BP:</span> {visit.vitals.bp}</p>
                        <p><span className="text-muted-foreground">HR:</span> {visit.vitals.hr} bpm</p>
                        <p><span className="text-muted-foreground">Temp:</span> {visit.vitals.temp}°F</p>
                        <p><span className="text-muted-foreground">Weight:</span> {visit.vitals.weight} lbs</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Lab Results Tab */}
          <TabsContent value="labs" className="space-y-6">
            {labTests.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{test.name}</CardTitle>
                      <CardDescription>
                        {test.date} • Ordered by {test.doctor}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Download className="h-4 w-4" />
                      <span className="text-xs">PDF</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="grid grid-cols-5 font-medium text-muted-foreground border-b pb-2">
                      <div className="col-span-2">Test</div>
                      <div>Result</div>
                      <div>Units</div>
                      <div>Reference Range</div>
                    </div>
                    {test.results.map((result, idx) => (
                      <div key={idx} className="grid grid-cols-5 py-2 border-b last:border-b-0">
                        <div className="col-span-2 font-medium">{result.name}</div>
                        <div className={cn(
                          result.flag === 'high' && 'text-red-600 font-medium',
                          result.flag === 'low' && 'text-amber-600 font-medium'
                        )}>
                          {result.value}
                        </div>
                        <div>{result.unit}</div>
                        <div>{result.normal}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Documents</CardTitle>
                <CardDescription>Access and download your medical documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'Physical Examination Report', date: '2024-04-10', type: 'PDF' },
                    { name: 'Cardiology Consultation', date: '2023-11-22', type: 'PDF' },
                    { name: 'X-Ray Report - Chest', date: '2023-08-15', type: 'PDF' },
                    { name: 'Medical History Summary', date: '2023-05-30', type: 'PDF' },
                    { name: 'Insurance Information', date: '2023-02-10', type: 'PDF' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span className="text-xs">{doc.type}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Consent & Authorization Forms</CardTitle>
                <CardDescription>Legal documents and consent forms you've signed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'HIPAA Privacy Notice', date: '2024-01-05', type: 'PDF' },
                    { name: 'Treatment Consent Form', date: '2024-01-05', type: 'PDF' },
                    { name: 'Release of Information', date: '2023-06-12', type: 'PDF' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Clipboard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span className="text-xs">{doc.type}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PatientRecords;
