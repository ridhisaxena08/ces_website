import { saveEnquiry } from '@/lib/firebase';

export interface EnquiryData {
  name: string;
  phone: string;
  fatherName: string;
  email: string;
}

export const submitEnquiry = async (data: EnquiryData): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    const docId = await saveEnquiry(data);
    
    // Here you could also add email notification logic
    // For now, we'll just save to Firestore
    
    return {
      success: true,
      message: 'Enquiry submitted successfully',
      id: docId
    };
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return {
      success: false,
      message: 'Failed to submit enquiry. Please try again.'
    };
  }
};
