import { useState } from 'react';
import { X, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { saveApplication } from '@/lib/firebase';

interface AdmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionForm({ isOpen, onClose }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    // Degree and Campus
    firstDegree: '',
    secondDegree: '',
    universityCampus: '',
    
    // Student Details
    studentFullName: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    emailAddress: '',
    city: '',
    state: '',
    pinCode: '',
    
    // Schooling Information
    schoolName: '',
    schoolType: '',
    schoolingMedium: '',
    schoolingBoard: '',
    twelfthStatus: '',
    
    // Scholarship Fields
    tenthPercentage: '',
    twelfthPercentage: '',
    category: '',
    familyIncome: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;

  const handleSaveDraft = () => {
    // You can implement save as draft functionality here
    console.log('Saving as draft:', formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Save to Firestore
      await saveApplication(formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstDegree: '',
          secondDegree: '',
          universityCampus: '',
          studentFullName: '',
          dateOfBirth: '',
          fatherName: '',
          motherName: '',
          mobileNumber: '',
          emailAddress: '',
          city: '',
          state: '',
          pinCode: '',
          schoolName: '',
          schoolType: '',
          schoolingMedium: '',
          schoolingBoard: '',
          twelfthStatus: '',
          tenthPercentage: '',
          twelfthPercentage: '',
          category: '',
          familyIncome: ''
        });
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
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
          {/* Degree and Campus */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Degree and Campus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">First Degree from IIT *</label>
                <select
                  name="firstDegree"
                  value={formData.firstDegree}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="IIT Madras BS (4 Year UG Degree)">IIT Madras BS (4 Year UG Degree)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Second Degree (Dual Degree Option) *</label>
                <select
                  name="secondDegree"
                  value={formData.secondDegree}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="B.Tech. CSE">B.Tech. CSE</option>
                  <option value="B.Tech. CSE (Spec. in AI)">B.Tech. CSE (Spec. in AI)</option>
                  <option value="B.Tech. CSE (Spec. in AIDS)">B.Tech. CSE (Spec. in AIDS)</option>
                  <option value="BCA">BCA</option>
                  {/* <option value="BCA (Statistics) (Honors with Research)">B.Sc. (Statistics) (Honors with Research)</option>
                  <option value="BCA. (Computer Science) (Honors & Research)">B.Sc. (Computer Science) (Honors & Research)</option> */}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2">University and Campus *</label>
                <select
                  name="universityCampus"
                  value={formData.universityCampus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="Rajasthan College Of Engineering For Women">Rajasthan College Of Engineering For Women - Jaipur</option>
                </select>
              </div>
            </div>
          </section>

          {/* Student Details */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2">Student Full Name *</label>
                <input
                  type="text"
                  name="studentFullName"
                  value={formData.studentFullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter full name"
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
                <label className="block mb-2">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter father's name"
                />
              </div>
              
              <div>
                <label className="block mb-2">Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter mother's name"
                />
              </div>
              
              <div>
                <label className="block mb-2">Mobile Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter 10-digit mobile number"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                    {formData.mobileNumber.length}/10
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2">Email Address *</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              
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
                  placeholder="Enter state/province"
                />
              </div>
              
              <div>
                <label className="block mb-2">Pin Code *</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter pin code"
                />
              </div>
            </div>
          </section>

          {/* Schooling Information */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Schooling Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2">School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter school name"
                />
              </div>
              
              <div>
                <label className="block mb-2">School Type *</label>
                <select
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="Private School">Private School</option>
                  <option value="Government School">Government School</option>
                  <option value="Kendriya Vidyalaya (KVS)">Kendriya Vidyalaya (KVS)</option>
                  <option value="Sainik / Military School">Sainik / Military School</option>
                  <option value="Javahar Navoday Vidhyalay (JNV)">Javahar Navoday Vidhyalay (JNV)</option>
                  <option value="Swami Vivekanand Govt. Model School (SVGMS)">Swami Vivekanand Govt. Model School (SVGMS)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Schooling Medium *</label>
                <select
                  name="schoolingMedium"
                  value={formData.schoolingMedium}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Schooling Board *</label>
                <select
                  name="schoolingBoard"
                  value={formData.schoolingBoard}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="RBSE">RBSE</option>
                  <option value="Other State Board">Other State Board</option>
                  <option value="Other Board / University Diploma">Other Board / University Diploma</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">12th Class Status *</label>
                <select
                  name="twelfthStatus"
                  value={formData.twelfthStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Please select an option</option>
                  <option value="Passed">Passed</option>
                  <option value="Waiting for Result">Waiting for Result</option>
                  <option value="Currently Appearing (2026)">Currently Appearing (2026)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Scholarship Fields */}
          <section>
            <h3 className="text-xl mb-4 pb-2 border-b border-border">Scholarship Fields</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Note: All original documents will be verified at a later stage. Any incorrect information may result in cancellation of the scholarship. Applicants are advised to fill the form carefully.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">10th Class Percentage *</label>
                <input
                  type="number"
                  name="tenthPercentage"
                  value={formData.tenthPercentage}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter percentage"
                />
              </div>
              
              <div>
                <label className="block mb-2">12th Class Percentage *</label>
                <input
                  type="number"
                  name="twelfthPercentage"
                  value={formData.twelfthPercentage}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter percentage or expected"
                />
              </div>
              
              <div>
                <label className="block mb-2">Category Group *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select</option>
                  <option value="OBC-NCL">OBC-NCL</option>
                  <option value="SC Category">SC Category</option>
                  <option value="ST Category">ST Category</option>
                  <option value="EWS Category">EWS Category</option>
                  <option value="Any Other">Any Other</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Family Annual Income *</label>
                <select
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select</option>
                  <option value="Above 12 Lakh Per Annum">Above 12 Lakh Per Annum</option>
                  <option value="Between 5 Lakh & 12 Lakh Per Annum">Between 5 Lakh & 12 Lakh Per Annum</option>
                  <option value="Between 1 Lakh & 5 Lakh Per Annum">Between 1 Lakh & 5 Lakh Per Annum</option>
                  <option value="Below 1 Lakh Per Annum">Below 1 Lakh Per Annum</option>
                </select>
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
          <div className="flex flex-col space-y-4 pt-4 border-t border-border">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <div className="space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Register
                      <Upload className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );}