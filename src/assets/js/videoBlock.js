const videoBlocks = document.querySelectorAll(".jsVideoBlock");

function handleVideoBlockTimeUpdate() {
  const target = this;
  if (parseInt(target.currentTime) > 2) {
    target.currentTime = 0;
  }
}

function playVideoBlock() {
  const target = this;
  const video = target.querySelector("video");
  video.play();
  video.addEventListener("timeupdate", handleVideoBlockTimeUpdate);
}

function pauseVideoBlock() {
  const target = this;
  const video = target.querySelector("video");
  video.pause();
  video.removeEventListener("timeupdate", handleVideoBlockTimeUpdate);
}

function init() {
  for (const videoBlock of videoBlocks) {
    videoBlock.addEventListener("mouseenter", playVideoBlock);
    videoBlock.addEventListener("mouseleave", pauseVideoBlock);
  }

}

if (videoBlocks) {
  init();
}