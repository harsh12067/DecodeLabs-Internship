import React from 'react';
import { FaGraduationCap, FaBrain, FaGamepad, FaCode } from 'react-icons/fa';

export default function About() {
  const stats = [
    { label: 'Degree', value: 'B.Tech ECE', icon: <FaGraduationCap className="text-purple-500 w-6 h-6" /> },
    { label: 'College', value: 'Arya (ACEIT)', icon: <FaCode className="text-indigo-500 w-6 h-6" /> },
    { label: 'Interests', value: 'Web Dev & DSA', icon: <FaBrain className="text-pink-500 w-6 h-6" /> },
    { label: 'Hobbies', value: 'Gaming & Tech', icon: <FaGamepad className="text-blue-500 w-6 h-6" /> }
  ];

  const strengths = [
    'Strong analytical & problem-solving abilities (DSA)',
    'Responsive front-end development & modern UI design',
    'Familiarity with SQL, NoSQL databases and Git version control',
    'Continuous learner, passionate about emerging web technologies'
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-100/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white inline-block relative pb-2">
            About Me
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            Get to know me, my educational path, strengths, and career objectives.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Passionate B.Tech Student & Front-End Developer
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I am currently pursuing my **Bachelor of Technology (B.Tech)** degree. My academic journey has equipped me with fundamental computer science principles, algorithms, and practical programming skills.
            </p>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Career Objective:</strong> To secure a challenging position in a progressive organization where I can leverage my web development and coding skills, contribute to team success, and grow professionally while designing creative digital products.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-700 dark:text-slate-300">Strengths & Core Competencies:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-purple-500 mr-2 font-bold">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4" data-aos="fade-left">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 hover:scale-105 transition-transform duration-300">
                <div className="p-3 bg-slate-100 dark:bg-navy-800 rounded-xl w-fit">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
