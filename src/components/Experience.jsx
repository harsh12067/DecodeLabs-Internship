import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Experience() {
  const experiences = [
    {
      id: 1,
      role: 'Artificial Intelligence Intern',
      company: 'VISHVENA Techno Solutions Pvt. Ltd.',
      location: 'Hyderabad, Telangana (Remote/Campus)',
      duration: '15 Dec 2025 - 15 Mar 2026 (3 Months)',
      programName: 'Artificial Intelligence - Vibe Coding Internship Program',
      tasks: [
        'Successfully completed the Artificial Intelligence - Vibe Coding Internship Program, learning and applying modern AI concepts.',
        'Developed intelligent software applications by integrating machine learning models with front-end code.',
        'Demonstrated excellent learning ability, coding efficiency, and dedication in completing assigned algorithmic and system tasks.',
        'Worked on neural network basics, NLP pipelines, and data preprocessing to solve real-world technical problems.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            Work Experience
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            My professional history, internships, and industrial training.
          </p>
        </div>

        {/* Experience Cards Layout */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <div 
              key={exp.id} 
              className="glass-card p-6 sm:p-8 rounded-3xl border-l-4 border-l-[#38BDF8] hover:border-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Header section details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] flex items-center gap-3">
                    <FaBriefcase className="text-[#38BDF8] w-5 h-5 flex-shrink-0" />
                    {exp.role}
                  </h3>
                  <p className="text-[#38BDF8] font-semibold mt-1">
                    {exp.company}
                  </p>
                  <span className="text-xs text-[#94A3B8] font-medium block mt-0.5">
                    {exp.programName}
                  </span>
                  <div className="mt-3.5">
                    <a 
                      href="/internship_certificate.png" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 px-4 py-2 rounded-full transition-all shadow-md shadow-sky-500/20 hover:shadow-sky-500/40"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start gap-2 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 bg-[#0B1120] border border-sky-500/20 text-[#38BDF8] px-3 py-1 rounded-full font-semibold">
                    <FaCalendarAlt className="text-[#38BDF8]" /> {exp.duration}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#0B1120] border border-sky-500/20 text-[#CBD5E1] px-3 py-1 rounded-full font-semibold">
                    <FaMapMarkerAlt className="text-[#38BDF8]" /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Task Points */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider">Key Contributions & Learning:</h4>
                <ul className="space-y-2">
                  {exp.tasks.map((task, i) => (
                    <li key={i} className="flex items-start text-[#94A3B8] text-sm leading-relaxed">
                      <span className="text-[#38BDF8] mr-2.5 font-bold mt-0.5">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
