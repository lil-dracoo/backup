import { Box, Typography, Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface IHeaderSidePanelProps {
    isDark: boolean;
    selectedEmployee: any;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderSidePanel = (props : IHeaderSidePanelProps) => {
  const { isDark, selectedEmployee, setSelectedEmployee } = props;
  return (
    <Box
      sx={{
        p: 3,
        background: isDark
          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))"
          : "linear-gradient(135deg, #ffffff, #f8fafc)",
        borderBottom: isDark
          ? "1px solid rgba(100, 116, 139, 0.2)"
          : "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Box>
        {/* Employee Name and Basic Info */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.4rem",
            color: isDark ? "#e2e8f0" : "#0f172a",
            mb: 0.5,
          }}
        >
          {selectedEmployee?.hoTen}
        </Typography>
          
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={selectedEmployee?.maNhanVien}
            size="small"
            sx={{
              bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#dbeafe",
              color: isDark ? "#bfdbfe" : "#1d4ed8",
              fontWeight: 700,
            }}
          />
          <Chip
            label={selectedEmployee?.viTri}
            size="small"
            sx={{
              bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#dcfce7",
              color: isDark ? "#86efac" : "#166534",
              fontWeight: 700,
            }}
          />
        </Box>
      </Box>

      <IconButton
        onClick={() => setSelectedEmployee(null)}
        sx={{
          color: isDark ? "#cbd5e1" : "#64748b",
          "&:hover": {
            backgroundColor: isDark ? "rgba(71, 85, 105, 0.3)" : "#f1f5f9",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
export default HeaderSidePanel;
