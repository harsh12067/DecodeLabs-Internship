import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

export default function Education() {
  const timelineData = [
    {
      id: 1,
      title: 'Bachelor of Technology (B.Tech)',
      subtitle: 'Electronics & Communication Engineering (ECE)',
      institution: 'Arya College of Engineering and IT',
      period: '2024 - Present',
      description: 'Pursuing B.Tech in Electronics & Communication Engineering. Focused on combining hardware electronic systems with modern software applications, microcontrollers, and communication tech.',
      grade: 'ECE Student (Current)'
    },
    {
      id: 2,
      title: 'Senior Secondary Education (Class XII)',
      subtitle: 'Science Stream (PCM)',
      institution: 'Jai Durga Senior Secondary School',
      period: '2023 - 2024',
      description: 'Completed Class XII in the Science stream with Physics, Chemistry, Mathematics (PCM).',
      grade: 'Percentage: 75.20%'
    },
    {
      id: 3,
      title: 'Secondary Education (Class X)',
      subtitle: 'General Academics',
      institution: 'Sunrise Children Academy',
      period: '2021 - 2022',
      description: 'Completed Class X secondary examinations with a solid grasp of science and mathematics foundation.',
      grade: 'Percentage: 76.17%'
    }
  ];

  return (
    <section id="education" className="py-20 bg-[#0F172A]/40 rounded-3xl border border-sky-500/10 my-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            Education
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            My academic journey and educational qualifications.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-sky-500/25 ml-4 md:ml-8 space-y-12 max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <div 
              key={item.id} 
              className="relative pl-8 timeline-item"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Floating Timeline Icon */}
              <div className="absolute -left-5 top-1.5 p-2 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full text-white shadow-md shadow-sky-500/30 z-20">
                <FaGraduationCap className="w-4 h-4" />
              </div>

              {/* Education Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-[#0B1120] text-[#38BDF8] border border-sky-500/20 rounded-full w-fit">
                    {item.period}
                  </span>
                  <span className="text-xs font-bold text-[#38BDF8] bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full w-fit">
                    {item.grade}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F8FAFC]">
                  {item.title}
                </h3>
                
                <p className="text-sm font-semibold text-[#38BDF8] mt-1">
                  {item.subtitle} — <span className="text-[#CBD5E1] font-normal">{item.institution}</span>
                </p>

                <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
