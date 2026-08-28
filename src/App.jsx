import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AskPortfolio from './components/AskPortfolio';

// AOS Scrolling Animations
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  // Force dark mode class on launch
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Init AOS — respect prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({
      duration: prefersReducedMotion ? 0 : 1000,
      once: true,
      easing: 'ease-in-out',
      disable: prefersReducedMotion,
    });
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 gradient-bg text-slate-800 dark:text-slate-200">
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
          focus:px-4 focus:py-2 focus:rounded-lg focus:bg-purple-600 focus:text-white
          focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header / Navbar */}
      <Navbar />

      {/* Main content elements */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Assistant — rendered outside main for z-index stacking */}
      <AskPortfolio />
    </div>
  );
}
