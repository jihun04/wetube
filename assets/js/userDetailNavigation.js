const navigationBar = document.getElementById("jsNavigationBar"),
  navigationList = document.getElementById("jsNavigationList"),
  previousBtn = document.getElementById("jsPreviousBtn"),
  nextBtn = document.getElementById("jsNextBtn");

function loadBtns() {
  const listWidth = navigationList.scrollWidth;
  const barWidth = navigationBar.scrollWidth;
  if (barWidth < listWidth) {
    nextBtn.classList.remove("hidden");
  }
}

function handleListScroll() {
  console.log(navigationList.scrollLeft, navigationList.offsetWidth - navigationBar.scrollWidth);
  if (navigationList.scrollLeft >= navigationList.scrollWidth - navigationBar.scrollWidth) {
    nextBtn.classList.add("hidden");
    previousBtn.classList.remove("hidden");
  } else if (navigationList.scrollLeft <= 0) {
    previousBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    previousBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }
}

function handlePreviousBtnClick() {
  navigationList.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

function handleNextBtnClick() {
  navigationList.scroll({
    top: 0,
    left: navigationList.scrollWidth,
    behavior: "smooth"
  });
}

function init() {
  loadBtns();
  navigationList.addEventListener("scroll", handleListScroll);
  previousBtn.addEventListener("click", handlePreviousBtnClick);
  nextBtn.addEventListener("click", handleNextBtnClick);
}

if (navigationBar) {
  init();
}