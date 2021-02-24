const navigationBar = document.getElementById("jsNavigationBar"),
  navigationList = document.getElementById("jsNavigationList"),
  previousBtn = document.getElementById("jsPreviousBtn"),
  nextBtn = document.getElementById("jsNextBtn"),
  navigationItems = document.querySelectorAll("#jsNavigationList li"),
  selectedBar = document.getElementById("jsNavigationSelectedBar");

function loadBtns() {
  const listWidth = navigationList.scrollWidth;
  const barWidth = navigationBar.scrollWidth;
  if (barWidth < listWidth) {
    nextBtn.classList.remove("hidden");
  }
}

function handleListScroll() {
  if (navigationList.scrollLeft >= navigationList.scrollWidth - navigationList.offsetWidth - 1) {
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

function handleNvigationItemClick() {
  const target = this;
  const oldItem = navigationList.querySelector(".navigation-item--selected");
  const translateX = target.offsetLeft;
  selectedBar.style.transform = `translateX(${translateX}px)`;
  selectedBar.style.width = `${target.scrollWidth}px`;
  target.classList.add("navigation-item--selected");
  oldItem.classList.remove("navigation-item--selected");
  window.location.href = window.location.href.split("?query")[0] + `?query=${target.id}`
}

function init() {
  loadBtns();
  navigationList.addEventListener("scroll", handleListScroll);
  previousBtn.addEventListener("click", handlePreviousBtnClick);
  nextBtn.addEventListener("click", handleNextBtnClick);
  for (const item of navigationItems) {
    item.addEventListener("click", handleNvigationItemClick);
  }
  window.addEventListener("resize", handleListScroll);
}

if (navigationBar) {
  init();
}