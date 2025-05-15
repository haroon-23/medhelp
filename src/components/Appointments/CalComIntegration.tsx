
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar, Bell, Link } from 'lucide-react';

const CalComIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [calUsername, setCalUsername] = useState('');
  const [eventType, setEventType] = useState('consultation');
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    notifications: true,
    twoWay: false
  });

  const handleConnect = () => {
    if (!apiKey || !calUsername) {
      toast.error('Please enter both API key and Cal.com username');
      return;
    }
    
    // In a production app, this would validate with the Cal.com API
    setTimeout(() => {
      setIsConnected(true);
      toast.success('Successfully connected to Cal.com');
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info('Disconnected from Cal.com');
  };

  const handleSaveSettings = () => {
    toast.success('Synchronization settings saved');
  };

  const eventTypes = [
    { id: 'consultation', name: 'Doctor Consultation (15 min)' },
    { id: 'followup', name: 'Follow-up Visit (30 min)' },
    { id: 'initial', name: 'Initial Consultation (45 min)' },
    { id: 'emergency', name: 'Emergency Slot (15 min)' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Cal.com Integration
        </CardTitle>
        <CardDescription>
          Synchronize appointments with your Cal.com calendar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Cal.com API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Cal.com API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                You can find your API key in your Cal.com dashboard under Settings &gt; Developer &gt; API Keys
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Cal.com Username</Label>
              <Input
                id="username"
                placeholder="Enter your Cal.com username"
                value={calUsername}
                onChange={(e) => setCalUsername(e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={handleConnect}>
              Connect to Cal.com
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Connected to Cal.com</p>
                  <p className="text-sm text-muted-foreground">{calUsername}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Appointment Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Default Event Type</Label>
                  <Select 
                    value={eventType} 
                    onValueChange={setEventType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-sync">Auto-Synchronization</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync new appointments
                    </p>
                  </div>
                  <Switch 
                    id="auto-sync" 
                    checked={syncSettings.autoSync}
                    onCheckedChange={(checked) => setSyncSettings({...syncSettings, autoSync: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive Cal.com notifications in MediSecure
                    </p>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={syncSettings.notifications}
                    onCheckedChange={(checked) => setSyncSettings({...syncSettings, notifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-way">Two-way Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Changes in either system update the other
                    </p>
                  </div>
                  <Switch 
                    id="two-way" 
                    checked={syncSettings.twoWay}
                    onCheckedChange={(checked) => setSyncSettings({...syncSettings, twoWay: checked})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {isConnected && (
        <CardFooter className="flex justify-between border-t pt-5">
          <Button variant="outline" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Open Cal.com Dashboard
          </Button>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CalComIntegration;
