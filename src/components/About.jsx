import React from 'react';
import { FaGraduationCap, FaBrain, FaGamepad, FaCode } from 'react-icons/fa';

export default function About() {
  const stats = [
    { label: 'Degree', value: 'B.Tech ECE', icon: <FaGraduationCap className="text-[#38BDF8] w-6 h-6" /> },
    { label: 'College', value: 'Arya (ACEIT)', icon: <FaCode className="text-[#38BDF8] w-6 h-6" /> },
    { label: 'Interests', value: 'Web Dev & DSA', icon: <FaBrain className="text-[#38BDF8] w-6 h-6" /> },
    { label: 'Hobbies', value: 'Gaming & Tech', icon: <FaGamepad className="text-[#38BDF8] w-6 h-6" /> }
  ];

  const strengths = [
    'Strong analytical & problem-solving abilities (DSA)',
    'Responsive front-end development & modern UI design',
    'Familiarity with SQL, NoSQL databases and Git version control',
    'Continuous learner, passionate about emerging web technologies'
  ];

  return (
    <section id="about" className="py-20 relative bg-[#0F172A]/40 rounded-3xl border border-sky-500/10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            About Me
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            Get to know me, my educational path, strengths, and career objectives.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-[#F8FAFC]">
              Passionate <span className="text-[#38BDF8]">B.Tech Student</span> & <span className="text-[#38BDF8]">Front-End Developer</span>
            </h3>
            
            <p className="text-[#94A3B8] leading-relaxed">
              I am currently pursuing my <strong className="text-[#F8FAFC]">Bachelor of Technology (B.Tech)</strong> degree. My academic journey has equipped me with fundamental computer science principles, algorithms, and practical programming skills.
            </p>
            
            <p className="text-[#94A3B8] leading-relaxed">
              <strong className="text-[#F8FAFC]">Career Objective:</strong> To secure a challenging position in a progressive organization where I can leverage my <span className="text-[#38BDF8]">web development and coding skills</span>, contribute to team success, and grow professionally while designing creative digital products.
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-[#F8FAFC]">Strengths & Core Competencies:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start text-sm text-[#94A3B8]">
                    <span className="text-[#38BDF8] mr-2 font-bold text-base leading-none">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4" data-aos="fade-left">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 hover:scale-105 transition-all duration-300"
              >
                <div className="p-3 bg-[#0B1120] border border-sky-500/20 rounded-xl shadow-inner shadow-black/40">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-[#F8FAFC] mt-0.5">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
