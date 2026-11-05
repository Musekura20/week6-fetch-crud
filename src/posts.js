
import { api } from "./http.js";

let posts = [];

export function getPosts() {
  return posts;
}


export async function loadPosts(userId = "") {
  const params = new URLSearchParams();

  if (userId) {
    params.set("userId", userId);
  } else {
    params.set("_limit", "10");
  }

  posts = await api.get(`/posts?${params.toString()}`);

  return posts;
}

export async function createPost(newPost) {
  const createdPost = await api.post("/posts", newPost);

  posts = [createdPost, ...posts];

  return posts;
}

export async function updatePost(id, newTitle) {
  const updatedPost = await api.patch(`/posts/${id}`, {
    title: newTitle
  });

  posts = posts.map(post =>
    post.id === id ? updatedPost : post
  );

  return posts;
}
