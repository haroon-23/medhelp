
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const PatientMessages = () => {
  return (
    <AppLayout title="Messages">
      <Card>
        <CardHeader>
          <CardTitle>My Messages</CardTitle>
          <CardDescription>
            Communicate securely with your healthcare providers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Message Center</h3>
          <p className="text-sm text-muted-foreground">
            This feature is coming soon. You'll be able to securely message your healthcare providers.
          </p>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default PatientMessages;
