import axios from "axios";

// Khởi tạo instance Axios
const API = axios.create({
  baseURL: "http://localhost:4000/api", // Đảm bảo khớp với cổng Backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Tự động đính kèm Token vào mọi request gửi đi
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// THÊM MỚI: Bắt lỗi 401/403 từ Backend để báo hết hạn
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Bắn ra một sự kiện (CustomEvent) để AuthContext lắng nghe
      window.dispatchEvent(new CustomEvent("session_expired"));
    }
    return Promise.reject(error);
  }
);

export default API;