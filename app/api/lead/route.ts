// app/api/lead/route.ts
export const runtime = 'nodejs';

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, project } = await request.json();

    // 1. Validation
    if (!name || !email || !phone || !project) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'submitted.json');

    let submittedPhones: { [key: string]: string } = {};

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data safely
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        submittedPhones = JSON.parse(content);
      } catch (err) {
        console.error('❌ Error reading submitted.json:', err);
        submittedPhones = {}; // fallback
      }
    }

    // Duplicate check
    if (submittedPhones[phone] === today) {
      return NextResponse.json(
        { status: 'duplicate', message: 'Already submitted today' },
        { status: 409 }
      );
    }

    // Save new submission
    submittedPhones[phone] = today;
    try {
      fs.writeFileSync(filePath, JSON.stringify(submittedPhones, null, 2));
    } catch (err) {
      console.error('⚠️ Could not write to file:', err);
    }

    // 2. Salesforce Submission
    const salesforceURL = `https://adissia.my.salesforce-sites.com/leadinsert?Name=${name}&countyCode=91&phone=${phone}&email=${email}&source=Website&project=${project}&campaign=Digital Campaign 2025&subCampaign=Meta-landing page`;

    let salesforceSuccess = false;
    try {
      const res = await fetch(salesforceURL, { method: 'POST' });
      const text = await res.text();
      salesforceSuccess = res.ok && (!text || /success|inserted|created/i.test(text));
    } catch (err) {
      console.error('❌ Salesforce submission error:', err);
    }

    // 3. Email via Hostinger
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
      });

      await transporter.sendMail({
        from: '"Adissia Developers" <info@adissia.com>',
        to: ['akalya.p@adissia.com', 'arungowtham.p@adissia.com'],
        subject: '🆕 New Lead Submission',
        html: `
          <h2>New Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project:</strong> ${project}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <hr>
          <p><strong>Salesforce Status:</strong> ${salesforceSuccess ? '✅ Success' : '❌ Failed'}</p>
        `,
      });

      emailSuccess = true;
    } catch (err) {
      console.error('❌ Email failed:', err);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Lead submitted',
      details: {
        salesforce: salesforceSuccess ? 'success' : 'failed',
        email: emailSuccess ? 'success' : 'failed',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Something went wrong. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
