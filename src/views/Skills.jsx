import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { controller } from "../controllers/controller";
import { Code, Server, Database, Wrench, Layers } from "lucide-react";

export default function Skills() {
  const allSkills = controller.getSkills();
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    { id: "All", label: "All Skills", icon: <Layers className="w-4 h-4" /> },
    { id: "Frontend", label: "Frontend", icon: <Code className="w-4 h-4" /> },
    { id: "Backend", label: "Backend", icon: <Server className="w-4 h-4" /> },
    { id: "Database", label: "Database", icon: <Database className="w-4 h-4" /> },
    { id: "Tools", label: "Tools", icon: <Wrench className="w-4 h-4" /> }
  ];

  const filteredSkills = activeTab === "All" 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeTab);

  // Helper to resolve specific styling for categories
  const getCategoryStyles = (category) => {
    switch (category) {
      case "Frontend":
        return {
          bg: "bg-primary/10",
          border: "border-primary/20",
          text: "text-primary",
          bar: "bg-primary"
        };
      case "Backend":
        return {
          bg: "bg-secondary/10",
          border: "border-secondary/20",
          text: "text-secondary",
          bar: "bg-secondary"
        };
      case "Database":
        return {
          bg: "bg-accent/10",
          border: "border-accent/20",
          text: "text-accent",
          bar: "bg-accent"
        };
      case "Tools":
        return {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          text: "text-emerald-400",
          bar: "bg-emerald-500"
        };
      default:
        return {
          bg: "bg-white/5",
          border: "border-white/10",
          text: "text-white",
          bar: "bg-white"
        };
    }
  };

  return (
    <section
      id="skills"
      className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col justify-center min-h-screen z-10"
    >
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative pb-4 font-heading">
          Technical <span className="text-gradient">Skills</span>
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_#00D4FF]" />
        </h2>
      </div>

      {/* Categories Tabs Filter */}
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-12">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-xs md:text-sm tracking-wide uppercase transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-dark-bg shadow-[0_4px_15px_rgba(0,212,255,0.25)] hover:opacity-90"
                  : "bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => {
            const styles = getCategoryStyles(skill.category);
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glassmorphism p-6 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg shadow-black/20 group relative overflow-hidden"
              >
                {/* Accent glow on top-right of cards */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-[40px] opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none ${styles.bar}`} />

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white font-heading tracking-wide group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${styles.bg} ${styles.border} ${styles.text}`}>
                    {skill.category}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2 text-xs font-semibold text-text-secondary">
                    <span>Proficiency</span>
                    <span className={styles.text}>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full rounded-full ${styles.bar}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
