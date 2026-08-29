import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import portfolioImg from '../assets/project_portfolio.png';
import skillswapImg from '../assets/project_skillswap.png';
import aetherflowImg from '../assets/project_aetherflow.png';
import backendImg from '../assets/project_backend.png';

// Map project IDs to local images
const projectImages = {
  1: portfolioImg,
  2: skillswapImg,
  3: aetherflowImg,
  4: backendImg,
};

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] inline-block relative pb-2">
            My Projects
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]" aria-hidden="true" />
          </h2>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto">
            A showcase of my recent coding projects, illustrating my technical capabilities and design logic.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col group border border-sky-500/20 hover:border-sky-400/60 hover:bg-[#172033] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              aria-label={`Project: ${project.title}`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 sm:h-56 bg-[#0B1120]">
                <img 
                  src={projectImages[project.id]} 
                  alt={`Screenshot of ${project.title}`}
                  loading="lazy"
                  width={600}
                  height={340}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" aria-hidden="true">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-sky-400 px-3 py-1 rounded-full shadow-md shadow-sky-500/30">
                    {project.technologies[0]}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] mb-3 group-hover:text-[#38BDF8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#0B1120] text-[#38BDF8] border border-sky-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between border-t border-sky-500/15 pt-4 mt-auto">
                    {project.githubLink ? (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-[#CBD5E1] hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <FaGithub className="w-4 h-4" aria-hidden="true" /> Code
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">Private project</span>
                    )}

                    {project.liveLink ? (
                      <a 
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-500 hover:to-sky-300 px-4 py-2 rounded-full transition-all shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" /> Live Demo
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500 italic">No live demo</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
