import { Box } from "@mui/material";
// Nếu bạn đã tự viết hook useAuth thì dùng, nếu không thì dùng useContext chuẩn như sau:
import { AuthContext } from "../../context/authcontext"; 
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginRight from "./loginright";
import LoginLeft from "./loginleft";

const Login = () => {
  // Thay useAuth bằng chuẩn useContext của React
  const auth = useContext(AuthContext); 
  const navigation = useNavigate();

  // Hiệu ứng lắng nghe: Nếu đã có thông tin user (đã đăng nhập) -> Tự động chuyển trang
  useEffect(() => {
    if (auth?.user?.role) {
      // Đưa role về chữ thường để so sánh cho an toàn (ví dụ: 'HR' hay 'hr' đều nhận)
      const role = auth.user.role.toLowerCase();

      if (role === "hr") {
        navigation("/dashboard/hr");
      } else if ( role === "nhân viên") {
        navigation("/dashboard/emp");
      } else if (role === "quản lý") {
        navigation("/dashboard/manager");
      } else if (role === "kế toán") {
        navigation("/dashboard/account");
      } else {
        navigation("/dashboard/board");
      }
    }
  }, [auth, navigation]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/image/hinhlogin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(1px)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, 
        }}
      >
        <LoginLeft />
        {/* Ta sẽ không truyền gì vào LoginRight, nó sẽ tự gọi API và cập nhật Context */}
        <LoginRight />
      </Box>
    </Box>
  );
};

export default Login;