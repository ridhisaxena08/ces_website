// src/lib/testEmail.js
const { sendLeadEnquiryEmail, testEmailConfiguration, verifyEmailConnection } = require('./emailService.js');

// Test function to verify email service is working
const testEmailService = async () => {
  console.log('🧪 Testing Email Service...');
  
  try {
    // 1. Verify connection
    console.log('1. Verifying email connection...');
    const isConnected = await verifyEmailConnection();
    if (!isConnected) {
      console.error('❌ Email connection failed');
      return false;
    }
    console.log('✅ Email connection verified');
    
    // 2. Send test email
    console.log('2. Sending test email...');
    const testResult = await testEmailConfiguration();
    console.log('✅ Test email sent successfully:', testResult.messageId);
    
    // 3. Send sample lead enquiry email
    console.log('3. Sending sample lead enquiry email...');
    const sampleLead = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567',
      company: 'Acme Corporation',
      service: 'Web Development',
      message: 'I am interested in your web development services. Please contact me to discuss my project requirements.',
      submittedAt: new Date().toISOString()
    };
    
    const leadResult = await sendLeadEnquiryEmail(sampleLead);
    console.log('✅ Sample lead email sent successfully:', leadResult.messageId);
    
    console.log('🎉 All email tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Email service test failed:', error);
    return false;
  }
};

// Run test
testEmailService();
