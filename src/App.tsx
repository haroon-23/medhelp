
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientOnboarding from "./pages/PatientOnboarding";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import MedicalRecords from "./pages/MedicalRecords";
import Compliance from "./pages/Compliance";
import Billing from "./pages/Billing";
import VoiceBotAnalytics from "./pages/VoiceBotAnalytics";
import NotFound from "./pages/NotFound";
import './components/Chat/chatbot.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient-onboarding" element={<PatientOnboarding />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/voice-analytics" element={<VoiceBotAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
