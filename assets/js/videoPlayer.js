const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer,
  playBtn,
  volumeBtn,
  fullScrnBtn,
  currentTime,
  totalTime,
  volume;
function handlePlayBtnClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeBtnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volume.value = videoPlayer.volume;
    if (volume.value > 0.5) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (volume.value > 0.1) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else if (volume.value > 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  } else {
    videoPlayer.muted = true;
    volume.value = 0;
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
  const totalTimeString = formatDate(Math.ceil(videoPlayer.duration));
  totalTime.innerText = totalTimeString;
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
}

function getCurrentTime() {
  currentTime.innerText = formatDate(videoPlayer.currentTime);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  if (value > 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value > 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
  videoPlayer.volume = value;
}

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayBtn");
  volumeBtn = document.getElementById("jsVolumeBtn");
  fullScrnBtn = document.getElementById("jsFullScrnBtn");
  currentTime = document.getElementById("jsCurrentTime");
  totalTime = document.getElementById("jsTotalTime");
  volume = document.getElementById("jsVolume");
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayBtnClick);
  volumeBtn.addEventListener("click", handleVolumeBtnClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volume.addEventListener("input", handleDrag);
};

if (videoContainer) {
  init();
}