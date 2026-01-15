function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const today = new Date();
const year = today.getFullYear();

const totalDays = isLeapYear(year) ? 366 : 365;
const passedDays = getDayOfYear(today);

document.getElementById("counter").textContent =
  `${passedDays} / ${totalDays} days passed`;

const grid = document.getElementById("grid");
grid.innerHTML = ""; // safety reset

for (let i = 1; i <= totalDays; i++) {
  const cell = document.createElement("div");
  cell.className = "day";
  if (i <= passedDays) cell.classList.add("filled");
  grid.appendChild(cell);
}
