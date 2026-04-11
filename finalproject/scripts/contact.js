import { saveContactMessage } from "./storage.mjs";

const form = document.getElementById("contactForm");
const messageBox = document.getElementById("confirmationMessage");

if (form) {
  form.addEventListener("submit", (e) => {
    

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      date: new Date().toISOString()
    };

    saveContactMessage(data);

    messageBox.textContent = "✅ Message sent successfully!";
    
  });
}

 // form data display
const params = new URLSearchParams(window.location.search);

if (params.has("name")) {
  document.getElementById("dname").textContent = params.get("name");
  document.getElementById("demail").textContent = params.get("email");
  document.getElementById("dmessage").textContent = params.get("message");
}