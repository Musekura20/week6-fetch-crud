
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}


export const api = {
  get(endpoint) {
    return request(endpoint);
  },

  post(endpoint, data) {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  patch(endpoint, data) {
    return request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(endpoint) {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};
