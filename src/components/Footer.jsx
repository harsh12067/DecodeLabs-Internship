import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B1120] border-t border-sky-500/15 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Logo & Brief */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#2563EB] bg-clip-text text-transparent inline-block">
              Harsh Tiwari
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-xs mx-auto md:mx-0">
              Building innovative digital solutions through code and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#home" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">About</a>
            <a href="#skills" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">Skills</a>
            <a href="#projects" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">Projects</a>
            <a href="#experience" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">Experience</a>
            <a href="#contact" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">Contact</a>
          </div>

          {/* Social Icons & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/harsh-tiwari-127192329?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-[#111827] border border-sky-500/20 text-[#CBD5E1] hover:text-[#38BDF8] hover:border-sky-400 hover:bg-[#172033] hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/iharrxh?igsh=MTF4aWd2dmVwcDFubA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-[#111827] border border-sky-500/20 text-[#CBD5E1] hover:text-[#38BDF8] hover:border-sky-400 hover:bg-[#172033] hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-[#64748B]">
              © {currentYear} Harsh Tiwari. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/50 transition-all duration-300 transform ${showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75 pointer-events-none'}`}
        aria-label="Back to Top"
      >
        <FaArrowUp className="w-4 h-4 animate-bounce" />
      </button>
    </footer>
  );
}
