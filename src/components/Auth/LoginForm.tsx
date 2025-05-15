
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Shield, Key, User } from 'lucide-react';
import { toast } from 'sonner';
import RoleSelector from './RoleSelector';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock credentials for demo
      if (formData.username === 'admin' && formData.password === 'password') {
        toast.success('Login successful!');
        setShowRoleSelector(true);
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showRoleSelector) {
    return <RoleSelector />;
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 overflow-hidden">
      <CardHeader className="space-y-3 pb-6 pt-8 bg-slate-50">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 w-20 h-20 bg-primary/10 rounded-full">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center font-bold">MediSecure EMR</CardTitle>
        <CardDescription className="text-center text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="py-8 px-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="username" className="font-medium text-base">Username</Label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="pl-12 py-6 text-base"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-medium text-base">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 py-6 text-base"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full py-6 text-lg font-medium mt-2" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-slate-50 py-6">
        <div className="text-center text-sm text-muted-foreground w-full">
          <p className="mt-1">
            <span className="hipaa-badge text-xs">HIPAA Compliant</span>
            <span className="ml-2">Secure Sign-In</span>
          </p>
          <p className="mt-4 text-xs">Use admin/password for demo access</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
