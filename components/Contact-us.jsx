"use client";
import Head from 'next/head';
import React, { useState } from 'react';
import { postFeedback } from '@/api-requests/apiReq';

const ContactForm = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
     message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus({ loading: true, success: false, error: '' });
  
      try {
        await postFeedback(formData);
        setSubmitStatus({
          loading: false,
          success: true,
          error: ''
        });
        
        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
  
      } catch (error) {
        setSubmitStatus({
          loading: false,
          success: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        });
      }
    }
  };

  return (
    <>
      <Head>
      <title>Contact us || Snow Medical</title>
      <meta name="description" content="Contaxt snow medical." />
      </Head>
        <div className="w-screen h-max flex justify-center ">
      <div className="py-24 px-4 sm:px-6 md:pt-32 lg:px-8 lg:pt-36 w-full max-w-5xl container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-left mb-4 md:mb-8 font-mansory text-black uppercase">contact us</h2>
        {/* Status Messages */}
        {submitStatus.success && (
          <div className="bg-green-50 border border-green-200 p-6 text-center mb-8">
            <h3 className="text-2xl font-medium text-green-800 mb-2">Thank You!</h3>
            <p className="text-green-700">Your inquiry has been received. A Snow Medical representative will contact you shortly.</p>
          </div>
        )}
        {submitStatus.error && (
          <div className="bg-red-50 border border-red-200 p-4 mb-8">
            <p className="text-red-700">{submitStatus.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Make all fields use full width in a single column */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                disabled={submitStatus.loading}
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                disabled={submitStatus.loading}
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-200"
                disabled={submitStatus.loading}
              ></textarea>
              {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[#0052cc] text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
              disabled={submitStatus.loading}
            >
              {submitStatus.loading ? 'SENDING...' : 'SUBMIT REQUEST'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>

  );
};

export default ContactForm;