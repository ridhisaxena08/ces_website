// Simple email test using nodemailer directly
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

// Email configuration
const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'enquiry@rcew.ac.in',
    pass: process.env.EMAIL_PASS || 'YOUR_16_CHARACTER_APP_PASSWORD_HERE'
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Test function
const testEmail = async () => {
  console.log('🧪 Testing Email Service...');
  
  try {
    // 1. Verify connection
    console.log('1. Verifying email connection...');
    await transporter.verify();
    console.log('✅ Email connection verified');
    
    // 2. Send test email
    console.log('2. Sending test email...');
    const testMailOptions = {
      from: 'CES Website <enquiry@rcew.ac.in>',
      to: 'enquiry@rcew.ac.in',
      subject: '🧪 Test Email - CES Website SMTP Configuration',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>✅ Email Configuration Test Successful!</h2>
          <p>Your SMTP service is working correctly.</p>
          <p>This is a test email from the CES Website Lead Management System.</p>
          <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
        </div>
      `
    };

    const result = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully:', result.messageId);
    
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

    const leadEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Enquiry</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            margin: -30px -30px 20px -30px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .lead-info {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
          }
          .info-row {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
          }
          .info-label {
            font-weight: 600;
            color: #555;
            min-width: 120px;
            margin-right: 10px;
          }
          .info-value {
            color: #333;
            flex: 1;
          }
          .message-box {
            background-color: #fff;
            border: 1px solid #e9ecef;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-style: italic;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
          }
          .timestamp {
            background-color: #e9ecef;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            color: #6c757d;
            display: inline-block;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Lead Enquiry</h1>
          </div>
          
          <div class="lead-info">
            <div class="info-row">
              <span class="info-label">👤 Name:</span>
              <span class="info-value">${sampleLead.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📧 Email:</span>
              <span class="info-value">${sampleLead.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📱 Phone:</span>
              <span class="info-value">${sampleLead.phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">🏢 Company:</span>
              <span class="info-value">${sampleLead.company}</span>
            </div>
            <div class="info-row">
              <span class="info-label">🎯 Service:</span>
              <span class="info-value">${sampleLead.service}</span>
            </div>
          </div>

          <div>
            <h3 style="color: #333; margin-bottom: 10px;">💬 Message:</h3>
            <div class="message-box">
              ${sampleLead.message}
            </div>
          </div>

          <div class="timestamp">
            📅 Submitted: ${new Date(sampleLead.submittedAt).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          <div class="footer">
            <p>This is an automated notification from your CES Website Lead Management System.</p>
            <p>Please follow up with this lead as soon as possible.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const leadResult = await transporter.sendMail({
      from: 'CES Website <enquiry@rcew.ac.in>',
      to: 'enquiry@rcew.ac.in',
      subject: `🎯 New Lead Enquiry: ${sampleLead.name} - ${sampleLead.company}`,
      html: leadEmailHtml,
      priority: 'high'
    });
    
    console.log('✅ Sample lead email sent successfully:', leadResult.messageId);
    console.log('🎉 All email tests passed!');
    
  } catch (error) {
    console.error('❌ Email service test failed:', error);
  }
};

// Run test
testEmail();
