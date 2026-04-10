
let allMaterials = [];


const menuBtn = document.getElementById("menu");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });
}

document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

// ====================== LOAD MATERIALS (fetch from JSON) ======================
async function loadMaterials() {
  const grid = document.getElementById("materialsGrid");
  grid.innerHTML = `<p class="loading-text">🌍 Loading materials from database...</p>`;

  try {
    const response = await fetch("data/materials.json");
    if (!response.ok) throw new Error("Network response was not ok");
    
    allMaterials = await response.json();
    renderMaterials(allMaterials);
  } catch (error) {
    console.error("Fetch error:", error);
    grid.innerHTML = `
      <p class="error-message">
        ❌ Could not load materials.<br>
        Make sure the folder <strong>data/</strong> exists and <strong>materials.json</strong> is inside it.
      </p>`;
  }
}

function renderMaterials(materials) {
  const grid = document.getElementById("materialsGrid");
  grid.innerHTML = "";

  if (materials.length === 0) {
    grid.innerHTML = `<p class="no-results">No materials found.</p>`;
    return;
  }

  materials.forEach(material => {
    const cardHTML = `
      <div class="material-card card" data-id="${material.id}">
        <div class="flex-between">
          <span class="material-badge">${material.category}</span>
          <span class="impact-emoji">${material.impactScore <= 3 ? "🌱" : material.impactScore <= 6 ? "🌍" : "⚠️"}</span>
        </div>
        <h2>${material.name}</h2>
        <p class="material-fullname">${material.fullName}</p>
        
        <div class="material-info">
          <div><strong>CO₂/kg:</strong> ${material.co2_kg} kg</div>
          <div><strong>Recyclability:</strong> ${material.recyclability}%</div>
          <div><strong>Biodegradable:</strong> ${material.biodegradable ? "Yes" : "No"}</div>
          <div><strong>Impact Score:</strong> ${material.impactScore}/10</div>
        </div>

        <button class="favorite-btn" data-id="${material.id}">
          ❤️ Add to Favorites
        </button>
      </div>
    `;
    grid.innerHTML += cardHTML;
  });

  document.getElementById("resultsCount").textContent = `${materials.length} materials`;
}

// ====================== MODAL ======================
function showModal(material) {
  const modal = document.getElementById("materialModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <h2>${material.name} — ${material.fullName}</h2>
    <p>${material.description}</p>
    
    <div class="modal-grid">
      <div><strong>Category</strong><br>${material.category}</div>
      <div><strong>CO₂ per kg</strong><br>${material.co2_kg} kg</div>
      <div><strong>Recyclability</strong><br>${material.recyclability}%</div>
      <div><strong>Biodegradable</strong><br>${material.biodegradable ? "Yes 🌱" : "No"}</div>
    </div>
    
    <p><strong>Common Uses:</strong> ${material.uses}</p>
    <p class="impact-score">Impact Score: <strong>${material.impactScore}/10</strong></p>
  `;

  modal.style.display = "flex";
}

// ====================== INITIALIZE ======================
document.addEventListener("DOMContentLoaded", () => {
  loadMaterials();

  // Search & Filter
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const clearBtn = document.getElementById("clearFilters");

  function filterMaterials() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = allMaterials.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm) ||
                           m.fullName.toLowerCase().includes(searchTerm);
      const matchesCategory = !selectedCategory || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    renderMaterials(filtered);
  }

  searchInput.addEventListener("input", filterMaterials);
  categoryFilter.addEventListener("change", filterMaterials);
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    renderMaterials(allMaterials);
  });

  // Card click + Favorites
  document.addEventListener("click", e => {
    if (e.target.closest(".material-card")) {
      const card = e.target.closest(".material-card");
      const id = parseInt(card.dataset.id);
      const material = allMaterials.find(m => m.id === id);
      if (material) showModal(material);
    }

    if (e.target.classList.contains("favorite-btn")) {
      e.stopImmediatePropagation();
      const id = parseInt(e.target.dataset.id);
      let favorites = JSON.parse(localStorage.getItem("ecoblendFavorites") || "[]");
      
      if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem("ecoblendFavorites", JSON.stringify(favorites));
        e.target.textContent = "✅ Saved!";
        setTimeout(() => { e.target.textContent = "❤️ Add to Favorites"; }, 1800);
      }
    }
  });

  // Modal close
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("materialModal").style.display = "none";
  });
  window.addEventListener("click", e => {
    if (e.target.id === "materialModal") {
      document.getElementById("materialModal").style.display = "none";
    }
  });

  // Footer
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
});