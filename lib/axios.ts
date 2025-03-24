import Axios from "axios";
import Cookies from "js-cookie";

const api = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_UR || "http://localhost:8080/api/"}`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } 



    }
    Promise.reject(error);
  }
);

export default api;
