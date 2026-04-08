import { places } from "../data/discover.mjs";

const container = document.querySelector("#discover-container");

// DISPLAY CARDS
places.forEach((place, index) => {
  const card = document.createElement("div");
  card.classList.add("discover-card");

  const isAboveFold = index < 2; 

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="images/${place.image}" 
           alt="${place.name}" 
           loading="${isAboveFold ? 'eager' : 'lazy'}"
          fetchpriority="${isAboveFold ? 'high' : 'auto'}"
           width="400"
           height="250">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="open-btn" data-modal="${place.modal}">Learn More</button>
  `;

  container.appendChild(card);
});


// VISIT MESSAGE LOGIC

const visitBox = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

let message;

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    message = "Back so soon! Awesome!";
  } else if (days === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${days} days ago.`;
  }
}

visitBox.textContent = message;

// store new visit
localStorage.setItem("lastVisit", now);



// modals
document.querySelectorAll(".open-btn").forEach(link => {
  link.addEventListener("click", () => {
    const modal = document.getElementById(link.dataset.modal);
    modal.showModal();
  });
});

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});
