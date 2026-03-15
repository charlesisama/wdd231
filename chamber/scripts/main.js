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

// Directory Page
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const membershipFilter = document.querySelector("#membershipFilter");
const industryFilter = document.querySelector("#industryFilter");

let allMembers = [];

async function getMembers() {
  if (!membersContainer) return;

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not fetch member data.");
    }

    const members = await response.json();
    allMembers = members;

    populateIndustryFilter(members);
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = `<p class="error-message">Unable to load member directory at this time.</p>`;
    console.error(error);
  }
}

function getMembershipInfo(level) {
  if (level === 3) {
    return { text: "Gold Member", className: "gold-badge" };
  } else if (level === 2) {
    return { text: "Silver Member", className: "silver-badge" };
  } else {
    return { text: "Member", className: "member-badge" };
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  if (members.length === 0) {
    membersContainer.innerHTML = `<p class="error-message">No businesses match the selected filters.</p>`;
    return;
  }

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const membershipInfo = getMembershipInfo(member.membership);

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="400" height="400">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Industry:</strong> ${member.industry}</p>
      <div class="membership-row">
        <span class="membership-badge ${membershipInfo.className}">${membershipInfo.text}</span>
      </div>
      <p>${member.description}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
    `;

    membersContainer.appendChild(card);
  });
}

function populateIndustryFilter(members) {
  if (!industryFilter) return;

  const industries = [...new Set(members.map((member) => member.industry))];

  industries.forEach((industry) => {
    const option = document.createElement("option");
    option.value = industry;
    option.textContent = industry;
    industryFilter.appendChild(option);
  });
}

function filterMembers() {
  let filtered = [...allMembers];

  if (membershipFilter && membershipFilter.value !== "all") {
    filtered = filtered.filter(
      (member) => String(member.membership) === membershipFilter.value
    );
  }

  if (industryFilter && industryFilter.value !== "all") {
    filtered = filtered.filter(
      (member) => member.industry === industryFilter.value
    );
  }

  displayMembers(filtered);
}

if (membershipFilter) {
  membershipFilter.addEventListener("change", filterMembers);
}

if (industryFilter) {
  industryFilter.addEventListener("change", filterMembers);
}

// Grid/List toggle
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

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

if (slides.length > 0) {
  setInterval(showNextSlide, 8000);
}