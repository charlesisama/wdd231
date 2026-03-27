// timestamp
document.getElementById("timestamp").value = new Date().toISOString();
// SET CURRENT DATE AND LAST MODIFICATION
const yearSpan = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

// Navigation
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });
}
// modals
document.querySelectorAll("[data-modal]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});