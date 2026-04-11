import { saveContactMessage } from "./storage.mjs";

const form = document.getElementById("contactForm");
const messageBox = document.getElementById("confirmationMessage");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      date: new Date().toISOString()
    };

    saveContactMessage(data);

    messageBox.textContent = "✅ Message sent successfully!";
    form.reset();
  });
}