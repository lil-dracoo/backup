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
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Switch,
  Tooltip,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Grow,
  Zoom,
  LinearProgress,
  Badge,
  Collapse,
} from "@mui/material";
import {
  Shield,
  Favorite,
  Work,
  Receipt,
  People,
  Settings,
  Add,
  Edit,
  Delete,
  Save,
  Info,
  WarningAmber,
  CheckCircle,
  History,
  BusinessCenter,
  Close,
  TrendingUp,
  Calculate,
  VerifiedUser,
  LocalAtm,
} from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../../context/themecontext";

// Định nghĩa các loại khấu trừ
interface DeductionType {
  id: string;
  name: string;
  code: string;
  type: "percentage" | "fixed";
  employeeRate: number;
  employerRate: number;
  maxSalary: number | null;
  minSalary: number | null;
  isActive: boolean;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: "insurance" | "tax" | "other";
}

interface TaxBracket {
  id: string;
  from: number;
  to: number | null;
  rate: number;
}

interface PersonalDeduction {
  self: number;
  dependent: number;
}

// Dữ liệu mẫu
const initialDeductions: DeductionType[] = [
  {
    id: "bhxh",
    name: "Bảo hiểm xã hội",
    code: "BHXH",
    type: "percentage",
    employeeRate: 8,
    employerRate: 17.5,
    maxSalary: 46800000,
    minSalary: 4680000,
    isActive: true,
    description: "Bảo hiểm xã hội bắt buộc theo quy định pháp luật",
    icon: <Shield />,
    color: "#06b6d4",
    category: "insurance",
  },
  {
    id: "bhyt",
    name: "Bảo hiểm y tế",
    code: "BHYT",
    type: "percentage",
    employeeRate: 1.5,
    employerRate: 3,
    maxSalary: 46800000,
    minSalary: 4680000,
    isActive: true,
    description: "Bảo hiểm y tế bắt buộc theo quy định pháp luật",
    icon: <Favorite />,
    color: "#f43f5e",
    category: "insurance",
  },
  {
    id: "bhtn",
    name: "Bảo hiểm thất nghiệp",
    code: "BHTN",
    type: "percentage",
    employeeRate: 1,
    employerRate: 1,
    maxSalary: 93600000,
    minSalary: 4680000,
    isActive: true,
    description: "Bảo hiểm thất nghiệp bắt buộc theo quy định pháp luật",
    icon: <Work />,
    color: "#f59e0b",
    category: "insurance",
  },
  {
    id: "doanphi",
    name: "Đoàn phí công đoàn",
    code: "CDOAN",
    type: "percentage",
    employeeRate: 1,
    employerRate: 2,
    maxSalary: null,
    minSalary: null,
    isActive: true,
    description: "Phí công đoàn theo quy định",
    icon: <People />,
    color: "#10b981",
    category: "other",
  },
];

const initialTaxBrackets: TaxBracket[] = [
  { id: "1", from: 0, to: 5000000, rate: 5 },
  { id: "2", from: 5000000, to: 10000000, rate: 10 },
  { id: "3", from: 10000000, to: 18000000, rate: 15 },
  { id: "4", from: 18000000, to: 32000000, rate: 20 },
  { id: "5", from: 32000000, to: 52000000, rate: 25 },
  { id: "6", from: 52000000, to: 80000000, rate: 30 },
  { id: "7", from: 80000000, to: null, rate: 35 },
];

const initialPersonalDeduction: PersonalDeduction = {
  self: 11000000,
  dependent: 4400000,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

const ThietLapKhauTru = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("insurance");
  const [deductions, setDeductions] = useState<DeductionType[]>(initialDeductions);
  const [taxBrackets] = useState<TaxBracket[]>(initialTaxBrackets);
  const [personalDeduction, setPersonalDeduction] = useState<PersonalDeduction>(initialPersonalDeduction);
  const [editingDeduction, setEditingDeduction] = useState<DeductionType | null>(null);
  const [newDeduction, setNewDeduction] = useState<Partial<DeductionType>>({
    name: "",
    code: "",
    type: "percentage",
    employeeRate: 0,
    employerRate: 0,
    maxSalary: null,
    minSalary: null,
    description: "",
    category: "other",
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" | "warning" });
  const [grossSalary, setGrossSalary] = useState(20000000);
  const [dependents, setDependents] = useState(0);
  const [insuranceDeduction, setInsuranceDeduction] = useState(2100000);
  const [animateResult, setAnimateResult] = useState(false);
  const [hoveredDeduction, setHoveredDeduction] = useState<string | null>(null);

  // Màu sắc theo theme
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  const secondaryTextColor = isDark ? "#94a3b8" : "#475569";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const borderColor = isDark ? "#334155" : "#e2e8f0";
  const inputBg = isDark ? "#1e293b" : "#ffffff";
  const dialogBg = isDark ? "#1e293b" : "#ffffff";
  const inputTextColor = isDark ? "#f1f5f9" : "#0f172a";
  const inputLabelColor = isDark ? "#94a3b8" : "#475569";

  // Tính tổng tỷ lệ
  const totalEmployeeRate = deductions
    .filter((d) => d.isActive && d.type === "percentage")
    .reduce((sum, d) => sum + d.employeeRate, 0);
  const totalEmployerRate = deductions
    .filter((d) => d.isActive && d.type === "percentage")
    .reduce((sum, d) => sum + d.employerRate, 0);

  // Tính thuế TNCN
  const taxableIncome = Math.max(0, grossSalary - insuranceDeduction - personalDeduction.self - dependents * personalDeduction.dependent);
  
  const calculateTax = () => {
    let tax = 0;
    let remainingIncome = taxableIncome;
    for (const bracket of taxBrackets) {
      if (remainingIncome <= 0) break;
      const bracketSize = bracket.to ? bracket.to - bracket.from : Infinity;
      const taxableInBracket = Math.min(remainingIncome, bracketSize);
      tax += taxableInBracket * (bracket.rate / 100);
      remainingIncome -= taxableInBracket;
    }
    return Math.round(tax);
  };
  
  const taxAmount = calculateTax();
  const netSalary = grossSalary - insuranceDeduction - taxAmount;

  // Animation khi kết quả thay đổi
  useEffect(() => {
    setAnimateResult(true);
    const timer = setTimeout(() => setAnimateResult(false), 500);
    return () => clearTimeout(timer);
  }, [grossSalary, dependents, insuranceDeduction, personalDeduction]);

  const handleToggleActive = (id: string) => {
    setDeductions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
    setHasChanges(true);
  };

  const handleEditDeduction = (deduction: DeductionType) => {
    setEditingDeduction({ ...deduction });
    setIsEditDialogOpen(true);
  };

  const handleSaveDeduction = () => {
    if (editingDeduction) {
      setDeductions((prev) =>
        prev.map((d) => (d.id === editingDeduction.id ? editingDeduction : d))
      );
      setIsEditDialogOpen(false);
      setEditingDeduction(null);
      setHasChanges(true);
      setSnackbar({ open: true, message: "Đã cập nhật khấu trừ!", severity: "success" });
    }
  };

  const handleAddDeduction = () => {
    if (newDeduction.name && newDeduction.code) {
      const newId = `custom_${Date.now()}`;
      const deduction: DeductionType = {
        id: newId,
        name: newDeduction.name,
        code: newDeduction.code,
        type: newDeduction.type as "percentage" | "fixed",
        employeeRate: newDeduction.employeeRate || 0,
        employerRate: newDeduction.employerRate || 0,
        maxSalary: newDeduction.maxSalary || null,
        minSalary: newDeduction.minSalary || null,
        isActive: true,
        description: newDeduction.description || "",
        icon: <Settings />,
        color: "#8b5cf6",
        category: newDeduction.category as "insurance" | "tax" | "other",
      };
      setDeductions((prev) => [...prev, deduction]);
      setIsAddDialogOpen(false);
      setNewDeduction({
        name: "",
        code: "",
        type: "percentage",
        employeeRate: 0,
        employerRate: 0,
        maxSalary: null,
        minSalary: null,
        description: "",
        category: "other",
      });
      setHasChanges(true);
      setSnackbar({ open: true, message: "Đã thêm khấu trừ mới!", severity: "success" });
    }
  };

  const handleDeleteDeduction = (id: string) => {
    setDeductions((prev) => prev.filter((d) => d.id !== id));
    setHasChanges(true);
    setSnackbar({ open: true, message: "Đã xóa khấu trừ!", severity: "success" });
  };

  const handlePersonalDeductionChange = (field: keyof PersonalDeduction, value: number) => {
    setPersonalDeduction((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    setHasChanges(false);
    setSnackbar({ open: true, message: "Đã lưu tất cả thay đổi!", severity: "success" });
  };

  const getTaxRateColor = (rate: number) => {
    if (rate <= 10) return "#10b981";
    if (rate <= 20) return "#f59e0b";
    return "#ef4444";
  };

  // Style cho TextField để đảm bảo màu chữ đúng
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: inputBg,
      color: inputTextColor,
      "& fieldset": {
        borderColor: borderColor,
      },
      "&:hover fieldset": {
        borderColor: "#3b82f6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6",
      },
    },
    "& .MuiInputLabel-root": {
      color: inputLabelColor,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3b82f6",
    },
    "& .MuiOutlinedInput-input": {
      color: inputTextColor,
    },
    "& .MuiInputAdornment-root .MuiTypography-root": {
      color: inputLabelColor,
    },
  };

  // Style cho Select
  const selectSx = {
    bgcolor: inputBg,
    color: inputTextColor,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: borderColor,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3b82f6",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3b82f6",
    },
    "& .MuiSelect-select": {
      color: inputTextColor,
    },
    "& .MuiSelect-icon": {
      color: inputLabelColor,
    },
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #eef6ff 100%)",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        
        {/* Header với animation */}
        <Fade in timeout={600}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2, mb: 4 }}>
            <Box>
              <Typography sx={{ 
                fontSize: { xs: "1.5rem", md: "1.8rem" }, 
                fontWeight: 800, 
                display: "flex", 
                alignItems: "center", 
                gap: 1.5,
                background: isDark
                  ? "linear-gradient(135deg, #60a5fa, #a78bfa)"
                  : "linear-gradient(135deg, #2563eb, #7c3aed)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha("#3b82f6", 0.15), display: "inline-flex" }}>
                  <Settings sx={{ color: "#3b82f6" }} />
                </Box>
                Thiết lập khấu trừ
              </Typography>
              <Typography sx={{ color: secondaryTextColor, mt: 0.5 }}>
                Cấu hình các loại khấu trừ bảo hiểm, thuế TNCN và các khoản khác
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {hasChanges && (
                <Zoom in>
                  <Chip
                    icon={<WarningAmber sx={{ fontSize: 14 }} />}
                    label="Có thay đổi chưa lưu"
                    size="small"
                    sx={{ 
                      bgcolor: alpha("#f59e0b", 0.15), 
                      color: "#f59e0b", 
                      border: `1px solid ${alpha("#f59e0b", 0.3)}`,
                      fontWeight: 600,
                    }}
                  />
                </Zoom>
              )}
              <Tooltip title="Xem lịch sử thay đổi">
                <Button
                  variant="outlined"
                  startIcon={<History />}
                  sx={{ 
                    color: secondaryTextColor, 
                    borderColor,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      borderColor: "#3b82f6",
                      color: "#3b82f6",
                    },
                  }}
                >
                  Lịch sử
                </Button>
              </Tooltip>
              <Tooltip title="Lưu tất cả thay đổi">
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveAll}
                  disabled={!hasChanges}
                  sx={{ 
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(59,130,246,.3)",
                    },
                    "&:disabled": {
                      opacity: 0.5,
                    },
                  }}
                >
                  Lưu thay đổi
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Fade>

        {/* Tabs với hiệu ứng */}
        <Box sx={{ borderBottom: 2, borderColor, mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, v) => setActiveTab(v)} 
            sx={{ 
              "& .MuiTab-root": { 
                color: secondaryTextColor, 
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#3b82f6",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": { 
                  color: "#3b82f6",
                } 
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 3,
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              },
            }}
          >
            <Tab label="Bảo hiểm" value="insurance" icon={<Shield sx={{ fontSize: 18 }} />} iconPosition="start" />
            <Tab label="Thuế TNCN" value="tax" icon={<Receipt sx={{ fontSize: 18 }} />} iconPosition="start" />
            <Tab label="Khác" value="other" icon={<Settings sx={{ fontSize: 18 }} />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Tab Bảo hiểm */}
        {activeTab === "insurance" && (
          <Grow in timeout={300}>
            <Card sx={{ 
              bgcolor: cardBg, 
              borderRadius: 4, 
              border: `1px solid ${borderColor}`,
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}>
              <CardHeader 
                title={
                  <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1.2rem" }}>
                    Các loại bảo hiểm bắt buộc
                  </Typography>
                }
                subheader={
                  <Typography sx={{ color: secondaryTextColor }}>
                    Cấu hình tỷ lệ đóng bảo hiểm của người lao động và người sử dụng lao động
                  </Typography>
                }
              />
              <CardContent>
                <Stack spacing={2.5}>
                  {deductions.filter(d => d.category === "insurance").map((deduction, index) => {
                    const isHovered = hoveredDeduction === deduction.id;
                    return (
                      <Grow in timeout={300 + index * 100} key={deduction.id}>
                        <Paper
                          sx={{
                            p: 2.5,
                            bgcolor: deduction.isActive 
                              ? (isDark ? alpha("#1e293b", 0.8) : alpha("#f8fafc", 0.8))
                              : alpha("#64748b", 0.05),
                            border: `1px solid ${borderColor}`,
                            borderRadius: 3,
                            opacity: deduction.isActive ? 1 : 0.6,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                            boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,.1)" : "none",
                          }}
                          onMouseEnter={() => setHoveredDeduction(deduction.id)}
                          onMouseLeave={() => setHoveredDeduction(null)}
                        >
                          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                              <Avatar sx={{ 
                                bgcolor: alpha(deduction.color, 0.15),
                                transition: "transform 0.3s ease",
                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                              }}>
                                {deduction.icon}
                              </Avatar>
                              <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                  <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1rem" }}>
                                    {deduction.name}
                                  </Typography>
                                  <Chip 
                                    label={deduction.code} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ 
                                      color: secondaryTextColor, 
                                      borderColor,
                                      fontSize: "0.7rem",
                                      fontWeight: 600,
                                    }} 
                                  />
                                </Box>
                                <Typography sx={{ color: secondaryTextColor, fontSize: "0.8rem", mt: 0.5 }}>
                                  {deduction.description}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography sx={{ color: secondaryTextColor, fontSize: "0.7rem", fontWeight: 500 }}>
                                  NLĐ đóng
                                </Typography>
                                <Typography sx={{ fontWeight: 800, color: deduction.color, fontSize: "1.1rem" }}>
                                  {deduction.employeeRate}%
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography sx={{ color: secondaryTextColor, fontSize: "0.7rem", fontWeight: 500 }}>
                                  NSDLĐ đóng
                                </Typography>
                                <Typography sx={{ fontWeight: 800, color: deduction.color, fontSize: "1.1rem" }}>
                                  {deduction.employerRate}%
                                </Typography>
                              </Box>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleEditDeduction(deduction)} 
                                  sx={{ 
                                    color: secondaryTextColor,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      color: "#3b82f6",
                                      transform: "rotate(15deg)",
                                    },
                                  }}
                                >
                                  <Edit sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                              <Switch 
                                checked={deduction.isActive} 
                                onChange={() => handleToggleActive(deduction.id)}
                                sx={{
                                  "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: deduction.color,
                                  },
                                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    bgcolor: alpha(deduction.color, 0.5),
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                          {(deduction.maxSalary || deduction.minSalary) && (
                            <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${borderColor}`, display: "flex", gap: 3, flexWrap: "wrap" }}>
                              {deduction.maxSalary && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <Info sx={{ fontSize: 14, color: secondaryTextColor }} />
                                  <Typography variant="caption" sx={{ color: secondaryTextColor }}>
                                    Mức lương tối đa: <strong style={{ color: textColor }}>{formatCurrency(deduction.maxSalary)}</strong>
                                  </Typography>
                                </Box>
                              )}
                              {deduction.minSalary && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <Info sx={{ fontSize: 14, color: secondaryTextColor }} />
                                  <Typography variant="caption" sx={{ color: secondaryTextColor }}>
                                    Mức lương tối thiểu: <strong style={{ color: textColor }}>{formatCurrency(deduction.minSalary)}</strong>
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          )}
                        </Paper>
                      </Grow>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        )}

        {/* Tab Thuế TNCN */}
        {activeTab === "tax" && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Grow in timeout={300}>
                <Card sx={{ 
                  bgcolor: cardBg, 
                  borderRadius: 4, 
                  border: `1px solid ${borderColor}`,
                  height: "100%",
                  transition: "all 0.3s ease",
                }}>
                  <CardHeader 
                    title={
                      <Typography sx={{ fontWeight: 700, color: textColor, display: "flex", alignItems: "center", gap: 1 }}>
                        <VerifiedUser sx={{ color: "#3b82f6" }} />
                        Giảm trừ gia cảnh
                      </Typography>
                    } 
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: textColor, mb: 1.5 }}>
                          Giảm trừ bản thân
                        </Typography>
                        <TextField
                          fullWidth
                          type="number"
                          value={personalDeduction.self}
                          onChange={(e) => handlePersonalDeductionChange("self", Number(e.target.value))}
                          size="medium"
                          sx={textFieldSx}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 1, display: "block" }}>
                          Theo quy định hiện hành: {formatCurrency(11000000)}/tháng
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: textColor, mb: 1.5 }}>
                          Giảm trừ người phụ thuộc
                        </Typography>
                        <TextField
                          fullWidth
                          type="number"
                          value={personalDeduction.dependent}
                          onChange={(e) => handlePersonalDeductionChange("dependent", Number(e.target.value))}
                          size="medium"
                          sx={textFieldSx}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: secondaryTextColor, mt: 1, display: "block" }}>
                          Theo quy định hiện hành: {formatCurrency(4400000)}/người/tháng
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Grow in timeout={400}>
                <Card sx={{ 
                  bgcolor: cardBg, 
                  borderRadius: 4, 
                  border: `1px solid ${borderColor}`,
                  height: "100%",
                }}>
                  <CardHeader 
                    title={
                      <Typography sx={{ fontWeight: 700, color: textColor, display: "flex", alignItems: "center", gap: 1 }}>
                        <Calculate sx={{ color: "#3b82f6" }} />
                        Biểu thuế lũy tiến từng phần
                      </Typography>
                    }
                    subheader={
                      <Typography sx={{ color: secondaryTextColor }}>
                        Áp dụng cho thu nhập từ tiền lương, tiền công
                      </Typography>
                    }
                  />
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ borderBottom: `2px solid ${borderColor}` }}>
                            <TableCell sx={{ color: secondaryTextColor, fontWeight: 700, borderBottomColor: borderColor }}>
                              Bậc
                            </TableCell>
                            <TableCell sx={{ color: secondaryTextColor, fontWeight: 700, borderBottomColor: borderColor }}>
                              Thu nhập tính thuế
                            </TableCell>
                            <TableCell align="right" sx={{ color: secondaryTextColor, fontWeight: 700, borderBottomColor: borderColor }}>
                              Thuế suất
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {taxBrackets.map((bracket, index) => (
                            <TableRow 
                              key={bracket.id} 
                              sx={{ 
                                borderBottom: `1px solid ${alpha(borderColor, 0.5)}`,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  bgcolor: alpha("#3b82f6", 0.05),
                                },
                              }}
                            >
                              <TableCell sx={{ color: textColor, fontWeight: 600, borderBottomColor: borderColor }}>
                                {index + 1}
                              </TableCell>
                              <TableCell sx={{ color: secondaryTextColor, borderBottomColor: borderColor }}>
                                {bracket.to
                                  ? `${formatCurrency(bracket.from)} - ${formatCurrency(bracket.to)}`
                                  : `Trên ${formatCurrency(bracket.from)}`}
                              </TableCell>
                              <TableCell align="right" sx={{ borderBottomColor: borderColor }}>
                                <Chip
                                  label={`${bracket.rate}%`}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(getTaxRateColor(bracket.rate), 0.15),
                                    color: getTaxRateColor(bracket.rate),
                                    fontWeight: 700,
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            {/* Công cụ tính thuế nhanh */}
            <Grid size={{ xs: 12 }}>
              <Grow in timeout={500}>
                <Card sx={{ 
                  bgcolor: cardBg, 
                  borderRadius: 4, 
                  border: `1px solid ${borderColor}`,
                  overflow: "hidden",
                }}>
                  <CardHeader 
                    title={
                      <Typography sx={{ fontWeight: 700, color: textColor, display: "flex", alignItems: "center", gap: 1 }}>
                        <TrendingUp sx={{ color: "#3b82f6" }} />
                        Công cụ tính thuế nhanh
                      </Typography>
                    } 
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2.5}>
                          <TextField
                            label="Lương Gross (VNĐ)"
                            type="number"
                            value={grossSalary}
                            onChange={(e) => setGrossSalary(Number(e.target.value))}
                            fullWidth
                            size="medium"
                            sx={textFieldSx}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                              },
                            }}
                          />
                          <TextField
                            label="Số người phụ thuộc"
                            type="number"
                            value={dependents}
                            onChange={(e) => setDependents(Number(e.target.value))}
                            fullWidth
                            size="medium"
                            sx={textFieldSx}
                          />
                          <TextField
                            label="Khấu trừ bảo hiểm (VNĐ)"
                            type="number"
                            value={insuranceDeduction}
                            onChange={(e) => setInsuranceDeduction(Number(e.target.value))}
                            fullWidth
                            size="medium"
                            sx={textFieldSx}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                              },
                            }}
                          />
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ 
                          p: 2.5, 
                          bgcolor: alpha(cardBg, 0.5), 
                          borderRadius: 3, 
                          border: `1px solid ${borderColor}`,
                          transition: "all 0.3s ease",
                          transform: animateResult ? "scale(1.02)" : "scale(1)",
                        }}>
                          <Stack spacing={1.5}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5, borderBottom: `1px solid ${borderColor}` }}>
                              <Typography sx={{ color: secondaryTextColor }}>Lương Gross</Typography>
                              <Typography sx={{ fontWeight: 600, color: textColor }}>{formatCurrency(grossSalary)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5, borderBottom: `1px solid ${borderColor}` }}>
                              <Typography sx={{ color: secondaryTextColor }}>Giảm trừ bản thân</Typography>
                              <Typography sx={{ color: "#ef4444", fontWeight: 500 }}>-{formatCurrency(personalDeduction.self)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5, borderBottom: `1px solid ${borderColor}` }}>
                              <Typography sx={{ color: secondaryTextColor }}>Giảm trừ người phụ thuộc</Typography>
                              <Typography sx={{ color: "#ef4444", fontWeight: 500 }}>-{formatCurrency(dependents * personalDeduction.dependent)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5, borderBottom: `1px solid ${borderColor}` }}>
                              <Typography sx={{ color: secondaryTextColor }}>Khấu trừ bảo hiểm</Typography>
                              <Typography sx={{ color: "#ef4444", fontWeight: 500 }}>-{formatCurrency(insuranceDeduction)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5, borderBottom: `1px solid ${borderColor}` }}>
                              <Typography sx={{ fontWeight: 600, color: "#f59e0b" }}>Thu nhập chịu thuế</Typography>
                              <Typography sx={{ fontWeight: 600, color: "#f59e0b" }}>{formatCurrency(taxableIncome)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5, borderBottom: `1px solid ${borderColor}` }}>
                              <Typography sx={{ color: secondaryTextColor }}>Thuế TNCN</Typography>
                              <Typography sx={{ color: "#ef4444", fontWeight: 600 }}>-{formatCurrency(taxAmount)}</Typography>
                            </Box>
                            <Box sx={{ 
                              display: "flex", 
                              justifyContent: "space-between", 
                              pt: 1.5, 
                              bgcolor: alpha("#3b82f6", 0.1), 
                              p: 2, 
                              borderRadius: 2,
                              transition: "all 0.3s ease",
                            }}>
                              <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1rem" }}>Lương Net (tạm tính)</Typography>
                              <Typography sx={{ 
                                fontWeight: 800, 
                                fontSize: "1.3rem", 
                                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}>
                                {formatCurrency(netSalary)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        )}

        {/* Tab Khác */}
        {activeTab === "other" && (
          <Grow in timeout={300}>
            <Card sx={{ 
              bgcolor: cardBg, 
              borderRadius: 4, 
              border: `1px solid ${borderColor}`,
              overflow: "hidden",
            }}>
              <CardHeader 
                title={
                  <Typography sx={{ fontWeight: 700, color: textColor, display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalAtm sx={{ color: "#3b82f6" }} />
                    Các khoản khấu trừ khác
                  </Typography>
                }
                subheader={
                  <Typography sx={{ color: secondaryTextColor }}>
                    Quản lý các khoản khấu trừ bổ sung như đoàn phí, phí dịch vụ,...
                  </Typography>
                }
                action={
                  <Button 
                    variant="contained" 
                    startIcon={<Add />} 
                    size="medium" 
                    onClick={() => setIsAddDialogOpen(true)} 
                    sx={{ 
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 5px 15px rgba(59,130,246,.3)",
                      },
                    }}
                  >
                    Thêm mới
                  </Button>
                }
              />
              <CardContent>
                <Stack spacing={2.5}>
                  {deductions.filter(d => d.category === "other").map((deduction, index) => {
                    const isHovered = hoveredDeduction === deduction.id;
                    return (
                      <Grow in timeout={300 + index * 100} key={deduction.id}>
                        <Paper
                          sx={{
                            p: 2.5,
                            bgcolor: deduction.isActive 
                              ? (isDark ? alpha("#1e293b", 0.8) : alpha("#f8fafc", 0.8))
                              : alpha("#64748b", 0.05),
                            border: `1px solid ${borderColor}`,
                            borderRadius: 3,
                            opacity: deduction.isActive ? 1 : 0.6,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                            boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,.1)" : "none",
                          }}
                          onMouseEnter={() => setHoveredDeduction(deduction.id)}
                          onMouseLeave={() => setHoveredDeduction(null)}
                        >
                          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                              <Avatar sx={{ 
                                bgcolor: alpha(deduction.color, 0.15),
                                transition: "transform 0.3s ease",
                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                              }}>
                                {deduction.icon}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontWeight: 700, color: textColor }}>{deduction.name}</Typography>
                                <Typography sx={{ color: secondaryTextColor, fontSize: "0.8rem" }}>{deduction.description}</Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography sx={{ color: secondaryTextColor, fontSize: "0.7rem" }}>NLĐ đóng</Typography>
                                <Typography sx={{ fontWeight: 700, color: deduction.color }}>
                                  {deduction.type === "percentage" ? `${deduction.employeeRate}%` : `${deduction.employeeRate}% lương`}
                                </Typography>
                              </Box>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleEditDeduction(deduction)} 
                                  sx={{ 
                                    color: secondaryTextColor,
                                    "&:hover": { color: "#3b82f6" },
                                  }}
                                >
                                  <Edit sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDeleteDeduction(deduction.id)} 
                                  sx={{ color: "#ef4444" }}
                                >
                                  <Delete sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                              <Switch 
                                checked={deduction.isActive} 
                                onChange={() => handleToggleActive(deduction.id)}
                                sx={{
                                  "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: deduction.color,
                                  },
                                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    bgcolor: alpha(deduction.color, 0.5),
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Paper>
                      </Grow>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        )}

        {/* Dialog chỉnh sửa khấu trừ */}
        <Dialog 
          open={isEditDialogOpen} 
          onClose={() => setIsEditDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth 
          TransitionComponent={Zoom}
          PaperProps={{ 
            sx: { 
              bgcolor: dialogBg, 
              borderRadius: 4,
              backgroundImage: "none",
            } 
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: `1px solid ${borderColor}`, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            pb: 2,
          }}>
            <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1.2rem" }}>
              Chỉnh sửa {editingDeduction?.name}
            </Typography>
            <IconButton onClick={() => setIsEditDialogOpen(false)} size="small" sx={{ color: secondaryTextColor }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: 3 }}>
            {editingDeduction && (
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography sx={{ fontWeight: 600, color: textColor, mb: 1 }}>Tỷ lệ NLĐ đóng (%)</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={editingDeduction.employeeRate}
                      onChange={(e) => setEditingDeduction({ ...editingDeduction, employeeRate: Number(e.target.value) })}
                      size="small"
                      sx={textFieldSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography sx={{ fontWeight: 600, color: textColor, mb: 1 }}>Tỷ lệ NSDLĐ đóng (%)</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={editingDeduction.employerRate}
                      onChange={(e) => setEditingDeduction({ ...editingDeduction, employerRate: Number(e.target.value) })}
                      size="small"
                      sx={textFieldSx}
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Mức lương tối đa áp dụng (VNĐ)"
                  type="number"
                  value={editingDeduction.maxSalary || ""}
                  onChange={(e) => setEditingDeduction({ ...editingDeduction, maxSalary: e.target.value ? Number(e.target.value) : null })}
                  fullWidth
                  size="small"
                  placeholder="Không giới hạn"
                  sx={textFieldSx}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                    },
                  }}
                />
                <TextField
                  label="Mức lương tối thiểu áp dụng (VNĐ)"
                  type="number"
                  value={editingDeduction.minSalary || ""}
                  onChange={(e) => setEditingDeduction({ ...editingDeduction, minSalary: e.target.value ? Number(e.target.value) : null })}
                  fullWidth
                  size="small"
                  placeholder="Không giới hạn"
                  sx={textFieldSx}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                    },
                  }}
                />
                <TextField
                  label="Mô tả"
                  value={editingDeduction.description}
                  onChange={(e) => setEditingDeduction({ ...editingDeduction, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  sx={textFieldSx}
                />
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ borderTop: `1px solid ${borderColor}`, p: 2.5, gap: 1.5 }}>
            <Button 
              variant="outlined" 
              onClick={() => setIsEditDialogOpen(false)} 
              sx={{ 
                color: secondaryTextColor, 
                borderColor,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#3b82f6",
                  color: "#3b82f6",
                },
              }}
            >
              Hủy
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveDeduction} 
              sx={{ 
                bgcolor: "#3b82f6", 
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#2563eb" } 
              }}
            >
              Lưu thay đổi
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog thêm mới khấu trừ */}
        <Dialog 
          open={isAddDialogOpen} 
          onClose={() => setIsAddDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth 
          TransitionComponent={Zoom}
          PaperProps={{ 
            sx: { 
              bgcolor: dialogBg, 
              borderRadius: 4,
              backgroundImage: "none",
            } 
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: `1px solid ${borderColor}`, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            pb: 2,
          }}>
            <Typography sx={{ fontWeight: 700, color: textColor, fontSize: "1.2rem" }}>
              Thêm khoản khấu trừ mới
            </Typography>
            <IconButton onClick={() => setIsAddDialogOpen(false)} size="small" sx={{ color: secondaryTextColor }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <TextField
                label="Tên khoản khấu trừ"
                value={newDeduction.name}
                onChange={(e) => setNewDeduction({ ...newDeduction, name: e.target.value })}
                fullWidth
                size="small"
                placeholder="VD: Phí gửi xe"
                sx={textFieldSx}
              />
              <TextField
                label="Mã code"
                value={newDeduction.code}
                onChange={(e) => setNewDeduction({ ...newDeduction, code: e.target.value })}
                fullWidth
                size="small"
                placeholder="VD: GUIXE"
                sx={textFieldSx}
              />
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: inputLabelColor }}>Loại khấu trừ</InputLabel>
                <Select
                  value={newDeduction.type}
                  onChange={(e) => setNewDeduction({ ...newDeduction, type: e.target.value as "percentage" | "fixed" })}
                  label="Loại khấu trừ"
                  sx={selectSx}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: dialogBg,
                        "& .MuiMenuItem-root": {
                          color: textColor,
                          "&:hover": {
                            bgcolor: alpha("#3b82f6", 0.1),
                          },
                          "&.Mui-selected": {
                            bgcolor: alpha("#3b82f6", 0.2),
                            "&:hover": {
                              bgcolor: alpha("#3b82f6", 0.3),
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="percentage" sx={{ color: textColor }}>Phần trăm lương</MenuItem>
                  <MenuItem value="fixed" sx={{ color: textColor }}>Số tiền cố định</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: inputLabelColor }}>Danh mục</InputLabel>
                <Select
                  value={newDeduction.category}
                  onChange={(e) => setNewDeduction({ ...newDeduction, category: e.target.value as "insurance" | "tax" | "other" })}
                  label="Danh mục"
                  sx={selectSx}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: dialogBg,
                        "& .MuiMenuItem-root": {
                          color: textColor,
                          "&:hover": {
                            bgcolor: alpha("#3b82f6", 0.1),
                          },
                          "&.Mui-selected": {
                            bgcolor: alpha("#3b82f6", 0.2),
                            "&:hover": {
                              bgcolor: alpha("#3b82f6", 0.3),
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="insurance" sx={{ color: textColor }}>Bảo hiểm</MenuItem>
                  <MenuItem value="tax" sx={{ color: textColor }}>Thuế</MenuItem>
                  <MenuItem value="other" sx={{ color: textColor }}>Khác</MenuItem>
                </Select>
              </FormControl>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Tỷ lệ NLĐ đóng (%)"
                    type="number"
                    value={newDeduction.employeeRate}
                    onChange={(e) => setNewDeduction({ ...newDeduction, employeeRate: Number(e.target.value) })}
                    fullWidth
                    size="small"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Tỷ lệ NSDLĐ đóng (%)"
                    type="number"
                    value={newDeduction.employerRate}
                    onChange={(e) => setNewDeduction({ ...newDeduction, employerRate: Number(e.target.value) })}
                    fullWidth
                    size="small"
                    sx={textFieldSx}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Mô tả"
                value={newDeduction.description}
                onChange={(e) => setNewDeduction({ ...newDeduction, description: e.target.value })}
                fullWidth
                multiline
                rows={2}
                size="small"
                sx={textFieldSx}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ borderTop: `1px solid ${borderColor}`, p: 2.5, gap: 1.5 }}>
            <Button 
              variant="outlined" 
              onClick={() => setIsAddDialogOpen(false)} 
              sx={{ 
                color: secondaryTextColor, 
                borderColor,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#3b82f6",
                  color: "#3b82f6",
                },
              }}
            >
              Hủy
            </Button>
            <Button 
              variant="contained" 
              onClick={handleAddDeduction} 
              disabled={!newDeduction.name || !newDeduction.code} 
              sx={{ 
                bgcolor: "#3b82f6", 
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#2563eb" } 
              }}
            >
              Thêm khoản khấu trừ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar với animation */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          TransitionComponent={Zoom}
        >
          <Alert 
            severity={snackbar.severity} 
            sx={{ 
              bgcolor: cardBg, 
              color: textColor,
              borderRadius: 2,
              fontWeight: 600,
              alignItems: "center",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ThietLapKhauTru;