export const getSidePanelStyles = (isDark: boolean) => ({
  position: "fixed",
  right: 0,
  top: 0,
  height: "100vh",
  width: { xs: "100%", md: "55%" },
  backgroundColor: isDark
    ? "#0f172a"
    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  background: isDark
    ? "linear-gradient(180deg, #0f172a 0%, #1a1f2e 50%, #0f172a 100%)"
    : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  borderLeft: isDark
    ? "1px solid rgba(100, 116, 139, 0.3)"
    : "1px solid #e2e8f0",
  boxShadow: isDark
    ? "-12px 0 50px rgba(0, 0, 0, 0.5)"
    : "-12px 0 40px rgba(0, 0, 0, 0.08)",
  overflowY: "auto",
  scrollBehavior: "smooth",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: isDark ? "rgba(30, 41, 59, 0.3)" : "#f1f5f9",
  },
  "&::-webkit-scrollbar-thumb": {
    background: isDark ? "rgba(100, 116, 139, 0.6)" : "#cbd5e1",
    borderRadius: "4px",
    "&:hover": {
      background: isDark ? "rgba(100, 116, 139, 0.8)" : "#94a3b8",
    },
  },
});
