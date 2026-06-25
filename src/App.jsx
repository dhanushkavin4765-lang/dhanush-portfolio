import { useEffect, useRef } from "react";
import Navbar from "./views/Navbar";
import Hero from "./views/Hero";
import About from "./views/About";
import Skills from "./views/Skills";
import Projects from "./views/Projects";
import Timeline from "./views/Timeline";
import GitHubSection from "./views/GitHubSection";
import Contact from "./views/Contact";

export default function App() {
  const appRef = useRef(null);

  // Spotlight pointer tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (appRef.current) {
        appRef.current.style.setProperty("--x", `${e.clientX}px`);
        appRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={appRef} className="portfolio-app relative bg-dark-bg min-h-screen text-white overflow-hidden">
      {/* Background aesthetics */}
      <div className="mesh-gradient-bg">
        <div className="mesh-blob mesh-blob-1"></div>
        <div className="mesh-blob mesh-blob-2"></div>
        <div className="mesh-blob mesh-blob-3"></div>
      </div>
      
      {/* Grid line grid-overlay */}
      <div className="grid-overlay"></div>
      
      {/* Spotlight highlight */}
      <div className="spotlight"></div>

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Layout Content */}
      <main className="relative z-10 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <GitHubSection />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer bg-dark-surface/40 border-t border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-heading font-extrabold text-lg text-white">
              Dhanush<span className="text-primary">.dev</span>
            </span>
            <p className="text-xs text-text-secondary mt-1 font-body">
              Python Full Stack Developer & B.Tech IT Student (2027)
            </p>
          </div>
          
          <div className="text-center md:text-right font-body text-xs text-text-secondary">
            <p>&copy; {new Date().getFullYear()} Dhanush B. All rights reserved.</p>
            <p className="mt-1">
              Built with <span className="text-primary">React</span> + <span className="text-secondary">Vite</span> + <span className="text-accent">Tailwind CSS</span> + <span className="text-green-400">Framer Motion</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
