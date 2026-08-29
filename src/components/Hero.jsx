import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import profileImg from '../assets/profile.png';

// Custom typing effect component
function Typewriter({ words, typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="text-[#38BDF8] font-semibold border-r-2 border-[#38BDF8] pr-1 animate-pulse">
      {currentText}
    </span>
  );
}

export default function Hero() {
  const words = ['B.Tech Student', 'Front-End Developer', 'Programmer'];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Ambient Background Blue Glow Blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-blue-600/10 blob animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-sky-500/10 blob animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-12">
        {/* Left Text details */}
        <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left space-y-6 order-2 md:order-1" data-aos="fade-right">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#38BDF8] inline-flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            Welcome to my digital space
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight">
            Hi, I'm <span className="bg-gradient-to-r from-[#38BDF8] to-[#2563EB] bg-clip-text text-transparent">Harsh Tiwari</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-medium text-[#CBD5E1]">
            I am a <Typewriter words={words} />
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl">
            "Building Innovative Digital Solutions Through Code and Creativity."
            <br />
            <span className="text-sm mt-2 block text-[#64748B]">
              I am a passionate B.Tech student with a strong interest in web development, programming, and technology. I enjoy creating responsive websites and solving real-world problems through innovative software solutions.
            </span>
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a href="#contact" className="btn-primary w-full sm:w-auto text-center">
              Hire Me
            </a>
            <a 
              href="/resume.jpg" 
              download="Harsh_Tiwari_Resume.jpg"
              className="btn-secondary w-full sm:w-auto text-center"
            >
              Download Resume
            </a>
          </div>

          {/* Social Channels */}
          <div className="flex items-center justify-center md:justify-start space-x-4 pt-6">
            <a 
              href="https://www.linkedin.com/in/harsh-tiwari-127192329?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-[#111827] border border-sky-500/20 text-[#CBD5E1] hover:text-[#38BDF8] hover:border-sky-400 hover:bg-[#172033] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 transform hover:-translate-y-1" 
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/iharrxh?igsh=MTF4aWd2dmVwcDFubA==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-[#111827] border border-sky-500/20 text-[#CBD5E1] hover:text-[#38BDF8] hover:border-sky-400 hover:bg-[#172033] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 transform hover:-translate-y-1" 
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a 
              href="mailto:mt63767199@gmail.com" 
              className="p-3 rounded-full bg-[#111827] border border-sky-500/20 text-[#CBD5E1] hover:text-[#38BDF8] hover:border-sky-400 hover:bg-[#172033] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 transform hover:-translate-y-1" 
              aria-label="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right profile image */}
        <div className="md:col-span-5 flex justify-center order-1 md:order-2" data-aos="fade-left">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {/* Subtle Blue Glow and Rotating Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] animate-spin-slow opacity-35 blur-lg scale-105" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-sky-400/40 animate-spin-slow" />
            
            {/* Avatar Frame */}
            <div className="absolute inset-4 rounded-full bg-[#0F172A] overflow-hidden shadow-[0_0_35px_rgba(56,189,248,0.25)] border-4 border-sky-400/30 group">
              <img 
                src={profileImg} 
                alt="Harsh Tiwari" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500 ease-out" 
              />
            </div>
            {/* Floating micro badges with subtle glow */}
            <div className="absolute top-8 right-0 p-3 rounded-2xl glass-card text-center animate-float shadow-lg border border-sky-500/30">
              <span className="text-2xl">💻</span>
            </div>
            <div className="absolute bottom-8 left-0 p-3 rounded-2xl glass-card text-center animate-float shadow-lg border border-sky-500/30" style={{ animationDelay: '1.5s' }}>
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
