import { motion } from "framer-motion";
import { controller } from "../controllers/controller";
import { Award, Code2, Coffee, Zap } from "lucide-react";

export default function About() {
  const profile = controller.getDeveloperInfo();

  const statIcons = [
    <Zap className="w-6 h-6 text-primary" />,
    <Code2 className="w-6 h-6 text-secondary" />,
    <Coffee className="w-6 h-6 text-accent" />,
    <Award className="w-6 h-6 text-green-400" />
  ];

  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col justify-center min-h-screen z-10"
    >
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative pb-4 font-heading">
          About <span className="text-gradient">Me</span>
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_#00D4FF]" />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Bio Narrative Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glassmorphism p-8 md:p-10 rounded-2xl flex flex-col justify-center border border-white/5 hover:border-primary/20 transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-white mb-6 font-heading tracking-wide">
            My Creative Engineering Journey
          </h3>
          <p className="text-text-secondary mb-5 leading-relaxed font-body text-sm md:text-base">
            {profile.bio}
          </p>
          <p className="text-text-secondary mb-5 leading-relaxed font-body text-sm md:text-base">
            I believe software engineering is about crafting scalable, intelligent solutions to real-world challenges. With a focus on Python frameworks (like FastAPI and Flask) and modern frontend interfaces (React and Tailwind CSS), I strive to create web platforms that perform seamlessly under load.
          </p>
          <p className="text-text-secondary leading-relaxed font-body text-sm md:text-base">
            As a student graduating in 2027, my mindset is geared towards continuous learning, solid architecture patterns, and writing clean, maintainable code. I am eager to apply my full-stack skills to collaborative project teams, startups, and internship programs.
          </p>
        </motion.div>

        {/* Right: Interactive Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-5">
          {profile.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center text-center border border-white/5 hover:border-secondary/25 transition-all duration-300 shadow-lg shadow-black/30"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                {statIcons[idx % statIcons.length]}
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-white mb-1.5 font-heading">
                {stat.value}
              </h4>
              <p className="text-xs font-semibold text-text-secondary tracking-wider uppercase font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
