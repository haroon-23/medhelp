
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ClipboardList, 
  FileText, 
  Home, 
  User, 
  Users, 
  Shield, 
  Wallet, 
  Headphones,
  LogOut,
  Prescription,
  MessageSquare,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';

interface SidebarProps {
  className?: string;
}

const RoleBasedSidebar = ({ className }: SidebarProps) => {
  const [userRole, setUserRole] = useState<string>('admin');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Calendar, label: 'Appointments', path: '/appointments' },
    ];

    const patientItems = [
      { icon: Home, label: 'Dashboard', path: '/patient/dashboard' },
      { icon: Calendar, label: 'My Appointments', path: '/patient/appointments' },
      { icon: FileText, label: 'Medical Records', path: '/patient/records' },
      { icon: Prescription, label: 'Prescriptions', path: '/patient/prescriptions' },
      { icon: MessageSquare, label: 'Messages', path: '/patient/messages' },
      { icon: Bell, label: 'Notifications', path: '/patient/notifications' },
    ];

    const doctorItems = [
      ...commonItems,
      { icon: Users, label: 'Patients', path: '/patients' },
      { icon: FileText, label: 'Medical Records', path: '/records' },
      { icon: Headphones, label: 'Voice Bot Analytics', path: '/voice-analytics' },
    ];

    const adminItems = [
      ...commonItems,
      { icon: Users, label: 'Patients', path: '/patients' },
      { icon: FileText, label: 'Medical Records', path: '/records' },
      { icon: ClipboardList, label: 'Reports', path: '/reports' },
      { icon: Shield, label: 'HIPAA Compliance', path: '/compliance' },
      { icon: Wallet, label: 'Billing', path: '/billing' },
      { icon: Headphones, label: 'Voice Bot Analytics', path: '/voice-analytics' },
    ];

    switch (userRole) {
      case 'patient':
        return patientItems;
      case 'doctor':
        return doctorItems;
      case 'admin':
      default:
        return adminItems;
    }
  };

  const menuItems = getMenuItems();

  const getRoleTitle = () => {
    switch (userRole) {
      case 'patient':
        return 'Jane Smith';
      case 'doctor':
        return 'Dr. Sarah Johnson';
      case 'admin':
      default:
        return 'Administrator';
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className={cn("w-64 h-screen bg-sidebar flex-shrink-0 border-r border-sidebar-border flex flex-col", className)}>
      <div className="p-4">
        <h2 className="text-lg font-bold text-sidebar-foreground flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          <span className="truncate">MediSecure EMR</span>
        </h2>
      </div>
      
      <nav className="px-3 mt-2 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm",
                  isActive && "bg-sidebar-accent font-medium"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-sidebar-foreground" />
          </div>
          <div className="text-sidebar-foreground overflow-hidden">
            <p className="text-sm font-medium truncate">{getRoleTitle()}</p>
            <p className="text-xs opacity-70 truncate">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full border-sidebar-foreground/20 text-sidebar-foreground flex items-center justify-center gap-2 py-1 text-sm"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default RoleBasedSidebar;
