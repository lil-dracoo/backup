import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/themecontext";
import Sidebar from "./sidebar";
import Header from "./header";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: isDark ? "#0f172a" : "#f8fafc",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flexGrow: 1,
          background: isDark ? "#0f172a" : "#FFFFFF",
          overflow: "hidden",
          transition: "background 0.3s ease",
        }}
      >
        {/* HEADER */}
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* CONTENT */}
        <Box
          data-scrollable-content
          sx={{
            mt: "70px",
            p: 3,
            height: "calc(100vh - 70px)",
            overflowY: "auto",
            background: isDark
              ? "linear-gradient(135deg, #0f172a 0%, #1a2442 100%)"
              : "radial-gradient(circle at top left, #FFFFFF, transparent 30%)",
            transition: "background 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
