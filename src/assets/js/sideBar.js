const sideBar = document.getElementById("jsSideBar"),
  scrim = document.getElementById("jsScrim"),
  contentDrawer = document.getElementById("jsContentDrawer"),
  contentDrawerHeader = document.getElementById("jsContentDrawerHeader"),
  headerBars = document.getElementsByClassName("header__bars"),
  main = document.getElementsByTagName("main")[0],
  footer = document.getElementsByTagName("footer")[0];

function loadSideBar() {
  const width = document.documentElement.scrollWidth;
  const path = window.location.pathname;
  if (width < 810) {
    contentDrawer.classList.add("content-drawer--hide");
    contentDrawer.classList.remove("content-drawer--none");
    scrim.classList.remove("content-drawer--none");
  } else {
    contentDrawer.classList.remove("content-drawer--hide");
    contentDrawer.classList.add("content-drawer--none");
    scrim.classList.add("content-drawer--none");
  }
  if (width >= 810 && width <= 1000 && path === "/") {
    sideBar.classList.remove("content-drawer--none");
    contentDrawer.classList.add("content-drawer--none")
    main.style.paddingLeft = "72px";
    footer.style.paddingLeft = "72px";
  } else if (width > 1000 && path === "/") {
    contentDrawer.classList.remove("content-drawer--none")
    sideBar.classList.add("content-drawer--none");
    contentDrawerHeader.style.border = "none";
    main.style.paddingLeft = "240px";
    footer.style.paddingLeft = "240px";
  } else {
    sideBar.classList.add("content-drawer--none");
    main.style.paddingLeft = "0";
    footer.style.paddingLeft = "0";
  }
}

function handleScrim() {
  if (contentDrawer.classList.contains("content-drawer--hide")) {
    contentDrawer.classList.remove("content-drawer--hide");
    scrim.classList.add("scrim--showing");
  } else {
    contentDrawer.classList.add("content-drawer--hide");
    scrim.classList.remove("scrim--showing");
  }
}

function handleHeaderBarsClick() {
  const width = document.documentElement.scrollWidth;
  const path = window.location.pathname;
  if (path !== "/") {
    handleScrim();
  } else if (width < 810) {
    handleScrim();
  } else if (width >= 810) {
    if (contentDrawer.classList.contains("content-drawer--none")) {
      contentDrawer.classList.remove("content-drawer--none");
      sideBar.classList.add("content-drawer--none");
    } else {
      contentDrawer.classList.add("content-drawer--none");
      sideBar.classList.remove("content-drawer--none");
    }
  }
}

function init() {
  loadSideBar();
  window.addEventListener("resize", loadSideBar);
  for (const headerBar of headerBars) {
    headerBar.addEventListener("click", handleHeaderBarsClick);
  }
  scrim.addEventListener("click", handleHeaderBarsClick);
}

if (sideBar) {
  init();
}