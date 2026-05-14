import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
} from "@mui/material";
interface SideBarMenuProps {
  collapsed: boolean;
  menuItems: any[];
  isDark: boolean;
  navigate: (path: string) => void;
}
const SideBarMenu = (props: SideBarMenuProps) => {
  const { collapsed, menuItems, isDark, navigate } = props;
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ py: 2, px: collapsed ? 1 : 1.5 }}>
      {menuItems.map((item, index) => {
        const IconComponent = item.icon;
        const active = isActive(item.path);
        return (
          <Tooltip
            key={index}
            title={item.text}
            placement="right"
            arrow
            disableHoverListener={!collapsed}
            disableFocusListener={!collapsed}
            disableTouchListener={!collapsed}
          >
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                alignItems: "center",
                borderRadius: "14px",
                mb: 0.75,
                py: 1.35,
                px: collapsed ? 1 : 2,
                position: "relative",
                backgroundColor: active
                  ? isDark
                    ? "rgba(37, 99, 235, 0.15)"
                    : "rgba(37, 99, 235, 0.08)"
                  : "transparent",
                border: active
                  ? isDark
                    ? "1px solid rgba(37, 99, 235, 0.3)"
                    : "1px solid rgba(37, 99, 235, 0.14)"
                  : "1px solid transparent",
                boxShadow: active
                  ? "0 6px 18px rgba(37, 99, 235, 0.08)"
                  : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(15, 23, 42, 0.08)"
                    : "rgba(15, 23, 42, 0.04)",
                },
                "&::before": active
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "4px",
                      height: "24px",
                      background: "linear-gradient(180deg, #2563eb, #7c3aed)",
                      borderRadius: "999px",
                    }
                  : {},
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 40,
                  justifyContent: "center",
                  color: active ? "#2563eb" : isDark ? "#94a3b8" : "#64748b",
                  mr: collapsed ? 0 : 2,
                }}
              >
                <Badge
                  variant="dot"
                  invisible={!active}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#2563eb",
                      boxShadow: isDark
                        ? "0 0 0 2px #1e293b"
                        : "0 0 0 2px #fff",
                    },
                  }}
                >
                  <IconComponent />
                </Badge>
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.9rem",
                      fontWeight: active ? 700 : 500,
                      color: active
                        ? isDark
                          ? "#e2e8f0"
                          : "#0f172a"
                        : isDark
                          ? "#cbd5e1"
                          : "#334155",
                    },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};
export default SideBarMenu;
