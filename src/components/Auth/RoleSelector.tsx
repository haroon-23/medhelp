
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
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Select Your Role
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the role that best matches your responsibilities to access the appropriate dashboard and features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Doctor",
            icon: <User className="h-10 w-10 text-blue-600" />,
            iconBg: "bg-blue-100",
            description: "Access patient records, appointments, and voice bot analytics",
            features: [
              { text: "Full patient management", icon: <User className="h-4 w-4 text-green-600" /> },
              { text: "Voice bot analytics", icon: <Calendar className="h-4 w-4 text-green-600" /> },
              { text: "Medical record access", icon: <FileText className="h-4 w-4 text-green-600" /> }
            ],
            role: "doctor"
          },
          {
            title: "Staff",
            icon: <Users className="h-10 w-10 text-indigo-600" />,
            iconBg: "bg-indigo-100",
            description: "Manage appointments, billing, and basic patient information",
            features: [
              { text: "Appointment scheduling", icon: <Calendar className="h-4 w-4 text-green-600" /> },
              { text: "Billing management", icon: <FileText className="h-4 w-4 text-green-600" /> },
              { text: "Basic patient info", icon: <User className="h-4 w-4 text-green-600" /> }
            ],
            role: "staff"
          },
          {
            title: "Administrator",
            icon: <Shield className="h-10 w-10 text-purple-600" />,
            iconBg: "bg-purple-100",
            description: "Complete system access with HIPAA compliance and reporting",
            features: [
              { text: "Full system access", icon: <Users className="h-4 w-4 text-green-600" /> },
              { text: "HIPAA compliance tools", icon: <Shield className="h-4 w-4 text-green-600" /> },
              { text: "Advanced reporting", icon: <FileText className="h-4 w-4 text-green-600" /> }
            ],
            role: "admin"
          }
        ].map((role, index) => (
          <Card key={index} className="shadow-lg border-2 overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-6 pt-8 bg-slate-50">
              <div className={`p-4 w-20 h-20 ${role.iconBg} rounded-lg flex items-center justify-center mb-5 mx-auto`}>
                {role.icon}
              </div>
              <CardTitle className="text-2xl font-bold text-center mb-2">{role.title}</CardTitle>
              <CardDescription className="text-base text-center">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6 px-8 flex-grow">
              <ul className="space-y-5">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="bg-green-100 p-1.5 rounded-full flex-shrink-0">
                      {feature.icon}
                    </span>
                    <span className="text-base">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4 pb-8 px-8 bg-slate-50">
              <Button 
                className="w-full py-6 font-semibold text-lg" 
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
