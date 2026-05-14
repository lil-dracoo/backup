import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
const fakeData = [
  {
    label: "Lương cơ bản",
    value: "2.9 tỷ",
    note: "Chiếm 76% quỹ lương",
  },
  {
    label: "Thưởng KPI",
    value: "540 triệu",
    note: "Tăng 11% so với kỳ trước",
  },
  {
    label: "Phụ cấp",
    value: "210 triệu",
    note: "Bao gồm xăng xe, ăn trưa",
  },
  {
    label: "Chi phí OT",
    value: "135 triệu",
    note: "Cần theo dõi thêm",
  },
];
const Summary = (props: { isDark: boolean }) => {
  const { isDark } = props;
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
          Tóm tắt lương thưởng
        </Typography>

        <Stack spacing={2} sx={{ mt: 2.5 }}>
          {fakeData.map((item) => (
            <Box
              key={item.label}
              sx={{
                p: 2,
                borderRadius: 3,
                background: isDark
                  ? "linear-gradient(180deg, rgba(51, 65, 85, 0.3), rgba(71, 85, 105, 0.2))"
                  : "linear-gradient(180deg, #f8fafc, #ffffff)",
                border: isDark
                  ? "1px solid rgba(71, 85, 105, 0.3)"
                  : "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    color: isDark ? "#cbd5e1" : "#334155",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    color: isDark ? "#e2e8f0" : "#0f172a",
                    fontWeight: 800,
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
              <Typography
                sx={{
                  mt: 0.75,
                  color: isDark ? "#94a3b8" : "#64748b",
                  fontSize: "0.85rem",
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
export default Summary;

           