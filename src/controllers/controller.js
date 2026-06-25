import { developerData } from "../models/data";

/**
 * Controller class to bridge Model data and UI Views.
 */
class PortfolioController {
  /**
   * Retrieves the developer's profile information.
   */
  getDeveloperInfo() {
    return developerData.profile;
  }

  /**
   * Retrieves the list of skills.
   */
  getSkills() {
    return developerData.skills;
  }

  /**
   * Retrieves the academic and career timeline.
   */
  getTimeline() {
    return developerData.timeline;
  }

  /**
   * Retrieves all projects, optionally filtered by technology or category.
   * @param {string} filter - Filter term
   */
  getProjects(filter = "All") {
    const projects = developerData.projects;
    if (filter === "All") {
      return projects;
    }
    return projects.filter(
      (project) =>
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        ) || project.category.toLowerCase().includes(filter.toLowerCase())
    );
  }

  /**
   * Fetches public GitHub statistics and top repositories.
   * Includes a robust fallback when offline or API rate-limited.
   * @param {string} username - GitHub username
   */
  async getGitHubStats(username = "dhanushkavin4765-lang") {
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("GitHub user API fetch failed");
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`);
      let reposData = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      return {
        userData: {
          public_repos: userData.public_repos ?? 12,
          followers: userData.followers ?? 4,
          following: userData.following ?? 8,
          name: userData.name ?? "Dhanush B",
          bio: userData.bio ?? "Python Full Stack Developer",
          avatar_url: userData.avatar_url ?? "https://avatars.githubusercontent.com/u/148455132?v=4",
          html_url: userData.html_url ?? `https://github.com/${username}`
        },
        repos: reposData.map((repo) => ({
          name: repo.name,
          description: repo.description || "No description provided.",
          stars: repo.stargazers_count,
          forks: repo.forks,
          language: repo.language || "Python",
          html_url: repo.html_url
        }))
      };
    } catch (e) {
      console.warn("GitHub API fetch error; utilizing pre-cached statistics fallback:", e.message);
      return {
        userData: {
          public_repos: 12,
          followers: 6,
          following: 12,
          name: "Dhanush B",
          bio: "Building modern web solutions with Python, React, FastAPI, and innovation.",
          avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
          html_url: `https://github.com/${username}`
        },
        repos: [
          {
            name: "venture-connect",
            description: "A premium collaborative platform bridging startup founders, business mentors, and venture capital investors. Built with Java and Spring Boot.",
            stars: 4,
            forks: 1,
            language: "Java",
            html_url: `https://github.com/${username}/venture-connect`
          },
          {
            name: "locotour",
            description: "A smart hyperlocal tourism and route recommendation planner powered by FastAPI backend, MongoDB, and React frontend.",
            stars: 5,
            forks: 2,
            language: "Python",
            html_url: `https://github.com/${username}/locotour`
          },
          {
            name: "developer-portfolio",
            description: "A world-class, premium dark futuristic developer portfolio website built using React, Vite, Tailwind CSS v4, Framer Motion, and Three.js.",
            stars: 3,
            forks: 0,
            language: "JavaScript",
            html_url: `https://github.com/${username}/profile`
          }
        ]
      };
    }
  }

  /**
   * Submits the contact form. Validates input fields and simulates API request.
   * @param {Object} formData - { name, email, subject, message }
   * @returns {Promise} Resolves with success message or rejects with validation error object.
   */
  submitContactForm(formData) {
    return new Promise((resolve, reject) => {
      const { name, email, subject, message } = formData;
      const errors = {};

      // Basic validations
      if (!name || name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters.";
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please provide a valid email address.";
      }
      if (!subject || subject.trim().length < 4) {
        errors.subject = "Subject must be at least 4 characters.";
      }
      if (!message || message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters.";
      }

      if (Object.keys(errors).length > 0) {
        return setTimeout(() => reject({ status: "error", errors }), 400);
      }

      // Simulate network request
      setTimeout(() => {
        resolve({
          status: "success",
          message: "Thank you! Your message has been sent successfully. I will get back to you shortly."
        });
      }, 1200);
    });
  }
}

export const controller = new PortfolioController();
