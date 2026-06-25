import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Download, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { controller } from "../controllers/controller";

export default function Hero() {
  const profile = controller.getDeveloperInfo();
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const roles = [
    "Python Full Stack Developer",
    "Full Stack Web Developer",
    "FastAPI Developer",
    "React Developer",
    "Backend Engineer"
  ];

  // Typing effect logic
  useEffect(() => {
    const activeRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 80);
    }

    if (!isDeleting && charIndex === activeRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // Wait before backspacing
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Three.js 3D sphere animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Starfield / Sphere Cloud
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPrimary = new THREE.Color("#00D4FF");
    const colorSecondary = new THREE.Color("#7B61FF");

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere
      const theta = i * 0.1 + Math.PI;
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const r = 4.5 + Math.random() * 1.5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = colorPrimary.clone().lerp(colorSecondary, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Central Wireframe Sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(3.2, 2);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7B61FF,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const wireSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(wireSphere);

    // Dynamic inner core mesh
    const coreGeometry = new THREE.OctahedronGeometry(1.4, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00D4FF,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreSphere);

    // Ambient light just in case
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse movement track
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animFrameId;
    const tick = () => {
      animFrameId = requestAnimationFrame(tick);

      particleSystem.rotation.y += 0.0015;
      particleSystem.rotation.x += 0.0008;

      wireSphere.rotation.y -= 0.0005;
      wireSphere.rotation.z += 0.001;

      coreSphere.rotation.x -= 0.004;
      coreSphere.rotation.y += 0.003;

      // Mouse interactive interpolation
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Rotate whole scene slightly
      scene.rotation.y = targetX * 0.4;
      scene.rotation.x = -targetY * 0.4;

      renderer.render(scene, camera);
    };

    tick();

    // Clean up WebGL resources
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Simulate download resume
  const handleDownloadResume = (e) => {
    e.preventDefault();
    alert("Starting Resume download for Dhanush B... (PDF format)");
    // In production, this points to an actual PDF file asset path
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-8 py-24 z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading and Taglines */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="font-heading font-semibold text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(0,212,255,0.1)]">
              IT Student & Full Stack Dev
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none"
          >
            Hi, I'm <span className="text-gradient drop-shadow-[0_0_30px_rgba(0,212,255,0.2)]">{profile.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl md:text-3xl font-heading font-semibold text-text-secondary mb-6 h-10 flex items-center"
          >
            A <span className="text-secondary font-bold ml-2 border-r-2 border-primary animate-typing-caret pr-1">{typedText}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg text-text-secondary mb-10 max-w-lg leading-relaxed font-body"
          >
            {profile.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-semibold text-sm bg-gradient-to-r from-secondary to-primary text-dark-bg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] cursor-pointer"
              id="hero-btn-work"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-heading font-semibold text-sm border border-white/10 hover:border-primary bg-white/5 hover:bg-primary/10 text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              id="hero-btn-contact"
            >
              Contact Me
            </a>

            <a
              href="#resume"
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-heading font-semibold text-sm border border-white/15 hover:border-secondary text-text-secondary hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              id="hero-btn-resume"
            >
              <Download className="w-4 h-4" />
              CV
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-4"
          >
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              aria-label="GitHub"
              id="hero-social-github"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              aria-label="LinkedIn"
              id="hero-social-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              aria-label="Email"
              id="hero-social-email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Three.js Canvas Sphere & Orbiting badging */}
        <div className="lg:col-span-5 h-[350px] md:h-[500px] flex items-center justify-center relative w-full select-none">
          {/* Glowing lighting backdrop */}
          <div className="absolute w-[250px] h-[250px] bg-secondary/15 rounded-full filter blur-[80px] pointer-events-none z-0" />
          <div className="absolute w-[200px] h-[200px] bg-primary/10 rounded-full filter blur-[70px] pointer-events-none z-0 translate-x-20 -translate-y-20" />

          {/* ThreeJS Container */}
          <div ref={canvasRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing" />

          {/* Orbiting HTML technology badges for depth */}
          <div className="absolute top-1/4 left-1/10 bg-dark-surface/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-white shadow-lg animate-float z-20">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            Python
          </div>
          <div className="absolute bottom-1/4 right-1/10 bg-dark-surface/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-white shadow-lg animate-float-delayed z-20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            React
          </div>
          <div className="absolute top-1/2 right-1/20 bg-dark-surface/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-white shadow-lg animate-float z-20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            FastAPI
          </div>
        </div>
      </div>
    </section>
  );
}
