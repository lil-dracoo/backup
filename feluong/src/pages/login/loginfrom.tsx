import { Typography, Box } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/authcontext";
import LoginUsername from "../../components/login/loginusername";
import LoginPass from "../../components/login/loginpass";
import LoginButton from "../../components/login/loginbutton";
const LoginForm = () => {
  const auth = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <Box
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
            fontSize: {
              xs: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
            },
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

        {/* USERNAME */}
        <LoginUsername username={username} setUsername={setUsername} />

        {/* PASSWORD */}
        <LoginPass password={password} setPassword={setPassword} />

        {/* BUTTON */}
        <LoginButton username={username} password={password} auth={auth} setusername={setUsername} setpassword={setPassword} />
      </Box>
    </>
  );
};
export default LoginForm;
