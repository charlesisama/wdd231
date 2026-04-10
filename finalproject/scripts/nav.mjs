export function initNav() {
  const menuBtn = document.getElementById("menu");
  const navMenu = document.getElementById("nav-menu");

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}