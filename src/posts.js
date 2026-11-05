
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

