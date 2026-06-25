import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { controller } from "../controllers/controller";
import { Mail, MapPin, Send, MessageSquare, AlertCircle, CheckCircle, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const profile = controller.getDeveloperInfo();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // { status, message }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitResult(null);
    setLoading(true);

    try {
      const response = await controller.submitContactForm(formData);
      setSubmitResult(response);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setSubmitResult({
          status: "error",
          message: "An unexpected error occurred. Please try again."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col justify-center min-h-screen z-10"
    >
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative pb-4 font-heading">
          Get In <span className="text-gradient">Touch</span>
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_#00D4FF]" />
        </h2>
        <p className="text-text-secondary max-w-md mt-4 text-sm font-body">
          Have an opportunity, collaboration project, or simply want to connect? Drop me a line!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto w-full">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col h-full justify-between"
        >
          <div className="glassmorphism p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-full shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-heading tracking-wide">
                Let's Connect
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-8 font-body">
                I am actively looking for internship roles, freelance projects, and Python full-stack opportunities. Feel free to contact me directly via email or the form.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-text-secondary font-heading">Email</h4>
                    <a
                      href={`mailto:${profile.socials.email}`}
                      className="text-sm font-semibold text-white hover:text-primary transition-colors font-body break-all"
                      id="contact-email-link"
                    >
                      {profile.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-text-secondary font-heading">Location</h4>
                    <span className="text-sm font-semibold text-white font-body">
                      Tamil Nadu, India
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-text-secondary font-heading">Available For</h4>
                    <span className="text-sm font-semibold text-white font-body">
                      Freelance / Internships / Full-time
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10 pt-6 border-t border-white/5 justify-start">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="glassmorphism p-8 rounded-2xl border border-white/5 shadow-xl h-full flex flex-col justify-center">
            <form onSubmit={handleSubmit} noValidate id="contact-form" className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-xs font-bold text-text-secondary uppercase tracking-wider font-heading">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    disabled={loading}
                    className={`premium-input px-4 py-3 text-sm ${errors.name ? "border-red-500/50 focus:border-red-500 focus:shadow-red-500/10" : ""}`}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs flex items-center gap-1 font-body mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-xs font-bold text-text-secondary uppercase tracking-wider font-heading">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    disabled={loading}
                    className={`premium-input px-4 py-3 text-sm ${errors.email ? "border-red-500/50 focus:border-red-500 focus:shadow-red-500/10" : ""}`}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs flex items-center gap-1 font-body mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="text-xs font-bold text-text-secondary uppercase tracking-wider font-heading">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Collaboration Opportunities..."
                  disabled={loading}
                  className={`premium-input px-4 py-3 text-sm ${errors.subject ? "border-red-500/50 focus:border-red-500 focus:shadow-red-500/10" : ""}`}
                />
                {errors.subject && (
                  <span className="text-red-400 text-xs flex items-center gap-1 font-body mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs font-bold text-text-secondary uppercase tracking-wider font-heading">
                  Message Details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell me about your project, timeline, or requirements..."
                  disabled={loading}
                  className={`premium-input px-4 py-3 text-sm ${errors.message ? "border-red-500/50 focus:border-red-500 focus:shadow-red-500/10" : ""}`}
                ></textarea>
                {errors.message && (
                  <span className="text-red-400 text-xs flex items-center gap-1 font-body mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </span>
                )}
              </div>

              <AnimatePresence>
                {submitResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-4 rounded-xl flex items-start gap-3 border ${
                      submitResult.status === "success"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                    id="form-alert-msg"
                  >
                    {submitResult.status === "success" ? (
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-body">{submitResult.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-heading font-semibold text-sm bg-gradient-to-r from-secondary to-primary text-dark-bg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
                id="contact-submit-btn"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
