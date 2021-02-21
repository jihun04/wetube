import axios from "axios";

const filterBtn = document.getElementById("jsFilterBtn"),
  transformBox = document.querySelector(".transform-box"),
  filters = document.querySelectorAll(".wrap-filter li"),
  uploadDate = document.querySelectorAll(".upload-date li"),
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
    const videoBlock = document.createElement("div");
    const videoThumbnailA = document.createElement("a");
    const videoThumbnail = document.createElement("video");
    const videoInfo = document.createElement("div");
    const videoInfoA1 = document.createElement("a");
    const videoTitle = document.createElement("abbr");
    const divUnderTitle = document.createElement("div");
    const videoViews = document.createElement("spna");
    const videoDot = document.createElement("span");
    const videoDate = document.createElement("span");
    const userDetailA = document.createElement("a");
    const videoUserAvatar = document.createElement("div");
    const videoAuther = document.createElement("abbr");
    const videoInfoA2 = document.createElement("a");
    const videoDescription = document.createElement("abbr");
    videoThumbnailA.href = `/videos/${video._id}`;
    videoThumbnail.src = `/${video.fileUrl}`;
    videoThumbnail.controls = false;
    videoInfoA1.href = `/videos/${video._id}`;
    videoTitle.title = video.title;
    videoTitle.innerText = video.title;
    if (video.views === 1) {
      videoViews.innerText = `${video.views} view`;
    } else {
      videoViews.innerText = `${video.views} views`;
    }
    videoDot.innerText = " • ";
    if (Math.floor((Date.now() - video.createdAt) / 31622400000) > 0) {
      if (Math.floor((Date.now() - video.createdAt) / 31622400000) === 1) {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 31622400000)} year ago`;
      } else {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 31622400000)} years ago`;
      }
    } else if (Math.floor((Date.now() - video.createdAt) / 2635200000) > 0) {
      if (Math.floor((Date.now() - video.createdAt) / 2635200000) === 1) {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 2635200000)} month ago`;
      } else {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 2635200000)} months ago`;
      }
    } else if (Math.floor((Date.now() - video.createdAt) / 86400000) > 0) {
      if (Math.floor((Date.now() - video.createdAt) / 86400000) === 1) {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 86400000)} day ago`;
      } else {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 86400000)} days ago`;
      }
    } else if (Math.floor((Date.now() - video.createdAt) / 3600000) > 0) {
      if (Math.floor((Date.now() - video.createdAt) / 3600000) === 1) {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 3600000)} hour ago`;
      } else {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 3600000)} hours ago`;
      }
    } else if (Math.floor((Date.now() - video.createdAt) / 60000) > 0) {
      if (Math.floor((Date.now() - video.createdAt) / 60000) === 1) {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 60000)} minute ago`;
      } else {
        videoDate.innerText = `${Math.floor((Date.now() - video.createdAt) / 60000)} minutes ago`;
      }
    } else {
      videoDate.innerText = "just a moment ago";
    }
    userDetailA.href = `/users/${video.creator._id}`;
    if (video.creator.avatarUrl) {
      if (video.creator.avatarUrl.substring(0, 4) === "http") {
        videoUserAvatar.style.backgroundImage = `url('${video.creator.avatarUrl}')`;
      } else {
        videoUserAvatar.style.backgroundImage = `url('/${video.creator.avatarUrl}')`;
      }
    }
    videoAuther.title = video.creator.name;
    videoAuther.innerText = video.creator.name;
    videoInfoA2.href = `/videos/${video._id}`;
    videoDescription.title = video.description;
    videoDescription.innerText = video.description;
    videoBlock.classList.add("videoBlock--search");
    videoThumbnail.classList.add("videoBlock__thumbnail");
    videoInfo.classList.add("videoBlock__info");
    videoTitle.classList.add("videoBlock__title");
    videoViews.classList.add("videoBlock__views");
    videoUserAvatar.classList.add("videoBlock__u-avatar");
    videoAuther.classList.add("videoBlock__auther");
    videoDescription.classList.add("videoBlock__description");
    videoBlock.appendChild(videoThumbnailA);
    videoBlock.appendChild(videoInfo);
    videoThumbnailA.appendChild(videoThumbnail);
    videoInfo.appendChild(videoInfoA1);
    videoInfo.appendChild(userDetailA);
    videoInfo.appendChild(videoInfoA2);
    videoInfoA1.appendChild(videoTitle);
    videoInfoA1.appendChild(divUnderTitle);
    divUnderTitle.appendChild(videoViews);
    divUnderTitle.appendChild(videoDot);
    divUnderTitle.appendChild(videoDate);
    userDetailA.appendChild(videoUserAvatar);
    userDetailA.appendChild(videoAuther);
    videoInfoA2.appendChild(videoDescription);
    searchVideos.appendChild(videoBlock);
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

async function handleDurationClick() {
  const target = this;
  const term = window.location.href.split("term=")[1];
  let duration;
  if (target.id === "short") {
    duration = 240;
  } else if (target.id === "long") {
    duration = 1200;
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

async function handleSortByClick() {
  const target = this;
  const term = window.location.href.split("term=")[1];
  const response = await axios({
    url: "/api/filter/video",
    method: "POST",
    data: {
      type: "sortBy",
      value: target.id,
      term
    }
  });
  if (response.status === 200) {
    paintVideos(response.data);
  }
}

function handleFilterClick() {
  const target = this;
  const selectedFilter = document.querySelector(".li--selected");
  if (selectedFilter) {
    selectedFilter.classList.remove("li--selected");
  }
  target.classList.add("li-selected");
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
  for (const li of filters) {
    li.addEventListener("click", handleFilterClick);
  }
}

if (filterBtn) {
  init();
}