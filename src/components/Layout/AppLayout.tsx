
import React from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{title || 'MediSecure EMR'}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 rounded-full bg-secondary"
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            <span className="hipaa-badge">HIPAA Compliant</span>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
