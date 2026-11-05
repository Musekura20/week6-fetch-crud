
import "./style.css";

import { loadPosts, createPost, updatePost } from "./posts.js";

import {
  showLoading,
  showError,
  showEmpty,
  renderPosts
} from "./ui.js";

const userFilter = document.querySelector("#user-filter");
const createPostForm = document.querySelector("#create-post-form");
const postsContainer = document.querySelector("#posts-container");

async function displayPosts(userId = "") {
  showLoading();

  try {
    const posts = await loadPosts(userId);

    if (posts.length === 0) {
      showEmpty();
      return;
    }

    renderPosts(posts);

  } catch (error) {
    showError(error.message);
  }
}

// Load the initial 10 posts
displayPosts();

// Listen for changes in the dropdown
userFilter.addEventListener("change", () => {
  const selectedUser = userFilter.value;

  displayPosts(selectedUser);
});

//listen for form submission
createPostForm.addEventListener("submit", async (event) => {
  console.log("Form submitted!");
  event.preventDefault();

  const formData = new FormData(createPostForm);

  const newPost = {
    title: formData.get("title"),
    body: formData.get("body"),
    userId: Number(formData.get("userId"))
  };

  try {
    const updatedPosts = await createPost(newPost);

    renderPosts(updatedPosts);

    createPostForm.reset();

  } catch (error) {
    showError(error.message);
  }
});

postsContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("edit-button")) {
    const postId = Number(event.target.dataset.id);

    const newTitle = prompt("Enter the new title:");

    if (!newTitle || !newTitle.trim()) {
      return;
    }

    try {
      const updatedPosts = await updatePost(postId, newTitle.trim());

      renderPosts(updatedPosts);

    } catch (error) {
      showError(error.message);
    }
  }
});
