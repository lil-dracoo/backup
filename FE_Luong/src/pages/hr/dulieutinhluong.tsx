import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Chip,
  Grid,
  Paper,
  Avatar,
  Stack,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  CardGiftcard,
  BeachAccess,
  Timeline,
  Receipt,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Visibility,
  Work,
  AccessTime,
  Close,
  Business,
  Assessment,
  Warning,
  Payment,
  People,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useTheme } from "../../context/themecontext";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// Danh sách nhân viên
const employeeList = [
  { maNV: "NV001", hoTen: "Nguyễn Trúc Linh", phongBan: "Nhân sự", chucVu: "HRBP Senior" },
  { maNV: "NV002", hoTen: "Phạm Hoàng Duy", phongBan: "Nhân sự", chucVu: "Recruiter" },
  { maNV: "NV003", hoTen: "Lê Minh Anh", phongBan: "Nhân sự", chucVu: "C&B Specialist" },
  { maNV: "NV004", hoTen: "Võ Gia Hân", phongBan: "Kế toán", chucVu: "Kế toán" },
  { maNV: "NV005", hoTen: "Trần Hữu Nam", phongBan: "Sản xuất", chucVu: "Quản lý sản xuất" },
  { maNV: "NV006", hoTen: "Nguyễn Thị Mai", phongBan: "Marketing", chucVu: "Marketing Manager" },
  { maNV: "NV007", hoTen: "Trần Văn Đức", phongBan: "Công nghệ", chucVu: "IT Support" },
  { maNV: "NV008", hoTen: "Phạm Thị Lan", phongBan: "Kinh doanh", chucVu: "Business Analyst" },
  { maNV: "NV009", hoTen: "Hoàng Văn Nam", phongBan: "Sản phẩm", chucVu: "Product Owner" },
  { maNV: "NV010", hoTen: "Đặng Thúy Hằng", phongBan: "Công nghệ", chucVu: "QA Engineer" },
];

// Hàm tạo dữ liệu đầu vào cho bảng lương theo tháng
const generatePayrollInputData = (year: number, month: number) => {
  const isTetMonth = (month === 1);
  const isSummer = (month >= 5 && month <= 7);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return employeeList.map((emp, idx) => {
    // Chấm công
    const ngayDiLam = isTetMonth ? 16 + Math.floor(Math.random() * 6) : 20 + Math.floor(Math.random() * 4);
    const ngayNghiPhep = Math.floor(Math.random() * 3);
    const ngayNghiKhongPhep = isTetMonth ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 1);
    const ngayDiMuon = Math.floor(Math.random() * 4);
    const ngayVeSom = Math.floor(Math.random() * 3);
    const ngayCong = Math.min(ngayDiLam, daysInMonth);
    const tyLeChuyenCan = Math.round((ngayCong / 22) * 100);
    
    // OT
    const otNgayThuong = isSummer ? 4 + Math.floor(Math.random() * 12) : 2 + Math.floor(Math.random() * 8);
    const otCuoiTuan = Math.floor(Math.random() * 8);
    const otNgayLe = isTetMonth ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 2);
    const tongGioOT = otNgayThuong + otCuoiTuan + otNgayLe;
    
    // KPI
    const kpiSanLuong = 60 + Math.floor(Math.random() * 35);
    const kpiChatLuong = 65 + Math.floor(Math.random() * 30);
    const kpiTienDo = 55 + Math.floor(Math.random() * 40);
    const kpiTinhThan = 70 + Math.floor(Math.random() * 25);
    const kpiTong = Math.round((kpiSanLuong + kpiChatLuong + kpiTienDo + kpiTinhThan) / 4);
    
    // Thưởng
    let thuongKPI = 0;
    if (kpiTong >= 90) thuongKPI = 5000000;
    else if (kpiTong >= 80) thuongKPI = 3000000;
    else if (kpiTong >= 70) thuongKPI = 1500000;
    else if (kpiTong >= 60) thuongKPI = 500000;
    const thuongChuyenCan = tyLeChuyenCan >= 95 ? 1000000 : tyLeChuyenCan >= 90 ? 500000 : 0;
    const thuongSangKien = Math.random() > 0.85 ? 2000000 : 0;
    const thuongKhac = Math.random() > 0.9 ? 1000000 : 0;
    const tongThuong = thuongKPI + thuongChuyenCan + thuongSangKien + thuongKhac;
    
    // Phạt
    const phatDiMuon = ngayDiMuon * 200000;
    const phatVeSom = ngayVeSom * 100000;
    const phatDiLamKhongPhep = ngayNghiKhongPhep * 300000;
    const phatViPhamKhac = Math.random() > 0.92 ? 500000 : 0;
    const tongPhat = phatDiMuon + phatVeSom + phatDiLamKhongPhep + phatViPhamKhac;
    
    // Khấu trừ
    const khauTruBHXH = Math.floor(2500000 + Math.random() * 2000000);
    const khauTruBHYT = Math.floor(khauTruBHXH * 0.1875);
    const khauTruBHTN = Math.floor(khauTruBHXH * 0.125);
    const khauTruDoanPhi = 100000;
    const khauTruTamUng = Math.random() > 0.7 ? 5000000 : 0;
    const tongKhauTru = khauTruBHXH + khauTruBHYT + khauTruBHTN + khauTruDoanPhi + khauTruTamUng;
    
    // Phụ cấp
    const phuCapXangXe = 500000;
    const phuCapDienThoai = 300000;
    const phuCapAnTrua = ngayCong * 25000;
    const phuCapDocHai = emp.phongBan === "Sản xuất" ? 1000000 : 0;
    const phuCapKhac = Math.random() > 0.85 ? 500000 : 0;
    const tongPhuCap = phuCapXangXe + phuCapDienThoai + phuCapAnTrua + phuCapDocHai + phuCapKhac;
    
    return {
      ...emp,
      ngayCong,
      ngayDiLam,
      ngayNghiPhep,
      ngayNghiKhongPhep,
      ngayDiMuon,
      ngayVeSom,
      tyLeChuyenCan,
      otNgayThuong,
      otCuoiTuan,
      otNgayLe,
      tongGioOT,
      kpiSanLuong,
      kpiChatLuong,
      kpiTienDo,
      kpiTinhThan,
      kpiTong,
      thuongKPI,
      thuongChuyenCan,
      thuongSangKien,
      thuongKhac,
      tongThuong,
      phatDiMuon,
      phatVeSom,
      phatDiLamKhongPhep,
      phatViPhamKhac,
      tongPhat,
      khauTruBHXH,
      khauTruBHYT,
      khauTruBHTN,
      khauTruDoanPhi,
      khauTruTamUng,
      tongKhauTru,
      phuCapXangXe,
      phuCapDienThoai,
      phuCapAnTrua,
      phuCapDocHai,
      phuCapKhac,
      tongPhuCap,
    };
  });
};

const DuLieuTinhLuong = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [detailType, setDetailType] = useState<"cong" | "ot" | "kpi" | "thuong" | "phat" | "khautru" | "phucap">("cong");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [detailData, setDetailData] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" | "warning" });

  const payrollData = useMemo(() => {
    return generatePayrollInputData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const stats = useMemo(() => {
    return {
      soNhanVien: payrollData.length,
      tongNgayCong: payrollData.reduce((s, e) => s + e.ngayCong, 0),
      tyLeChuyenCanTB: Math.round(payrollData.reduce((s, e) => s + e.tyLeChuyenCan, 0) / payrollData.length),
      tongGioOT: payrollData.reduce((s, e) => s + e.tongGioOT, 0),
      kpiTrungBinh: Math.round(payrollData.reduce((s, e) => s + e.kpiTong, 0) / payrollData.length),
      tongThuong: payrollData.reduce((s, e) => s + e.tongThuong, 0),
      tongPhat: payrollData.reduce((s, e) => s + e.tongPhat, 0),
      tongKhauTru: payrollData.reduce((s, e) => s + e.tongKhauTru, 0),
      tongPhuCap: payrollData.reduce((s, e) => s + e.tongPhuCap, 0),
      soNguoiDiMuon: payrollData.filter(e => e.ngayDiMuon > 0).length,
      soNguoiTangCaCao: payrollData.filter(e => e.tongGioOT > 30).length,
      soNguoiKPIExcellent: payrollData.filter(e => e.kpiTong >= 85).length,
    };
  }, [payrollData]);

  const handleViewDetail = (type: "cong" | "ot" | "kpi" | "thuong" | "phat" | "khautru" | "phucap") => {
    setDetailType(type);
    setDetailData(payrollData);
    setOpenDetailDialog(true);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const displayMonth = `${monthNames[selectedMonth]} ${selectedYear}`;

  const textColor = isDark ? "#e2e8f0" : "#0f172a";
  const secondaryTextColor = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const borderColor = isDark ? "#334155" : "#e2e8f0";

  const thongKeChartData = [
    { name: "Thưởng", value: stats.tongThuong / 1000000, color: "#10b981" },
    { name: "Phạt", value: stats.tongPhat / 1000000, color: "#ef4444" },
    { name: "Khấu trừ", value: stats.tongKhauTru / 1000000, color: "#f59e0b" },
    { name: "Phụ cấp", value: stats.tongPhuCap / 1000000, color: "#3b82f6" },
  ];

  const topKPIEmployees = [...payrollData].sort((a, b) => b.kpiTong - a.kpiTong).slice(0, 5);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: isDark ? "#0f172a" : "#ffff", minHeight: "100vh" }}>
      
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            background: isDark
              ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
              : "linear-gradient(135deg, #ebecf0 0%, #c1d4f7 100%)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: { xs: "1.3rem", md: "1.8rem" }, fontWeight: 800, color: textColor }}>
                📋 Dữ liệu đầu vào tính lương
              </Typography>
              <Typography sx={{ color: textColor, mt: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                <People sx={{ fontSize: 18 , color: textColor }} />
                {stats.soNhanVien} nhân viên
              </Typography>
            </Box>

            <Paper sx={{ p: 0.5, display: "flex", alignItems: "center", gap: 0.5, bgcolor: "rgba(255,255,255,0.15)", borderRadius: 3 }}>
              <IconButton onClick={handlePrevMonth} size="small" sx={{ color: "#fff" }}>
                <ChevronLeft />
              </IconButton>
              <Typography sx={{ fontWeight: 600, minWidth: 140, textAlign: "center", color: "#fff" }}>
                {displayMonth}
              </Typography>
              <IconButton onClick={handleNextMonth} size="small" sx={{ color: "#fff" }}>
                <ChevronRight />
              </IconButton>
            </Paper>
          </Box>
        </Paper>
      </Box>

      {/* 7 Card - Hàng 1: 4 card */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        {/* Card Chấm công */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#3b82f6" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(59,130,246,0.1)" }}><Work sx={{ color: "#3b82f6" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("cong")} sx={{ color: "#3b82f6", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>Chấm công</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#3b82f6", mt: 1 }}>{stats.tongNgayCong}</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>TB: {(stats.tongNgayCong / stats.soNhanVien).toFixed(1)} ngày/người</Typography>
              <LinearProgress variant="determinate" value={stats.tyLeChuyenCanTB} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>{stats.tyLeChuyenCanTB}% chuyên cần</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card OT */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#f59e0b" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(245,158,11,0.1)" }}><AccessTime sx={{ color: "#f59e0b" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("ot")} sx={{ color: "#f59e0b", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>Tăng ca (OT)</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#f59e0b", mt: 1 }}>{stats.tongGioOT}h</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>TB: {(stats.tongGioOT / stats.soNhanVien).toFixed(1)}h/người</Typography>
              <LinearProgress variant="determinate" value={Math.min(100, stats.tongGioOT / (stats.soNhanVien * 40) * 100)} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>{stats.soNguoiTangCaCao} người &gt;30h</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card KPI */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#8b5cf6" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(139,92,246,0.1)" }}><Assessment sx={{ color: "#8b5cf6" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("kpi")} sx={{ color: "#8b5cf6", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>KPI</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#8b5cf6", mt: 1 }}>{stats.kpiTrungBinh}%</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>XS: {stats.soNguoiKPIExcellent} người</Typography>
              <LinearProgress variant="determinate" value={stats.kpiTrungBinh} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>TB: {stats.kpiTrungBinh}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card Thưởng */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#10b981" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(16,185,129,0.1)" }}><CardGiftcard sx={{ color: "#10b981" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("thuong")} sx={{ color: "#10b981", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>Thưởng</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981", mt: 1 }}>{(stats.tongThuong / 1000000).toFixed(1)}M</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>KPI: {(payrollData.reduce((s,e)=>s+e.thuongKPI,0)/1000000).toFixed(1)}M</Typography>
              <LinearProgress variant="determinate" value={Math.min(100, stats.tongThuong / 50000000 * 100)} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>CC: {(payrollData.reduce((s,e)=>s+e.thuongChuyenCan,0)/1000000).toFixed(1)}M</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Hàng 2: 3 card */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {/* Card Phạt */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#ef4444" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(239,68,68,0.1)" }}><Warning sx={{ color: "#ef4444" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("phat")} sx={{ color: "#ef4444", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>Phạt</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#ef4444", mt: 1 }}>{(stats.tongPhat / 1000000).toFixed(1)}M</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>Đi muộn: {(payrollData.reduce((s,e)=>s+e.phatDiMuon,0)/1000000).toFixed(1)}M</Typography>
              <LinearProgress variant="determinate" value={Math.min(100, stats.tongPhat / 20000000 * 100)} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>{stats.soNguoiDiMuon} người đi muộn</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card Khấu trừ */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#f59e0b" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(245,158,11,0.1)" }}><Receipt sx={{ color: "#f59e0b" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("khautru")} sx={{ color: "#f59e0b", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>Khấu trừ</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#f59e0b", mt: 1 }}>{(stats.tongKhauTru / 1000000).toFixed(1)}M</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>BHXH: {(payrollData.reduce((s,e)=>s+e.khauTruBHXH,0)/1000000).toFixed(1)}M</Typography>
              <LinearProgress variant="determinate" value={Math.min(100, stats.tongKhauTru / 100000000 * 100)} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>Tạm ứng: {(payrollData.reduce((s,e)=>s+e.khauTruTamUng,0)/1000000).toFixed(1)}M</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card Phụ cấp */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}`, position: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#06b6d4" }} />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: "rgba(6,182,212,0.1)" }}><Payment sx={{ color: "#06b6d4" }} /></Avatar>
                <Button size="small" onClick={() => handleViewDetail("phucap")} sx={{ color: "#06b6d4", minWidth: "auto", p: 0.5 }}><Visibility fontSize="small" /></Button>
              </Box>
              <Typography sx={{ fontWeight: 600, color: textColor }}>Phụ cấp</Typography>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#06b6d4", mt: 1 }}>{(stats.tongPhuCap / 1000000).toFixed(1)}M</Typography>
              <Typography variant="caption" sx={{ color: secondaryTextColor }}>Ăn trưa: {(payrollData.reduce((s,e)=>s+e.phuCapAnTrua,0)/1000000).toFixed(1)}M</Typography>
              <LinearProgress variant="determinate" value={Math.min(100, stats.tongPhuCap / 50000000 * 100)} sx={{ height: 4, borderRadius: 2, mt: 1.5 }} />
              <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 0.5, display: "block" }}>Xăng xe: {(payrollData.reduce((s,e)=>s+e.phuCapXangXe,0)/1000000).toFixed(1)}M</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Biểu đồ */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}` }}>
            <CardHeader title={<Typography sx={{ fontWeight: 700, color: textColor }}>📊 Tổng hợp thưởng - phạt - khấu trừ - phụ cấp</Typography>} />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={thongKeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis dataKey="name" tick={{ fill: secondaryTextColor }} />
                    <YAxis tick={{ fill: secondaryTextColor }} tickFormatter={(v) => `${v}M`} />
                    <RechartsTooltip contentStyle={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8 }} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#3b82f6" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: cardBg, borderRadius: 3, border: `1px solid ${borderColor}` }}>
            <CardHeader title={<Typography sx={{ fontWeight: 700, color: textColor }}>👥 Top 5 nhân viên KPI cao nhất</Typography>} />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topKPIEmployees} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: secondaryTextColor }} />
                    <YAxis type="category" dataKey="hoTen" tick={{ fill: secondaryTextColor }} width={100} />
                    <RechartsTooltip contentStyle={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8 }} />
                    <Bar dataKey="kpiTong" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog chi tiết - giữ nguyên phần table chi tiết */}
      <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)} maxWidth="lg" fullWidth PaperProps={{ sx: { bgcolor: cardBg, borderRadius: 3 } }}>
        <DialogTitle sx={{ borderBottom: `1px solid ${borderColor}` }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 700, color: textColor }}>
              Chi tiết {detailType === "cong" ? "chấm công" : detailType === "ot" ? "tăng ca" : detailType === "kpi" ? "KPI" : detailType === "thuong" ? "thưởng" : detailType === "phat" ? "phạt" : detailType === "khautru" ? "khấu trừ" : "phụ cấp"} - {displayMonth}
            </Typography>
            <IconButton onClick={() => setOpenDetailDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: isDark ? "#0f172a" : "#f8fafc" }}>
                  <TableCell>Mã NV</TableCell>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Phòng ban</TableCell>
                  {detailType === "cong" && (
                    <>
                      <TableCell align="center">Công</TableCell>
                      <TableCell align="center">Nghỉ phép</TableCell>
                      <TableCell align="center">Đi muộn</TableCell>
                      <TableCell align="center">Về sớm</TableCell>
                      <TableCell align="center">Chuyên cần</TableCell>
                    </>
                  )}
                  {detailType === "ot" && (
                    <>
                      <TableCell align="center">OT thường</TableCell>
                      <TableCell align="center">OT cuối tuần</TableCell>
                      <TableCell align="center">OT lễ</TableCell>
                      <TableCell align="center">Tổng OT</TableCell>
                    </>
                  )}
                  {detailType === "kpi" && (
                    <>
                      <TableCell align="center">Sản lượng</TableCell>
                      <TableCell align="center">Chất lượng</TableCell>
                      <TableCell align="center">Tiến độ</TableCell>
                      <TableCell align="center">Tinh thần</TableCell>
                      <TableCell align="center">Tổng KPI</TableCell>
                    </>
                  )}
                  {detailType === "thuong" && (
                    <>
                      <TableCell align="right">Thưởng KPI</TableCell>
                      <TableCell align="right">Thưởng CC</TableCell>
                      <TableCell align="right">Sáng kiến</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                    </>
                  )}
                  {detailType === "phat" && (
                    <>
                      <TableCell align="right">Đi muộn</TableCell>
                      <TableCell align="right">Về sớm</TableCell>
                      <TableCell align="right">Nghỉ KP</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                    </>
                  )}
                  {detailType === "khautru" && (
                    <>
                      <TableCell align="right">BHXH</TableCell>
                      <TableCell align="right">BHYT</TableCell>
                      <TableCell align="right">BHTN</TableCell>
                      <TableCell align="right">Tạm ứng</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                    </>
                  )}
                  {detailType === "phucap" && (
                    <>
                      <TableCell align="right">Xăng xe</TableCell>
                      <TableCell align="right">Điện thoại</TableCell>
                      <TableCell align="right">Ăn trưa</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {detailData.map((emp) => (
                  <TableRow key={emp.maNV} hover>
                    <TableCell>{emp.maNV}</TableCell>
                    <TableCell>{emp.hoTen}</TableCell>
                    <TableCell><Chip label={emp.phongBan} size="small" /></TableCell>
                    {detailType === "cong" && (
                      <>
                        <TableCell align="center">{emp.ngayCong}</TableCell>
                        <TableCell align="center">{emp.ngayNghiPhep}</TableCell>
                        <TableCell align="center">{emp.ngayDiMuon}</TableCell>
                        <TableCell align="center">{emp.ngayVeSom}</TableCell>
                        <TableCell align="center">{emp.tyLeChuyenCan}%</TableCell>
                      </>
                    )}
                    {detailType === "ot" && (
                      <>
                        <TableCell align="center">{emp.otNgayThuong}h</TableCell>
                        <TableCell align="center">{emp.otCuoiTuan}h</TableCell>
                        <TableCell align="center">{emp.otNgayLe}h</TableCell>
                        <TableCell align="center"><strong>{emp.tongGioOT}h</strong></TableCell>
                      </>
                    )}
                    {detailType === "kpi" && (
                      <>
                        <TableCell align="center">{emp.kpiSanLuong}%</TableCell>
                        <TableCell align="center">{emp.kpiChatLuong}%</TableCell>
                        <TableCell align="center">{emp.kpiTienDo}%</TableCell>
                        <TableCell align="center">{emp.kpiTinhThan}%</TableCell>
                        <TableCell align="center"><strong>{emp.kpiTong}%</strong></TableCell>
                      </>
                    )}
                    {detailType === "thuong" && (
                      <>
                        <TableCell align="right">{(emp.thuongKPI / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.thuongChuyenCan / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.thuongSangKien / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right"><strong>{(emp.tongThuong / 1000000).toFixed(1)}M</strong></TableCell>
                      </>
                    )}
                    {detailType === "phat" && (
                      <>
                        <TableCell align="right">{(emp.phatDiMuon / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.phatVeSom / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.phatDiLamKhongPhep / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right"><strong>{(emp.tongPhat / 1000000).toFixed(1)}M</strong></TableCell>
                      </>
                    )}
                    {detailType === "khautru" && (
                      <>
                        <TableCell align="right">{(emp.khauTruBHXH / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.khauTruBHYT / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.khauTruBHTN / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.khauTruTamUng / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right"><strong>{(emp.tongKhauTru / 1000000).toFixed(1)}M</strong></TableCell>
                      </>
                    )}
                    {detailType === "phucap" && (
                      <>
                        <TableCell align="right">{(emp.phuCapXangXe / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.phuCapDienThoai / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right">{(emp.phuCapAnTrua / 1000000).toFixed(1)}M</TableCell>
                        <TableCell align="right"><strong>{(emp.tongPhuCap / 1000000).toFixed(1)}M</strong></TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${borderColor}`, p: 2 }}>
          <Button onClick={() => setOpenDetailDialog(false)}>Đóng</Button>
          <Button variant="contained" startIcon={<Download />}>Xuất Excel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default DuLieuTinhLuong;