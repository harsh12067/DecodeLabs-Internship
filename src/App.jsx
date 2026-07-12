import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

// AOS Scrolling Animations
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  // Force dark mode class on launch
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Init AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 gradient-bg text-slate-800 dark:text-slate-200">
      {/* Header / Navbar */}
      <Navbar />

      {/* Main content elements */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
