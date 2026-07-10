import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from 'react-icons/fa';

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
    <footer className="relative bg-slate-100 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Logo & Brief */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent inline-block">
              Harsh Tiwari
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto md:mx-0">
              Building innovative digital solutions through code and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#home" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">About</a>
            <a href="#skills" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Skills</a>
            <a href="#experience" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Experience</a>
            <a href="#contact" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">Contact</a>
          </div>

          {/* Social Icons & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/harsh-tiwari-127192329?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/iharrxh?igsh=MTF4aWd2dmVwcDFubA==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © {currentYear} Harsh Tiwari. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/35 transition-all duration-300 transform ${showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75 pointer-events-none'}`}
        aria-label="Back to Top"
      >
        <FaArrowUp className="w-4 h-4 animate-bounce" />
      </button>
    </footer>
  );
}
