
import React, { useState, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  hipaaConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the HIPAA Privacy Practices.",
  }),
  treatmentConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to treatment.",
  }),
  financialPolicyAgreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the financial policy.",
  }),
  communicationPreference: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientConsentFormProps {
  onComplete: (isComplete: boolean) => void;
}

const PatientConsentForm = ({ onComplete }: PatientConsentFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hipaaConsent: false,
      treatmentConsent: false,
      financialPolicyAgreement: false,
      communicationPreference: false,
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
        <form className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">HIPAA Notice of Privacy Practices</h3>
            <ScrollArea className="h-48 rounded-md border p-4">
              <div className="text-sm">
                <p className="mb-4">
                  This notice describes how medical information about you may be used and disclosed 
                  and how you can get access to this information. Please review it carefully.
                </p>
                <p className="mb-4">
                  <strong>Your Rights</strong><br />
                  You have the right to:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Get a copy of your paper or electronic medical record</li>
                  <li>Request correction to your medical record</li>
                  <li>Request confidential communication</li>
                  <li>Ask us to limit the information we share</li>
                  <li>Get a list of those with whom we've shared your information</li>
                  <li>Get a copy of this privacy notice</li>
                  <li>Choose someone to act for you</li>
                  <li>File a complaint if you believe your privacy rights have been violated</li>
                </ul>
                <p className="mb-4">
                  <strong>Our Uses and Disclosures</strong><br />
                  We may use and share your information as we:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Treat you</li>
                  <li>Run our organization</li>
                  <li>Bill for your services</li>
                  <li>Help with public health and safety issues</li>
                  <li>Comply with the law</li>
                  <li>Address workers' compensation, law enforcement, and other government requests</li>
                  <li>Respond to lawsuits and legal actions</li>
                </ul>
              </div>
            </ScrollArea>
            
            <FormField
              control={form.control}
              name="hipaaConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I acknowledge that I have received a copy of the HIPAA Notice of Privacy Practices *
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Consent to Treatment</h3>
            <ScrollArea className="h-32 rounded-md border p-4">
              <div className="text-sm">
                <p className="mb-4">
                  I voluntarily consent to receive medical and healthcare services provided by MediSecure EMR 
                  doctors, employees, and other healthcare providers. I understand these services may include 
                  diagnostic procedures, examinations, and treatments.
                </p>
                <p className="mb-4">
                  I acknowledge that no guarantees have been made to me about the results of treatments or 
                  examinations. I understand I have the right to refuse any procedure or treatment.
                </p>
              </div>
            </ScrollArea>
            
            <FormField
              control={form.control}
              name="treatmentConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to treatment and services *
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Financial Policy</h3>
            <ScrollArea className="h-32 rounded-md border p-4">
              <div className="text-sm">
                <p className="mb-4">
                  I understand that I am financially responsible for all charges whether or not paid by insurance. 
                  I authorize the use of my signature for all insurance submissions.
                </p>
                <p className="mb-4">
                  I understand that I am responsible for co-payments, deductibles, or non-covered services at the 
                  time of service. I understand there is a $25 fee for returned checks.
                </p>
              </div>
            </ScrollArea>
            
            <FormField
              control={form.control}
              name="financialPolicyAgreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the financial policy *
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="communicationPreference"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I consent to receive emails, text messages, and phone calls regarding appointments, 
                    treatment, and healthcare information
                  </FormLabel>
                  <FormDescription>
                    You can opt out at any time by contacting our office
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardContent>
  );
};

export default PatientConsentForm;
