import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              HT.
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-500 dark:hover:text-purple-500 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              aria-label="Open Menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-white dark:bg-navy-950 shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-40`}>
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-md text-slate-700 dark:text-slate-300"
          >
            <FiX className="w-6 h-6" />
          </button>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-800 dark:text-slate-200 hover:text-purple-500 dark:hover:text-purple-500 py-2 border-b border-slate-100 dark:border-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Harsh Tiwari
          </div>
        </div>
      </div>
      {/* Overlay background for drawer */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}
    </nav>
  );
}
