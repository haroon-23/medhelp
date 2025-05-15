
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
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Full patient management</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <Calendar className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Voice bot analytics</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <FileText className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Medical record access</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="pt-5">
          <Button className="w-full" onClick={() => handleRoleSelect('doctor')}>
            Log in as Doctor
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <div className="p-2 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <CardTitle>Staff</CardTitle>
          <CardDescription>
            Manage appointments, billing, and basic patient information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <Calendar className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Appointment scheduling</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <FileText className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Billing management</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <User className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Basic patient info</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="pt-5">
          <Button className="w-full" onClick={() => handleRoleSelect('staff')}>
            Log in as Staff
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <div className="p-2 w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-purple-600" />
          </div>
          <CardTitle>Administrator</CardTitle>
          <CardDescription>
            Complete system access with HIPAA compliance and reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <Users className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Full system access</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <Shield className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">HIPAA compliance tools</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-50 p-1 rounded-full mr-2">
                <FileText className="h-3 w-3 text-green-600" />
              </span>
              <span className="text-sm">Advanced reporting</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="pt-5">
          <Button className="w-full" onClick={() => handleRoleSelect('admin')}>
            Log in as Admin
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleSelector;
