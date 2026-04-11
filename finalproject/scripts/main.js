import { initNav } from "./nav.mjs";

initNav();

// Footer (runs everywhere)
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;


  // form data display
const params = new URLSearchParams(window.location.search);

if (params.has("name")) {
  document.getElementById("name").textContent = params.get("name");
  document.getElementById("email").textContent = params.get("email");
  document.getElementById("message").textContent = params.get("message");
}