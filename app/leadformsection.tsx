'use client';
import React, { useState } from 'react';
import PageWrapper from './pagewrapper';

export default function LeadFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    consent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox && (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.project || !formData.consent) {
      alert('Please fill in all fields and give consent.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          project: '',
          consent: false,
        });
      } else if (result.status === 'duplicate') {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  return (
    <PageWrapper>
      <section className='py-6rem bg-pattern-contactus'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6' data-aos="fade-right">
              <h1 className='text-blue robot-text-style fs-60px mb-3'><b>Connect now, own your plot soon</b></h1>
              <p className="fs-18px font-poppins">
                Begin your journey with One World — DTCP & RERA-approved plots near Coimbatore’s top landmarks.
                A secure, smart investment in a prime location.
              </p>
            </div>
            <div className='col-md-6' data-aos="fade-left">
              <form onSubmit={handleSubmit} className="bg-white border p-4 rounded shadow">
                <div className="row mb-3">
                  <div className="col-6">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control" required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <select name="project" value={formData.project} onChange={handleChange} className="form-control" required>
                      <option value="">Select your plot</option>
                      <option value="One World">One World</option>
                    </select>
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="form-check-input" required />
                  <label className="form-check-label">
                    I authorize <strong>Adissia Developers</strong> and its representatives to contact me about their products and offers. This consent overrides any DNC/NDNC registration.
                  </label>
                </div>
                <button type="submit" className="btn btn-primary px-5 fw-bold" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Submitting...' : 'Submit'}
                </button>

                {status === 'success' && <div className="alert alert-success mt-3">Thank you! Your lead has been submitted.</div>}
                {status === 'duplicate' && <div className="alert alert-warning mt-3">You’ve already submitted today.</div>}
                {status === 'error' && <div className="alert alert-danger mt-3">Something went wrong. Please try again later.</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
