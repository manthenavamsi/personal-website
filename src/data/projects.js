// Add your projects here
const projects = [
  {
    id: 1,
    title: "Docufresh",
    description: "A suite of JavaScript libraries that automatically keeps documents fresh. Docufresh replaces dynamic markers like {{current_year}} or {{years_since:2020}} with current values. DocufreshAI extends this with Wikipedia integration and browser-based AI to generate and update content without external API keys.",
    date: "Published 2026",
    type: "NPM Library",
    linkGroups: [
      {
        name: "Docufresh",
        links: [
          { url: "https://github.com/manthenavamsi/docufresh", icon: "github" },
          { url: "https://www.npmjs.com/package/docufresh", icon: "npm" }
        ]
      },
      {
        name: "DocufreshAI",
        links: [
          { url: "https://github.com/manthenavamsi/docufreshAI", icon: "github" },
          { url: "https://www.npmjs.com/package/docufreshai", icon: "npm" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "The Day Numbers Were Born",
    description: "A children's book that introduces young readers to the fascinating world of numbers through an engaging story. Perfect for early learners and curious minds.",
    date: "Published 2025",
    type: "Book",
    link: "https://www.amazon.com/Day-Numbers-Were-Born/dp/B0GCTDPLZT",
    imageUrl: `${process.env.PUBLIC_URL}/images/projects/day-numbers-were-born.png`
  }
];

export default projects;
