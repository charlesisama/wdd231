// SET CURRENT DATE AND LAST MODIFICATION
const yearSpan = document.getElementById("currentyear");

const lastModified = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear ();
lastModified.textContent = `Last Modification: ${document.lastModified}`;


// Responsive navi
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.textContent = isOpen ? "✕" : "☰";
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Course data
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Development I", credits: 2, completed: false },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: true }
];

const courseContainer = document.getElementById("courseContainer");
const creditsDisplay = document.getElementById("credits");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  courseList.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.textContent = `${course.subject} ${course.number}`;
    courseContainer.appendChild(courseCard);
  });

  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  creditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

document.getElementById("all").addEventListener("click", () => {
  displayCourses(courses);
});

document.getElementById("cse").addEventListener("click", () => {
  const cseCourses = courses.filter((course) => course.subject === "CSE");
  displayCourses(cseCourses);
});

document.getElementById("wdd").addEventListener("click", () => {
  const wddCourses = courses.filter((course) => course.subject === "WDD");
  displayCourses(wddCourses);
});


displayCourses(courses);
navToggle.textContent = "☰";