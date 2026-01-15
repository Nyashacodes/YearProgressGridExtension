function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / (1000 * 60 * 60 * 24));
}

const today = new Date();
const year = today.getFullYear();
const totalDays = isLeapYear(year) ? 366 : 365;
const passedDays = getDayOfYear(today);

document.getElementById("counter").textContent =
  `${passedDays} / ${totalDays} days passed`;

  const darkToggle = document.getElementById("darkToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  darkToggle.checked = true;
}

darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});


const grid = document.getElementById("grid");
grid.innerHTML = "";

const tooltip = document.getElementById("tooltip");

const legend = document.getElementById("legend");
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

monthNames.forEach((name, index) => {
  const item = document.createElement("div");
  item.className = "legend-item";

  const color = document.createElement("div");
  color.className = `legend-color month-${index}`;

  const text = document.createElement("span");
  text.textContent = name;

  item.appendChild(color);
  item.appendChild(text);
  legend.appendChild(item);
});


const progressFill = document.getElementById("progress-fill");
progressFill.style.width = `${(passedDays / totalDays) * 100}%`;


for (let day = 1; day <= totalDays; day++) {
  const date = new Date(year, 0, day);
  const month = date.getMonth();

  const cell = document.createElement("div");
  cell.className = "day";

  if (day <= passedDays) {
    cell.classList.add("filled", `month-${month}`);
  }

  if (date.getDate() === 1) {
    cell.classList.add("month-start");
  }

  // Tooltip events
  cell.addEventListener("mouseenter", (e) => {
    tooltip.textContent = date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
    tooltip.style.opacity = "1";
  });

  cell.addEventListener("mousemove", (e) => {
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY}px`;
  });

  cell.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  grid.appendChild(cell);
}

