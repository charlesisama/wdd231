import { initNav } from "./nav.mjs";

initNav();

// Footer (runs everywhere)
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;


 