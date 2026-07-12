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
    <section id="education" className="py-20 bg-slate-100/50 dark:bg-navy-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white inline-block relative pb-2">
            Education
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            My academic journey and educational qualifications.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-slate-200 dark:border-navy-700 ml-4 md:ml-8 space-y-12 max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <div 
              key={item.id} 
              className="relative pl-8 timeline-item"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Floating Timeline Icon */}
              <div className="absolute -left-5 top-1.5 p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white shadow-md z-20">
                <FaGraduationCap className="w-4 h-4" />
              </div>

              {/* Timeline Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 w-fit">
                    {item.period}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {item.institution}
                </p>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="border-t border-slate-100 dark:border-navy-700 pt-4 mt-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Result / Performance: <span className="text-purple-600 dark:text-purple-400">{item.grade}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
