
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
    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
      {[
        {
          title: "Doctor",
          icon: <User className="h-6 w-6 text-blue-600" />,
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
          icon: <Users className="h-6 w-6 text-indigo-600" />,
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
          icon: <Shield className="h-6 w-6 text-purple-600" />,
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
        <Card key={index} className="transition-all hover:shadow-md flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className={`p-2 w-12 h-12 ${role.iconBg} rounded-lg flex items-center justify-center mb-3`}>
              {role.icon}
            </div>
            <CardTitle className="text-xl mb-1">{role.title}</CardTitle>
            <CardDescription className="text-sm">
              {role.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4 flex-grow">
            <ul className="space-y-2">
              {role.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="bg-green-50 p-1 rounded-full mr-2">
                    {feature.icon}
                  </span>
                  <span className="text-sm">{feature.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect(role.role)}
            >
              Log in as {role.title}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RoleSelector;
