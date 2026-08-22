import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    lang: "en-US",
    title: "TDD & Software Development Methodologies",
    description:
      "A practical, evidence-driven guide to Test-Driven Development, BDD, ATDD, DDD, the testing pyramid, and the engineering culture around them.",
    base: "/tdd-project/",
    themeConfig: {
      siteTitle: "TDD & Methodologies",
      nav: [
        { text: "Home", link: "/" },
        { text: "Core TDD", link: "/01-tdd/fundamentals" },
        { text: "Career", link: "/05-career/job-market-analysis" },
      ],
      socialLinks: [{ icon: "github", link: "https://github.com/kefyusuf/tdd-project" }],
      search: {
        provider: "local",
      },
      sidebar: [
        {
          text: "Getting Started",
          items: [
            {
              text: "Why Testing Matters",
              link: "/00-getting-started/why-testing-matters",
            },
            {
              text: "How to Use This Repo",
              link: "/00-getting-started/how-to-use-this-repo",
            },
            { text: "Glossary", link: "/00-getting-started/glossary" },
          ],
        },
        {
          text: "Core TDD",
          items: [
            { text: "Fundamentals", link: "/01-tdd/fundamentals" },
            { text: "Red, Green, Refactor", link: "/01-tdd/red-green-refactor" },
            { text: "Best Practices", link: "/01-tdd/best-practices" },
            { text: "Common Pitfalls", link: "/01-tdd/common-pitfalls" },
            { text: "Skill Levels", link: "/01-tdd/skill-levels" },
            { text: "FAQ", link: "/01-tdd/faq" },
          ],
        },
        {
          text: "Related Methodologies",
          items: [
            { text: "Overview & Comparison", link: "/02-methodologies/overview" },
            { text: "BDD", link: "/02-methodologies/bdd" },
            { text: "ATDD", link: "/02-methodologies/atdd" },
            { text: "DDD", link: "/02-methodologies/ddd" },
          ],
        },
        {
          text: "Testing Foundations",
          items: [
            { text: "The Test Pyramid", link: "/03-testing-foundations/test-pyramid" },
            { text: "Test Doubles", link: "/03-testing-foundations/test-doubles" },
            {
              text: "Vitest/Jest Cheat Sheet",
              link: "/03-testing-foundations/framework-cheatsheets/vitest-jest",
            },
            {
              text: "pytest Cheat Sheet",
              link: "/03-testing-foundations/framework-cheatsheets/pytest",
            },
            { text: "Kata Catalog", link: "/03-testing-foundations/katas" },
          ],
        },
        {
          text: "Engineering Culture",
          items: [
            { text: "Agile and XP", link: "/04-engineering-culture/agile-and-xp" },
            {
              text: "Clean Code and Refactoring",
              link: "/04-engineering-culture/clean-code-refactoring",
            },
            { text: "TDD in CI/CD", link: "/04-engineering-culture/tdd-in-cicd" },
          ],
        },
        {
          text: "Case Study - Clinic Booking",
          items: [
            { text: "Overview", link: "/07-case-study/00-overview" },
            { text: "Architecture Decisions", link: "/07-case-study/01-decisions" },
            { text: "Testing Strategy", link: "/07-case-study/02-testing-strategy" },
            { text: "Retrospective", link: "/07-case-study/03-retrospective" },
            { text: "Interview Talking Points", link: "/07-case-study/04-talking-points" },
          ],
        },
        {
          text: "Career",
          items: [
            {
              text: "Job Market Analysis",
              link: "/05-career/job-market-analysis",
            },
            { text: "Interview Preparation", link: "/05-career/interview-prep" },
          ],
        },
        {
          text: "Resources",
          items: [{ text: "Reading List", link: "/06-resources/reading-list" }],
        },
      ],
    },
  }),
);
