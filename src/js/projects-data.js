/**
 * Shared project metadata for Design Works and Projects pages
 * Single source of truth for all project information
 */

const PROJECTS = [
  {
    id: "nest",
    name: "Nest",
    description: "Automation bot framework for task scheduling and AI integration",
    tags: ["JavaScript", "Automation", "Public Repo"],
    isPublic: true,
    repoUrl: "https://github.com/NoInf/tiny-nest",
    hasDemo: true,
    demoPath: "./ui-design-demos/nest/"
  },
  {
    id: "ai-controller",
    name: "AI Controller",
    description: "Unified endpoint manager for multiple AI models",
    tags: ["JavaScript", "AI", "Private"],
    isPublic: false,
    repoUrl: null,
    hasDemo: false,
    demoPath: null
  }
];

// Export for use in HTML pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
