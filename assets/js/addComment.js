import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment"),
  commentList = document.querySelector(".video__comments-list"),
  commentNumber = document.querySelector(".video__comment-number");

function addComment(response, comment) {
  const li = document.createElement("li");
  const avatar = document.createElement("div");
  const textBox = document.createElement("div");
  const username = document.createElement("span");
  const date = document.createElement("span");
  const text = document.createElement("p");
  const commentInnerNumber = parseInt(commentNumber.innerText.split("comment")[0]);
  if (response.data.avatarUrl.substring(0, 4) === "http") {
    avatar.style.backgroundImage = `url('${response.data.avatarUrl}')`;
  } else {
    avatar.style.backgroundImage = `url('/${response.data.avatarUrl}')`;
  }
  username.innerText = response.data.name;
  date.innerText = "just a moment ago";
  text.innerText = comment;
  commentNumber.innerText = `${commentInnerNumber > 0 ? `${commentInnerNumber} comments` : `${commentInnerNumber} comment`}`;
  avatar.classList.add("comment__u-avatar");
  textBox.classList.add("comment__text");
  username.classList.add("comment__username");
  li.appendChild(avatar);
  li.appendChild(textBox);
  textBox.appendChild(username);
  textBox.appendChild(date);
  textBox.appendChild(text);
  commentList.prepend(li);
}

async function sendComment(comment) {
  const id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/ api / ${id} /comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(response, comment);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}