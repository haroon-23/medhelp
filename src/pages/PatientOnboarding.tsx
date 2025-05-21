
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PatientBasicInfoForm from '@/components/Patients/Onboarding/PatientBasicInfoForm';
import PatientMedicalHistoryForm from '@/components/Patients/Onboarding/PatientMedicalHistoryForm';
import PatientInsuranceForm from '@/components/Patients/Onboarding/PatientInsuranceForm';
import PatientConsentForm from '@/components/Patients/Onboarding/PatientConsentForm';
import { CheckCircle } from 'lucide-react';

const PatientOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<string>('basic-info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formComplete, setFormComplete] = useState({
    'basic-info': false,
    'medical-history': false,
    'insurance': false,
    'consent': false
  });
  
  const handleStepComplete = (step: string, isComplete: boolean) => {
    setFormComplete(prev => ({
      ...prev,
      [step]: isComplete
    }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would submit all form data to the backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast.success('Patient onboarding completed successfully');
      navigate('/patients');
    } catch (error) {
      toast.error('Failed to complete patient onboarding');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isCurrentFormComplete = formComplete[currentStep];
  const allFormsComplete = Object.values(formComplete).every(Boolean);
  
  return (
    <AppLayout title="Patient Onboarding">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Patient Onboarding</CardTitle>
          </CardHeader>
          
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic-info" className="relative">
                Basic Information
                {formComplete['basic-info'] && (
                  <CheckCircle className="h-4 w-4 absolute top-1 right-1 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="medical-history" className="relative">
                Medical History
                {formComplete['medical-history'] && (
                  <CheckCircle className="h-4 w-4 absolute top-1 right-1 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="insurance" className="relative">
                Insurance
                {formComplete['insurance'] && (
                  <CheckCircle className="h-4 w-4 absolute top-1 right-1 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="consent" className="relative">
                Consent
                {formComplete['consent'] && (
                  <CheckCircle className="h-4 w-4 absolute top-1 right-1 text-green-600" />
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-info">
              <PatientBasicInfoForm onComplete={(isComplete) => handleStepComplete('basic-info', isComplete)} />
            </TabsContent>
            
            <TabsContent value="medical-history">
              <PatientMedicalHistoryForm onComplete={(isComplete) => handleStepComplete('medical-history', isComplete)} />
            </TabsContent>
            
            <TabsContent value="insurance">
              <PatientInsuranceForm onComplete={(isComplete) => handleStepComplete('insurance', isComplete)} />
            </TabsContent>
            
            <TabsContent value="consent">
              <PatientConsentForm onComplete={(isComplete) => handleStepComplete('consent', isComplete)} />
            </TabsContent>
          </Tabs>
          
          <CardContent className="border-t p-4">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/patients')}
              >
                Cancel
              </Button>
              
              <div className="space-x-2">
                {currentStep !== 'basic-info' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const steps = ['basic-info', 'medical-history', 'insurance', 'consent'];
                      const currentIndex = steps.indexOf(currentStep);
                      setCurrentStep(steps[currentIndex - 1]);
                    }}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep !== 'consent' ? (
                  <Button
                    disabled={!isCurrentFormComplete}
                    onClick={() => {
                      const steps = ['basic-info', 'medical-history', 'insurance', 'consent'];
                      const currentIndex = steps.indexOf(currentStep);
                      setCurrentStep(steps[currentIndex + 1]);
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    disabled={!allFormsComplete || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PatientOnboarding;
