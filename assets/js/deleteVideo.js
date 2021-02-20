const deleteLink = document.querySelector(".form-container__link");

function handleDeleteBtnClick() {
  const result = confirm("Want to delete?");
  if (result) {
    const videoId = window.location.href.replace("/edit", "").split("/videos/")[1];
    window.location.href = `/videos/${videoId}/delete`;
  }
}

function init() {
  deleteLink.addEventListener("click", handleDeleteBtnClick);
}

if (deleteLink) {
  init();
}