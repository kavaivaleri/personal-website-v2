import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<InsertContact>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      insertContactSchema.parse(formData);
      mutation.mutate(formData);
    } catch (error: any) {
      toast({
        title: "Invalid form data",
        description: "Please check all fields and try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: keyof InsertContact) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-pixel-dark mb-6">Send a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-pixel-dark">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange("name")}
              className="mt-2 border-2 border-gray-200 focus:border-pixel-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-pixel-dark">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange("email")}
              className="mt-2 border-2 border-gray-200 focus:border-pixel-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="subject" className="text-sm font-medium text-pixel-dark">
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange("subject")}
              className="mt-2 border-2 border-gray-200 focus:border-pixel-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-pixel-dark">
              Message
            </Label>
            <Textarea
              id="message"
              rows={6}
              required
              value={formData.message}
              onChange={handleChange("message")}
              className="mt-2 border-2 border-gray-200 focus:border-pixel-teal resize-none"
            />
          </div>
          
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-pixel-pink text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
          >
            {mutation.isPending ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-pixel-dark mb-6">Get in Touch</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-pixel-light-pink flex items-center justify-center rounded">
              <Mail className="text-pixel-dark w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-pixel-dark mb-1">Email</h4>
              <p className="text-gray-600">kavaivaleri@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-pixel-light-pink flex items-center justify-center rounded">
              <MapPin className="text-pixel-dark w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-pixel-dark mb-1">Location</h4>
              <p className="text-gray-600">Remote</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-pixel-light-pink flex items-center justify-center rounded">
              <Clock className="text-pixel-dark w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-pixel-dark mb-1">Response Time</h4>
              <p className="text-gray-600">Usually within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <h4 className="font-semibold text-pixel-dark mb-4">Connect on Social</h4>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-pixel-teal text-white flex items-center justify-center hover:bg-pixel-pink transition-colors duration-200 rounded"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-pixel-teal text-white flex items-center justify-center hover:bg-pixel-pink transition-colors duration-200 rounded"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-pixel-teal text-white flex items-center justify-center hover:bg-pixel-pink transition-colors duration-200 rounded"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-pixel-teal text-white flex items-center justify-center hover:bg-pixel-pink transition-colors duration-200 rounded"
            >
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
