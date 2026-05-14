import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
const compensationBreakdown = [
  {
    key: "Theo vị trí",
    ratio: 52,
    value: "1.98 tỷ",
    note: "Theo khung giá trị vị trí và grade lương",
  },
  {
    key: "Theo năng lực",
    ratio: 21,
    value: "798 triệu",
    note: "Phụ thuộc năng lực, thâm niên, chứng chỉ",
  },
  {
    key: "Theo hiệu suất",
    ratio: 27,
    value: "1.02 tỷ",
    note: "Gắn với hiệu suất thực tế và KPI đạt được",
  },
];
interface IBanDoProps {
  isDark: boolean;
}
const BanDo = (props: IBanDoProps) => {
  const { isDark } = props;
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(226,232,240,0.9)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        background: isDark
          ? "linear-gradient(130deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.85))"
          : "linear-gradient(130deg, rgba(255,255,255,0.96), rgba(239,246,255,0.9))",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            gap: 1.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.15rem",
                color: isDark ? "#e2e8f0" : "#0f172a",
              }}
            >
              Bản đồ cấu phần lương
            </Typography>
            <Typography
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: "0.9rem",
              }}
            >
              Theo dõi tỷ trọng chi trả theo vị trí, năng lực và hiệu suất để
              tối ưu ngân sách.
            </Typography>
          </Box>
          <Chip
            label="Comp Mix"
            size="small"
            sx={{
              bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#dbeafe",
              color: isDark ? "#bfdbfe" : "#1d4ed8",
              fontWeight: 700,
            }}
          />
        </Box>

        <Stack spacing={2}>
          {compensationBreakdown.map((item) => (
            <Box key={item.key}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.8,
                }}
              >
                <Typography
                  sx={{
                    color: isDark ? "#cbd5e1" : "#334155",
                    fontWeight: 600,
                  }}
                >
                  {item.key}
                </Typography>
                <Typography
                  sx={{
                    color: isDark ? "#e2e8f0" : "#0f172a",
                    fontWeight: 800,
                  }}
                >
                  {item.value} ({item.ratio}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.ratio}
                sx={{
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: isDark
                    ? "rgba(71, 85, 105, 0.4)"
                    : "#dbeafe",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #2563eb, #06b6d4)",
                  },
                }}
              />
              <Typography
                sx={{
                  mt: 0.65,
                  fontSize: "0.8rem",
                  color: isDark ? "#94a3b8" : "#64748b",
                }}
              >
                {item.note}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
export default BanDo;
