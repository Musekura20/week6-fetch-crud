
import "./style.css";

import { loadPosts } from "./posts.js";

import {
  showLoading,
  showError,
  showEmpty,
  renderPosts
} from "./ui.js";

async function displayPosts() {
  showLoading();

  try {
    const posts = await loadPosts();

    if (posts.length === 0) {
      showEmpty();
      return;
    }

    renderPosts(posts);

  } catch (error) {
    showError(error.message);
  }
}

displayPosts();
