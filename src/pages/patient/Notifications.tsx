
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const PatientNotifications = () => {
  return (
    <AppLayout title="Notifications">
      <Card>
        <CardHeader>
          <CardTitle>My Notifications</CardTitle>
          <CardDescription>
            Stay up-to-date with important healthcare reminders and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Notification Center</h3>
          <p className="text-sm text-muted-foreground">
            This feature is coming soon. You'll receive notifications about appointments, prescriptions, and other health updates.
          </p>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default PatientNotifications;
