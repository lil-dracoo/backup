import { Button } from "@mui/material";
import { useAuth } from "../../context/authcontext";

interface LoginButtonProps {
  username: string;
  password: string;
  auth: ReturnType<typeof useAuth>;
  setusername: React.Dispatch<React.SetStateAction<string>>;
  setpassword: React.Dispatch<React.SetStateAction<string>>;
}
const LoginButton = (props: LoginButtonProps) => {
  const { username, password, auth, setusername, setpassword } = props;

  const submitlogin = () => {
    if (auth) {
      auth.login(username, password);
      setusername("");
      setpassword("");
    }
  };
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        onClick={submitlogin}
        sx={{
          py: 1.5,
          borderRadius: "16px",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #38bdf8, #2563eb)",
          boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            background: "linear-gradient(135deg, #60a5fa, #2563eb)",
            boxShadow: "0 12px 28px rgba(37, 99, 235, 0.4)",
          },
        }}
      >
        Login
      </Button>
    </>
  );
};
export default LoginButton;
