import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email format is invalid.';
    }

    if (formData.phone && !/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/[\s-()]/g, ''))) {
      tempErrors.phone = 'Phone number is invalid.';
    }

    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) tempErrors.message = 'Message cannot be empty.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white inline-block relative pb-2">
            Contact Me
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            Feel free to reach out for internship opportunities, project collaborations, or tech talks!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Let's Connect & Build Together
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              I am open to discuss front-end development projects, full-stack website setups, software tools, or simple chats about web architectures. Drop a message or find me on socials!
            </p>

            <div className="space-y-6">
              {/* Email Detail */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email Me</p>
                  <a href="mailto:mt63767199@gmail.com" className="text-slate-700 dark:text-slate-300 font-semibold hover:text-purple-500 transition-colors">
                    mt63767199@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Detail */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <FaPhoneAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Call Me</p>
                  <a href="tel:+916377226860" className="text-slate-700 dark:text-slate-300 font-semibold hover:text-purple-500 transition-colors">
                    +91 63772 26860
                  </a>
                </div>
              </div>

              {/* Location Detail */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/40 rounded-xl text-pink-600 dark:text-pink-400">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">My Location</p>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">
                    Jaipur, Rajasthan, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons Link Group */}
            <div className="pt-6 border-t border-slate-200 dark:border-navy-800">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">Social Channels</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/harsh-tiwari-127192329?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all transform hover:-translate-y-1">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/iharrxh?igsh=MTF4aWd2dmVwcDFubA==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all transform hover:-translate-y-1">
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic form */}
          <div className="lg:col-span-7 w-full" data-aos="fade-left">
            <div className="glass-card p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-lg">
              
              {/* Form Success Panel */}
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 animate-fade-in">
                  <FaCheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Message Sent Successfully!</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-sm mx-auto">
                      Thank you for reaching out, Harsh will get back to you shortly.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-primary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-navy-800/50 border ${errors.name ? 'border-red-500' : 'border-slate-300/40 dark:border-white/10'} focus:outline-none focus:border-purple-500 dark:text-white transition-colors`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-red-500 font-semibold">{errors.name}</span>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-navy-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-300/40 dark:border-white/10'} focus:outline-none focus:border-purple-500 dark:text-white transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-xs text-red-500 font-semibold">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Phone & Subject Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number (Optional)</label>
                      <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-navy-800/50 border ${errors.phone ? 'border-red-500' : 'border-slate-300/40 dark:border-white/10'} focus:outline-none focus:border-purple-500 dark:text-white transition-colors`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <span className="text-xs text-red-500 font-semibold">{errors.phone}</span>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-navy-800/50 border ${errors.subject ? 'border-red-500' : 'border-slate-300/40 dark:border-white/10'} focus:outline-none focus:border-purple-500 dark:text-white transition-colors`}
                        placeholder="Collaboration Proposal"
                      />
                      {errors.subject && <span className="text-xs text-red-500 font-semibold">{errors.subject}</span>}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5"
                      value={formData.message} 
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-navy-800/50 border ${errors.message ? 'border-red-500' : 'border-slate-300/40 dark:border-white/10'} focus:outline-none focus:border-purple-500 dark:text-white transition-colors resize-none`}
                      placeholder="Hi Harsh, I wanted to discuss..."
                    />
                    {errors.message && <span className="text-xs text-red-500 font-semibold">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn-primary w-full text-center py-4"
                  >
                    Send Message
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
