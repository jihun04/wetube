const showMoreBtn = document.getElementById("showMoreBtn"),
  description = document.getElementById("jsVideoDescription");

function showMoreDescription() {
  description.classList.add("video__description--open");
  showMoreBtn.classList.add("none");
}

function init() {
  showMoreBtn.addEventListener("click", showMoreDescription);
}

if (showMoreBtn) {
  init();
}