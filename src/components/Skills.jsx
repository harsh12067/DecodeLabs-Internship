import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SiCplusplus, SiPython, SiJavascript, 
  SiReact, SiBootstrap, SiTailwindcss, 
  SiMysql, SiMongodb, SiGit, SiGithub 
} from 'react-icons/si';
import { FaJava, FaCss3Alt, FaHtml5, FaCode } from 'react-icons/fa';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills' },
    { id: 'programming', name: 'Programming' },
    { id: 'web', name: 'Web Development' },
    { id: 'database', name: 'Databases' },
    { id: 'tools', name: 'Tools' }
  ];

  const skillsData = [
    // Programming
    { name: 'C / C++', level: 85, category: 'programming', icon: <SiCplusplus className="text-blue-600 w-8 h-8" aria-hidden="true" /> },
    { name: 'Java', level: 80, category: 'programming', icon: <FaJava className="text-red-500 w-8 h-8" aria-hidden="true" /> },
    { name: 'Python', level: 75, category: 'programming', icon: <SiPython className="text-yellow-500 w-8 h-8" aria-hidden="true" /> },
    { name: 'JavaScript', level: 80, category: 'programming', icon: <SiJavascript className="text-yellow-400 w-8 h-8" aria-hidden="true" /> },
    
    // Web Dev
    { name: 'HTML5', level: 90, category: 'web', icon: <FaHtml5 className="text-orange-500 w-8 h-8" aria-hidden="true" /> },
    { name: 'CSS3', level: 85, category: 'web', icon: <FaCss3Alt className="text-blue-500 w-8 h-8" aria-hidden="true" /> },
    { name: 'React.js', level: 80, category: 'web', icon: <SiReact className="text-cyan-400 w-8 h-8" aria-hidden="true" /> },
    { name: 'Bootstrap', level: 75, category: 'web', icon: <SiBootstrap className="text-purple-600 w-8 h-8" aria-hidden="true" /> },
    { name: 'Tailwind CSS', level: 85, category: 'web', icon: <SiTailwindcss className="text-teal-400 w-8 h-8" aria-hidden="true" /> },
    
    // Databases
    { name: 'MySQL', level: 78, category: 'database', icon: <SiMysql className="text-blue-400 w-8 h-8" aria-hidden="true" /> },
    { name: 'MongoDB', level: 70, category: 'database', icon: <SiMongodb className="text-green-500 w-8 h-8" aria-hidden="true" /> },
    
    // Tools
    { name: 'Git', level: 80, category: 'tools', icon: <SiGit className="text-orange-600 w-8 h-8" aria-hidden="true" /> },
    { name: 'GitHub', level: 85, category: 'tools', icon: <SiGithub className="text-slate-800 dark:text-white w-8 h-8" aria-hidden="true" /> },
    { name: 'VS Code', level: 90, category: 'tools', icon: <FaCode className="text-blue-500 w-8 h-8" aria-hidden="true" /> }
  ];

  const filteredSkills = activeTab === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white inline-block relative pb-2">
            My Skills
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full" aria-hidden="true" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            A comprehensive list of technologies, frameworks, and programming languages that I specialize in.
          </p>
        </div>

        {/* Tab Selector — accessible tablist */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Filter skills by category"
          data-aos="fade-up"
        >
          {skillCategories.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeTab === category.id}
              aria-controls={`skills-panel-${category.id}`}
              id={`skills-tab-${category.id}`}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          id={`skills-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeTab}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 rounded-2xl flex items-center gap-6 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
            >
              {/* Skill Icon */}
              <div className="p-3 bg-slate-100/80 dark:bg-navy-800/80 rounded-xl flex items-center justify-center flex-shrink-0">
                {skill.icon}
              </div>

              {/* Progress Detail */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{skill.name}</span>
                  <span className="text-sm font-bold text-purple-500 dark:text-purple-400" aria-hidden="true">{skill.level}%</span>
                </div>
                {/* Progress Bar */}
                <div
                  className="w-full h-2.5 bg-slate-200 dark:bg-navy-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency: ${skill.level}%`}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
