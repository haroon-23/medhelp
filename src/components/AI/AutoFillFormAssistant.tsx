
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, UserPlus, FileText, Bot } from 'lucide-react';
import { toast } from 'sonner';

const AutoFillFormAssistant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [patientFound, setPatientFound] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    insurance: '',
    policyNumber: '',
    allergies: '',
    medications: '',
    reason: ''
  });

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.error('Please enter a search term');
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock patient found - in production this would come from your database
      if (searchTerm.toLowerCase().includes('john') || searchTerm.toLowerCase().includes('doe')) {
        setFormData({
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1985-06-15',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          address: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
          insurance: 'BlueCross BlueShield',
          policyNumber: 'BC1234567',
          allergies: 'Penicillin',
          medications: 'Lisinopril 10mg daily',
          reason: ''
        });
        setPatientFound(true);
        toast.success('Patient found! Form pre-filled with patient data.');
      } else {
        setPatientFound(false);
        toast.error('No patient found with those details');
      }
    } catch (error) {
      console.error('Error searching for patient:', error);
      toast.error('An error occurred while searching');
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Form submitted successfully');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Patient Intake Form</CardTitle>
            <CardDescription>AI-powered auto-fill assistant</CardDescription>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 border p-4 rounded-md bg-muted/20">
          <div className="text-sm font-medium mb-2">Search for existing patient</div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Search'
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Enter patient details to auto-fill the form or enter new information below
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => handleSelectChange('state', value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input
                  id="insurance"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="List any allergies or type 'None'"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Input
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                placeholder="List current medications or type 'None'"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="Briefly describe the reason for your visit"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            setFormData({
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              insurance: '',
              policyNumber: '',
              allergies: '',
              medications: '',
              reason: ''
            });
            setPatientFound(false);
          }}
        >
          Clear Form
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {patientFound ? 'Update & Submit' : 'Submit Form'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutoFillFormAssistant;
