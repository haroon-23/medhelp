
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, UserCog, Users } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    navigate('/dashboard');
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <div className="p-2 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Doctor</CardTitle>
          <CardDescription>
            Access patient records, appointments, voice bot analytics, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Full patient management
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Voice bot analytics
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Medical record access
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleRoleSelect('doctor')}>
            Log in as Doctor
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <div className="p-2 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-2">
            <UserCog className="h-6 w-6 text-indigo-600" />
          </div>
          <CardTitle>Staff</CardTitle>
          <CardDescription>
            Manage appointments, billing, and basic patient information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Appointment scheduling
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Billing management
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Basic patient info
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleRoleSelect('staff')}>
            Log in as Staff
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <div className="p-2 w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <CardTitle>Administrator</CardTitle>
          <CardDescription>
            Complete system access with HIPAA compliance and reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Full system access
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              HIPAA compliance tools
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-0.5 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              Advanced reporting
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleRoleSelect('admin')}>
            Log in as Admin
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleSelector;
