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


//Thank you message
 function getData() {
      const params = new URLSearchParams(window.location.search);

      document.getElementById("results").innerHTML = `
        <p><strong>First Name:</strong> ${params.get("fname")}</p>
        <p><strong>Last Name:</strong> ${params.get("lname")}</p>
        <p><strong>Email:</strong> ${params.get("email")}</p>
        <p><strong>Phone:</strong> ${params.get("phone")}</p>
        <p><strong>Business:</strong> ${params.get("business")}</p>
        <p><strong>Submitted:</strong> ${params.get("timestamp")}</p>
      `;
    }

getData();