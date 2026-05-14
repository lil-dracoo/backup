import { Card as MuiCard, CardContent, Typography } from "@mui/material";
const payrollHighlights = [
  { label: "Tổng nhân viên", value: "450", helper: "+12 tháng này" },
  {
    label: "Quỹ lương tháng",
    value: "3.8 tỷ",
    helper: "+6.2% so với tháng trước",
  },
  {
    label: "Thưởng hiệu suất",
    value: "285 triệu",
    helper: "92% phòng ban đủ điều kiện",
  },
  { label: "Tỷ lệ nghỉ việc", value: "1.8%", helper: "Giảm 0.4%" },
];
const CardHR = (props : {isDark : boolean}) => {
  const { isDark } = props;
  return (
    <>
      {payrollHighlights.map((item) => (
        <MuiCard
          key={item.label}
          sx={{
            borderRadius: 4,
            border: isDark
              ? "1px solid rgba(71, 85, 105, 0.3)"
              : "1px solid rgba(226,232,240,0.9)",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
            background: isDark
              ? "rgba(30, 41, 59, 0.6)"
              : "rgba(255,255,255,0.9)",
            transition: "all 0.3s ease",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Typography
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: "0.9rem",
              }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: 800,
                color: isDark ? "#e2e8f0" : "#0f172a",
                mt: 1,
              }}
            >
              {item.value}
            </Typography>
            <Typography
              sx={{ color: "#16a34a", fontSize: "0.85rem", mt: 0.75 }}
            >
              {item.helper}
            </Typography>
          </CardContent>
        </MuiCard>
      ))}
    </>
  );
};
export default CardHR;
