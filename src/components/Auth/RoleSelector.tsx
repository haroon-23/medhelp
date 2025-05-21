
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Calendar, LogOut, FileText } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    navigate(role === 'patient' ? '/patient/dashboard' : '/dashboard');
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-6">
      <div className="text-center mb-6 animate-fade-in">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
          Select Your Role
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Choose the role that best matches your responsibilities
        </p>
      </div>

      <div className="flex flex-col space-y-6">
        {[
          {
            title: "Patient",
            icon: <User className="h-10 w-10 text-green-600" />,
            iconBg: "bg-green-100",
            description: "Access your medical records, appointments, and prescriptions",
            features: [
              { icon: <FileText className="h-4 w-4 text-green-600" />, text: "Medical records" },
              { icon: <Calendar className="h-4 w-4 text-green-600" />, text: "Appointments" }
            ],
            role: "patient"
          },
          {
            title: "Doctor",
            icon: <User className="h-10 w-10 text-blue-600" />,
            iconBg: "bg-blue-100",
            description: "Access patient records and appointments",
            features: [
              { icon: <User className="h-4 w-4 text-green-600" />, text: "Patient management" },
              { icon: <Calendar className="h-4 w-4 text-green-600" />, text: "Voice analytics" }
            ],
            role: "doctor"
          },
          {
            title: "Administrator",
            icon: <Shield className="h-10 w-10 text-purple-600" />,
            iconBg: "bg-purple-100",
            description: "Complete system access with compliance tools",
            features: [
              { icon: <User className="h-4 w-4 text-green-600" />, text: "Full access" },
              { icon: <Shield className="h-4 w-4 text-green-600" />, text: "HIPAA tools" }
            ],
            role: "admin"
          }
        ].map((role, index) => (
          <Card 
            key={index} 
            className="border-2 rounded-lg hover:shadow-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="p-4 bg-slate-50 flex items-center justify-center md:w-[150px] border-b md:border-b-0 md:border-r">
                <div className={`p-4 ${role.iconBg} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105`}>
                  {role.icon}
                </div>
              </div>
              
              <div className="flex-1 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 pb-2">
                    <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                  
                  <div className="px-4 pb-3 flex-1">
                    <div className="grid grid-cols-2 gap-2">
                      {role.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
                        >
                          <span className="bg-green-100 p-1.5 rounded-full flex-shrink-0">
                            {feature.icon}
                          </span>
                          <span className="text-xs">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 p-4 pt-2 border-t">
                    <Button 
                      className="w-full py-2 text-sm font-medium transition-all duration-300 hover:bg-primary/90" 
                      onClick={() => handleRoleSelect(role.role)}
                    >
                      Log in as {role.title}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-1 text-xs"
                      onClick={() => navigate('/')}
                    >
                      <LogOut className="h-3 w-3" />
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
