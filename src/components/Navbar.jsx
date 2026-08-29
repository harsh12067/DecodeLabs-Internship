import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    menuBtnRef.current?.focus();
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-lg shadow-black/40' : 'bg-transparent py-5'}`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a href="#home" className="flex items-center group" aria-label="Harsh Tiwari — Back to top">
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity" aria-hidden="true">
              HT.
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-6 list-none m-0 p-0" role="list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-[#CBD5E1] hover:text-[#38BDF8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#38BDF8] rounded-full transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              ref={menuBtnRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#CBD5E1] hover:bg-[#111827] hover:text-[#38BDF8] border border-transparent hover:border-sky-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <FiX className="w-6 h-6" aria-hidden="true" /> : <FiMenu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-[#0F172A] border-l border-sky-500/20 shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-40`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-md text-[#CBD5E1] hover:bg-[#111827] hover:text-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Close navigation menu"
          >
            <FiX className="w-6 h-6" aria-hidden="true" />
          </button>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col space-y-1 list-none m-0 p-0" role="list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={handleClose}
                    className="block text-lg font-medium text-[#CBD5E1] hover:text-[#38BDF8] py-2.5 border-b border-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto text-center text-xs text-slate-500" aria-hidden="true">
            © {new Date().getFullYear()} Harsh Tiwari
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
