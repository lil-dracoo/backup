import { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Chip,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Avatar,
  alpha,
  Grid,
  Tooltip,
} from "@mui/material";

// Import icons
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LanguageIcon from "@mui/icons-material/Language";
import BuildIcon from "@mui/icons-material/Build";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";

import { useTheme } from "../../context/themecontext";

// Danh sach nhan vien
const employeeList = [
  { maNV: "NV001", hoTen: "Nguyen Truc Linh", phongBan: "Nhan su", chucVu: "HRBP Senior", luongP1: 18000000 },
  { maNV: "NV002", hoTen: "Pham Hoang Duy", phongBan: "Nhan su", chucVu: "Recruiter", luongP1: 12000000 },
  { maNV: "NV003", hoTen: "Le Minh Anh", phongBan: "Nhan su", chucVu: "C&B Specialist", luongP1: 15000000 },
  { maNV: "NV004", hoTen: "Vo Gia Han", phongBan: "Ke toan", chucVu: "Ke toan", luongP1: 14000000 },
  { maNV: "NV005", hoTen: "Tran Huu Nam", phongBan: "San xuat", chucVu: "Quan ly san xuat", luongP1: 20000000 },
  { maNV: "NV006", hoTen: "Nguyen Thi Mai", phongBan: "Marketing", chucVu: "Marketing Manager", luongP1: 22000000 },
  { maNV: "NV007", hoTen: "Tran Van Duc", phongBan: "Cong nghe", chucVu: "IT Support", luongP1: 13000000 },
  { maNV: "NV008", hoTen: "Pham Thi Lan", phongBan: "Kinh doanh", chucVu: "Business Analyst", luongP1: 16000000 },
  { maNV: "NV009", hoTen: "Hoang Van Nam", phongBan: "San pham", chucVu: "Product Owner", luongP1: 25000000 },
  { maNV: "NV010", hoTen: "Dang Thuy Hang", phongBan: "Cong nghe", chucVu: "QA Engineer", luongP1: 15000000 },
];

// Khung nang luc mac dinh
const defaultCompetencyFramework = [
  {
    id: "hoc-van",
    name: "Học vấn",
    icon: "GraduationCap",
    weight: 20,
    levels: [
      { id: "trung-cap", name: "Trung cấp", coefficient: 1.0 },
      { id: "cao-dang", name: "Cao đẳng", coefficient: 1.1 },
      { id: "dai-hoc", name: "Đại học", coefficient: 1.2 },
      { id: "thac-si", name: "Thạc sĩ", coefficient: 1.35 },
      { id: "tien-si", name: "Tiến sĩ", coefficient: 1.5 },
    ],
  },
  {
    id: "kinh-nghiem",
    name: "Kinh nghiệm",
    icon: "Briefcase",
    weight: 25,
    levels: [
      { id: "duoi-1-nam", name: "Dưới 1 năm", coefficient: 1.0 },
      { id: "1-3-nam", name: "1-3 năm", coefficient: 1.15 },
      { id: "3-5-nam", name: "3-5 năm", coefficient: 1.3 },
      { id: "5-10-nam", name: "5-10 năm", coefficient: 1.45 },
      { id: "tren-10-nam", name: "Trên 10 năm", coefficient: 1.6 },
    ],
  },
  {
    id: "chung-chi",
    name: "Chứng chỉ",
    icon: "Award",
    weight: 15,
    levels: [
      { id: "khong-co", name: "Không có", coefficient: 1.0 },
      { id: "co-ban", name: "Chứng chỉ cơ bản", coefficient: 1.1 },
      { id: "chuyen-sau", name: "Chứng chỉ chuyên sâu", coefficient: 1.25 },
      { id: "quoc-te", name: "Chứng chỉ quốc tế", coefficient: 1.4 },
    ],
  },
  {
    id: "ngoai-ngu",
    name: "Ngoại ngữ",
    icon: "Languages",
    weight: 15,
    levels: [
      { id: "co-ban", name: "Cơ bản (A1-A2)", coefficient: 1.0 },
      { id: "trung-cap", name: "Trung cấp (B1-B2)", coefficient: 1.15 },
      { id: "cao-cap", name: "Cao cấp (C1-C2)", coefficient: 1.3 },
      { id: "song-ngu", name: "Song ngữ/Bản ngữ", coefficient: 1.45 },
    ],
  },
  {
    id: "ky-nang",
    name: "Kỹ năng chuyên môn",
    icon: "Wrench",
    weight: 25,
    levels: [
      { id: "co-ban", name: "Cơ bản", coefficient: 1.0 },
      { id: "trung-binh", name: "Trung bình", coefficient: 1.15 },
      { id: "kha", name: "Khá", coefficient: 1.3 },
      { id: "gioi", name: "Giỏi", coefficient: 1.45 },
      { id: "xuat-sac", name: "Xuất sắc", coefficient: 1.6 },
    ],
  },
];

// Du lieu danh gia mau
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const generateInitialEvaluations = () => {
  const evaluations: Record<string, {
    status: "pending" | "evaluated" | "approved";
    evaluatedDate?: string;
    approvedDate?: string;
    evaluator?: string;
    approver?: string;
    note?: string;
    ratings: Record<string, string>;
    coefficient: number;
  }> = {};

  employeeList.forEach((emp, idx) => {
    const seed = idx * 100;
    const rand = () => seededRandom(seed + Object.keys(evaluations).length);
    
    const statusRand = rand();
    let status: "pending" | "evaluated" | "approved" = "pending";
    if (statusRand > 0.6) status = "approved";
    else if (statusRand > 0.3) status = "evaluated";

    const ratings: Record<string, string> = {};
    let totalCoeff = 0;
    let totalWeight = 0;

    if (status !== "pending") {
      defaultCompetencyFramework.forEach((group, gIdx) => {
        const levelIdx = Math.floor(seededRandom(seed + gIdx * 10) * group.levels.length);
        ratings[group.id] = group.levels[levelIdx].id;
        totalCoeff += group.levels[levelIdx].coefficient * group.weight;
        totalWeight += group.weight;
      });
    }

    const coefficient = totalWeight > 0 ? totalCoeff / totalWeight : 0;

    evaluations[emp.maNV] = {
      status,
      evaluatedDate: status !== "pending" ? "2024-01-15" : undefined,
      approvedDate: status === "approved" ? "2024-01-20" : undefined,
      evaluator: status !== "pending" ? "Nguyen Van A" : undefined,
      approver: status === "approved" ? "Tran Van B" : undefined,
      note: status !== "pending" ? "Danh gia dinh ky Q1/2024" : undefined,
      ratings,
      coefficient: Math.round(coefficient * 100) / 100,
    };
  });

  return evaluations;
};

const iconMap: Record<string, React.ElementType> = {
  GraduationCap: SchoolIcon,
  Briefcase: WorkIcon,
  Award: EmojiEventsIcon,
  Languages: LanguageIcon,
  Wrench: BuildIcon,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function NhapDanhGiaNangLuc() {
  const { isDark } = useTheme();
  const [evaluations, setEvaluations] = useState(generateInitialEvaluations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employeeList[0] | null>(null);
  const [isEvaluateDialogOpen, setIsEvaluateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [tempRatings, setTempRatings] = useState<Record<string, string>>({});
  const [tempNote, setTempNote] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const secondaryColor = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const borderColor = isDark ? "#334155" : "#e2e8f0";

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employeeList.filter((emp) => {
      const matchSearch =
        emp.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.maNV.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        filterStatus === "all" || evaluations[emp.maNV]?.status === filterStatus;
      const matchDepartment =
        filterDepartment === "all" || emp.phongBan === filterDepartment;
      return matchSearch && matchStatus && matchDepartment;
    });
  }, [searchTerm, filterStatus, filterDepartment, evaluations]);

  // Pagination
  const paginatedEmployees = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredEmployees, page, rowsPerPage]);

  // Get unique departments
  const departments = useMemo(() => {
    return [...new Set(employeeList.map((emp) => emp.phongBan))];
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = employeeList.length;
    const evaluated = Object.values(evaluations).filter(
      (e) => e.status === "evaluated"
    ).length;
    const approved = Object.values(evaluations).filter(
      (e) => e.status === "approved"
    ).length;
    const pending = Object.values(evaluations).filter(
      (e) => e.status === "pending"
    ).length;
    const avgCoeff =
      Object.values(evaluations)
        .filter((e) => e.coefficient > 0)
        .reduce((sum, e) => sum + e.coefficient, 0) /
      (total - pending || 1);

    return { total, evaluated, approved, pending, avgCoeff: avgCoeff.toFixed(2) };
  }, [evaluations]);

  // Calculate coefficient from ratings
  const calculateCoefficient = (ratings: Record<string, string>) => {
    let totalCoeff = 0;
    let totalWeight = 0;

    defaultCompetencyFramework.forEach((group) => {
      const selectedLevel = group.levels.find((l) => l.id === ratings[group.id]);
      if (selectedLevel) {
        totalCoeff += selectedLevel.coefficient * group.weight;
        totalWeight += group.weight;
      }
    });

    return totalWeight > 0 ? Math.round((totalCoeff / totalWeight) * 100) / 100 : 0;
  };

  // Open evaluate dialog
  const handleOpenEvaluate = (employee: typeof employeeList[0]) => {
    setSelectedEmployee(employee);
    const existingEval = evaluations[employee.maNV];
    
    // Khởi tạo ratings
    const initialRatings: Record<string, string> = {};
    defaultCompetencyFramework.forEach((group) => {
      if (existingEval && existingEval.status !== "pending" && existingEval.ratings[group.id]) {
        initialRatings[group.id] = existingEval.ratings[group.id];
      } else {
        initialRatings[group.id] = "";
      }
    });
    
    setTempRatings(initialRatings);
    setTempNote(existingEval?.note || "");
    setIsEvaluateDialogOpen(true);
  };

  // Open view dialog
  const handleOpenView = (employee: typeof employeeList[0]) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  // Save evaluation
  const handleSaveEvaluation = () => {
    if (!selectedEmployee) return;

    const coefficient = calculateCoefficient(tempRatings);
    const allRated = defaultCompetencyFramework.every(
      (group) => tempRatings[group.id] && tempRatings[group.id] !== ""
    );

    if (!allRated) {
      alert("Vui lòng đánh giá tất cả các tiêu chí!");
      return;
    }

    setEvaluations((prev) => ({
      ...prev,
      [selectedEmployee.maNV]: {
        status: "evaluated",
        evaluatedDate: new Date().toISOString().split("T")[0],
        evaluator: "Người dùng hiện tại",
        note: tempNote,
        ratings: { ...tempRatings },
        coefficient,
      },
    }));

    setIsEvaluateDialogOpen(false);
  };

  // Approve evaluation
  const handleApprove = (maNV: string) => {
    setEvaluations((prev) => ({
      ...prev,
      [maNV]: {
        ...prev[maNV],
        status: "approved",
        approvedDate: new Date().toISOString().split("T")[0],
        approver: "Người duyệt hiện tại",
      },
    }));
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Đã duyệt"
            size="small"
            sx={{ bgcolor: alpha("#22c55e", 0.15), color: "#22c55e" }}
          />
        );
      case "evaluated":
        return (
          <Chip
            icon={<AccessTimeIcon />}
            label="Chờ duyệt"
            size="small"
            sx={{ bgcolor: alpha("#f59e0b", 0.15), color: "#f59e0b" }}
          />
        );
      default:
        return (
          <Chip
            icon={<WarningAmberIcon />}
            label="Chưa đánh giá"
            size="small"
            sx={{ bgcolor: alpha("#64748b", 0.15), color: secondaryColor }}
          />
        );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 3, bgcolor: isDark ? "#0f172a" : "#f8fafc" }}>
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2, mb: 4 }}>
          <Box>
            <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 1.5, color: textColor }}>
              <VerifiedUserIcon sx={{ color: "#3b82f6" }} />
              Nhập đánh giá năng lực (P2)
            </Typography>
            <Typography sx={{ color: secondaryColor, mt: 0.5 }}>
              Đánh giá năng lực nhân viên theo khung năng lực đã thiết lập
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: borderColor, color: secondaryColor }}>
            Xuất Excel
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} md={2.4}>
            <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha("#3b82f6", 0.15), color: "#3b82f6" }}>
                    <PeopleIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: textColor }}>{stats.total}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: secondaryColor }}>Tổng nhân viên</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha("#22c55e", 0.15), color: "#22c55e" }}>
                    <CheckCircleIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: textColor }}>{stats.approved}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: secondaryColor }}>Đã duyệt</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha("#f59e0b", 0.15), color: "#f59e0b" }}>
                    <AccessTimeIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: textColor }}>{stats.evaluated}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: secondaryColor }}>Chờ duyệt</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha("#64748b", 0.15), color: secondaryColor }}>
                    <WarningAmberIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: textColor }}>{stats.pending}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: secondaryColor }}>Chưa đánh giá</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha("#3b82f6", 0.15), color: "#3b82f6" }}>
                    <TrendingUpIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: textColor }}>{stats.avgCoeff}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: secondaryColor }}>Hệ số TB</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                placeholder="Tìm kiếm theo tên hoặc mã nhân viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: secondaryColor }} /></InputAdornment>,
                  },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: secondaryColor }}>Trạng thái</InputLabel>
                <Select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)} 
                  label="Trạng thái"
                  sx={{ color: textColor }}
                >
                  <MenuItem value="all">Tất cả trạng thái</MenuItem>
                  <MenuItem value="pending">Chưa đánh giá</MenuItem>
                  <MenuItem value="evaluated">Chờ duyệt</MenuItem>
                  <MenuItem value="approved">Đã duyệt</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: secondaryColor }}>Phòng ban</InputLabel>
                <Select 
                  value={filterDepartment} 
                  onChange={(e) => setFilterDepartment(e.target.value)} 
                  label="Phòng ban"
                  sx={{ color: textColor }}
                >
                  <MenuItem value="all">Tất cả phòng ban</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        {/* Employee Table - Giữ nguyên như cũ */}
        <Card sx={{ bgcolor: cardBg, border: `1px solid ${borderColor}`, borderRadius: 3 }}>
          <CardHeader 
            title={<Typography sx={{ fontWeight: 700, color: textColor }}>Danh sách nhân viên</Typography>}
            subheader={<Typography sx={{ color: secondaryColor }}>{filteredEmployees.length} nhân viên</Typography>}
          />
          <CardContent sx={{ p: 0 }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Mã NV</TableCell>
                    <TableCell sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Họ tên</TableCell>
                    <TableCell sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Phòng ban</TableCell>
                    <TableCell sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Chức vụ</TableCell>
                    <TableCell sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Trạng thái</TableCell>
                    <TableCell align="right" sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Hệ số P2</TableCell>
                    <TableCell align="right" sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Lương P2</TableCell>
                    <TableCell align="center" sx={{ bgcolor: cardBg, fontWeight: 700, color: secondaryColor, borderBottomColor: borderColor }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEmployees.map((emp) => {
                    const evalData = evaluations[emp.maNV];
                    const luongP2 = emp.luongP1 * (evalData?.coefficient || 0) - emp.luongP1;
                    return (
                      <TableRow key={emp.maNV}>
                        <TableCell sx={{ color: textColor }}>{emp.maNV}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: textColor }}>{emp.hoTen}</TableCell>
                        <TableCell>
                          <Chip label={emp.phongBan} size="small" variant="outlined" sx={{ borderColor: borderColor, color: secondaryColor }} />
                        </TableCell>
                        <TableCell sx={{ color: secondaryColor }}>{emp.chucVu}</TableCell>
                        <TableCell>{getStatusChip(evalData?.status || "pending")}</TableCell>
                        <TableCell align="right">
                          {evalData?.coefficient > 0 ? (
                            <Typography sx={{ fontWeight: 700, color: "#3b82f6" }}>{evalData.coefficient.toFixed(2)}</Typography>
                          ) : "-"}
                        </TableCell>
                        <TableCell align="right">
                          {luongP2 > 0 ? (
                            <Typography sx={{ fontWeight: 600, color: "#22c55e" }}>+{formatCurrency(luongP2)}</Typography>
                          ) : "-"}
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            {evalData?.status === "evaluated" && (
                              <Button size="small" variant="contained" startIcon={<CheckCircleIcon />} onClick={() => handleApprove(emp.maNV)} sx={{ bgcolor: "#22c55e" }}>
                                Duyệt
                              </Button>
                            )}
                            <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => handleOpenEvaluate(emp)}>
                              {evalData?.status === "pending" ? "Đánh giá" : "Sửa"}
                            </Button>
                            {evalData?.status !== "pending" && (
                              <Tooltip title="Xem chi tiết">
                                <IconButton size="small" onClick={() => handleOpenView(emp)}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderTop: `1px solid ${borderColor}` }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ color: secondaryColor }}>Hiển thị</Typography>
                <FormControl size="small" sx={{ minWidth: 70 }}>
                  <Select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2" sx={{ color: secondaryColor }}>/ {filteredEmployees.length} nhân viên</Typography>
              </Box>
              <Pagination count={Math.ceil(filteredEmployees.length / rowsPerPage)} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
            </Box>
          </CardContent>
        </Card>

        {/* Evaluate Dialog - TĂNG KÍCH THƯỚC */}
        <Dialog 
          open={isEvaluateDialogOpen} 
          onClose={() => setIsEvaluateDialogOpen(false)} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: cardBg,
              backgroundImage: "none",
              minWidth: { xs: "90%", sm: 600, md: 700 },
            }
          }}
        >
          <DialogTitle sx={{ borderBottom: `1px solid ${borderColor}`, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EditIcon sx={{ color: "#3b82f6" }} />
                <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1.2rem" }}>Đánh giá năng lực</Typography>
              </Box>
              <IconButton onClick={() => setIsEvaluateDialogOpen(false)} sx={{ color: secondaryColor }}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedEmployee && (
              <Typography sx={{ color: secondaryColor, mt: 1, fontSize: "0.9rem" }}>
                {selectedEmployee.hoTen} - {selectedEmployee.maNV} | {selectedEmployee.chucVu}
              </Typography>
            )}
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <Stack spacing={3}>
              {defaultCompetencyFramework.map((group) => {
                const IconComponent = iconMap[group.icon];
                const currentValue = tempRatings[group.id] || "";
                
                return (
                  <Card key={group.id} sx={{ bgcolor: alpha(cardBg, 0.5), border: `1px solid ${borderColor}`, borderRadius: 2 }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        {IconComponent && <IconComponent sx={{ color: "#3b82f6", fontSize: 20 }} />}
                        <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1rem" }}>
                          {group.name}
                        </Typography>
                        <Chip label={`Trọng số: ${group.weight}%`} size="small" variant="outlined" sx={{ borderColor: borderColor }} />
                      </Box>
                      
                      <FormControl fullWidth size="medium">
                        <InputLabel sx={{ color: secondaryColor, fontSize: "0.9rem" }}>Chọn mức đánh giá</InputLabel>
                        <Select
                          value={currentValue}
                          onChange={(e) => setTempRatings({ ...tempRatings, [group.id]: e.target.value })}
                          label="Chọn mức đánh giá"
                          sx={{ 
                            color: textColor,
                            fontSize: "0.95rem",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: borderColor },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
                            "& .MuiSelect-select": { py: 1.5, px: 2 }
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: cardBg,
                                maxHeight: 300,
                              }
                            }
                          }}
                        >
                          {group.levels.map((level) => (
                            <MenuItem 
                              key={level.id} 
                              value={level.id} 
                              sx={{ 
                                color: textColor,
                                py: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                "&:hover": { bgcolor: alpha("#3b82f6", 0.1) }
                              }}
                            >
                              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                <Typography>{level.name}</Typography>
                                <Chip 
                                  label={`Hệ số: ${level.coefficient}`} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ 
                                    borderColor: alpha("#3b82f6", 0.5),
                                    color: "#3b82f6",
                                    fontWeight: 600
                                  }} 
                                />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Preview coefficient */}
              <Card sx={{ bgcolor: alpha("#3b82f6", 0.08), border: `1px solid ${alpha("#3b82f6", 0.3)}`, borderRadius: 2 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: textColor, fontSize: "1rem" }}>
                      Hệ số P2 dự kiến:
                    </Typography>
                    <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#3b82f6" }}>
                      {calculateCoefficient(tempRatings).toFixed(2)}
                    </Typography>
                  </Box>
                  {selectedEmployee && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, pt: 1, borderTop: `1px solid ${alpha("#3b82f6", 0.2)}` }}>
                      <Typography sx={{ color: secondaryColor, fontSize: "0.9rem" }}>Lương P2 dự kiến:</Typography>
                      <Typography sx={{ fontWeight: 600, color: "#22c55e", fontSize: "1rem" }}>
                        +{formatCurrency(
                          selectedEmployee.luongP1 * calculateCoefficient(tempRatings) - selectedEmployee.luongP1
                        )}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Note */}
              <TextField
                label="Ghi chú đánh giá"
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                multiline
                rows={3}
                fullWidth
                placeholder="Nhập ghi chú (nếu có)..."
                sx={{
                  "& .MuiInputLabel-root": { color: secondaryColor, fontSize: "0.9rem" },
                  "& .MuiOutlinedInput-root": { 
                    color: textColor,
                    "& fieldset": { borderColor: borderColor },
                    "&:hover fieldset": { borderColor: "#3b82f6" },
                  },
                }}
              />
            </Stack>
          </DialogContent>
          
          <DialogActions sx={{ borderTop: `1px solid ${borderColor}`, p: 2.5, gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setIsEvaluateDialogOpen(false)} 
              sx={{ px: 3, py: 1 }}
            >
              Hủy
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />} 
              onClick={handleSaveEvaluation} 
              sx={{ bgcolor: "#3b82f6", px: 3, py: 1, "&:hover": { bgcolor: "#2563eb" } }}
            >
              Lưu đánh giá
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Dialog - TĂNG KÍCH THƯỚC */}
        <Dialog 
          open={isViewDialogOpen} 
          onClose={() => setIsViewDialogOpen(false)} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: cardBg,
              backgroundImage: "none",
              minWidth: { xs: "90%", sm: 600, md: 700 },
            }
          }}
        >
          <DialogTitle sx={{ borderBottom: `1px solid ${borderColor}`, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <VisibilityIcon sx={{ color: "#3b82f6" }} />
                <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1.2rem" }}>Chi tiết đánh giá</Typography>
              </Box>
              <IconButton onClick={() => setIsViewDialogOpen(false)} sx={{ color: secondaryColor }}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedEmployee && (
              <Typography sx={{ color: secondaryColor, mt: 1, fontSize: "0.9rem" }}>
                {selectedEmployee.hoTen} - {selectedEmployee.maNV} | {selectedEmployee.chucVu}
              </Typography>
            )}
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            {selectedEmployee && evaluations[selectedEmployee.maNV] && (
              <Stack spacing={3}>
                {/* Status & Meta */}
                <Card sx={{ bgcolor: alpha(cardBg, 0.5), border: `1px solid ${borderColor}` }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={1.5}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: secondaryColor }}>Trạng thái:</Typography>
                        {getStatusChip(evaluations[selectedEmployee.maNV].status)}
                      </Box>
                      {evaluations[selectedEmployee.maNV].evaluatedDate && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ color: secondaryColor }}>Ngày đánh giá:</Typography>
                          <Typography sx={{ color: textColor }}>{evaluations[selectedEmployee.maNV].evaluatedDate}</Typography>
                        </Box>
                      )}
                      {evaluations[selectedEmployee.maNV].evaluator && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ color: secondaryColor }}>Người đánh giá:</Typography>
                          <Typography sx={{ color: textColor }}>{evaluations[selectedEmployee.maNV].evaluator}</Typography>
                        </Box>
                      )}
                      {evaluations[selectedEmployee.maNV].approvedDate && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ color: secondaryColor }}>Ngày duyệt:</Typography>
                          <Typography sx={{ color: textColor }}>{evaluations[selectedEmployee.maNV].approvedDate}</Typography>
                        </Box>
                      )}
                      {evaluations[selectedEmployee.maNV].approver && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ color: secondaryColor }}>Người duyệt:</Typography>
                          <Typography sx={{ color: textColor }}>{evaluations[selectedEmployee.maNV].approver}</Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>

                {/* Ratings */}
                {defaultCompetencyFramework.map((group) => {
                  const IconComponent = iconMap[group.icon];
                  const ratingId = evaluations[selectedEmployee.maNV].ratings[group.id];
                  const level = group.levels.find((l) => l.id === ratingId);
                  return (
                    <Card key={group.id} sx={{ bgcolor: alpha(cardBg, 0.5), border: `1px solid ${borderColor}` }}>
                      <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {IconComponent && <IconComponent sx={{ color: "#3b82f6", fontSize: 20 }} />}
                            <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1rem" }}>
                              {group.name}
                            </Typography>
                            <Chip label={`${group.weight}%`} size="small" variant="outlined" sx={{ borderColor: borderColor }} />
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Typography sx={{ color: textColor }}>{level?.name || "-"}</Typography>
                            {level && (
                              <Chip 
                                label={`x${level.coefficient}`} 
                                size="small" 
                                sx={{ bgcolor: alpha("#3b82f6", 0.15), color: "#3b82f6", fontWeight: 600 }} 
                              />
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Final coefficient */}
                <Card sx={{ bgcolor: alpha("#3b82f6", 0.08), border: `1px solid ${alpha("#3b82f6", 0.3)}` }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1rem" }}>
                        Hệ số P2 tổng hợp:
                      </Typography>
                      <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#3b82f6" }}>
                        {evaluations[selectedEmployee.maNV].coefficient.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, pt: 1, borderTop: `1px solid ${alpha("#3b82f6", 0.2)}` }}>
                      <Typography sx={{ color: secondaryColor, fontSize: "0.9rem" }}>Lương P2:</Typography>
                      <Typography sx={{ fontWeight: 600, color: "#22c55e", fontSize: "1rem" }}>
                        +{formatCurrency(
                          selectedEmployee.luongP1 * evaluations[selectedEmployee.maNV].coefficient - selectedEmployee.luongP1
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {/* Note */}
                {evaluations[selectedEmployee.maNV].note && (
                  <Card sx={{ bgcolor: alpha(cardBg, 0.5), border: `1px solid ${borderColor}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography sx={{ color: secondaryColor, mb: 1, fontWeight: 500 }}>Ghi chú:</Typography>
                      <Typography sx={{ color: textColor }}>{evaluations[selectedEmployee.maNV].note}</Typography>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            )}
          </DialogContent>
          
          <DialogActions sx={{ borderTop: `1px solid ${borderColor}`, p: 2.5 }}>
            <Button variant="outlined" onClick={() => setIsViewDialogOpen(false)} sx={{ px: 3, py: 1 }}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}