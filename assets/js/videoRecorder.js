const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn"),
  videoPreview = document.getElementById("jsVideoPreview");

async function handleRecordBtnClick() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    videoPreview.style.height = "210px";
    console.log(stream);
  } catch (error) {
    recordBtn.innerText = "Can't record :(";
    recordBtn.removeEventListener("click", handleRecordBtnClick);
  }
}

function init() {
  recordBtn.addEventListener("click", handleRecordBtnClick);
}

if (recordContainer) {
  init();
}