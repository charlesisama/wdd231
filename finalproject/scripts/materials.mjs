
import { openModal, initModal } from "./modal.mjs";
import { addFavorite } from "./storage.mjs";


initModal();

let allMaterials = [];

async function loadMaterials() {
  const grid = document.getElementById("materialsGrid");

  grid.innerHTML = `<p class="loading-text">🌍 Loading materials...</p>`;

  try {
    const res = await fetch("data/materials.json");
    allMaterials = await res.json();
    renderMaterials(allMaterials);

    initFilters();

  } catch {
    grid.innerHTML = `<p class="error-message">Failed to load data.</p>`;
  }
}

function renderMaterials(materials) {
  const grid = document.getElementById("materialsGrid");

  grid.innerHTML = materials.map(m => `
    <div class="material-card card" data-id="${m.id}">
      <h3>${m.name}</h3>
      <p>${m.fullName}</p>

      <div class="material-info">
        <div>CO₂: ${m.co2_kg}</div>
        <div>Recycle: ${m.recyclability}%</div>
        <div>Impact: ${m.impactScore}/10</div>
      </div>

      <button class="favorite-btn" data-id="${m.id}">
        ❤️ Save
      </button>
    </div>
  `).join("");

  document.getElementById("resultsCount").textContent =
    `${materials.length} materials`;
}


document.addEventListener("click", (e) => {

  // OPEN MODAL
  if (e.target.closest(".material-card")) {
    const id = parseInt(e.target.closest(".material-card").dataset.id);
    const m = allMaterials.find(x => x.id === id);

    openModal(`
      <h2>${m.name} — ${m.fullName}</h2>
      <p>${m.description}</p>
      <p><strong>Uses:</strong> ${m.uses}</p>
    `);
  }

  // fav button
  if (e.target.classList.contains("favorite-btn")) {
    e.stopPropagation();

    const id = parseInt(e.target.dataset.id);
    addFavorite(id);

    e.target.textContent = "✅ Saved";
  }
});

//filter function
function initFilters() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const clearBtn = document.getElementById("clearFilters");

  if (!searchInput || !categoryFilter || !clearBtn) return;

  function filterMaterials() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = allMaterials.filter(m => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm) ||
        m.fullName.toLowerCase().includes(searchTerm);

      const matchesCategory =
        !selectedCategory || m.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    renderMaterials(filtered);
  }

  // EVENTS
  searchInput.addEventListener("input", filterMaterials);
  categoryFilter.addEventListener("change", filterMaterials);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    renderMaterials(allMaterials);
  });
}
document.addEventListener("DOMContentLoaded", loadMaterials);