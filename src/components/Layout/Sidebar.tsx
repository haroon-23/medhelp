
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, ClipboardList, FileCheck, Home, User, Users, Shield } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: ClipboardList, label: 'Medical Records', path: '/records' },
    { icon: FileCheck, label: 'Reports', path: '/reports' },
    { icon: Shield, label: 'HIPAA Compliance', path: '/compliance' },
  ];

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
        <div className="flex items-center gap-3 p-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-4 w-4 text-sidebar-foreground" />
          </div>
          <div className="text-sidebar-foreground">
            <p className="text-sm font-medium">Dr. Sarah Johnson</p>
            <p className="text-xs opacity-70">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
