const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer;
let playBtn;

function handlePlayBtnClick(event) {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayBtn");
  playBtn.addEventListener("click", handlePlayBtnClick);
};

if (videoContainer) {
  init();
}