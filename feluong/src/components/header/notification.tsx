import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
interface NotificationProps {
  isDark: boolean;
}
const Notification = (props: NotificationProps) => {
  const { isDark } = props;
  return (
    <IconButton
      sx={{
        backgroundColor: isDark
          ? "rgba(51, 65, 85, 0.8)"
          : "rgba(243, 244, 246, 0.8)",
        width: 42,
        height: 42,
        transition: "all 0.2s ease",
        color: isDark ? "#94a3b8" : "#6b7280",
        "&:hover": {
          backgroundColor: isDark
            ? "rgba(71, 85, 105, 0.8)"
            : "rgba(229, 231, 235, 0.8)",
          color: "#2563eb",
        },
      }}
    >
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};
export default Notification;
