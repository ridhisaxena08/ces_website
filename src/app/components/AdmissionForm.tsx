import { useState } from 'react';
import { X, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface AdmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionForm({ isOpen, onClose }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Academic Information
    lastSchool: '',
    lastDegree: '',
    graduationYear: '',
    percentage: '',
    
    // Program Selection
    programType: '',
    programInterest: '',
    intake: '',
    
    // Additional Information
    extraCurricular: '',
    whyJoin: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        lastSchool: '',
        lastDegree: '',
        graduationYear: '',
        percentage: '',
        programType: '',
        programInterest: '',
        intake: '',
        extraCurricular: '',
        whyJoin: ''
      });
      onClose();
    }, 3000);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl mb-2">CES Jaipur - Admission Application</h2>
            <p className="opacity-90">Chandrawati Education Society, Jaipur</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Success Message */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex items-center justify-center z-10">
            <div className="text-center p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Application Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                We'll review your application and get back to you soon.
              </p>
            </div>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Personal Information */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter first name"
                />
              </div>
              
              <div>
                <label className="block mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter last name"
                />
              </div>
              
              <div>
                <label className="block mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter nationality"
                />
              </div>
            </div>
          </section>
          
          {/* Address Information */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Address Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block mb-2">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter state"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="12345"
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Academic Background */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Academic Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Last School/College *</label>
                <input
                  type="text"
                  name="lastSchool"
                  value={formData.lastSchool}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Name of institution"
                />
              </div>
              
              <div>
                <label className="block mb-2">Last Degree/Qualification *</label>
                <select
                  name="lastDegree"
                  value={formData.lastDegree}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select degree</option>
                  <option value="high-school">High School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Year of Graduation *</label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="2024"
                />
              </div>
              
              <div>
                <label className="block mb-2">Percentage/CGPA *</label>
                <input
                  type="text"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="85% or 8.5 CGPA"
                />
              </div>
            </div>
          </section>
          
          {/* Program Selection */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Program Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Program Type *</label>
                <select
                  name="programType"
                  value={formData.programType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select program type</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="diploma">Diploma</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Program of Interest *</label>
                <select
                  name="programInterest"
                  value={formData.programInterest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select program</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business Administration</option>
                  <option value="arts">Arts & Humanities</option>
                  <option value="science">Natural Sciences</option>
                  <option value="medicine">Medicine</option>
                  <option value="law">Law</option>
                  <option value="education">Education</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Preferred Intake *</label>
                <select
                  name="intake"
                  value={formData.intake}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select intake</option>
                  <option value="spring-2026">Spring 2026</option>
                  <option value="fall-2026">Fall 2026</option>
                  <option value="winter-2026">Winter 2026</option>
                  <option value="summer-2027">Summer 2027</option>
                </select>
              </div>
            </div>
          </section>
          
          {/* Additional Information */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Extra-Curricular Activities</label>
                <textarea
                  name="extraCurricular"
                  value={formData.extraCurricular}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about your hobbies, sports, volunteer work, etc."
                />
              </div>
              
              <div>
                <label className="block mb-2">Why do you want to join our institution? *</label>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Share your motivation and goals..."
                />
              </div>
            </div>
          </section>
          
          {/* Document Upload (Optional) */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Documents (Optional)</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">Upload your documents</p>
                <p className="text-sm text-muted-foreground">
                  Academic transcripts, certificates, ID proof (PDF, JPG, PNG - Max 5MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" size="sm" className="mt-4">
                    Choose Files
                  </Button>
                </label>
              </div>
            </div>
          </section>
          
          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" variant="primary" size="lg" className="flex-1">
              Submit Application
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={onClose}>
              Cancel
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            By submitting this form, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}