
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, FileText, Shield, Users } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Select Your Role
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the role that best matches your responsibilities to access the appropriate dashboard and features
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {[
          {
            title: "Doctor",
            icon: <User className="h-14 w-14 text-blue-600" />,
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
            title: "Staff",
            icon: <Users className="h-14 w-14 text-indigo-600" />,
            iconBg: "bg-indigo-100",
            description: "Manage appointments, billing, and basic patient information",
            features: [
              { icon: <Calendar className="h-5 w-5 text-green-600" />, text: "Appointment scheduling" },
              { icon: <FileText className="h-5 w-5 text-green-600" />, text: "Billing management" },
              { icon: <User className="h-5 w-5 text-green-600" />, text: "Basic patient info" }
            ],
            role: "staff"
          },
          {
            title: "Administrator",
            icon: <Shield className="h-14 w-14 text-purple-600" />,
            iconBg: "bg-purple-100",
            description: "Complete system access with HIPAA compliance and reporting",
            features: [
              { icon: <Users className="h-5 w-5 text-green-600" />, text: "Full system access" },
              { icon: <Shield className="h-5 w-5 text-green-600" />, text: "HIPAA compliance tools" },
              { icon: <FileText className="h-5 w-5 text-green-600" />, text: "Advanced reporting" }
            ],
            role: "admin"
          }
        ].map((role, index) => (
          <Card 
            key={index} 
            className="border-2 rounded-lg hover:shadow-lg transition-all duration-300 mb-4 hover:scale-[1.01] animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex flex-col md:flex-row">
              <CardHeader className="md:w-1/3 bg-slate-50 p-6 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className={`p-4 h-24 w-24 ${role.iconBg} rounded-lg flex items-center justify-center mb-3 mx-auto transition-all duration-300 hover:scale-105`}>
                    {role.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="py-6 px-8 md:w-2/3 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {role.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
                      style={{ animationDelay: `${(index * 150) + (idx * 100)}ms` }}
                    >
                      <span className="bg-green-100 p-2 rounded-full flex-shrink-0">
                        {feature.icon}
                      </span>
                      <span className="text-base">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full">
                  <Button 
                    className="w-full py-6 font-semibold text-base transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]" 
                    onClick={() => handleRoleSelect(role.role)}
                  >
                    Log in as {role.title}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
