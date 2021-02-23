const banner = document.getElementById("jsUserBanner"),
  profileHeader = document.getElementById("jsPofileHeader"),
  bannerHeight = 122.738;

function handleWindowScroll() {
  console.dir(profileHeader);
  const top = document.documentElement.scrollTop;
  if (bannerHeight - top > 0) {
    banner.style.height = `${bannerHeight - top}px`;
    banner.style.top = `${top}px`;
  }
}

function init() {
  window.addEventListener("scroll", handleWindowScroll);
}

if (banner) {
  init();
}