
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your MediSecure EMR assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    // Simulate AI response based on user query
    setIsTyping(true);
    
    // Wait for "typing" effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = '';
    
    // Simple pattern matching for demo purposes
    if (userMessage.toLowerCase().includes('login')) {
      response = 'You can log in using the credentials provided by your administrator. For demo purposes, use username "admin" and password "password".';
    } else if (userMessage.toLowerCase().includes('patient') || userMessage.toLowerCase().includes('record')) {
      response = 'The Patients page allows you to manage patient records. You can add new patients, view their details, and access their medical records.';
    } else if (userMessage.toLowerCase().includes('appointment')) {
      response = 'The Appointments page helps you schedule and manage patient appointments. You can view the calendar, add new appointments, and set reminders.';
    } else if (userMessage.toLowerCase().includes('hipaa') || userMessage.toLowerCase().includes('compliance')) {
      response = 'The HIPAA Compliance page provides tools to ensure your practice is following HIPAA regulations. It includes compliance scores, risk assessments, and policy management.';
    } else if (userMessage.toLowerCase().includes('report')) {
      response = 'The Reports page provides analytics and insights about your practice, including patient statistics, appointment trends, and financial data.';
    } else if (userMessage.toLowerCase().includes('billing')) {
      response = 'The Billing feature allows you to manage patient invoices, process payments, and track financial transactions. You can access it from the sidebar menu.';
    } else if (userMessage.toLowerCase().includes('role') || userMessage.toLowerCase().includes('doctor') || userMessage.toLowerCase().includes('staff')) {
      response = 'MediSecure EMR supports different user roles, including doctors and staff members. Each role has a customized interface with appropriate access permissions.';
    } else if (userMessage.toLowerCase().includes('ai') || userMessage.toLowerCase().includes('bot')) {
      response = 'I\'m an AI assistant designed to help you navigate the MediSecure EMR system. I can answer questions about features, provide guidance, and help troubleshoot issues.';
    } else if (userMessage.toLowerCase().includes('retell') || userMessage.toLowerCase().includes('voice')) {
      response = 'The Retell AI voice bot integration allows doctors to view analytics and calls performed by the voice bot. This feature is available in the doctor interface.';
    } else {
      response = 'I\'m here to help you with the MediSecure EMR system. You can ask me about patients, appointments, medical records, HIPAA compliance, billing, or any other feature.';
    }
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      role: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    generateResponse(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!open && (
        <Button
          className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                MediSecure Assistant
              </SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col max-w-[80%] rounded-lg p-4",
                  message.role === 'user'
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <div className="text-sm">{message.content}</div>
                <div className={cn(
                  "text-xs mt-1",
                  message.role === 'user'
                    ? "text-primary-foreground/70 self-end"
                    : "text-muted-foreground self-start"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex max-w-[80%] rounded-lg p-4 bg-muted">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="resize-none min-h-[60px]"
              />
              <Button onClick={handleSend} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Ask me anything about the MediSecure EMR system!
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AIChatbot;
