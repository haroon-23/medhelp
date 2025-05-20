
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, LinkIcon, Check, Settings, ArrowRight, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CalendarIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [calendarUrl, setCalendarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    automaticSync: true,
    sendReminders: true,
    aiAssistant: true,
    autoFillForms: false,
    reminderTiming: '24'
  });

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey || !calendarUrl) {
      toast.error('Please enter both API key and calendar URL');
      return;
    }

    setIsLoading(true);
    
    // Simulate API connection
    try {
      // In a real app, this would be an API call to Cal.com
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsConnected(true);
      toast.success('Connected to Cal.com successfully!');
    } catch (error) {
      toast.error('Failed to connect to Cal.com');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey('');
    setCalendarUrl('');
    toast.info('Disconnected from Cal.com');
  };

  const handleSettingChange = (setting: keyof typeof settings, value: any) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    toast.success(`Setting updated: ${setting}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-card pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl truncate">Cal.com Integration</CardTitle>
            <CardDescription>Connect your calendar and manage appointments</CardDescription>
          </div>
          <div className="p-2 bg-blue-50 rounded-full">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!isConnected ? (
          <form onSubmit={handleConnect}>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="apiKey">Cal.com API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your Cal.com API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="calendarUrl">Calendar URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="calendarUrl"
                    type="text"
                    placeholder="yourusername"
                    value={calendarUrl}
                    onChange={(e) => setCalendarUrl(e.target.value)}
                    required
                  />
                  <span className="flex items-center text-muted-foreground whitespace-nowrap">.cal.com</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your Cal.com username or custom URL
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <Check className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-green-700">Successfully Connected</div>
                <div className="text-sm text-green-600">Your Cal.com calendar is linked and syncing</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <Label htmlFor="automatic-sync" className="text-sm">Automatic Sync</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically sync appointments with Cal.com
                  </p>
                </div>
                <Switch
                  id="automatic-sync"
                  checked={settings.automaticSync}
                  onCheckedChange={(checked) => handleSettingChange('automaticSync', checked)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <Label htmlFor="send-reminders" className="text-sm">Send Reminders</Label>
                  <p className="text-xs text-muted-foreground">
                    Send automated reminders for appointments
                  </p>
                </div>
                <Switch
                  id="send-reminders"
                  checked={settings.sendReminders}
                  onCheckedChange={(checked) => handleSettingChange('sendReminders', checked)}
                />
              </div>

              {settings.sendReminders && (
                <div className="ml-6 border-l-2 border-l-muted pl-4 mt-2">
                  <Label htmlFor="reminder-timing" className="text-sm mb-1 block">Reminder Timing</Label>
                  <Select
                    value={settings.reminderTiming}
                    onValueChange={(value) => handleSettingChange('reminderTiming', value)}
                  >
                    <SelectTrigger className="w-full max-w-[180px]">
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="12">12 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 mt-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Reminders will be sent to patients via email and SMS
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-assistant" className="text-sm">AI Assistant</Label>
                  <p className="text-xs text-muted-foreground">
                    Use AI to help schedule and manage appointments
                  </p>
                </div>
                <Switch
                  id="ai-assistant"
                  checked={settings.aiAssistant}
                  onCheckedChange={(checked) => handleSettingChange('aiAssistant', checked)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-fill" className="text-sm">Auto-Fill Forms</Label>
                  <p className="text-xs text-muted-foreground">
                    Auto-fill intake forms using patient records
                  </p>
                </div>
                <Switch
                  id="auto-fill"
                  checked={settings.autoFillForms}
                  onCheckedChange={(checked) => handleSettingChange('autoFillForms', checked)}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <div className="font-medium">View Your Calendar</div>
                <div className="text-sm text-muted-foreground">Open Cal.com dashboard</div>
              </div>
              <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                <LinkIcon className="h-4 w-4" />
                Open Cal.com
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className={cn("border-t p-4", !isConnected && "flex justify-end")}>
        {!isConnected ? (
          <Button type="submit" onClick={handleConnect} disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Connect with Cal.com'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        ) : (
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={handleDisconnect}>
              Disconnect
            </Button>
            <Button variant="outline" className="gap-1">
              <Settings className="h-4 w-4" />
              Advanced Settings
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CalendarIntegration;
