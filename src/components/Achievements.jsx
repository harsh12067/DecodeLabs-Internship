import React, { useState, useEffect, useRef } from 'react';
import { FaProjectDiagram, FaCode, FaCertificate, FaHourglassHalf } from 'react-icons/fa';

// Custom lightweight counter that animates only when in viewport
function CountUp({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isIntersecting, end, duration]);

  return (
    <span ref={containerRef} className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#38BDF8] to-[#2563EB] bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      label: 'Projects Completed',
      value: 12,
      suffix: '+',
      icon: <FaProjectDiagram className="w-6 h-6 text-[#38BDF8]" />
    },
    {
      id: 2,
      label: 'Technologies Learned',
      value: 15,
      suffix: '+',
      icon: <FaCode className="w-6 h-6 text-[#38BDF8]" />
    },
    {
      id: 3,
      label: 'Certifications Earned',
      value: 8,
      suffix: '+',
      icon: <FaCertificate className="w-6 h-6 text-[#38BDF8]" />
    },
    {
      id: 4,
      label: 'Coding Practice Hours',
      value: 500,
      suffix: '+',
      icon: <FaHourglassHalf className="w-6 h-6 text-[#38BDF8]" />
    }
  ];

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      {/* Ambient background blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            Achievements
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            A numerical representation of my hard work, certifications, and project completions.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <div 
              key={item.id} 
              className="glass-card p-6 sm:p-8 rounded-3xl text-center flex flex-col items-center justify-center space-y-4 hover:scale-105 transition-all duration-300 shadow-md border border-sky-500/20 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div className="p-4 bg-[#0B1120] border border-sky-500/25 rounded-2xl shadow-inner">
                {item.icon}
              </div>

              {/* Counter Value */}
              <div className="font-mono">
                <CountUp end={item.value} suffix={item.suffix} />
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-[#CBD5E1]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
