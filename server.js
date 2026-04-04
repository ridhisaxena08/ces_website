import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test with Ethereal email (fake email service for testing)
const createTestTransporter = async () => {
  // Use the specific Gmail credentials provided
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'enquiry@rcew.ac.in',
      pass: 'rcew@123'
    }
  });
};

// Email template for new lead enquiry
const generateLeadEmailTemplate = (leadData) => {
  const {
    name,
    email,
    phone,
    company,
    message,
    service,
    submittedAt
  } = leadData;

  return `
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
            <span class="info-value">${name || 'Not provided'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📧 Email:</span>
            <span class="info-value">${email || 'Not provided'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📱 Phone:</span>
            <span class="info-value">${phone || 'Not provided'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🏢 Company:</span>
            <span class="info-value">${company || 'Not provided'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🎯 Service:</span>
            <span class="info-value">${service || 'Not specified'}</span>
          </div>
        </div>

        ${message ? `
        <div>
          <h3 style="color: #333; margin-bottom: 10px;">💬 Message:</h3>
          <div class="message-box">
            ${message}
          </div>
        </div>
        ` : ''}

        <div class="timestamp">
          📅 Submitted: ${new Date(submittedAt).toLocaleString('en-US', {
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
};

// API endpoint to send lead enquiry email
app.post('/api/send-email', async (req, res) => {
  try {
    const transporter = await createTestTransporter();
    const leadData = req.body;
    
    const mailOptions = {
      from: 'CES Website <enquiry@rcew.ac.in>',
      to: 'enquiry@rcew.ac.in',
      subject: `🎯 New Lead Enquiry: ${leadData.name || 'Unknown'} - ${leadData.company || 'No Company'}`,
      html: generateLeadEmailTemplate(leadData),
      priority: 'high'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Lead enquiry email sent successfully:', info.messageId);
    
    // If using Ethereal, show preview URL
    if (info.messageId && nodemailer.getTestMessageUrl) {
      console.log('📧 Email preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    res.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
      previewUrl: nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null
    });
  } catch (error) {
    console.error('Error sending lead enquiry email:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API endpoint to test email configuration
app.post('/api/test-email', async (req, res) => {
  try {
    const transporter = await createTestTransporter();
    
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

    const info = await transporter.sendMail(testMailOptions);
    console.log('Test email sent successfully:', info.messageId);
    
    // If using Ethereal, show preview URL
    if (info.messageId && nodemailer.getTestMessageUrl) {
      console.log('📧 Email preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    res.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
      previewUrl: nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API endpoint to verify email connection
app.get('/api/verify-email', async (req, res) => {
  try {
    const transporter = await createTestTransporter();
    await transporter.verify();
    console.log('Email server connection verified successfully');
    res.json({
      success: true,
      message: 'Email server connection verified successfully'
    });
  } catch (error) {
    console.error('Email server connection failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
