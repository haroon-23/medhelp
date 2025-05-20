
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-blue-50">
      <header className="flex h-16 items-center px-6 lg:px-8 bg-white border-b shadow-sm animate-fade-in">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary animate-pulse" />
          <span className="transition-all duration-300 hover:text-primary">MediSecure EMR</span>
        </div>
        <nav className="ml-auto flex gap-6">
          <a href="#features" className="text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 hover:text-primary">
            Features
          </a>
          <a href="#security" className="text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 hover:text-primary">
            Security
          </a>
          <a href="#compliance" className="text-sm font-medium hover:underline underline-offset-4 transition-all duration-300 hover:text-primary">
            Compliance
          </a>
        </nav>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            <div className="flex flex-col space-y-5 md:w-1/2 animate-fade-in">
              <div className="inline-block mb-2">
                <span className="hipaa-badge">HIPAA Compliant</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Secure Healthcare Management System
              </h1>
              <p className="text-muted-foreground md:text-lg max-w-[600px]">
                A modern EMR/CRM solution designed for hospitals and clinics, with built-in HIPAA compliance 
                and powerful patient management tools.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: "150ms" }}>
              <LoginForm />
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-16 bg-white border-y">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Everything You Need for Patient Care
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools to streamline healthcare operations and improve patient outcomes.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 space-y-4 border-2 rounded-lg bg-background shadow-sm animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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
        
        <section id="security" className="w-full py-16 bg-blue-50">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  Security First
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Protected Health Information
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We implement multiple layers of security to ensure your patients' data is always protected.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="compliance" className="w-full py-16 bg-white border-t">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  HIPAA Compliant
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t items-center px-6 bg-white animate-fade-in">
        <p className="text-xs text-muted-foreground">
          © 2025 MediSecure EMR. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4 transition-all duration-300 hover:text-primary">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4 transition-all duration-300 hover:text-primary">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Index;
