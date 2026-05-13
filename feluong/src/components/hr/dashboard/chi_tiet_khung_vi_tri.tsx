import { Box, LinearProgress, Stack, Typography } from "@mui/material";
const roleSalaryBands = [
  { role: "HRBP Senior", level: "Grade G7", range: "32 - 45 triệu", fill: 78 },
  { role: "Recruiter", level: "Grade G5", range: "16 - 25 triệu", fill: 64 },
  {
    role: "C&B Specialist",
    level: "Grade G6",
    range: "22 - 34 triệu",
    fill: 71,
  },
  {
    role: "Talent Acquisition Lead",
    level: "Grade G8",
    range: "40 - 56 triệu",
    fill: 83,
  },
];
interface IChiTietKhungViTriProps {
    isDark: boolean;
}
const ChiTietKhungViTri = (props: IChiTietKhungViTriProps) => {
  const { isDark } = props;
  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.95rem",
          color: isDark ? "#e2e8f0" : "#0f172a",
          mb: 1.2,
        }}
      >
        Chi tiết khung vị trí
      </Typography>

      <Stack spacing={1.15}>
        {roleSalaryBands.map((row) => (
          <Box key={row.role}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.45,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: isDark ? "#cbd5e1" : "#334155",
                  fontWeight: 600,
                }}
              >
                {row.role}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: isDark ? "#94a3b8" : "#64748b",
                }}
              >
                {row.level}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={row.fill}
              sx={{
                height: 8,
                borderRadius: 999,
                backgroundColor: isDark ? "rgba(71, 85, 105, 0.4)" : "#e2e8f0",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #22c55e, #2563eb)",
                },
              }}
            />
            <Typography
              sx={{
                mt: 0.4,
                fontSize: "0.78rem",
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              Range: {row.range}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
};
export default ChiTietKhungViTri;
