//tools 

import { openModal, initModal } from "./modal.mjs";


initModal("toolModal");

const toolsData = [
    {
        id: 1,
        title: "Carbon Footprint Calculator",
        description: "Estimate your annual carbon emissions from daily activities and travel.",
        type: "Calculator",
        image: "images/tools/carbon-calculator.webp",
        difficulty: "Easy",
        time: "2 min",
        content: `
            <h3>Carbon Footprint Estimator</h3>
            <p>Answer a few quick questions to get your estimated yearly CO₂ emissions.</p>
            <div class="tool-detail">
                <p><strong>Coming soon:</strong> Interactive calculator with results and reduction tips.</p>
                <ul>
                    <li>Transportation habits</li>
                    <li>Energy consumption</li>
                    <li>Diet & waste</li>
                </ul>
            </div>
        `
    },
    {
        id: 2,
        title: "Waste Impact Calculator",
        description: "See the environmental impact of your weekly waste and get reduction suggestions.",
        type: "Calculator",
        image: "images/tools/waste-calculator.webp",
        difficulty: "Easy",
        time: "3 min",
        content: `
            <h3>Waste Impact Calculator</h3>
            <p>Discover how much waste you generate and how it affects the planet.</p>
            <div class="tool-detail">
                <p>Interactive tool coming soon with visualizations and personalized tips.</p>
            </div>
        `
    },
    {
        id: 3,
        title: "Recycling Guide & Scanner",
        description: "Learn what can and cannot be recycled in your area with smart guidance.",
        type: "Guide",
        image: "images/tools/recycling-guide.webp",
        difficulty: "Medium",
        time: "Instant",
        content: `
            <h3>Smart Recycling Guide</h3>
            <p>Search or scan items to know how to dispose of them responsibly.</p>
            <div class="tool-detail">
                <p>Local recycling database + material identification helper.</p>
            </div>
        `
    },
    {
        id: 4,
        title: "Energy & Water Saver",
        description: "Calculate potential savings by adopting energy and water-efficient habits.",
        type: "Calculator",
        image: "images/tools/energy-saver.webp",
        difficulty: "Easy",
        time: "2 min",
        content: `
            <h3>Energy & Water Savings Estimator</h3>
            <p>See how much money and resources you can save monthly.</p>
        `
    },
    {
        id: 5,
        title: "Sustainable Shopping Score",
        description: "Rate products and get a sustainability score before you buy.",
        type: "Tool",
        image: "images/tools/shopping-score.webp",
        difficulty: "Medium",
        time: "Instant",
        content: `
            <h3>Sustainable Shopping Assistant</h3>
            <p>Make better purchasing decisions with real environmental scores.</p>
        `
    },
    {
        id: 6,
        title: "Plastic Footprint Tracker",
        description: "Track and reduce your single-use plastic consumption over time.",
        type: "Tracker",
        image: "images/tools/plastic-tracker.webp",
        difficulty: "Medium",
        time: "Ongoing",
        content: `
            <h3>Plastic Footprint Tracker</h3>
            <p>Monitor your plastic usage and set reduction goals.</p>
        `
    }
];

// RENDER
function renderTools() {
  const grid = document.getElementById("toolsGrid");
  if (!grid) return;

  grid.innerHTML = toolsData.map(tool => `
    <div class="tool-card">
      <img src="${tool.image}" alt="${tool.title}">
      <div class="tool-info">
        <span class="tool-type">${tool.type}</span>
        <h3>${tool.title}</h3>
        <p>${tool.description}</p>

        <div class="tool-meta">
          <span>${tool.difficulty}</span>
          <span>${tool.time}</span>
        </div>

        <button class="btn-tool" data-id="${tool.id}">
          Use Tool
        </button>
      </div>
    </div>
  `).join("");
}

// EVENTS
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-tool")) {
    const id = parseInt(e.target.dataset.id);
    const tool = toolsData.find(t => t.id === id);

    openModal(tool.content, "toolModal");
  }
});

// INIT
document.addEventListener("DOMContentLoaded", renderTools);