
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Shield, Calendar } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
          Select Your Role
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the role that best matches your responsibilities to access the appropriate dashboard and features
        </p>
      </div>

      <div className="flex flex-col space-y-6">
        {[
          {
            title: "Doctor",
            icon: <User className="h-12 w-12 text-blue-600" />,
            iconBg: "bg-blue-100",
            description: "Access patient records, appointments, and voice bot analytics",
            features: [
              { icon: <User className="h-5 w-5 text-green-600" />, text: "Full patient management" },
              { icon: <Calendar className="h-5 w-5 text-green-600" />, text: "Voice bot analytics" },
              { icon: <FileText className="h-5 w-5 text-green-600" />, text: "Medical record access" }
            ],
            role: "doctor"
          },
          {
            title: "Administrator",
            icon: <Shield className="h-12 w-12 text-purple-600" />,
            iconBg: "bg-purple-100",
            description: "Complete system access with HIPAA compliance and reporting",
            features: [
              { icon: <User className="h-5 w-5 text-green-600" />, text: "Full system access" },
              { icon: <Shield className="h-5 w-5 text-green-600" />, text: "HIPAA compliance tools" },
              { icon: <FileText className="h-5 w-5 text-green-600" />, text: "Advanced reporting" }
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
              <div className="p-6 bg-slate-50 flex items-center justify-center md:w-[200px] border-b md:border-b-0 md:border-r">
                <div className={`p-6 ${role.iconBg} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105`}>
                  {role.icon}
                </div>
              </div>
              
              <div className="flex-1 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 pb-3">
                    <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  
                  <div className="px-6 pb-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {role.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
                          style={{ animationDelay: `${(index * 150) + (idx * 100)}ms` }}
                        >
                          <span className="bg-green-100 p-2 rounded-full flex-shrink-0">
                            {feature.icon}
                          </span>
                          <span className="text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto p-6 pt-3 border-t">
                    <Button 
                      className="w-full py-5 font-semibold text-base transition-all duration-300 hover:bg-primary/90" 
                      onClick={() => handleRoleSelect(role.role)}
                    >
                      Log in as {role.title}
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
