import React from 'react';
import { FaLaptopCode, FaReact, FaBezierCurve, FaTools } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Building full-featured, secure web applications from databases to client interfaces. Developing database designs in MySQL/MongoDB and linking them with server APIs.',
      icon: <FaLaptopCode className="w-8 h-8 text-purple-500" />
    },
    {
      id: 2,
      title: 'Front-End Development',
      description: 'Crafting responsive, visual client interfaces using React.js, Tailwind CSS, and HTML5/CSS3. Building seamless routing, UI interactivity, and state management.',
      icon: <FaReact className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Designing premium prototypes and high-fidelity mockups. Focusing on user-centric layouts, micro-interactions, custom styling, typography, and cohesive color schemes.',
      icon: <FaBezierCurve className="w-8 h-8 text-pink-500" />
    },
    {
      id: 4,
      title: 'Website Maintenance',
      description: 'Assisting in deployment, speed optimization, regular content updates, and resolving code issues. Ensuring websites remain responsive and secure across all browsers.',
      icon: <FaTools className="w-8 h-8 text-blue-500" />
    }
  ];

  return (
    <section id="services" className="py-20 relative bg-slate-100/50 dark:bg-navy-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white inline-block relative pb-2">
            My Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            The professional services and development expertise that I can provide for your projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="glass-card p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 transform hover:-translate-y-2 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className="p-4 bg-slate-100 dark:bg-navy-800 rounded-2xl w-fit group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-500 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
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
