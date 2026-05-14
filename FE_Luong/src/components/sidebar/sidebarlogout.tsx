import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
interface SideBarLogout {
  collapsed: boolean;
  isDark: boolean;
}
const SideBarLogout = (props: SideBarLogout) => {
  const { collapsed, isDark } = props;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Box
      sx={{
        p: 2,
        mt: "auto",
        borderTop: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(226, 232, 240, 0.9)",
      }}
    >
      <ListItemButton
        onClick={handleLogout}
        sx={{
          justifyContent: collapsed ? "center" : "flex-start",
          borderRadius: "14px",
          py: 1.35,
          px: collapsed ? 1 : 2,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(239, 68, 68, 0.08)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 40,
            justifyContent: "center",
            color: "#ef4444",
            mr: collapsed ? 0 : 2,
          }}
        >
          <Tooltip
            title="Đăng xuất"
            placement="right"
            arrow
            disableHoverListener={!collapsed}
            disableFocusListener={!collapsed}
            disableTouchListener={!collapsed}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LogoutIcon />
            </Box>
          </Tooltip>
        </ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={
              <Typography
                component="span"
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#ef4444",
                }}
              >
                Đăng xuất
              </Typography>
            }
          />
        )}
      </ListItemButton>
    </Box>
  );
};
export default SideBarLogout;
