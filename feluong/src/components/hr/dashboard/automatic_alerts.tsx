import { Card, CardContent, Typography, Alert, Stack, Chip } from "@mui/material";
interface IAnalysisFilterProps {
  isDark: boolean;
  avgKpi: number;
  filteredEmployees: any[];
  payoutRiskAlerts: any[];
}
const AutomaticAlerts = (props: IAnalysisFilterProps) => {
  const { isDark, avgKpi, filteredEmployees, payoutRiskAlerts } = props;
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: isDark
          ? "1px solid rgba(71, 85, 105, 0.3)"
          : "1px solid rgba(226,232,240,0.9)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        background: isDark ? "rgba(30, 41, 59, 0.6)" : "rgba(255,255,255,0.92)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: isDark ? "#e2e8f0" : "#0f172a",
            fontSize: "1.1rem",
            mb: 1,
          }}
        >
          Cảnh báo tự động
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Chip
            label={`${filteredEmployees.length} nhân sự`}
            sx={{
              bgcolor: isDark ? "rgba(51, 65, 85, 0.6)" : "#f1f5f9",
              color: isDark ? "#cbd5e1" : "#334155",
              fontWeight: 700,
            }}
          />
          <Chip
            label={`KPI TB ${avgKpi}%`}
            sx={{
              bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#dbeafe",
              color: isDark ? "#bfdbfe" : "#1d4ed8",
              fontWeight: 700,
            }}
          />
        </Stack>

        {payoutRiskAlerts.length === 0 ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            Không có trường hợp rủi ro trong bộ lọc hiện tại.
          </Alert>
        ) : (
          <Stack spacing={1}>
            {payoutRiskAlerts.map((item) => (
              <Alert
                key={item.name}
                severity="warning"
                sx={{ borderRadius: 2 }}
              >
                {item.name} - KPI {item.kpi}% nhưng chi trả theo hiệu suất đang
                cao.
              </Alert>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
export default AutomaticAlerts;
