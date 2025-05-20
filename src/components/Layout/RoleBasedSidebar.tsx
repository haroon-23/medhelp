
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const RoleBasedSidebar = ({ className }: SidebarProps) => {
  const [userRole, setUserRole] = useState<string>('admin');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // Define menu items based on user role - removed staff role
  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Calendar, label: 'Appointments', path: '/appointments' },
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
      case 'doctor':
        return 'Dr. Sarah Johnson';
      case 'admin':
      default:
        return 'Administrator';
    }
  };

  return (
    <div className={cn("w-64 h-screen bg-sidebar flex-shrink-0 border-r border-sidebar-border", className)}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-sidebar-foreground flex items-center">
          <Shield className="mr-2 h-6 w-6" />
          MediSecure EMR
        </h2>
      </div>
      
      <nav className="px-3 mt-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                  isActive && "bg-sidebar-accent font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-4 w-4 text-sidebar-foreground" />
          </div>
          <div className="text-sidebar-foreground">
            <p className="text-sm font-medium">{getRoleTitle()}</p>
            <p className="text-xs opacity-70">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full border-sidebar-foreground/20 text-sidebar-foreground"
          onClick={() => {
            localStorage.removeItem('userRole');
            window.location.href = '/';
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default RoleBasedSidebar;
