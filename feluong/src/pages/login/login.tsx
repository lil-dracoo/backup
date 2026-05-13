import { Box } from "@mui/material";
import { useAuth } from "../../context/authcontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginRight from "./loginright";
import LoginLeft from "./loginleft";

const Login = () => {
  const auth = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (auth && auth.user) {
      if (auth.user.role === "hr") {
        navigation("/dashboard/hr");
      } else if (auth.user.role === "emp") {
        navigation("/dashboard/emp");
      } else if (auth.user.role === "manager") {
        navigation("/dashboard/manager");
      } else if (auth.user.role === "account") {
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
          flexDirection: { xs: "column", md: "row" }, // Responsive: column trên mobile, row trên desktop
        }}
      >
        {/* Left section */}
        <LoginLeft />

        {/* Right section */}
        <LoginRight />
      </Box>
    </Box>
  );
};

export default Login;
