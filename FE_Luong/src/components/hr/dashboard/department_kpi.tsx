import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
const kpiData = [
  { department: "Nhân sự", score: 86, trend: "+6%", status: "Tốt" },
  { department: "Kế toán", score: 78, trend: "+4%", status: "Ổn định" },
  { department: "Kinh doanh", score: 74, trend: "+2%", status: "Cần theo dõi" },
  { department: "Sản xuất", score: 91, trend: "+9%", status: "Xuất sắc" },
  { department: "IT", score: 82, trend: "+5%", status: "Tốt" },
];
interface IDepartmentKPIProps {
  isDark: boolean;
  hoveredKpiIndex: number | null;
  setHoveredKpiIndex: (index: number | null) => void;
}
const DepartmentKPI = (props : IDepartmentKPIProps) => {
  const { isDark, hoveredKpiIndex, setHoveredKpiIndex } = props;
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(226,232,240,0.9)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        background: isDark ? "rgba(30, 41, 59, 0.6)" : "rgba(255,255,255,0.92)",
        transition: "all 0.3s ease",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Typography
          sx={{
            fontWeight: 700,
            color: isDark ? "#e2e8f0" : "#0f172a",
            fontSize: "1.1rem",
          }}
        >
          KPI các phòng ban
        </Typography>
        <Typography
          sx={{
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "0.9rem",
            mt: 0.25,
            mb: 2,
          }}
        >
          Đánh giá hiệu suất theo tháng để theo dõi thưởng và điều chỉnh nhân
          sự.
        </Typography>

        <Box sx={{ display: "grid", gap: 1.5 }}>
          {kpiData.map((item, index) => {
            const isHovered = hoveredKpiIndex === index;
            return (
              <Box
                key={item.department}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 2fr 0.7fr 0.8fr",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 3,
                  backgroundColor: isDark ? "rgba(51, 65, 85, 0.3)" : "#f8fafc",
                  border: isHovered
                    ? "1px solid rgba(37, 99, 235, 0.45)"
                    : isDark
                      ? "1px solid rgba(71, 85, 105, 0.3)"
                      : "1px solid #e2e8f0",
                  boxShadow: isHovered
                    ? "0 14px 28px rgba(37, 99, 235, 0.12)"
                    : "none",
                  transform: isHovered ? "translateY(-2px)" : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredKpiIndex(index)}
                onMouseLeave={() => setHoveredKpiIndex(null)}
                onFocus={() => setHoveredKpiIndex(index)}
                onBlur={() => setHoveredKpiIndex(null)}
                tabIndex={0}
                aria-label={`${item.department}: ${item.score}%`}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: isDark ? "#cbd5e1" : "#0f172a",
                  }}
                >
                  {item.department}
                </Typography>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.score}
                    sx={{
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: isDark
                        ? "rgba(71, 85, 105, 0.4)"
                        : "#e2e8f0",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 999,
                        background:
                          item.score >= 85
                            ? "linear-gradient(90deg, #2563eb, #14b8a6)"
                            : "linear-gradient(90deg, #60a5fa, #3b82f6)",
                        boxShadow: isHovered
                          ? "0 0 18px rgba(37, 99, 235, 0.35)"
                          : "none",
                        transition: "all 0.2s ease",
                      },
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#cbd5e1" : "#0f172a",
                    textAlign: "right",
                  }}
                >
                  {item.score}%
                </Typography>
                <Typography
                  sx={{
                    textAlign: "right",
                    color: "#16a34a",
                    fontWeight: 600,
                  }}
                >
                  {item.trend}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
export default DepartmentKPI;
