// SET CURRENT DATE AND LAST MODIFICATION
const yearSpan = document.getElementById("currentyear");

const lastModified = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear ();
lastModified.textContent = `Last Modification: ${document.lastModified}`;


// Navigation 
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

// Directory Page memembers
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

async function getMembers() {
  if (!membersContainer) return;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not fetch member data.");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = `<p class="error-message">Unable to load member directory at this time.</p>`;
    console.error(error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

        //level of membership
    const membershipText =
      member.membership === 3
        ? "Gold Member"
        : member.membership === 2
        ? "Silver Member"
        : "Member";

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="400" height="400">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Industry:</strong> ${member.industry}</p>
      <p><strong>Membership:</strong> ${membershipText}</p>
      <p>${member.description}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
    `;

    membersContainer.appendChild(card);
  });
}

//evnt listener if grid button is clicked
if (gridButton && listButton && membersContainer) {
  gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
  });

  listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
  });
}

getMembers();