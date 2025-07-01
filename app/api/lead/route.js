import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, phone, project } = await req.json();
    
    console.log('=== RECEIVED DATA ===');
    console.log('Raw data:', { name, email, phone, project });

    if (!name || !email || !phone || !project) {
      console.log('Missing fields validation failed');
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      console.log('Email validation failed for:', email);
      return NextResponse.json({ status: 'error', message: 'Invalid email' }, { status: 400 });
    }

    console.log('All validations passed');

    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(process.cwd(), 'submitted.json');

    let submittedPhones = {};
    if (fs.existsSync(filePath)) {
      submittedPhones = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    if (submittedPhones[phone] === today) {
      return NextResponse.json({ status: 'duplicate', message: 'Already submitted today' });
    }

    submittedPhones[phone] = today;
    fs.writeFileSync(filePath, JSON.stringify(submittedPhones));

    // Submit to Salesforce - Testing different approaches
    console.log('=== SALESFORCE SUBMISSION START ===');
    
    const salesforceData = {
      Name: name,
      countyCode: '91',
      phone,
      email,
      source: 'Website',
      project,
      campaign: 'Digital Campaign 2025',
      subCampaign: 'Meta-landing page'
    };
    
    console.log('Salesforce data:', salesforceData);

    try {
      // Try Method 1: POST with JSON body
      let response = await fetch('https://adissia--newsbox.sandbox.my.salesforce-sites.com/leadinsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(salesforceData)
      });

      console.log('Method 1 (POST JSON) - Status:', response.status);
      
      if (!response.ok) {
        console.log('Method 1 failed, trying Method 2...');
        
        // Try Method 2: GET with query parameters
        const query = new URLSearchParams(salesforceData);
        const getUrl = `https://adissia--newsbox.sandbox.my.salesforce-sites.com/leadinsert?${query}`;
        console.log('GET URL:', getUrl);
        
        response = await fetch(getUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log('Method 2 (GET) - Status:', response.status);
      }

      const responseText = await response.text();
      console.log('Salesforce response body:', responseText);
      
      if (response.ok) {
        console.log('✅ Salesforce submission successful!');
        // Check if response contains success confirmation
        if (responseText.toLowerCase().includes('success') || responseText.toLowerCase().includes('created')) {
          console.log('Lead appears to be created successfully');
        } else {
          console.log('⚠️ Status 200 but unclear if lead was created. Response:', responseText);
        }
      } else {
        console.log('❌ Salesforce submission failed:', response.status);
      }
      
    } catch (salesforceError) {
      console.error('❌ Salesforce error:', salesforceError.message);
    }

    console.log('=== SALESFORCE SUBMISSION END ===');

    // Email using NodeMailer - Fixed import issue
    console.log('=== EMAIL SUBMISSION START ===');
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@adissia.com',
          pass: 'Adissia@123',
        },
      });

      console.log('Transporter created, sending email...');

      const mailOptions = {
        from: '"Adissia Developers" <info@adissia.com>',
        to: ['akalya.p@adissia.com', 'arungowtham.p@adissia.com'],
        subject: 'Adissia Developers Lead Form',
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project:</strong> ${project}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p style="color:gray;font-size:12px;">This is an automated message. Do not reply.</p>
        `,
      };

      console.log('Mail options:', { 
        from: mailOptions.from, 
        to: mailOptions.to, 
        subject: mailOptions.subject 
      });

      const emailResult = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!', emailResult.messageId);
      
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      console.error('Email error details:', emailError);
    }
    
    console.log('=== EMAIL SUBMISSION END ===');

    return NextResponse.json({ status: 'success' });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ status: 'error', message: 'Server Error' }, { status: 500 });
  }
}