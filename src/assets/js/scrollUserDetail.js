const banner = document.getElementById("jsUserBanner"),
  profileHeader = document.getElementById("jsPofileHeader"),
  navigationBar = document.getElementById("jsNavigationBar"),
  bannerHeight = 122.738,
  headerHeight = 56,
  navigationBarMarginBottom = 25,
  navigationBarTop = 279;

function handleWindowScroll() {
  const top = document.documentElement.scrollTop;
  if (bannerHeight - top > 0) {
    banner.style.height = `${bannerHeight - top}px`;
    banner.style.top = `${top}px`;
  }
  if (top > (navigationBarTop - headerHeight)) {
    navigationBar.classList.add("user-profile__navigation-bar--fixed");
    profileHeader.style.marginBottom = `${navigationBar.offsetHeight + navigationBarMarginBottom}px`;
  } else {
    navigationBar.classList.remove("user-profile__navigation-bar--fixed");
    profileHeader.style.marginBottom = "0";
  }
}

function init() {
  window.addEventListener("scroll", handleWindowScroll);
}

if (banner) {
  init();
}