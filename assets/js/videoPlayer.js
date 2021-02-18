const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer,
  playBtn,
  volumeBtn,
  fullScrnBtn,
  currentTime,
  totalTime,
  volume,
  progress,
  timer,
  videoControls;

function registerView() {
  const id = window.location.href.split("/videos/")[1];
  fetch(`/api/${id}/view`, {
    method: "POST"
  });
}

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
    changeVolumeIcon(volume.value);
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

function handleHide() {
  videoContainer.style.cursor = "none";
  videoControls.classList.remove("opacity--1");
}

function handleShow() {
  clearTimeout(timer);
  videoContainer.style.cursor = "default";
  videoControls.classList.add("opacity--1");
  timer = setTimeout(function () {
    handleHide();
  }, 2000);
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
  progress.max = videoPlayer.duration;
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
}

function getCurrentTime() {
  progress.value = videoPlayer.currentTime;
  currentTime.innerText = formatDate(videoPlayer.currentTime);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  changeVolumeIcon(value);
  videoPlayer.volume = value;
}

function changeVolumeIcon(value) {
  if (value > 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value > 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleArrowRight() {
  videoPlayer.currentTime += 5;
}

function handleArrowLeft() {
  videoPlayer.currentTime -= 5;
}

function handleMouseLeave() {
  window.removeEventListener("keydown", handleArrowUpDown);
}

function handleMouseUp() {
  window.addEventListener("keydown", handleArrowUpDown);
}

function handleArrowUpDown(event) {
  event.preventDefault();
  const key = event.key;
  if (key === "f") {
    fullScrnBtn.click();
  } else if (key === "m") {
    handleVolumeBtnClick();
  } else if (key === " ") {
    handlePlayBtnClick();
  } else if (key === "ArrowRight") {
    handleArrowRight();
  } else if (key === "ArrowLeft") {
    handleArrowLeft();
  }
  if (videoPlayer.muted === false) {
    if (key === "ArrowUp") {
      handleArrowUp();
    } else if (key === "ArrowDown") {
      handleArrowDown();
    }
  }
}

function handleArrowUp() {
  if (videoPlayer.volume < 0.9) {
    videoPlayer.volume += 0.1;
    volume.value = videoPlayer.volume;
    changeVolumeIcon(videoPlayer.volume);
  } else {
    videoPlayer.volume = 1;
  }
}

function handleArrowDown() {
  if (videoPlayer.volume > 0.1) {
    videoPlayer.volume -= 0.1;
    volume.value = videoPlayer.volume;
    changeVolumeIcon(videoPlayer.volume);
  } else {
    videoPlayer.volume = 0;
  }
}

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playBtn = document.getElementById("jsPlayBtn");
  volumeBtn = document.getElementById("jsVolumeBtn");
  fullScrnBtn = document.getElementById("jsFullScrnBtn");
  currentTime = document.getElementById("jsCurrentTime");
  totalTime = document.getElementById("jsTotalTime");
  volume = document.getElementById("jsVolume");
  progress = document.querySelector(".progress progress");
  videoControls = document.querySelector(".videoPlayer__controls");
  videoPlayer.volume = 0.5;
  console.log(playBtn);
  playBtn.addEventListener("click", handlePlayBtnClick);
  volumeBtn.addEventListener("click", handleVolumeBtnClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoContainer.addEventListener("mousemove", handleShow);
  videoContainer.addEventListener("mouseup", handleMouseUp);
  videoContainer.addEventListener("mouseleave", handleMouseLeave);
  videoPlayer.addEventListener("click", handlePlayBtnClick);
  videoPlayer.addEventListener("dblclick", handleHide);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volume.addEventListener("input", handleDrag);
  progress.addEventListener("click", function (e) {
    let pos = (e.offsetX / e.target.parentNode.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = pos;
    progress.value = pos;
  });
  let supportsProgress = (document.createElement('progress').max !== undefined);
  if (!supportsProgress) progress.setAttribute('data-state', 'fake');
};

if (videoContainer) {
  init();
}