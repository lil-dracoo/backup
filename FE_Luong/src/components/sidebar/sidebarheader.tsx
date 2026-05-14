import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
interface SideBarHeader {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
}
const SideBarHeader = (props: SideBarHeader) => {
  const { collapsed, setCollapsed , isDark } = props;
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Box
      sx={{
        p: 2.25,
        display: "flex",
        justifyContent: collapsed ? "center" : "space-between",
        alignItems: "center",
        borderBottom: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(226, 232, 240, 0.9)",
        minHeight: 64,
        background: isDark
          ? "linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(99, 102, 241, 0.02))"
          : "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(99,102,241,0.03))",
      }}
    >
      {!collapsed && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: isDark
              ? "linear-gradient(135deg, #e2e8f0, #60a5fa)"
              : "linear-gradient(135deg, #0f172a, #2563eb)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Payroll System
        </Typography>
      )}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          color: isDark ? "#94a3b8" : "#64748b",
          backgroundColor: isDark
            ? "rgba(51, 65, 85, 0.6)"
            : "rgba(255,255,255,0.8)",
          border: isDark
            ? "1px solid rgba(71, 85, 105, 0.3)"
            : "1px solid rgba(226, 232, 240, 0.9)",
          width: 36,
          height: 36,
          transition: "all 0.2s ease",
          "&:hover": {
            color: "#2563eb",
            backgroundColor: isDark ? "rgba(71, 85, 105, 0.8)" : "#ffffff",
            boxShadow: "0 4px 12px rgba(37,99,235,0.12)",
          },
        }}
      >
        {collapsed ? <ChevronRightSharpIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );
};
export default SideBarHeader;
