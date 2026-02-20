/**
 * Shared project metadata for Design Works and Projects pages
 * Single source of truth for all project information
 */

const PROJECTS = [
  {
    id: "nest",
    name: "Nest",
    description: "Project dashboard for fast access to every part of any project.",
    tags: ["JavaScript", "Dashboard", "Public Repo"],
    isPublic: true,
    repoUrl: "https://github.com/NoInf/nest",
    hasDemo: true,
    demoPath: "./ui-design-demos/nest/"
  }
];

// Export for use in HTML pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
