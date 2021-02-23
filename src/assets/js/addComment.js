import axios from "axios";
import { doc } from "prettier";

const addCommentForm = document.getElementById("jsAddComment"),
  commentList = document.querySelector(".video__comments-list"),
  commentNumber = document.querySelector(".video__comment-number"),
  commentDeleteBtns = document.querySelectorAll(".comment__delete-btn"),
  commentUpVoteBtns = document.querySelectorAll(".comment__up-vote-btn"),
  commentEditBtns = document.querySelectorAll(".comment__edit-btn");

function editComment(li, newComment) {
  const text = li.querySelector("p");
  const editCommentForm = li.querySelector(".comment__form");
  text.innerText = newComment;
  text.classList.remove("none");
  editCommentForm.classList.add("none");
  editCommentForm.removeEventListener("submit", handleEditCommentSubmit);
}

async function handleEditCommentSubmit(event) {
  event.preventDefault();
  const target = this;
  const newComment = target.querySelector("input").value;
  const li = target.parentNode.parentNode;
  const response = await axios({
    url: "/api/comment/edit",
    method: "POST",
    data: {
      commentId: li.id,
      newComment
    }
  });
  if (response.status === 200) {
    editComment(li, newComment);
  }
}

function handleEditBtnClick() {
  const target = this;
  const li = target.parentNode.parentNode.parentNode;
  const text = li.querySelector("p");
  const editCommentForm = li.querySelector(".comment__form");
  if (editCommentForm.classList[1] === "none") {
    text.classList.add("none");
    editCommentForm.classList.remove("none");
    editCommentForm.addEventListener("submit", handleEditCommentSubmit);
  } else {
    text.classList.remove("none");
    editCommentForm.classList.add("none");
    editCommentForm.removeEventListener("submit", handleEditCommentSubmit);
  }
}

async function handleUpVoteBtnClick() {
  const target = this;
  const upVoteNumber = target.querySelector(".up-vote-number");
  const li = target.parentNode.parentNode;
  if (Boolean(target.classList[1] === "comment__up-vote-btn--active")) {
    const response = await axios({
      url: "/api/comment/upvote",
      method: "POST",
      data: {
        commentId: li.id,
        direction: false
      }
    });
    if (response.status === 200) {
      target.classList.remove("comment__up-vote-btn--active");
      upVoteNumber.innerText = parseInt(upVoteNumber.innerText) - 1;
    }
  } else {
    const response = await axios({
      url: "/api/comment/upvote",
      method: "POST",
      data: {
        commentId: li.id,
        direction: true
      }
    });
    if (response.status === 200) {
      target.classList.add("comment__up-vote-btn--active");
      upVoteNumber.innerText = parseInt(upVoteNumber.innerText) + 1;
    }
  }
}

function handleSuccessDelete(li) {
  const commentInnerNumber = parseInt(commentNumber.innerText.split("comment")[0]) - 1;
  commentNumber.innerText = `${commentInnerNumber > 0 ? `${commentInnerNumber} comments` : `${commentInnerNumber} comment`}`;
  commentList.removeChild(li);
}

async function deleteComment() {
  const result = confirm("Want to delete?");
  if (result) {
    const target = this;
    const li = target.parentNode.parentNode.parentNode;
    const id = window.location.href.split("/videos/")[1];
    const response = await axios({
      url: `/api/${id}/comment/delete`,
      method: "POST",
      data: {
        commentId: li.id
      }
    });
    if (response.status === 200) {
      handleSuccessDelete(li);
    }
  }
}

function addComment(response, comment) {
  const li = document.createElement("li");
  const avatarA = document.createElement("a");
  const avatar = document.createElement("div");
  const textBox = document.createElement("div");
  const usernameA = document.createElement("a");
  const username = document.createElement("span");
  const date = document.createElement("span");
  const text = document.createElement("p");
  const editCommentForm = document.createElement("form");
  const editCommentInput = document.createElement("input");
  const menu = document.createElement("div");
  const upVoteBtn = document.createElement("button");
  const upVoteIcon = document.createElement("i");
  const upVoteNumber = document.createElement("span");
  const wrapBtns = document.createElement("div");
  const editBtn = document.createElement("button");
  const wrapEdit = document.createElement("div");
  const editIcon = document.createElement("i");
  const deleteBtn = document.createElement("button");
  const wrapDelete = document.createElement("div");
  const deleteIcon = document.createElement("i");
  const commentInnerNumber = parseInt(commentNumber.innerText.split("comment")[0]) + 1;
  li.id = response.data._id;
  avatarA.href = `/users/${response.data.creator._id}`;
  if (response.data.creator.avatarUrl) {
    if (response.data.creator.avatarUrl.substring(0, 4) === "http") {
      avatar.style.backgroundImage = `url('${response.data.creator.avatarUrl}')`;
    } else {
      avatar.style.backgroundImage = `url('/${response.data.creator.avatarUrl}')`;
    }
  }
  usernameA.href = `/users/${response.data.creator._id}`;
  username.innerText = response.data.creator.name;
  date.innerText = "just a moment ago";
  text.innerText = comment;
  editCommentInput.required = true;
  editCommentInput.value = comment;
  upVoteNumber.innerText = "0";
  upVoteBtn.addEventListener("click", handleUpVoteBtnClick);
  editBtn.addEventListener("click", handleEditBtnClick);
  deleteBtn.addEventListener("click", deleteComment);
  commentNumber.innerText = `${commentInnerNumber > 0 ? `${commentInnerNumber} comments` : `${commentInnerNumber} comment`}`;
  editCommentForm.className = "comment__form none";
  editCommentInput.classList.add("comment__input");
  menu.classList.add("comment__menu");
  upVoteBtn.classList.add("comment__up-vote-btn");
  upVoteIcon.className = "fas fa-chevron-up";
  upVoteNumber.classList.add("up-vote-number");
  editBtn.classList.add("comment__edit-btn");
  wrapEdit.classList.add("comment__wrap-edit");
  editIcon.className = "fas fa-pen";
  deleteBtn.classList.add("comment__delete-btn");
  wrapDelete.classList.add("comment__wrap-delete");
  deleteIcon.className = "fas fa-times";
  avatar.classList.add("comment__u-avatar");
  textBox.classList.add("comment__text");
  username.classList.add("comment__username");
  li.appendChild(avatarA);
  li.appendChild(textBox);
  li.appendChild(menu);
  avatarA.appendChild(avatar);
  textBox.appendChild(usernameA);
  textBox.appendChild(date);
  textBox.appendChild(text);
  textBox.appendChild(editCommentForm);
  editCommentForm.appendChild(editCommentInput);
  usernameA.appendChild(username);
  menu.appendChild(upVoteBtn);
  menu.appendChild(wrapBtns);
  upVoteBtn.appendChild(upVoteIcon);
  upVoteBtn.appendChild(upVoteNumber);
  wrapBtns.appendChild(editBtn);
  wrapBtns.appendChild(deleteBtn);
  editBtn.appendChild(wrapEdit);
  wrapEdit.appendChild(editIcon);
  deleteBtn.appendChild(wrapDelete);
  wrapDelete.appendChild(deleteIcon);
  commentList.prepend(li);
}

async function sendComment(comment) {
  const id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${id}/comment`,
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
  for (const commentDeleteBtn of commentDeleteBtns) {
    commentDeleteBtn.addEventListener("click", deleteComment);
  }
  for (const commentUpVoteBtn of commentUpVoteBtns) {
    commentUpVoteBtn.addEventListener("click", handleUpVoteBtnClick);
  }
  for (const commentEditBtn of commentEditBtns) {
    commentEditBtn.addEventListener("click", handleEditBtnClick);
  }
}

if (addCommentForm) {
  init();
}