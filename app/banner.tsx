'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Banner() {
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
      alert('Please fill in all fields and provide consent.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('app/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project: formData.project,
        }),
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
    } catch (error) {
      console.error('Lead submission failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="position-relative overflow-hidden" id='contactus'>
      {/* Banner background */}
      <div className="banner-bg position-relative">
        <div className="position-absolute top-0 start-0 w-100 h-100 overlay"></div>
        <div className="container text-white py-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-12 col-lg-7">
             
            </div>
          </div>
        </div>

        {/* Desktop form - absolute positioned */}
        <div className="desktop-form d-none d-lg-block">
          <div className="bg-white p-4 shadow rounded">
            <h5 className="mb-3 text-center text-dark font-poppins">Enquire Now</h5>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} status={status} />
          </div>
        </div>
      </div>

      {/* Mobile form below banner */}
      <div className="container d-lg-none mt-4 px-3">
        <div className="bg-white p-4 shadow rounded">
          <h5 className="mb-3 text-center text-dark font-poppins">Enquire Now</h5>
          <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} status={status} />
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .banner-bg {
          min-height: 75vh;
          background-image: url('/banners/banner-hero.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }

        .overlay {
          z-index: 1;
        }

        .desktop-form {
          position: absolute;
          top: 50%;
          right: 80px;
          transform: translateY(-50%);
          z-index: 3;
          width: 400px;
        }

        @media (max-width: 1024px) {
          .desktop-form {
            right: 30px;
            width: 360px;
          }
        }

        @media (max-width: 767px) {
          .banner-bg {
            background-image: url('/banners/banner-mobile.webp');
            min-height: 67vh;
          }
        }
      `}</style>
    </section>
  );
}

// Form remains unchanged
function Form({ handleChange, handleSubmit, formData, status }: any) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 font-poppins">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          className="form-control form-control-sm"
          required
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 font-poppins">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="form-control form-control-sm"
          required
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 font-poppins">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          className="form-control form-control-sm"
          required
          maxLength={10}
          pattern="[0-9]{10}"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 font-poppins">
        <select
          name="project"
          value={formData.project}
          className="form-select form-select-sm"
          required
          onChange={handleChange}
        >
          <option value="">Select Your Plot</option>
          <option value="One World">One World</option>
        </select>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="form-check-input"
          required
          style={{ transform: 'scale(0.8)' }}
        />
        <label className="form-check-label font-poppins" style={{ fontSize: '11px', lineHeight: '1.2' }}>
          I authorize <strong>Adissia Developers</strong> and its representatives to call, SMS, email,
          or WhatsApp me about its products and offers. This consent overrides any registration for
          DNC/NDNC.
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-sm w-100 font-poppins"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>

      {status === 'success' && (
        <div className="alert alert-success mt-2 p-2" style={{ fontSize: '12px' }}>
          Thank you! Your lead has been submitted.
        </div>
      )}
      {status === 'duplicate' && (
        <div className="alert alert-warning mt-2 p-2" style={{ fontSize: '12px' }}>
          You've already submitted today.
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert-danger mt-2 p-2" style={{ fontSize: '12px' }}>
          Something went wrong. Please try again later.
        </div>
      )}
    </form>
  );
}
