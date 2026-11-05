
import { api } from "./http.js";

let posts = [];

export function getPosts() {
  return posts;
}

export async function loadPosts() {
  posts = await api.get("/posts?_limit=10");

  return posts;
}
