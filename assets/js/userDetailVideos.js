const uploadsVideoList = document.getElementById("jsUploadsVideoList"),
  uploadsVideos = document.getElementById("jsUploadsVideos"),
  uploadsVideosPreviousBtn = document.getElementById("jsUploadsVideosPreviousBtn"),
  uploadsVideosNextBtn = document.getElementById("jsUploadsVideosNextBtn");

function loadBtns() {
  const listWidth = uploadsVideos.scrollWidth;
  const videosWidth = uploadsVideoList.scrollWidth;
  if (videosWidth < listWidth) {
    uploadsVideosNextBtn.classList.remove("hidden");
  }
}

function handleListScroll() {
  if (uploadsVideos.scrollLeft >= uploadsVideos.scrollWidth - uploadsVideos.offsetWidth - 1) {
    uploadsVideosNextBtn.classList.add("hidden");
    uploadsVideosPreviousBtn.classList.remove("hidden");
  } else if (uploadsVideos.scrollLeft <= 0) {
    uploadsVideosPreviousBtn.classList.add("hidden");
    uploadsVideosNextBtn.classList.remove("hidden");
  } else {
    uploadsVideosPreviousBtn.classList.remove("hidden");
    uploadsVideosNextBtn.classList.remove("hidden");
  }
}

function handleUploadsVideosPreviousBtnClick() {
  uploadsVideos.scroll({
    top: 0,
    left: uploadsVideos.scrollLeft - uploadsVideos.offsetWidth,
    behavior: "smooth"
  });
}

function handleUploadsVideosNextBtnClick() {
  uploadsVideos.scroll({
    top: 0,
    left: uploadsVideos.scrollLeft + uploadsVideos.offsetWidth,
    behavior: "smooth"
  });
}

function init() {
  loadBtns();
  uploadsVideos.addEventListener("scroll", handleListScroll);
  uploadsVideosPreviousBtn.addEventListener("click", handleUploadsVideosPreviousBtnClick);
  uploadsVideosNextBtn.addEventListener("click", handleUploadsVideosNextBtnClick);
}

if (uploadsVideoList) {
  init();
}