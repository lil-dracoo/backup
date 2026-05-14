import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface searchProps {
  isDark: boolean;
}
const Search = (props: searchProps) => {
  const { isDark } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: isDark
          ? "rgba(51, 65, 85, 0.8)"
          : "rgba(243, 244, 246, 0.8)",
        borderRadius: "14px",
        px: 2,
        height: "44px",
        width: "280px",
        minWidth: "280px",
        flexShrink: 0,
        transition: "all 0.2s ease",
        "&:focus-within": {
          boxShadow: "0 0 0 3px rgba(37,99,235,0.1)",
        },
      }}
    >
      <SearchIcon
        sx={{
          color: isDark ? "#94a3b8" : "#6b7280",
          mr: 1,
          fontSize: 20,
          flexShrink: 0,
        }}
      />

      <InputBase
        placeholder="Search..."
        sx={{
          width: "100%",
          minWidth: 0,
          color: isDark ? "#e2e8f0" : "#111827",
          fontSize: "14px",
          "& ::placeholder": {
            color: isDark ? "#64748b" : "#9ca3af",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};
export default Search;
