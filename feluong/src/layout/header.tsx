import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "../context/themecontext";
import LeftHeader from "../components/header/leftheader";
import Search from "../components/header/search";
import ProfileSection from "../components/header/profilesection";
import Notification from "../components/header/notification";
import Theme from "../components/header/theme";
interface IHeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: IHeaderProps) => {
  const { collapsed } = props;
  const { isDark, toggleTheme } = useTheme();
  // const location = useLocation();
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: collapsed ? "calc(100% - 80px)" : "calc(100% - 280px)",
        transition: "width 0.3s ease, background-color 0.3s ease",
        backgroundColor: isDark
          ? "#0f172a"
          : "rgba(255, 255, 255, 0.35)",
        backdropFilter: "blur(5px)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        borderBottom: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(229, 231, 235, 0.3)",
      }}
    >
      <Toolbar
        sx={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          gap: 2,
        }}
      >
        {/* LEFT - PAGE NAME FIXED */}
        <LeftHeader isDark={isDark} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
          }}
        >
          {/* SEARCH */}
          <Search isDark={isDark} />

          {/* NOTIFICATION */}
          <Notification isDark={isDark} />

          {/* SETTINGS */}
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
            <SettingsIcon />
          </IconButton>

          {/* THEME TOGGLE */}
          <Theme isDark={isDark} toggleTheme={toggleTheme} />

          {/* PROFILE SECTION */}
          <ProfileSection isDark={isDark} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
