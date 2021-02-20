import axios from "axios";

const filterBtn = document.getElementById("jsFilterBtn"),
  transformBox = document.querySelector(".transform-box"),
  uploadDate = document.querySelectorAll(".wrap-filter li"),
  duration = document.querySelectorAll(".duration li"),
  sortBy = document.querySelectorAll(".sort-by li"),
  searchVideos = document.querySelector(".search__videos");

function handleFilterBtnClick() {
  if (transformBox.classList.contains("transform-box--open")) {
    transformBox.classList.remove("transform-box--open");
  } else {
    transformBox.classList.add("transform-box--open");
  }
}

function paintVideos(videos) {
  searchVideos.innerHTML = "";
  for (const video of videos) {
    console.log(video);
  }
}

async function handleUploadDateClick() {
  const target = this;
  const term = window.location.href.split("term=")[1];
  let past;
  if (target.id === "hour") {
    past = 3600000;
  } else if (target.id === "day") {
    past = 86400000;
  } else if (target.id === "month") {
    past = 2635200000;
  } else if (target.id === "year") {
    past = 31622400000;
  }
  const response = await axios({
    url: "/api/filter/video",
    method: "POST",
    data: {
      type: "uploadDate",
      value: Date.now() - past,
      term
    }
  });
  if (response.status === 200) {
    paintVideos(response.data);
  }
}

function handleDurationClick() {
  const target = this;
  const term = window.location.href.split("term=")[1];
  let duration;
  if (target.id === "short") {
    duration = 4;
  } else if (target.id === "long") {
    duration = 20;
  }
  const response = await axios({
    url: "/api/filter/video",
    method: "POST",
    data: {
      type: "duration",
      value: duration,
      term
    }
  });
  if (response.status === 200) {
    paintVideos(response.data);
  }
}

function handleSortByClick() {
  const target = this;
  const term = window.location.href.split("term=")[1];
  const response = await axios({
    url: "/api/filter/video",
    method: "POST",
    data: {
      type: "uploadDate",
      value: target.id,
      term
    }
  });
  if (response.status === 200) {
    paintVideos(response.data);
  }
}

function init() {
  filterBtn.addEventListener("click", handleFilterBtnClick);
  for (const li of uploadDate) {
    li.addEventListener("click", handleUploadDateClick);
  }
  for (const li of duration) {
    li.addEventListener("click", handleDurationClick);
  }
  for (const li of sortBy) {
    li.addEventListener("click", handleSortByClick);
  }
}

if (filterBtn) {
  init();
}