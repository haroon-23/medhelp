
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
    <div className="container max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Doctor",
            icon: <User className="h-7 w-7 text-blue-600" />,
            iconBg: "bg-blue-50",
            description: "Access patient records, appointments, and voice bot analytics",
            features: [
              { text: "Full patient management", icon: <User className="h-3 w-3 text-green-600" /> },
              { text: "Voice bot analytics", icon: <Calendar className="h-3 w-3 text-green-600" /> },
              { text: "Medical record access", icon: <FileText className="h-3 w-3 text-green-600" /> }
            ],
            role: "doctor"
          },
          {
            title: "Staff",
            icon: <Users className="h-7 w-7 text-indigo-600" />,
            iconBg: "bg-indigo-50",
            description: "Manage appointments, billing, and basic patient information",
            features: [
              { text: "Appointment scheduling", icon: <Calendar className="h-3 w-3 text-green-600" /> },
              { text: "Billing management", icon: <FileText className="h-3 w-3 text-green-600" /> },
              { text: "Basic patient info", icon: <User className="h-3 w-3 text-green-600" /> }
            ],
            role: "staff"
          },
          {
            title: "Administrator",
            icon: <Shield className="h-7 w-7 text-purple-600" />,
            iconBg: "bg-purple-50",
            description: "Complete system access with HIPAA compliance and reporting",
            features: [
              { text: "Full system access", icon: <Users className="h-3 w-3 text-green-600" /> },
              { text: "HIPAA compliance tools", icon: <Shield className="h-3 w-3 text-green-600" /> },
              { text: "Advanced reporting", icon: <FileText className="h-3 w-3 text-green-600" /> }
            ],
            role: "admin"
          }
        ].map((role, index) => (
          <Card key={index} className="shadow-lg border-2 overflow-hidden h-full flex flex-col">
            <CardHeader className="pb-3 bg-slate-50">
              <div className={`p-2 w-14 h-14 ${role.iconBg} rounded-lg flex items-center justify-center mb-3`}>
                {role.icon}
              </div>
              <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
              <CardDescription className="text-sm">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-grow pt-4">
              <ul className="space-y-3">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="bg-green-50 p-1 rounded-full">
                      {feature.icon}
                    </span>
                    <span className="text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-2 pb-4 bg-slate-50">
              <Button 
                className="w-full py-5 font-medium text-base" 
                onClick={() => handleRoleSelect(role.role)}
              >
                Log in as {role.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
