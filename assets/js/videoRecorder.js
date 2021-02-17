const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn"),
  videoPreview = document.getElementById("jsVideoPreview");

let streamObject,
  videoRecoreder;

function handleVideoData(event) {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
}

function startRecording() {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
}

function stopRecording() {
  videoPreview.style.height = "0";
  streamObject.getTracks().forEach(function (track) {
    track.stop();
  });
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerText = "Start recording";
}

async function getVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    videoPreview.style.height = "209px";
    recordBtn.innerText = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerText = "Can't record :(";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
}

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}