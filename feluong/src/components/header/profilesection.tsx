import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/authcontext";
interface ProfileSectionProps {
  isDark: boolean;
}
const ProfileSection = (props: ProfileSectionProps) => {
  const { isDark } = props;
  const { user } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        pl: 2.5,
        pr: 1,
        borderLeft: isDark
          ? "1px solid rgba(71, 85, 105, 0.35)"
          : "1px solid rgba(226, 232, 240, 0.9)",
      }}
    >
      {/* AVATAR */}
      <Avatar
        sx={{
          width: 50,
          height: 50,
          cursor: "pointer",
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          color: "#fff",
          fontWeight: 800,
          fontSize: "1rem",
          boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
          border: "2px solid rgba(255,255,255,0.9)",
          transition: "all 0.25s ease",

          "&:hover": {
            transform: "translateY(-2px) scale(1.05)",
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
          },
        }}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>

      {/* USER INFO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: isDark ? "#f8fafc" : "#0f172a",
            fontSize: "0.95rem",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 140,
          }}
        >
          {user?.name}
        </Typography>

        <Typography
          sx={{
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.3px",
          }}
        >
          {user?.role || "Không lấy được dữ liệu"}
        </Typography>
      </Box>
    </Box>
  );
};
export default ProfileSection;
