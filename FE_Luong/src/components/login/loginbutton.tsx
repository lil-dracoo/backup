import { Button, CircularProgress } from "@mui/material";

// Khai báo Type để nhận props loading từ LoginForm truyền xuống
interface LoginButtonProps {
  loading: boolean;
}

const LoginButton = ({ loading }: LoginButtonProps) => {
  return (
    <Button
      type="submit" // BẮT BUỘC: type="submit" để kích hoạt sự kiện onSubmit của thẻ Form
      fullWidth
      variant="contained"
      disabled={loading}
      sx={{
        mt: 4, // Khoảng cách với ô password
        py: 1.5,
        backgroundColor: "primary.main",
        color: "white",
        fontSize: "1.1rem",
        fontWeight: "bold",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
    >
      {/* Nếu đang loading thì hiện vòng xoay, ngược lại hiện chữ */}
      {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
    </Button>
  );
};

export default LoginButton;