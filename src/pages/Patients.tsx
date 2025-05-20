
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import PatientCard, { PatientData } from '@/components/Patients/PatientCard';
import PatientDetail from '@/components/Patients/PatientDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Plus, Search, UserPlus, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Mock patient data
const mockPatients: PatientData[] = [
  {
    id: "PT-1001",
    name: "Robert Chen",
    dateOfBirth: "04/15/1978",
    phone: "(555) 123-4567",
    email: "robert.chen@example.com",
    lastVisit: "10/12/2024",
    nextAppointment: "11/15/2024",
    status: "Active",
    insuranceProvider: "Blue Cross"
  },
  {
    id: "PT-1002",
    name: "Lisa Johnson",
    dateOfBirth: "09/23/1985",
    phone: "(555) 234-5678",
    email: "lisa.johnson@example.com",
    lastVisit: "10/10/2024",
    status: "Active",
    insuranceProvider: "Medicare"
  },
  {
    id: "PT-1003",
    name: "Marcus Williams",
    dateOfBirth: "06/17/1990",
    phone: "(555) 345-6789",
    email: "marcus.williams@example.com",
    lastVisit: "09/28/2024",
    nextAppointment: "10/28/2024",
    status: "Active",
    insuranceProvider: "Aetna"
  },
  {
    id: "PT-1004",
    name: "Emma Garcia",
    dateOfBirth: "12/03/1965",
    phone: "(555) 456-7890",
    email: "emma.garcia@example.com",
    lastVisit: "10/05/2024",
    status: "New",
    insuranceProvider: "Humana"
  },
  {
    id: "PT-1005",
    name: "David Kim",
    dateOfBirth: "03/21/1972",
    phone: "(555) 567-8901",
    email: "david.kim@example.com",
    lastVisit: "08/15/2024",
    status: "Inactive",
    insuranceProvider: "United Healthcare"
  },
  {
    id: "PT-1006",
    name: "Sarah Martinez",
    dateOfBirth: "11/09/1988",
    phone: "(555) 678-9012",
    email: "sarah.martinez@example.com",
    lastVisit: "10/01/2024",
    nextAppointment: "11/05/2024",
    status: "Active",
    insuranceProvider: "Cigna"
  },
  {
    id: "PT-1007",
    name: "James Wilson",
    dateOfBirth: "07/28/1953",
    phone: "(555) 789-0123",
    email: "james.wilson@example.com",
    lastVisit: "09/20/2024",
    status: "Urgent",
    insuranceProvider: "Medicare"
  },
  {
    id: "PT-1008",
    name: "Olivia Thompson",
    dateOfBirth: "02/14/1995",
    phone: "(555) 890-1234",
    email: "olivia.thompson@example.com",
    lastVisit: "10/08/2024",
    nextAppointment: "10/22/2024",
    status: "Active",
    insuranceProvider: "Blue Shield"
  }
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const filteredPatients = mockPatients.filter(patient => {
    // Filter by search term
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      activeFilter === 'all' || 
      patient.status.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handlePatientClick = (patient: PatientData) => {
    setSelectedPatient(patient);
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
  };

  const handleAddPatient = () => {
    setShowAddDialog(true);
  };

  return (
    <AppLayout title="Patient Management">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Patients</h2>
            <p className="text-sm text-muted-foreground">
              Manage your patient database
            </p>
          </div>
          
          <Button onClick={handleAddPatient}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div>
              <Label className="sr-only">Filter by status</Label>
              <Tabs 
                defaultValue="all" 
                className="w-full sm:w-auto"
                onValueChange={setActiveFilter}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="urgent">Urgent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
        
        {selectedPatient ? (
          <PatientDetail patient={selectedPatient} onClose={handleCloseDetail} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <PatientCard 
                  key={patient.id} 
                  patient={patient} 
                  onViewDetails={handlePatientClick}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full p-3 bg-muted">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No patients found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleAddPatient}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold">Add New Patient</h2>
            <p className="text-muted-foreground mt-1">
              This is a placeholder. Form fields would go here in a real implementation.
            </p>
            <div className="mt-4">
              <Button className="w-full" onClick={() => {
                toast.success("Patient creation functionality will be implemented in a future update");
                setShowAddDialog(false);
              }}>
                Save Patient
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Patients;
