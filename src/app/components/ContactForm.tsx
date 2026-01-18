'use client';

import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { saveContact } from '@/lib/firebase';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await saveContact({
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'new'
      });
      
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl mb-2">Contact Us</h2>
            <p className="opacity-90">We'll get back to you soon</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Success Message */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex items-center justify-center z-10">
            <div className="text-center p-8">
              <Send className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Message Sent Successfully!</h3>
              <p className="text-muted-foreground">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="name">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="email">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="subject">
                Subject *
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="message">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
