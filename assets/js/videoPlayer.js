const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer,
  playBtn,
  volumeBtn,
  fullScrnBtn,
  currentTime,
  totalTime;

function handlePlayBtnClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
  }
}

function handleVolumeBtnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozExitFullscreen) {
    document.mozExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function requestFullscreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);
  exitFullscreen();
}

function goFullScreen() {
  requestFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

function formatDate(secondsNumber) {
  const seconds = parseInt(secondsNumber, 10);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 60) % 60);
  return `${hours > 0 ? `${hours < 10 ? `0${hours}` : hours}:` : ""}${minutes < 10 ? `0${minutes}` : minutes}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`;
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerText = totalTimeString;
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
}

function getCurrentTime() {
  currentTime.innerText = formatDate(videoPlayer.currentTime);
}

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayBtn");
  volumeBtn = document.getElementById("jsVolumeBtn");
  fullScrnBtn = document.getElementById("jsFullScrnBtn");
  currentTime = document.getElementById("jsCurrentTime");
  totalTime = document.getElementById("jsTotalTime");
  playBtn.addEventListener("click", handlePlayBtnClick);
  volumeBtn.addEventListener("click", handleVolumeBtnClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
};

if (videoContainer) {
  init();
}