
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
      // For demo purposes, we'll just simulate a successful login
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
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="mb-6 shadow">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-1">Select Your Role</CardTitle>
            <CardDescription className="text-base">
              Choose your role to access the appropriate interface
            </CardDescription>
          </CardHeader>
        </Card>
        
        <RoleSelector />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-center mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">MediSecure EMR</CardTitle>
        <CardDescription className="text-center text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="pl-9"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 mt-2" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-center text-xs text-muted-foreground w-full">
          <p className="mt-1">
            <span className="hipaa-badge text-[10px]">HIPAA Compliant</span>
            <span className="ml-1">Secure Sign-In</span>
          </p>
          <p className="mt-4 text-[10px]">Use admin/password for demo access</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
