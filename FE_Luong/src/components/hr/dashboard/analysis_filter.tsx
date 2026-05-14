import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
interface IAnalysisFilterProps {
  isDark: boolean;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  departmentFilters: string[];
  selectedPayrollPeriod: string;
  setSelectedPayrollPeriod: React.Dispatch<React.SetStateAction<string>>;
  periodFilters: string[];
}
const AnalysisFilter = (props: IAnalysisFilterProps) => {
  const {
    isDark,
    selectedDepartment,
    setSelectedDepartment,
    selectedPayrollPeriod,
    setSelectedPayrollPeriod,
    departmentFilters,
    periodFilters,
  } = props;
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
          }}
        >
          Bộ lọc phân tích lương
        </Typography>
        
        <Typography
          sx={{
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "0.9rem",
            mt: 0.35,
            mb: 1.3,
          }}
        >
        </Typography>

        <Typography
          sx={{
            fontSize: "0.82rem",
            color: isDark ? "#94a3b8" : "#64748b",
            mb: 0.7,
          }}
        >
          Phòng ban
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 1.5, rowGap: 1, flexWrap: "wrap" }}
        >
          {departmentFilters.map((dept) => (
            <Chip
              key={dept}
              label={dept}
              onClick={() => setSelectedDepartment(dept)}
              sx={{
                fontWeight: 600,
                bgcolor:
                  selectedDepartment === dept
                    ? isDark
                      ? "rgba(37, 99, 235, 0.24)"
                      : "#dbeafe"
                    : isDark
                      ? "rgba(51, 65, 85, 0.5)"
                      : "#f1f5f9",
                color:
                  selectedDepartment === dept
                    ? isDark
                      ? "#bfdbfe"
                      : "#1d4ed8"
                    : isDark
                      ? "#cbd5e1"
                      : "#334155",
                border:
                  selectedDepartment === dept
                    ? "1px solid rgba(37, 99, 235, 0.35)"
                    : "1px solid transparent",
              }}
            />
          ))}
        </Stack>

        <Typography
          sx={{
            fontSize: "0.82rem",
            color: isDark ? "#94a3b8" : "#64748b",
            mb: 0.7,
          }}
        >
          Kỳ lương
        </Typography>
        <Stack direction="row" spacing={1} sx={{ rowGap: 1, flexWrap: "wrap" }}>
          {periodFilters.map((period) => (
            <Chip
              key={period}
              label={period}
              onClick={() => setSelectedPayrollPeriod(period)}
              sx={{
                fontWeight: 600,
                bgcolor:
                  selectedPayrollPeriod === period
                    ? isDark
                      ? "rgba(14, 165, 233, 0.2)"
                      : "#dbeafe"
                    : isDark
                      ? "rgba(51, 65, 85, 0.5)"
                      : "#f1f5f9",
                color:
                  selectedPayrollPeriod === period
                    ? isDark
                      ? "#bae6fd"
                      : "#1d4ed8"
                    : isDark
                      ? "#cbd5e1"
                      : "#334155",
                border:
                  selectedPayrollPeriod === period
                    ? "1px solid rgba(14, 165, 233, 0.35)"
                    : "1px solid transparent",
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
export default AnalysisFilter;
