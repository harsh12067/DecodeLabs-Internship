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
      icon: <FaAward className="text-[#38BDF8] w-8 h-8" />
    },
    {
      id: 2,
      title: 'C Essentials 1 Certification',
      issuer: 'Cisco Networking Academy & C++ Institute',
      date: '30 Jun, 2025',
      idNumber: '79226ced-3a3c-4031-a42e-cffa1189194e',
      link: 'https://www.credly.com/users/harsh-tiwari.f2bef479',
      icon: <FaCertificate className="text-[#38BDF8] w-8 h-8" />
    },
    {
      id: 3,
      title: 'MERN Full Stack Developer Certification',
      issuer: 'Unstop',
      date: '2025',
      idNumber: '0465abca-1ca9-491d-ad60-f2c11f2ff539',
      link: 'https://unstop.com/certificate-preview/0465abca-1ca9-491d-ad60-f2c11f2ff539?utm_campaign=site-emails',
      icon: <FaAward className="text-[#38BDF8] w-8 h-8" />
    },
    {
      id: 4,
      title: 'Claude 101 Certification',
      issuer: 'Anthropic (Skilljar)',
      date: '2025',
      idNumber: '3c5y767w56es',
      link: 'https://verify.skilljar.com/c/3c5y767w56es',
      icon: <FaCertificate className="text-[#38BDF8] w-8 h-8" />
    }
  ];

  return (
    <section id="certifications" className="py-20 relative bg-[#0F172A]/40 rounded-3xl border border-sky-500/10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            Certifications
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            Professional certifications and courses that validate my skills.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between border border-sky-500/20 hover:border-sky-400/60 hover:bg-[#172033] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start gap-4">
                {/* Icon Container */}
                <div className="p-4 bg-[#0B1120] border border-sky-500/25 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {cert.icon}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#38BDF8]">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    Issued: {cert.date}
                  </p>
                  {cert.idNumber && (
                    <p className="text-xs text-slate-500 font-mono pt-1">
                      ID: {cert.idNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-sky-500/15 flex justify-end">
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#38BDF8] hover:text-sky-300 transition-colors"
                >
                  Verify Certificate <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
