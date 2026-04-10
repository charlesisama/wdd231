
const menuBtn = document.getElementById("menu");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });
}

// Close menu when clicking a link
document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

// Footer dynamic content
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = 
  `Last Modified: ${document.lastModified}`;