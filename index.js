/**
 * Downloads by Url, necessary to include name and filetype as second and third arguments.
 * @param {string} url - The url to download from.
 * @param {string} name - The name the download will be saved as.
 */
async function downloadByUrl(url, name) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    link.remove();
  } catch (err) {
    console.log(err);
  }
}

function downloadVimrc() {
  downloadByUrl(
    "https://raw.githubusercontent.com/jacktrusler/dotfiles/main/.vimrc",
    "vimrc_example",
  );
}

const footer = document.getElementById("footer")
const year = new Date().getUTCFullYear()
footer.textContent = "ALUG " + year
const a = document.createElement("a")
a.href = "https://github.com/json-bateman/alug.us"
a.target = "_blank"
const github = document.createElement("img")
github.src = "/images/landing_page/github-blue.svg"
github.width = 30
github.height = 30

a.appendChild(github)
footer.appendChild(a)


/* ----------------------------
 Toggling Dark and Light mode
 ---------------------------- */
const toggle = document.getElementById("theme-toggle");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const logo = document.getElementById("logo-div");

const storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
}

const cT = document.documentElement.getAttribute("data-theme");
if (cT === "dark" && moon) {
  moon.setAttribute("class", "moon hidden");
}
if (cT === "light" && sun) {
  sun.setAttribute("class", "sun hidden");
}

if (toggle) {
  toggle.onclick = function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";

    if (currentTheme === "light") {
      targetTheme = "dark";
      moon.setAttribute("class", "moon hidden");
      sun.setAttribute("class", "sun");
    } else {
      sun.setAttribute("class", "sun hidden");
      moon.setAttribute("class", "moon");
    }

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };
}

if (logo) {
  logo.onclick = function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";
    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };
}

// ----------------------------
// Other JS
// ----------------------------

const detailsBtn = document.getElementById("details-btn");
const detailsDialog = document.getElementById("details-dialog");
const close = document.getElementById("close");

detailsBtn.addEventListener("click", function () {
  detailsDialog.showModal();
});

close.addEventListener("click", function () {
  detailsDialog.close();
});

// ----------------------------
// JQuery
// ----------------------------

const years = ["2021", "2022", "2023", "2024", "2025"];

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

for (const year of years) {
  $(`#${year}-container`).hide();
  $(`#${year}-year`).click(function () {
    $(`#${year}-container`).toggle(300);
  });

  for (const month of months) {
    $(`#${month}-${year}-container`).hide();
    $(`#${month}-${year}`).click(function () {
      $(`#${month}-${year}-container`).toggle(300);
    });
  }
}
