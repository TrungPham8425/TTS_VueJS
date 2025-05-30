import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error
    console.error("API Error:", error);

    // Check if we should use localStorage fallback
    if (!navigator.onLine || error.response?.status >= 500) {
      return useFallback(error.config);
    }

    return Promise.reject(error);
  }
);

// Fallback to localStorage when API is unavailable
function useFallback(config) {
  const key = `blog_fallback_${config.url}`;

  switch (config.method.toLowerCase()) {
    case "get":
      const data = localStorage.getItem(key);
      return data
        ? Promise.resolve({ data: JSON.parse(data) })
        : Promise.reject(new Error("No cached data"));

    case "post":
      const newData = config.data;
      localStorage.setItem(key, JSON.stringify(newData));
      return Promise.resolve({ data: newData });

    case "put":
      const updatedData = config.data;
      localStorage.setItem(key, JSON.stringify(updatedData));
      return Promise.resolve({ data: updatedData });

    case "delete":
      localStorage.removeItem(key);
      return Promise.resolve({ data: null });

    default:
      return Promise.reject(new Error("Method not supported in fallback mode"));
  }
}

// API methods
export const getPosts = () => api.get("/posts");
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;
