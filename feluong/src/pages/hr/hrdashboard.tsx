import { Box, Card } from "@mui/material";
import { useMemo, useState } from "react";
import { useTheme } from "../../context/themecontext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/hr/dashboard/header";
import AnalysisFilter from "../../components/hr/dashboard/analysis_filter";
import AutomaticAlerts from "../../components/hr/dashboard/automatic_alerts";
import BanDo from "../../components/hr/dashboard/ban_do_cau_hinh_luong";
import Action from "../../components/hr/dashboard/action";
import CardHR from "../../components/hr/dashboard/card";
import NhanSuChiTiet from "../../components/hr/dashboard/nhan_su_chi_tiet";
import SalaryChange from "../../components/hr/dashboard/salary_change";
import HrMetrics from "../../components/hr/dashboard/hr_metrics";
import DepartmentKPI from "../../components/hr/dashboard/department_kpi";
import Summary from "../../components/hr/dashboard/summary";

{/* DataFake */}
const payrollPeriods = ["Tháng 04/2026", "Tháng 05/2026", "Quý 2/2026"];
const employeeCompensation = [
  {
    name: "Nguyễn Trúc Linh",
    department: "Nhân sự",
    period: "Tháng 05/2026",
    positionPay: 21.5,
    personPay: 8.2,
    performancePay: 11.8,
    kpi: 72,
  },
  {
    name: "Phạm Hoàng Duy",
    department: "Kinh doanh",
    period: "Tháng 05/2026",
    positionPay: 18.3,
    personPay: 5.4,
    performancePay: 12.5,
    kpi: 69,
  },
  {
    name: "Lê Minh Anh",
    department: "IT",
    period: "Tháng 05/2026",
    positionPay: 25.4,
    personPay: 9.7,
    performancePay: 8.1,
    kpi: 84,
  },
  {
    name: "Võ Gia Hân",
    department: "Kế toán",
    period: "Tháng 04/2026",
    positionPay: 16.8,
    personPay: 6.1,
    performancePay: 9.9,
    kpi: 74,
  },
  {
    name: "Trần Hữu Nam",
    department: "Sản xuất",
    period: "Quý 2/2026",
    positionPay: 19.2,
    personPay: 7.6,
    performancePay: 11.1,
    kpi: 71,
  },
  {
    name: "Đinh Mỹ Ngọc",
    department: "Nhân sự",
    period: "Quý 2/2026",
    positionPay: 20.6,
    personPay: 7.4,
    performancePay: 6.5,
    kpi: 88,
  },
];

const HRDashboard = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("Tất cả");
  const [selectedPayrollPeriod, setSelectedPayrollPeriod] =
    useState<string>("Tất cả");
  const [hoveredPerformanceIndex, setHoveredPerformanceIndex] = useState<
    number | null
  >(null);
  const [hoveredKpiIndex, setHoveredKpiIndex] = useState<number | null>(null);

  const departmentFilters = useMemo(
    () => [
      "Tất cả",
      ...Array.from(
        new Set(employeeCompensation.map((item) => item.department)),
      ),
    ],
    [],
  );

  {
    /* UseMemo là một hook dùng để ghi nhớ giá trị đã tính toán  */
  }
  const periodFilters = useMemo(() => ["Tất cả", ...payrollPeriods], []);

  const filteredEmployees = useMemo(() => {
    return employeeCompensation.filter((item) => {
      const byDepartment =
        selectedDepartment === "Tất cả" ||
        item.department === selectedDepartment;
      const byPeriod =
        selectedPayrollPeriod === "Tất cả" ||
        item.period === selectedPayrollPeriod;
      return byDepartment && byPeriod;
    });
  }, [selectedDepartment, selectedPayrollPeriod]);

  const avgKpi = useMemo(() => {
    if (filteredEmployees.length === 0) return 0;
    return Math.round(
      filteredEmployees.reduce((sum, item) => sum + item.kpi, 0) /
        filteredEmployees.length,
    );
  }, [filteredEmployees]);

  const payoutRiskAlerts = useMemo(() => {
    return filteredEmployees.filter((item) => {
      const totalPay = item.positionPay + item.personPay + item.performancePay;
      const performanceShare = (item.performancePay / totalPay) * 100;
      return item.kpi < 75 && performanceShare > 30;
    });
  }, [filteredEmployees]);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Header isDark={isDark} />

      {/*Bộ lọc phân tích lương và cảnh báo */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
          },
          alignItems: "stretch",
          gridAutoRows: "1fr",
          "& > .MuiCard-root": {
            height: "100%",
            minHeight: { xs: "auto", md: 320 },
            display: "flex",
            flexDirection: "column",
          },
          "& > .MuiCard-root > .MuiCardContent-root": {
            height: "100%",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {/*Bộ lọc phân tích lương*/}
        <AnalysisFilter
          isDark={isDark}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          departmentFilters={departmentFilters}
          selectedPayrollPeriod={selectedPayrollPeriod}
          setSelectedPayrollPeriod={setSelectedPayrollPeriod}
          periodFilters={periodFilters}
        />

        {/*Cảnh báo tự động*/}
        <AutomaticAlerts
          isDark={isDark}
          avgKpi={avgKpi}
          filteredEmployees={filteredEmployees}
          payoutRiskAlerts={payoutRiskAlerts}
        />
      </Box>

      {/*Bản đồ cấu phần và hành động nhanh*/}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
          },
          alignItems: "stretch",
          gridAutoRows: "1fr",
          "& > .MuiCard-root": {
            height: "100%",
            minHeight: { xs: "auto", md: 430 },
            display: "flex",
            flexDirection: "column",
          },
          "& > .MuiCard-root > .MuiCardContent-root": {
            height: "100%",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {/*Bản đồ cấu phần lương*/}
        <BanDo isDark={isDark} />

        {/*Hành động nhanh*/}
        <Action isDark={isDark} navigate={navigate} />
      </Box>

      {/*4 card*/}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          alignItems: "stretch",
          gridAutoRows: "1fr",
          "& > .MuiCard-root": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          "& > .MuiCard-root > .MuiCardContent-root": {
            height: "100%",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <CardHR isDark={isDark} />
      </Box>

      {/*Bảng nhân sự chi tiết*/}
      <Card
        sx={{
          borderRadius: 4,
          border: isDark
            ? "1px solid rgba(71, 85, 105, 0.3)"
            : "1px solid rgba(226,232,240,0.9)",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
          background: isDark
            ? "rgba(30, 41, 59, 0.6)"
            : "rgba(255,255,255,0.92)",
          mb: 3,
        }}
      >
        <NhanSuChiTiet isDark={isDark} filteredEmployees={filteredEmployees} />
      </Card>

      {/*Biến động lương và các chỉ số HR*/}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
          },
          alignItems: "stretch",
          gridAutoRows: "1fr",
          "& > .MuiCard-root": {
            height: "100%",
            minHeight: { xs: "auto", md: 420 },
            display: "flex",
            flexDirection: "column",
          },
          "& > .MuiCard-root > .MuiCardContent-root": {
            height: "100%",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <SalaryChange
          isDark={isDark}
          hoveredPerformanceIndex={hoveredPerformanceIndex}
          setHoveredPerformanceIndex={setHoveredPerformanceIndex}
        />

        <HrMetrics isDark={isDark} />
      </Box>

      {/*KPI các phòng ban và tóm tắt lương thưởng*/}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
          },
          alignItems: "stretch",
          gridAutoRows: "1fr",
          "& > .MuiCard-root": {
            height: "100%",
            minHeight: { xs: "auto", md: 440 },
            display: "flex",
            flexDirection: "column",
          },
          "& > .MuiCard-root > .MuiCardContent-root": {
            height: "100%",
          },
          gap: 2,
        }}
      >
        <DepartmentKPI
          isDark={isDark}
          hoveredKpiIndex={hoveredKpiIndex}
          setHoveredKpiIndex={setHoveredKpiIndex}
        />

        <Summary isDark={isDark} />
      </Box>
    </Box>
  );
};

export default HRDashboard;
