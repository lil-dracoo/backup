import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
interface ThemeProps {
  isDark: boolean;
  toggleTheme: () => void;
}
const Theme = (props : ThemeProps) =>{
    const {isDark, toggleTheme} = props;
    return (
        <IconButton
            onClick={toggleTheme}
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
            {isDark ? <BrightnessHighIcon /> : <Brightness4Icon />}
          </IconButton>
    )
}
export default Theme;