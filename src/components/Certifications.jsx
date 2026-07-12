import React from 'react';
import { FaCertificate, FaAward, FaExternalLinkAlt } from 'react-icons/fa';

export default function Certifications() {
  const certifications = [
    {
      id: 1,
      title: 'Python (Basic) Skill Certification',
      issuer: 'HackerRank',
      date: '05 Oct, 2025',
      idNumber: 'C5D3E43AB02C',
      link: 'https://www.hackerrank.com/certificates/c5d3e43ab02c',
      icon: <FaAward className="text-purple-500 w-8 h-8" />
    },
    {
      id: 2,
      title: 'C Essentials 1 Certification',
      issuer: 'Cisco Networking Academy & C++ Institute',
      date: '30 Jun, 2025',
      idNumber: '79226ced-3a3c-4031-a42e-cffa1189194e',
      link: 'https://www.credly.com/users/harsh-tiwari.f2bef479',
      icon: <FaCertificate className="text-indigo-500 w-8 h-8" />
    },
    {
      id: 3,
      title: 'MERN Full Stack Developer Certification',
      issuer: 'Unstop',
      date: '2025',
      idNumber: '0465abca-1ca9-491d-ad60-f2c11f2ff539',
      link: 'https://unstop.com/certificate-preview/0465abca-1ca9-491d-ad60-f2c11f2ff539?utm_campaign=site-emails',
      icon: <FaAward className="text-pink-500 w-8 h-8" />
    },
    {
      id: 4,
      title: 'Claude 101 Certification',
      issuer: 'Anthropic (Skilljar)',
      date: '2025',
      idNumber: '3c5y767w56es',
      link: 'https://verify.skilljar.com/c/3c5y767w56es',
      icon: <FaCertificate className="text-blue-500 w-8 h-8" />
    }
  ];

  return (
    <section id="certifications" className="py-20 relative bg-slate-100/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white inline-block relative pb-2">
            Certifications
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            Professional certifications and courses that validate my skills.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start gap-6 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-purple-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon Container */}
              <div className="p-4 bg-slate-100 dark:bg-navy-800 rounded-2xl flex items-center justify-center text-purple-500">
                {cert.icon}
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                    {cert.date}
                  </span>
                </div>
                
                <p className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                  {cert.issuer}
                </p>

                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Credential ID: <span className="font-mono">{cert.idNumber}</span>
                </p>

                <div className="pt-4">
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors uppercase tracking-wider"
                  >
                    Verify Credential <FaExternalLinkAlt className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
