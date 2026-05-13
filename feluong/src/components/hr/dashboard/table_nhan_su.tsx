import { Box,  Stack, Typography } from "@mui/material";
interface ITableNhanSuProps {
    isDark: boolean;
    filteredEmployees : any[];
}
const TableNhanSu = (props: ITableNhanSuProps) => {
    const { isDark, filteredEmployees } = props;
    return (
        <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: 980 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "1.3fr 1fr 1fr 0.8fr 0.8fr 0.8fr 0.7fr 0.8fr",
                  gap: 1.2,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: isDark
                    ? "rgba(51, 65, 85, 0.45)"
                    : "#f8fafc",
                  border: isDark
                    ? "1px solid rgba(71, 85, 105, 0.35)"
                    : "1px solid #e2e8f0",
                  mb: 1,
                }}
              >
                {[
                  "Nhân sự",
                  "Phòng ban",
                  "Kỳ lương",
                  "Vị trí",
                  "Năng lực",
                  "Hiệu suất",
                  "KPI",
                  "Tổng",
                ].map((col) => (
                  <Typography
                    key={col}
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: isDark ? "#cbd5e1" : "#334155",
                    }}
                  >
                    {col}
                  </Typography>
                ))}
              </Box>

              <Stack spacing={1}>
                {filteredEmployees.map((item) => {
                  const total =
                    item.positionPay + item.personPay + item.performancePay;
                  return (
                    <Box
                      key={`${item.name}-${item.period}`}
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "1.3fr 1fr 1fr 0.8fr 0.8fr 0.8fr 0.7fr 0.8fr",
                        gap: 1.2,
                        alignItems: "center",
                        px: 1.5,
                        py: 1.2,
                        borderRadius: 2,
                        background: isDark
                          ? "linear-gradient(180deg, rgba(51, 65, 85, 0.32), rgba(71, 85, 105, 0.2))"
                          : "linear-gradient(180deg, #ffffff, #f8fafc)",
                        border: isDark
                          ? "1px solid rgba(71, 85, 105, 0.28)"
                          : "1px solid #e2e8f0",
                      }}
                    >
                      <Typography
                        sx={{
                          color: isDark ? "#e2e8f0" : "#0f172a",
                          fontWeight: 600,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: isDark ? "#cbd5e1" : "#334155",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.department}
                      </Typography>
                      <Typography
                        sx={{
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.period}
                      </Typography>
                      <Typography
                        sx={{
                          color: isDark ? "#bfdbfe" : "#1d4ed8",
                          fontWeight: 600,
                        }}
                      >
                        {item.positionPay.toFixed(1)}tr
                      </Typography>
                      <Typography
                        sx={{
                          color: isDark ? "#c4b5fd" : "#6d28d9",
                          fontWeight: 600,
                        }}
                      >
                        {item.personPay.toFixed(1)}tr
                      </Typography>
                      <Typography
                        sx={{
                          color: isDark ? "#a7f3d0" : "#047857",
                          fontWeight: 600,
                        }}
                      >
                        {item.performancePay.toFixed(1)}tr
                      </Typography>
                      <Typography
                        sx={{
                          color:
                            item.kpi < 75
                              ? "#f59e0b"
                              : isDark
                                ? "#e2e8f0"
                                : "#0f172a",
                          fontWeight: 700,
                        }}
                      >
                        {item.kpi}%
                      </Typography>
                      <Typography
                        sx={{
                          color: isDark ? "#e2e8f0" : "#0f172a",
                          fontWeight: 800,
                        }}
                      >
                        {total.toFixed(1)}tr
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Box>
    )
}
export default TableNhanSu;