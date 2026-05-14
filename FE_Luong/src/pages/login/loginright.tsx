import { Box } from "@mui/material";
import LoginForm from "./loginform";
const LoginRight = () => {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(15, 23, 42, 0.35)",
          backdropFilter: "blur(8px)",
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 4, md: 0 },
        }}
      >
        {/* FORM WRAPPER */}
        <LoginForm />
      </Box>
    </>
  );
};
export default LoginRight;
