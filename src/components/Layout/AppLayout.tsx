
import React, { useEffect, useState } from 'react';
import RoleBasedSidebar from './RoleBasedSidebar';
import { cn } from '@/lib/utils';
import { Bell, Search, LogOut } from 'lucide-react';
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

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden text-ellipsis">
      <RoleBasedSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-white shadow-sm animate-fade-in">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold truncate max-w-[200px] md:max-w-[300px]">
              {title || 'MediSecure EMR'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[150px] md:w-[250px] rounded-full bg-secondary"
              />
            </div>
            
            <Button variant="outline" size="icon" className="transition-all duration-300 hover:bg-secondary hidden sm:flex">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button 
              variant="outline"
              className="flex items-center gap-1 border-sidebar-foreground/20 text-sidebar-foreground whitespace-nowrap"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Sign Out</span>
            </Button>
            
            <span className="hipaa-badge text-xs whitespace-nowrap bg-blue-50 px-2 py-1 rounded-full border border-blue-200 text-blue-600 text-[10px] sm:text-xs">
              HIPAA Compliant
            </span>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/30">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      
      <AIChatbot />
    </div>
  );
};

export default AppLayout;
