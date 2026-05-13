import { CardContent, Typography } from "@mui/material";
import TableNhanSu from "./table_nhan_su";
interface INhanSuChiTietProps {
  isDark: boolean;
  filteredEmployees: any[];
}
const NhanSuChiTiet = (props: INhanSuChiTietProps) => {
  const { isDark, filteredEmployees } = props;
  return (
    <CardContent sx={{ p: 3 }}>
      <Typography
        sx={{
          fontWeight: 700,
          color: isDark ? "#e2e8f0" : "#0f172a",
          fontSize: "1.1rem",
        }}
      >
        Bảng nhân sự chi tiết
      </Typography>
      <Typography
        sx={{
          color: isDark ? "#94a3b8" : "#64748b",
          fontSize: "0.9rem",
          mt: 0.25,
          mb: 1.8,
        }}
      >
        Chi tiết cấu phần theo từng nhân sự, có KPI để đối chiếu hiệu quả chi
        trả.
      </Typography>

      <TableNhanSu isDark={isDark} filteredEmployees={filteredEmployees} />
    </CardContent>
  );
};
export default NhanSuChiTiet;
