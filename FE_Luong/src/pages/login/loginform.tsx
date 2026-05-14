import { Typography, Box, Alert } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import LoginUsername from "../../components/login/loginusername";
import LoginPass from "../../components/login/loginpass";
import LoginButton from "../../components/login/loginbutton";
import API from "../../services/api"; // Import Axios instance

const LoginForm = () => {
  const auth = useContext(AuthContext);
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // Thêm State quản lý lỗi và trạng thái tải
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Hàm xử lý gọi API khi submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của HTML
    setError(null);
    setLoading(true);

    try {
      // Gửi dữ liệu xuống Backend theo đúng tên cột Snake_case
      const response = await API.post("/auth/login", {
        ten_tai_khoan: username,
        mat_khau: password
      });
      
      const { token } = response.data;

      // Lưu Token và giải mã (chuyển trang sẽ do Login.tsx đảm nhận)
      if (auth && auth.login) {
        auth.login(token);
      }
    } catch (err: any) {
      // Bắt lỗi từ Backend trả về
      setError(err.response?.data?.error || "Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form" // RẤT QUAN TRỌNG: Biến Box thành thẻ <form>
        onSubmit={handleSubmit} // Gắn sự kiện submit
        sx={{
          width: "100%",
          maxWidth: "450px",
          mx: "auto",
        }}
      >
        {/* SIGN IN */}
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-2px",
            textAlign: "center",
            mb: 1,
          }}
        >
          Sign In
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.7)",
            mt: 1,
            mb: { xs: 3, md: 4 },
            fontSize: "0.95rem",
            textAlign: "center",
          }}
        ></Typography>

        {/* Hiển thị thông báo lỗi màu đỏ nếu đăng nhập sai */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* USERNAME */}
        <LoginUsername username={username} setUsername={setUsername} />

        {/* PASSWORD */}
        <LoginPass password={password} setPassword={setPassword} />

        {/* BUTTON */}
        {/* Chỉ cần truyền loading xuống để Button hiển thị vòng xoay, không cần truyền auth hay setUsername nữa */}
        <LoginButton loading={loading} />
      </Box>
    </>
  );
};

export default LoginForm;