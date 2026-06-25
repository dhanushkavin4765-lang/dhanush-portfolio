import { motion } from "framer-motion";
import { controller } from "../controllers/controller";
import { GraduationCap, BookOpen, Terminal, Rocket } from "lucide-react";

export default function Timeline() {
  const timelineData = controller.getTimeline();

  const timelineIcons = [
    <GraduationCap className="w-5 h-5 text-primary" />,
    <BookOpen className="w-5 h-5 text-secondary" />,
    <Terminal className="w-5 h-5 text-accent" />,
    <Rocket className="w-5 h-5 text-green-400" />
  ];

  return (
    <section
      id="timeline"
      className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col justify-center min-h-screen z-10"
    >
      <div className="flex flex-col items-center mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative pb-4 font-heading">
          Growth <span className="text-gradient">Timeline</span>
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_#00D4FF]" />
        </h2>
        <p className="text-text-secondary max-w-md mt-4 text-sm font-body">
          An overview of my academic milestones and full stack developer development path.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto w-full pl-6 md:pl-8">
        {/* Vertical Line Graphic */}
        <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-primary via-secondary to-accent rounded-full shadow-[0_0_10px_#00D4FF]" />

        {/* Timeline Items */}
        <div className="flex flex-col gap-10">
          {timelineData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline dot node */}
              <div className="absolute -left-[37px] md:-left-[45px] top-1.5 w-7 h-7 rounded-full bg-dark-bg border-2 border-secondary flex items-center justify-center shadow-lg shadow-black/80 z-20 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                {/* Micro outer pulsing glow */}
                <div className="absolute inset-0 rounded-full animate-ping bg-secondary/15 group-hover:bg-primary/20 pointer-events-none" />
                {timelineIcons[idx % timelineIcons.length]}
              </div>

              {/* Card Container */}
              <div className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/5 hover:border-secondary/20 transition-all duration-300 shadow-xl shadow-black/30">
                <span className="inline-block text-xs font-bold text-primary mb-2 font-heading tracking-widest uppercase">
                  {item.year}
                </span>
                
                <h3 className="text-xl font-bold text-white mb-1.5 font-heading tracking-wide">
                  {item.title}
                </h3>
                
                <h4 className="text-sm font-semibold text-text-secondary mb-4 font-body">
                  {item.company}
                </h4>
                
                <p className="text-text-secondary text-sm leading-relaxed font-body">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
