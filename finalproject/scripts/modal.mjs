export function openModal(content, modalId = "materialModal") {
  const modal = document.getElementById(modalId);
  const body = modal?.querySelector("#modalBody");

  if (!modal || !body) return;

  body.innerHTML = content;
  modal.style.display = "flex";
}

export function initModal(modalId = "materialModal") {
  const modal = document.getElementById(modalId);
  const closeBtn = modal?.querySelector("#closeModal");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}