import { Drawer } from "@mui/material";
import { useAuth } from "../context/authcontext";
import { useTheme } from "../context/themecontext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideBarHeader from "../components/sidebar/sidebarheader";
import SideBarLogout from "../components/sidebar/sidebarlogout";
import SideBarMenu from "../components/sidebar/sidebarmenu";
import { MenuConfig }  from "../components/config/menuconfig";

interface LoginButtonProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = (props: LoginButtonProps) => {
  const { collapsed, setCollapsed } = props;
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation(); // Thêm useLocation để biết đường dẫn hiện tại

  useEffect(() => {
    if (user?.role) {
      setMenuItems(MenuConfig[user.role] || []);
    }
  }, [user?.role]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 80 : 280,
          boxSizing: "border-box",
          position: "fixed",
          transition:
            "width 0.3s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          overflowX: "hidden",
          backgroundColor: isDark ? "#0f172a" : "#f8fafc",
          background: isDark ? "#0f172a" : "#f8fafc",
          backgroundImage: "none",
          color: isDark ? "#e2e8f0" : "#1e293b",
          borderRight: isDark
            ? "1px solid rgba(71, 85, 105, 0.3)"
            : "1px solid rgba(226, 232, 240, 0.9)",
          boxShadow: "6px 0 24px rgba(15, 23, 42, 0.06)",
          top: 0,
          left: 0,
          height: "100vh",
        },
      }}
    >
      {/* Header */}
      <SideBarHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isDark={isDark}
      />

      {/* Menu Items */}
      <SideBarMenu
        menuItems={menuItems}
        collapsed={collapsed}
        isDark={isDark}
        navigate={navigate}
      />

      {/* Logout Button */}
      <SideBarLogout collapsed={collapsed} isDark={isDark} />
    </Drawer>
  );
};

export default SideBar;
