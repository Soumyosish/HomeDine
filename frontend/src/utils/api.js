import axios from "axios";

const rawBaseURL = import.meta.env.VITE_API_URL_AWS || import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = axios.create({
  baseURL: rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`,
});

API.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("homedine_user");
    const user = raw ? JSON.parse(raw) : null;
    const token = user?.token;

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }
  } catch {
    if (config.headers?.Authorization) delete config.headers.Authorization;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("homedine_user");
    }
    return Promise.reject(error);
  },
);

export default API;
