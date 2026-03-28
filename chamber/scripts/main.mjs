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

//hero image slide
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

if (slides.length > 0) {
  setInterval(showNextSlide, 5000);
}

//getting current days of the week

const tomorrow = document.querySelector("#tomorrow");
const nextTomorrow = document.querySelector("#next-tomorrow");
const twodays = document.querySelector("#twodays");


const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

const todayIndex = new Date().getDay();



tomorrow.textContent = days[(todayIndex + 1) %7];
nextTomorrow.textContent = days[(todayIndex + 2) %7];
twodays.textContent = days[(todayIndex + 3) %7];


//Current Weather API
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector('figcaption');
const humidity = document.querySelector("#humidity");


const url ="https://api.openweathermap.org/data/2.5/weather?lat=4.85&lon=7.02&appid=309a5ec2598cc481527ac9ddd30fa173&units=metric";


async function apiFetch(){
    try {
        const response = await fetch(url);
        if (response.ok) { 
        const data1 = await response.json();
        // console.log(data);
        displayResults(data1);
        }
        else{
            throw Error(await response.text());
        }
        
    } catch (error) {
        console.log(error);
    }
}

apiFetch();


function displayResults(data1) {
  currentTemp.innerHTML = `${data1.main.temp}&deg;C`;
  humidity.innerHTML = `${data1.main.humidity}%`;
  const iconsrc = `https://openweathermap.org/img/wn/${data1.weather[0].icon}@2x.png`;
  let desc = data1.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}


//Weather Forecast
const todayTemp = document.querySelector("#today-temp");
const nextdayTemp = document.querySelector("#nextday-temp");
const nextTomorrowTemp= document.querySelector("#nextTomorrow-temp");


const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=4.85&lon=7.02&appid=309a5ec2598cc481527ac9ddd30fa173&units=metric";

async function apiFetchForecast() {
  try {
    const response = await fetch(forecastURL);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
  const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  todayTemp.innerHTML = `${filtered[0].main.temp}&deg;C`;
  nextdayTemp.innerHTML = `${filtered[1].main.temp}&deg;C`;
  nextTomorrowTemp.innerHTML = `${filtered[2].main.temp}&deg;C`;
}

apiFetchForecast();



//sportlight loading
const spotlightContainer = document.querySelector(".spotlights");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const filtered = data.filter(member => member.membership >= 2);

    const shuffled = filtered.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

//membership info
function getMembershipInfo(level) {
  if (level === 3) {
    return { text: "Gold Member", className: "gold-badge" };
  } else if (level === 2) {
    return { text: "Silver Member", className: "silver-badge" };
  } else {
    return { text: "Member", className: "member-badge" };
  }
}


function displaySpotlights(members) {
  spotlightContainer.innerHTML = "<h2>Business Spotlights</h2>";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("business");

    const membershipInfo = getMembershipInfo(member.membership);

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p><strong>Membership:</strong> <span class="membership-badge ${membershipInfo.className}">${membershipInfo.text}</span></p>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();

