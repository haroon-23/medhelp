import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/Auth/LoginForm';
import { Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Redirect if already logged in (would use a proper auth check in real app)
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="flex h-14 items-center px-4 lg:px-6 bg-background border-b">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span>MediSecure EMR</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </a>
          <a href="#security" className="text-sm font-medium hover:underline underline-offset-4">
            Security
          </a>
          <a href="#compliance" className="text-sm font-medium hover:underline underline-offset-4">
            Compliance
          </a>
        </nav>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-muted/30">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="flex flex-col space-y-4 md:w-1/2">
              <div className="inline-block mb-2">
                <span className="hipaa-badge">HIPAA Compliant</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Secure Healthcare Management System
              </h1>
              <p className="text-muted-foreground md:text-lg max-w-[600px]">
                A modern EMR/CRM solution designed for hospitals and clinics, with built-in HIPAA compliance 
                and powerful patient management tools.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need for Patient Care
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools to streamline healthcare operations and improve patient outcomes.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Patient Management",
                  description: "Efficiently track and manage patient information, medical history, and care plans.",
                },
                {
                  title: "Appointment Scheduling",
                  description: "Easy-to-use calendar system for managing appointments and reducing no-shows.",
                },
                {
                  title: "Medical Records",
                  description: "Secure electronic health records with customizable templates and quick access.",
                },
                {
                  title: "Billing & Insurance",
                  description: "Streamlined billing processes and insurance verification to optimize revenue.",
                },
                {
                  title: "HIPAA Compliance",
                  description: "Built-in security features that meet or exceed all HIPAA requirements.",
                },
                {
                  title: "Analytics & Reporting",
                  description: "Comprehensive reporting tools to track performance and identify improvement areas.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 space-y-4 border rounded-lg bg-background shadow-sm">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="security" className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  Security First
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Protected Health Information
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We implement multiple layers of security to ensure your patients' data is always protected.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="compliance" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  HIPAA Compliant
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Stay Compliant, Avoid Penalties
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system is designed to help you maintain HIPAA compliance at every step.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t items-center px-4 md:px-6 bg-background">
        <p className="text-xs text-muted-foreground">
          © 2025 MediSecure EMR. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Index;
