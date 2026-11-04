import { api } from "./http.js";

async function testAPI() {
  try {
    const posts = await api.get("/posts?_limit=10");

    console.log("Posts received:", posts);
    console.log("Number of posts:", posts.length);

  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

testAPI();