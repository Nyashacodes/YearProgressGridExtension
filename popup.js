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

const grid = document.getElementById("grid");
grid.innerHTML = "";

const tooltip = document.getElementById("tooltip");

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

