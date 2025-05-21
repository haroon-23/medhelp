
import React, { useState, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  insuranceProvider: z.string().min(2, { message: "Please select an insurance provider." }),
  policyNumber: z.string().min(5, { message: "Policy number must be at least 5 characters." }),
  groupNumber: z.string().optional(),
  primaryInsuredName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  primaryInsuredRelationship: z.string().min(1, { message: "Please select a relationship." }),
  primaryInsuredDateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please enter a valid date." }),
  secondaryInsurance: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientInsuranceFormProps {
  onComplete: (isComplete: boolean) => void;
}

const PatientInsuranceForm = ({ onComplete }: PatientInsuranceFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insuranceProvider: "",
      policyNumber: "",
      groupNumber: "",
      primaryInsuredName: "",
      primaryInsuredRelationship: "",
      primaryInsuredDateOfBirth: "",
    },
  });
  
  // Check form validity whenever values change
  const formValues = form.watch();
  useEffect(() => {
    const isValid = form.formState.isValid;
    onComplete(isValid);
  }, [formValues, form.formState.isValid, onComplete]);
  
  return (
    <CardContent className="p-6">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="insuranceProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance Provider *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="humana">Humana</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="medicaid">Medicaid</SelectItem>
                    <SelectItem value="united">United Healthcare</SelectItem>
                    <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="policyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="XYZ123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="groupNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Number (if applicable)</FormLabel>
                  <FormControl>
                    <Input placeholder="GRP1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Primary Insured Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="primaryInsuredName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="primaryInsuredRelationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship to Patient *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="guardian">Legal Guardian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="primaryInsuredDateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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

export default PatientInsuranceForm;
