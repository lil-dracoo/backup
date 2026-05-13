import { Box, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
const HrMetrics = (props : {isDark : boolean}) => {
    const {isDark} = props;
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
        <Typography
          sx={{
            fontWeight: 700,
            color: isDark ? "#e2e8f0" : "#0f172a",
            fontSize: "1.1rem",
          }}
        >
          Các chỉ số HR nổi bật
        </Typography>
        <Stack spacing={2.2} sx={{ mt: 2.5 }}>
          {[
            { label: "Nhân sự đạt KPI", value: 84, color: "#2563eb" },
            { label: "Cân bằng quỹ lương", value: 72, color: "#8b5cf6" },
            { label: "Thưởng đúng hạn", value: 95, color: "#0ea5e9" },
            {
              label: "Tỷ lệ duyệt tăng lương",
              value: 66,
              color: "#14b8a6",
            },
          ].map((item) => (
            <Box key={item.label}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.8,
                }}
              >
                <Typography
                  sx={{
                    color: isDark ? "#cbd5e1" : "#334155",
                    fontSize: "0.92rem",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography sx={{ color: item.color, fontWeight: 700 }}>
                  {item.value}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: isDark
                    ? "rgba(71, 85, 105, 0.4)"
                    : "#e2e8f0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${item.color}, #60a5fa)`,
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
export default HrMetrics;
