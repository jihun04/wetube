const showMoreBtn = document.getElementById("showMoreBtn"),
  description = document.getElementById("jsVideoDescription");

function showLessDescription() {
  description.classList.remove("video__description--open");
  showMoreBtn.innerText = "Show more";
  showMoreBtn.addEventListener("click", showMoreDescription);
}

function showMoreDescription() {
  description.classList.add("video__description--open");
  showMoreBtn.innerText = "Show less";
  showMoreBtn.removeEventListener("click", showMoreDescription);
  showMoreBtn.addEventListener("click", showLessDescription);
}

function init() {
  showMoreBtn.addEventListener("click", showMoreDescription);
}

if (showMoreBtn) {
  init();
}