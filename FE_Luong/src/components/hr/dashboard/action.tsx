import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ChiTietKhungViTri from "./chi_tiet_khung_vi_tri";

interface IActionProps {
  isDark: boolean;
  navigate: (path: string) => void;
}
const Action = (props: IActionProps) => {
  const { isDark, navigate } = props;
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(226,232,240,0.9)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        background: isDark ? "rgba(30, 41, 59, 0.6)" : "rgba(255,255,255,0.92)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Typography
          sx={{
            fontWeight: 700,
            color: isDark ? "#e2e8f0" : "#0f172a",
            fontSize: "1.1rem",
          }}
        >
          Hành động nhanh
        </Typography>

        <Typography
          sx={{
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "0.9rem",
            mt: 0.35,
          }}
        >
          Truy cập nhanh các khu vực cần thiết để vận hành chính sách lương.
        </Typography>
        
        {/* Buttons */}
        <Stack spacing={1.2} sx={{ mt: 2 }}>
          <Button
            fullWidth
            startIcon={<HomeRoundedIcon />}
            onClick={() => navigate("/dashboard/hr")}
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2.5,
              py: 1.2,
              px: 1.5,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: isDark ? "rgba(37,99,235,0.2)" : "#dbeafe",
              color: isDark ? "#bfdbfe" : "#1d4ed8",
            }}
          >
            Vào trang chủ HR
          </Button>
          <Button
            fullWidth
            startIcon={<GroupsRoundedIcon />}
            onClick={() => navigate("/hr/employees")}
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2.5,
              py: 1.2,
              px: 1.5,
              textTransform: "none",
              fontWeight: 600,
              bgcolor: isDark ? "rgba(15,23,42,0.35)" : "#f8fafc",
              color: isDark ? "#cbd5e1" : "#334155",
              border: isDark
                ? "1px solid rgba(71, 85, 105, 0.3)"
                : "1px solid #e2e8f0",
            }}
          >
            Hồ sơ nhân viên
          </Button>
          <Button
            fullWidth
            startIcon={<TrendingUpRoundedIcon />}
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2.5,
              py: 1.2,
              px: 1.5,
              textTransform: "none",
              fontWeight: 600,
              bgcolor: isDark ? "rgba(15,23,42,0.35)" : "#f8fafc",
              color: isDark ? "#cbd5e1" : "#334155",
              border: isDark
                ? "1px solid rgba(71, 85, 105, 0.3)"
                : "1px solid #e2e8f0",
            }}
          >
            Xuất báo cáo KPI
          </Button>
        </Stack>

        <Divider
          sx={{ my: 2.2, borderColor: isDark ? "#334155" : "#e2e8f0" }}
        />
        <ChiTietKhungViTri isDark={isDark} />

      </CardContent>
    </Card>
  );
};
export default Action;
