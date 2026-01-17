import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface CampusVisitFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampusVisitForm({ isOpen, onClose }: CampusVisitFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    programInterest: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Campus Visit Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        visitDate: '',
        visitTime: '',
        programInterest: ''
      });
      onClose();
    }, 3000);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl mb-2">Schedule Your Campus Visit</h2>
            <p className="opacity-90">Chandrawati Education Society, Jaipur</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Success Message */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Visit Scheduled Successfully!</h3>
              <p className="text-muted-foreground">
                We'll send you a confirmation email shortly with visit details.
              </p>
            </div>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Preferred Visit Date *</label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Preferred Time *</label>
              <select
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select Time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Program of Interest *</label>
            <select
              name="programInterest"
              value={formData.programInterest}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Program</option>
              <option value="IIT BS Degree">IIT BS Degree</option>
              <option value="BTech CSE">BTech Computer Science Engineering</option>
              <option value="BSc Data Science">BSc Data Science</option>
              <option value="BSc AI/ML">BSc AI/ML</option>
              <option value="Advanced Certification">Advanced Certification in AI/ML/DS</option>
              <option value="General Visit">General Campus Tour</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Schedule Visit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}