// Force Node.js runtime so fs and nodemailer work
export const runtime = 'nodejs';

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, phone, project } = await req.json();
    console.log('📥 Received data:', { name, email, phone, project });

    // 1. Basic Validation
    if (!name || !email || !phone || !project) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, phone: !!phone, project: !!project });
      return NextResponse.json({ 
        status: 'error', 
        message: 'Missing required fields',
        missingFields: {
          name: !name,
          email: !email,
          phone: !phone,
          project: !project
        }
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json({ status: 'invalid_email', message: 'Invalid email format' }, { status: 400 });
    }

    // 2. Duplicate Check (Per Day Per Phone) - Make directory if it doesn't exist
    const today = new Date().toISOString().split('T')[0];
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'submitted.json');
    let submittedPhones = {};

    // Ensure data directory exists
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        console.log('📁 Created data directory');
      }
    } catch (err) {
      console.error('⚠️ Error creating data directory:', err);
    }

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        submittedPhones = JSON.parse(fileContent);
      } catch (err) {
        console.error('⚠️ Error reading submitted.json:', err);
        submittedPhones = {}; // Reset to empty object if file is corrupted
      }
    }

    if (submittedPhones[phone] === today) {
      console.log('🔄 Duplicate submission detected for phone:', phone);
      return NextResponse.json({ 
        status: 'duplicate', 
        message: 'You have already submitted a lead today. Please try again tomorrow.' 
      }, { status: 409 });
    }

    // Save new submission
    submittedPhones[phone] = today;
    try {
      fs.writeFileSync(filePath, JSON.stringify(submittedPhones, null, 2));
      console.log('💾 Saved submission record for phone:', phone);
    } catch (err) {
      console.error('⚠️ Error writing to submitted.json:', err);
      // Continue processing even if file write fails
    }

    // 3. Submit to Salesforce (GET Method) - No encoding at all
    const salesforceUrl = `https://adissia.my.salesforce-sites.com/leadinsert?Name=${name}&countyCode=91&phone=${phone}&email=${email}&source=Website&project=${project}&campaign=Digital Campaign 2025&subCampaign=Meta-landing page`;
    console.log('🔗 Salesforce URL:', salesforceUrl);

    let salesforceResponse = '';
    let salesforceSuccess = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(salesforceUrl, { 
        method: 'POST',
        headers: {
          'User-Agent': 'Adissia-Website/1.0'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      salesforceResponse = await response.text();
      console.log('📤 Salesforce response status:', response.status);
      console.log('📤 Salesforce response:', salesforceResponse);

      if (response.ok) {
        // If response is empty but status is 200, consider it successful
        if (!salesforceResponse.trim()) {
          salesforceSuccess = true;
          salesforceResponse = 'Success (empty response)';
          console.log('✅ Salesforce submission successful (empty response)');
        } else if (/success|inserted|created|saved/i.test(salesforceResponse)) {
          salesforceSuccess = true;
          console.log('✅ Salesforce submission successful');
        } else {
          console.log('⚠️ Salesforce submission may have failed - unexpected response');
        }
      } else {
        console.log('⚠️ Salesforce submission failed - HTTP error:', response.status);
      }
    } catch (err) {
      console.error('❌ Salesforce GET failed:', err);
      salesforceResponse = `Error: ${err instanceof Error ? err.message : 'Unknown error'}`;
    }

    // Don't fail the entire request if Salesforce fails - log it but continue
    if (!salesforceSuccess) {
      console.warn('⚠️ Salesforce submission failed, but continuing with email');
    }

    // 4. Send Email via Hostinger SMTP (Nodemailer)
    let emailSuccess = false;
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@adissia.com',
          pass: 'Adissia@123',
        },
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      });

      // Verify connection
      await transporter.verify();
      console.log('📧 SMTP connection verified');

      await transporter.sendMail({
        from: '"Adissia Developers Lead Form" <info@adissia.com>',
        to: ['akalya.p@adissia.com', 'arungowtham.p@adissia.com'],
        subject: 'New Lead from Website',
        html: `
          <h2>🎯 New Lead Submission</h2>
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Project:</strong> ${project}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <hr>
            <p><small>Salesforce Status: ${salesforceSuccess ? '✅ Success' : '❌ Failed'}</small></p>
          </div>
        `,
      });

      emailSuccess = true;
      console.log('✅ Email sent successfully');
    } catch (err) {
      console.error('❌ Email sending failed:', err);
    }

    // 5. Return Success Response
    const responseData = {
      status: 'success',
      message: 'Lead submitted successfully! We will contact you soon.',
      details: {
        salesforce: salesforceSuccess ? 'success' : 'failed',
        email: emailSuccess ? 'success' : 'failed',
        timestamp: new Date().toISOString()
      }
    };

    // Only include salesforce response in development
    if (process.env.NODE_ENV === 'development') {
      responseData.salesforceResponse = salesforceResponse;
    }

    return NextResponse.json(responseData);

  } catch (err) {
    console.error('❌ Server error:', err);
    
    // More detailed error logging
    console.error('Error stack:', err.stack);
    console.error('Error name:', err.name);
    
    return NextResponse.json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}