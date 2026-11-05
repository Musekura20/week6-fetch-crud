
const postsContainer = document.querySelector("#posts-container");
const statusMessage = document.querySelector("#status-message");

export function showLoading() {
  statusMessage.textContent = "Loading posts...";
  postsContainer.innerHTML = "";
}

export function showError(message) {
  statusMessage.textContent = `Error: ${message}`;
  postsContainer.innerHTML = "";
}

export function showEmpty() {
  statusMessage.textContent = "No posts found.";
  postsContainer.innerHTML = "";
}

export function renderPosts(posts) {
  statusMessage.textContent = "";

  if (posts.length === 0) {
    showEmpty();
    return;
  }

  postsContainer.innerHTML = posts.map(post => `
    <article class="bg-white p-5 rounded-lg shadow-sm">
      <h2 class="text-lg font-bold text-gray-800 mb-2">
        ${post.title}
      </h2>

      <p class="text-gray-600">
        ${post.body}
      </p>
    </article>
  `).join("");
}
