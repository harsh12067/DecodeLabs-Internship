import React from 'react';
import { FaLaptopCode, FaReact, FaBezierCurve, FaTools } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Building full-featured, secure web applications from databases to client interfaces. Developing database designs in MySQL/MongoDB and linking them with server APIs.',
      icon: <FaLaptopCode className="w-8 h-8 text-[#38BDF8] group-hover:text-white transition-colors" />
    },
    {
      id: 2,
      title: 'Front-End Development',
      description: 'Crafting responsive, visual client interfaces using React.js, Tailwind CSS, and HTML5/CSS3. Building seamless routing, UI interactivity, and state management.',
      icon: <FaReact className="w-8 h-8 text-[#38BDF8] group-hover:text-white transition-colors" />
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Designing premium prototypes and high-fidelity mockups. Focusing on user-centric layouts, micro-interactions, custom styling, typography, and cohesive color schemes.',
      icon: <FaBezierCurve className="w-8 h-8 text-[#38BDF8] group-hover:text-white transition-colors" />
    },
    {
      id: 4,
      title: 'Website Maintenance',
      description: 'Assisting in deployment, speed optimization, regular content updates, and resolving code issues. Ensuring websites remain responsive and secure across all browsers.',
      icon: <FaTools className="w-8 h-8 text-[#38BDF8] group-hover:text-white transition-colors" />
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-[#0F172A]/40 rounded-3xl border border-sky-500/10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            My Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            The professional services and development expertise that I can provide for your projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="glass-card p-8 rounded-3xl flex flex-col justify-between border border-sky-500/20 hover:border-sky-400/60 hover:bg-[#172033] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-300 transform hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className="p-4 bg-[#0B1120] border border-sky-500/20 rounded-2xl w-fit group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-400 transition-all duration-300 shadow-inner">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
