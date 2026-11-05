
import "./style.css";

import { loadPosts } from "./posts.js";

import {
  showLoading,
  showError,
  showEmpty,
  renderPosts
} from "./ui.js";

const userFilter = document.querySelector("#user-filter");

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
