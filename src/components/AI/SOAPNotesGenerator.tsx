
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Check, Loader2, Copy, Download, Bot, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const SOAPNotesGenerator = () => {
  const [patientId, setPatientId] = useState('');
  const [conversationText, setConversationText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notes, setNotes] = useState<{
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  } | null>(null);
  
  // Sample patients for the demo
  const patients = [
    { id: 'P001', name: 'John Doe' },
    { id: 'P002', name: 'Emily Wilson' },
    { id: 'P003', name: 'Robert Brown' },
    { id: 'P004', name: 'Maria Garcia' },
    { id: 'P005', name: 'David Lee' },
  ];
  
  // Demo conversation text for testing
  const sampleConversation = `Doctor: Hello Mr. Doe, how are you feeling today?\n\nPatient: I've been having this persistent cough for about 2 weeks now. It's worse at night.\n\nDoctor: I see. Any other symptoms like fever or chest pain?\n\nPatient: No fever, but sometimes I feel a bit of tightness in my chest, especially after coughing a lot.\n\nDoctor: Are you taking any medications currently?\n\nPatient: Just my regular blood pressure medication, amlodipine 5mg daily.\n\nDoctor: Have you tried any over-the-counter medications for the cough?\n\nPatient: I tried some cough syrup but it didn't help much.\n\nDoctor: Let me listen to your lungs. *Examination* I can hear some wheezing in the lower right lung field. Let's check your vitals as well.`;

  const handleGenerateNotes = async () => {
    if (!patientId) {
      toast.error('Please select a patient');
      return;
    }
    
    if (!conversationText.trim()) {
      toast.error('Please enter conversation text or use the sample conversation');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // In a production environment, this would be an API call to an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - in production this would come from the AI service
      setNotes({
        subjective: "Patient reports a persistent cough for approximately 2 weeks, worsening at night. Denies fever. Reports occasional chest tightness after episodes of coughing. Currently taking amlodipine 5mg daily for hypertension. Has tried OTC cough syrup without significant relief.",
        objective: "Vitals: BP 132/78, HR 76, RR 16, Temp 98.6°F, SpO2 97%\nPhysical Exam: Alert and oriented. Lung auscultation reveals wheezing in the right lower lung field. No rales or rhonchi. Heart sounds normal. No peripheral edema.",
        assessment: "1. Acute bronchitis, likely viral in origin\n2. Hypertension, controlled on current medication\n3. Rule out asthma exacerbation",
        plan: "1. Prescribe albuterol inhaler 90mcg, 2 puffs every 4-6 hours as needed\n2. Recommend humidifier at night\n3. Continue amlodipine 5mg daily\n4. If no improvement in 7 days, return for follow-up and possible chest X-ray\n5. Return immediately if fever develops or breathing difficulty worsens"
      });
      
      toast.success('SOAP notes generated successfully');
    } catch (error) {
      console.error('Error generating SOAP notes:', error);
      toast.error('Failed to generate SOAP notes');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleUseSample = () => {
    setConversationText(sampleConversation);
    toast.info('Sample conversation loaded');
  };
  
  const handleCopyNotes = () => {
    if (!notes) return;
    
    const fullNotes = `SOAP Notes\n\nSubjective:\n${notes.subjective}\n\nObjective:\n${notes.objective}\n\nAssessment:\n${notes.assessment}\n\nPlan:\n${notes.plan}`;
    
    navigator.clipboard.writeText(fullNotes);
    toast.success('SOAP notes copied to clipboard');
  };
  
  const handleSaveNotes = () => {
    if (!notes) return;
    
    toast.success('SOAP notes saved to patient record');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SOAP Notes Generator</CardTitle>
            <CardDescription>Generate clinical documentation from patient conversations</CardDescription>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <FileText className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!notes ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <Select value={patientId} onValueChange={setPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="conversation">Patient Conversation</Label>
                <Button variant="ghost" size="sm" onClick={handleUseSample} className="h-6 text-xs">
                  Use Sample
                </Button>
              </div>
              <Textarea
                id="conversation"
                placeholder="Paste or type the doctor-patient conversation here..."
                value={conversationText}
                onChange={(e) => setConversationText(e.target.value)}
                className="min-h-[200px]"
              />
              <p className="text-xs text-muted-foreground">
                Enter the conversation text or upload an audio recording for transcription
              </p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="subjective">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="subjective">Subjective</TabsTrigger>
              <TabsTrigger value="objective">Objective</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="plan">Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjective" className="border rounded-md p-4 min-h-[200px]">
              {notes.subjective}
            </TabsContent>
            
            <TabsContent value="objective" className="border rounded-md p-4 min-h-[200px]">
              {notes.objective}
            </TabsContent>
            
            <TabsContent value="assessment" className="border rounded-md p-4 min-h-[200px]">
              {notes.assessment}
            </TabsContent>
            
            <TabsContent value="plan" className="border rounded-md p-4 min-h-[200px]">
              {notes.plan}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        {!notes ? (
          <>
            <Button variant="outline" onClick={() => setConversationText('')}>
              Clear
            </Button>
            <Button onClick={handleGenerateNotes} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  Generate SOAP Notes
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setNotes(null)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                New Notes
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyNotes}>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </div>
            <Button onClick={handleSaveNotes}>
              <Check className="h-4 w-4 mr-2" />
              Save to Record
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default SOAPNotesGenerator;
