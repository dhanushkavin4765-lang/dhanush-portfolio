import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { controller } from "../controllers/controller";
import { Github, Star, GitFork, BookOpen, ExternalLink, Calendar } from "lucide-react";

export default function GitHubSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    controller.getGitHubStats().then((data) => {
      if (active) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Generate a mock contribution calendar array (24 columns x 7 rows)
  const generateContributionMock = () => {
    const grid = [];
    const colors = ["bg-white/5", "bg-emerald-900/40", "bg-emerald-800/60", "bg-emerald-600/80", "bg-primary/80"];
    for (let c = 0; c < 26; c++) {
      const col = [];
      for (let r = 0; r < 7; r++) {
        // Randomly seed color index favoring lower commits (0 or 1)
        const rand = Math.random();
        let colorIdx = 0;
        if (rand > 0.85) colorIdx = 4;
        else if (rand > 0.7) colorIdx = 3;
        else if (rand > 0.5) colorIdx = 2;
        else if (rand > 0.3) colorIdx = 1;
        col.push(colors[colorIdx]);
      }
      grid.push(col);
    }
    return grid;
  };

  const contributionGrid = generateContributionMock();

  return (
    <section
      id="github"
      className="relative max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col justify-center min-h-screen z-10"
    >
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative pb-4 font-heading">
          GitHub <span className="text-gradient">Activity</span>
          <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_#00D4FF]" />
        </h2>
        <p className="text-text-secondary max-w-md mt-4 text-sm font-body">
          Monitoring repository check-ins and open source contributions.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-text-secondary text-sm font-body">Loading codebase statistics...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
          {/* Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <img
                src={stats.userData.avatar_url}
                alt={stats.userData.name}
                className="w-20 h-20 rounded-full border border-primary/40 shadow-lg shadow-primary/10"
              />
              <div>
                <h3 className="text-2xl font-bold text-white font-heading tracking-wide flex items-center gap-2 justify-center md:justify-start">
                  {stats.userData.name}
                  <a
                    href={stats.userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </h3>
                <p className="text-text-secondary text-sm font-body mt-1">
                  {stats.userData.bio}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-xs text-text-secondary font-semibold">
                  <span>Followers: <strong className="text-white">{stats.userData.followers}</strong></span>
                  <span>Following: <strong className="text-white">{stats.userData.following}</strong></span>
                  <span>Public Repos: <strong className="text-white">{stats.userData.public_repos}</strong></span>
                </div>
              </div>
            </div>

            <a
              href={stats.userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-xs tracking-wider uppercase bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary text-white transition-all duration-300"
            >
              Follow Profile <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Simulated Contribution Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glassmorphism p-6 rounded-2xl border border-white/5 shadow-lg overflow-x-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Contribution Calendar
              </h4>
            </div>

            {/* Calendar cells */}
            <div className="flex gap-[4px] min-w-[500px] justify-between">
              {contributionGrid.map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[4px]">
                  {column.map((color, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={`w-3 h-3 rounded-sm ${color} transition-all duration-300 hover:scale-125`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-text-secondary font-semibold mt-3">
              <span>Less</span>
              <div className="flex gap-[4px] items-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900/40" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-800/60" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600/80" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/80" />
              </div>
              <span>More</span>
            </div>
          </motion.div>

          {/* Active Repositories Showcase */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading tracking-wide flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" /> Active Repositories
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.repos.slice(0, 3).map((repo, idx) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glassmorphism p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 h-full shadow-md"
                >
                  <div>
                    <h5 className="text-base font-bold text-white font-heading tracking-wide mb-2 flex items-center justify-between">
                      {repo.name}
                      <Github className="w-4 h-4 text-text-secondary" />
                    </h5>
                    <p className="text-text-secondary text-xs leading-relaxed mb-6 font-body line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-text-secondary border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {repo.language}
                    </span>
                    <div className="flex gap-3">
                      <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-yellow-500" /> {repo.stars}</span>
                      <span className="flex items-center gap-0.5"><GitFork className="w-3.5 h-3.5 text-secondary" /> {repo.forks}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
