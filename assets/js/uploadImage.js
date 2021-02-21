import axios from "axios";

const fileUploadForm = document.querySelector(".fileUpload"),
  avatarInput = document.querySelector(".avatarUpload input"),
  bannerInput = document.querySelector(".bannerUpload input"),
  userAvatarImage = document.querySelector(".u-avatar-img"),
  userBannerImage = document.querySelector(".u-banner-img");

async function handleUploadAvatarInput() {
  const fd = new FormData(fileUploadForm);
  fd.delete("banner");
  const response = await axios({
    url: "/api/upload/avatar",
    method: "POST",
    data: fd
  });
  if (response.status === 200) {
    userAvatarImage.style.backgroundImage = `url('/${response.data}')`;
  }
}

async function handleUploadBannerInput() {
  const fd = new FormData(fileUploadForm);
  fd.delete("avatar");
  const response = await axios({
    url: "/api/upload/banner",
    method: "POST",
    data: fd
  });
  if (response.status === 200) {
    userBannerImage.style.backgroundImage = `url('/${response.data}')`;
  }
}

function init() {
  avatarInput.addEventListener("input", handleUploadAvatarInput);
  bannerInput.addEventListener("input", handleUploadBannerInput);
}

if (fileUploadForm) {
  init();
}