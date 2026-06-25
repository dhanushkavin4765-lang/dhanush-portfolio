import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { controller } from "../controllers/controller";
import { ExternalLink, Layers, X, Cpu, Github, HelpCircle } from "lucide-react";

// Individual Project Card with custom 3D Tilt and Spotlight glow
function ProjectCard({ project, onLearnMore }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    card.style.transform = `perspective(1000px) rotateX(${-normalizedY * 8}deg) rotateY(${normalizedX * 8}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      style={{
        "--x": "50%",
        "--y": "50%"
      }}
      className="relative overflow-hidden rounded-2xl glassmorphism border border-white/5 shadow-xl transition-all duration-200 cursor-pointer group flex flex-col h-full"
      onClick={() => onLearnMore(project)}
    >
      {/* Interactive Hover Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(350px circle at var(--x) var(--y), rgba(0, 212, 255, 0.08), transparent 80%)"
        }}
      />
      {/* Light border glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-primary/20 rounded-2xl z-20"
      />

      {/* Project Thumbnail Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-slate-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback image wrapper */}
        <div className="hidden absolute inset-0 items-center justify-center bg-dark-surface/90 text-primary">
          <Layers className="w-12 h-12 stroke-[1.5]" />
        </div>
        
        {/* Category Overlay tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-dark-bg/85 backdrop-blur-md border border-white/10 text-white tracking-wider uppercase">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors font-heading tracking-wide">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 font-body">
            {project.shortDescription}
          </p>
        </div>

        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-primary/10 border border-primary/15 text-primary"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-secondary">
                +{project.technologies.length - 3} More
              </span>
            )}
          </div>

          {/* Card footer buttons */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-xs font-bold tracking-wider text-secondary group-hover:text-primary transition-colors flex items-center gap-1">
              Explore Architecture <Cpu className="w-3.5 h-3.5" />
            </span>
            <div className="flex gap-2.5" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary text-text-secondary hover:text-white transition-all"
                title="View Codebase"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary text-text-secondary hover:text-white transition-all"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = controller.getProjects("All");

  return (
    <section
      id="projects"
      className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col justify-center min-h-screen z-10"
    >
      <div className="flex flex-col items-center mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative pb-4 font-heading">
          Featured <span className="text-gradient">Projects</span>
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_#00D4FF]" />
        </h2>
        <p className="text-text-secondary max-w-md mt-4 text-sm font-body">
          Delivering robust full-stack systems across multiple tech stacks. Click a project card to view features and architecture blueprints.
        </p>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto w-full">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onLearnMore={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Modern Architecture Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glassmorphism rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-text-secondary hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-grow">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block font-heading">
                  System Architecture Details
                </span>
                <h3 className="text-3xl font-extrabold text-white mb-2 font-heading tracking-wide">
                  {selectedProject.title}
                </h3>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary mb-6 tracking-wide">
                  {selectedProject.category}
                </span>

                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 font-body border-l-2 border-primary/40 pl-4">
                  {selectedProject.fullDescription}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5 font-heading">
                    <Layers className="w-4 h-4 text-primary" /> Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-text-secondary font-body">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Blueprint */}
                <div className="mb-8">
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5 font-heading">
                    <Cpu className="w-4 h-4 text-secondary" /> Technology Blueprint
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-bold px-3 py-1 rounded bg-white/5 border border-white/10 text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-4 pt-5 border-t border-white/5">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                >
                  <Github className="w-4 h-4" /> Github Codebase
                </a>
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm bg-gradient-to-r from-secondary to-primary text-dark-bg transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demonstration
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
