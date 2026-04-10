import { initNav } from "./nav.mjs";
import { openModal, initModal } from "./modal.mjs";

initNav();
initModal("toolModal");

const toolsData = [ /* KEEP YOUR DATA EXACTLY AS IS */ ];

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