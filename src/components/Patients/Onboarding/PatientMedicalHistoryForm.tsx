
import React, { useState, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  chronicConditions: z.string().optional(),
  surgicalHistory: z.string().optional(),
  familyHistory: z.string().optional(),
  smokingStatus: z.boolean().default(false),
  alcoholUse: z.boolean().default(false),
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodPressure: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientMedicalHistoryFormProps {
  onComplete: (isComplete: boolean) => void;
}

const PatientMedicalHistoryForm = ({ onComplete }: PatientMedicalHistoryFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: "",
      medications: "",
      chronicConditions: "",
      surgicalHistory: "",
      familyHistory: "",
      smokingStatus: false,
      alcoholUse: false,
      height: "",
      weight: "",
      bloodPressure: "",
    },
  });
  
  // Always consider this form complete since fields are optional
  useEffect(() => {
    onComplete(true);
  }, [onComplete]);
  
  return (
    <CardContent className="p-6">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergies</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List any allergies (medications, foods, environmental)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="medications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Medications</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List all current medications with dosage and frequency"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="chronicConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chronic Conditions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List any chronic conditions (diabetes, hypertension, etc.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="surgicalHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surgical History</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List any previous surgeries with dates"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="familyHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Medical History</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List any significant family medical history"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Lifestyle</h3>
              
              <FormField
                control={form.control}
                name="smokingStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Smoking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="alcoholUse"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Alcohol Use</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Vital Signs</h3>
              
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input placeholder="175" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input placeholder="70" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Pressure</FormLabel>
                    <FormControl>
                      <Input placeholder="120/80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default PatientMedicalHistoryForm;
