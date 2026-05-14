import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
const performanceBars = [68, 74, 62, 82, 90, 77, 84, 73, 88, 95, 79, 91];
const performanceLabels = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];
interface ISalaryChangeProps {
  isDark: boolean;
  hoveredPerformanceIndex: number | null;
  setHoveredPerformanceIndex: (index: number | null) => void;
}
const SalaryChange = (props: ISalaryChangeProps) => {
  const { isDark, hoveredPerformanceIndex, setHoveredPerformanceIndex } = props;
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: isDark ? "#e2e8f0" : "#0f172a",
                fontSize: "1.1rem",
              }}
            >
              Payroll & Efficiency Trend
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: "0.9rem",
                mt: 0.25,
              }}
            >
              Biến động lương thưởng và mức hiệu quả theo tháng
            </Typography>
          </Box>
          <Chip
            label="This Month"
            size="small"
            sx={{ bgcolor: "#eff6ff", color: "#2563eb" }}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            alignItems: "end",
            gap: 1,
            height: 250,
            mt: 3,
            px: 0.5,
            pt: 4,
          }}
        >
          {hoveredPerformanceIndex !== null && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: `${(hoveredPerformanceIndex + 0.5) * (100 / performanceBars.length)}%`,
                transform: "translateX(-50%)",
                zIndex: 2,
                pointerEvents: "none",
                background: isDark
                  ? "rgba(15, 23, 42, 0.96)"
                  : "rgba(15, 23, 42, 0.92)",
                color: "#ffffff",
                borderRadius: 2,
                px: 1.2,
                py: 0.75,
                boxShadow: "0 12px 28px rgba(15, 23, 42, 0.22)",
                minWidth: 110,
                textAlign: "left",
                backdropFilter: "blur(10px)",
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
            >
              <Typography sx={{ fontSize: "0.75rem", opacity: 0.75 }}>
                {performanceLabels[hoveredPerformanceIndex]}
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>
                {performanceBars[hoveredPerformanceIndex]}%
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", opacity: 0.8 }}>
                Mức hiệu quả tháng
              </Typography>
            </Box>
          )}

          {performanceBars.map((value, index) => {
            const isHovered = hoveredPerformanceIndex === index;
            return (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  position: "relative",
                  cursor: "pointer",
                  outline: "none",
                }}
                onMouseEnter={() => setHoveredPerformanceIndex(index)}
                onMouseLeave={() => setHoveredPerformanceIndex(null)}
                onFocus={() => setHoveredPerformanceIndex(index)}
                onBlur={() => setHoveredPerformanceIndex(null)}
                tabIndex={0}
                aria-label={`Tháng ${performanceLabels[index]}: ${value}%`}
              >
                <Box
                  sx={{
                    height: `${value * 2}px`,
                    borderRadius: "12px 12px 4px 4px",
                    background:
                      index % 3 === 0
                        ? "linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)"
                        : "linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%)",
                    boxShadow: isHovered
                      ? "0 18px 36px rgba(37, 99, 235, 0.28)"
                      : "0 10px 24px rgba(37, 99, 235, 0.18)",
                    transform: isHovered
                      ? "translateY(-6px) scaleX(1.04)"
                      : "none",
                    transition: "all 0.2s ease",
                    opacity:
                      hoveredPerformanceIndex !== null && !isHovered ? 0.55 : 1,
                    transformOrigin: "bottom center",
                  }}
                />
                <Typography
                  sx={{
                    mt: 1,
                    color: isHovered
                      ? "#2563eb"
                      : isDark
                        ? "#64748b"
                        : "#94a3b8",
                    fontSize: "0.75rem",
                    fontWeight: isHovered ? 700 : 500,
                  }}
                >
                  {performanceLabels[index]}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
export default SalaryChange;
