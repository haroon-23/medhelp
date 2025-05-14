
import React, { useEffect, useState } from 'react';
import RoleBasedSidebar from './RoleBasedSidebar';
import { cn } from '@/lib/utils';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AIChatbot from '../Chat/AIChatbot';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in with a role
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole) {
      toast.error('Please log in to continue');
      navigate('/');
    } else {
      setUserRole(storedRole);
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <RoleBasedSidebar />
      
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
                className="pl-8 w-[200px] rounded-full bg-secondary"
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
      
      <AIChatbot />
    </div>
  );
};

export default AppLayout;
