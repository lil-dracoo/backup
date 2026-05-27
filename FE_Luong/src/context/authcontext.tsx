import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface JwtPayload {
  cccd?: string;
  ten_tai_khoan: string;
  role: string;
  exp: number; // Thời gian hết hạn (tính bằng giây)
}

interface AuthContextType {
  user: JwtPayload | null;
  isAuthReady: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // State quản lý việc bật/tắt Popup thông báo hết hạn
  const [isExpiredAlertOpen, setIsExpiredAlertOpen] = useState(false);

  // Hàm logout được nâng cấp: Thêm cờ showExpiredAlert
  const logout = (showExpiredAlert = false) => {
    localStorage.removeItem("token");
    setUser(null);
    if (showExpiredAlert) {
      setIsExpiredAlertOpen(true);
    }
  };

  // 1. Kiểm tra Token lúc người dùng F5 trang
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          logout(true); // Token đã hết hạn từ trước
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        logout();
      }
    }

    setIsAuthReady(true);
  }, []);

  // 2. Lớp bảo vệ kép: Lắng nghe Axios & Đếm ngược thời gian
  useEffect(() => {
    // Hàm xử lý khi bắt được event "session_expired" từ Axios
    const handleSessionExpired = () => logout(true);
    window.addEventListener("session_expired", handleSessionExpired);

    // Bộ đếm thời gian (Timer) tự động kích hoạt logout khi đến giờ
    let timer: ReturnType<typeof setTimeout>;
    if (user?.exp) {
      const timeLeftInMilliseconds = user.exp * 1000 - Date.now();

      if (timeLeftInMilliseconds <= 0) {
        logout(true);
      } else {
        timer = setTimeout(() => {
          logout(true);
        }, timeLeftInMilliseconds);
      }
    }

    // Dọn dẹp bộ nhớ khi Component unmount hoặc User thay đổi
    return () => {
      window.removeEventListener("session_expired", handleSessionExpired);
      if (timer) clearTimeout(timer);
    };
  }, [user]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode<JwtPayload>(token);
    setUser(decodedToken);
  };

  const handleCloseAlert = () => {
    setIsExpiredAlertOpen(false);
    // Lưu ý: Không cần gọi lệnh điều hướng (navigate) về /login ở đây
    // Vì khi setUser(null), <ProtectedRoute> sẽ tự động phát hiện và đá người dùng văng ra /login
  };

  return (
    <AuthContext.Provider value={{ user, isAuthReady, login, logout }}>
      {children}

      {/* POPUP THÔNG BÁO HẾT HẠN */}
      <Dialog
        open={isExpiredAlertOpen}
        onClose={handleCloseAlert}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}
        >
          <WarningAmberIcon sx={{ color: "#f59e0b", fontSize: 28 }} />
          <Typography
            sx={{ fontWeight: 700, fontSize: "1.15rem", color: "#0f172a" }}
          >
            Phiên đăng nhập hết hạn
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.5 }}
          >
            Vì lý do bảo mật, thời gian truy cập của bạn đã kết thúc. Vui lòng
            đăng nhập lại để tiếp tục sử dụng hệ thống.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseAlert}
            sx={{
              bgcolor: "#2563eb",
              color: "white",
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            Đăng nhập lại
          </Button>
        </DialogActions>
      </Dialog>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth BẮT BUỘC phải được sử dụng bên trong <AuthProvider>",
    );
  }
  return context;
};
