import { useMemo, useState, useEffect } from "react";
import type { ElementType } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
  Tabs,
  TextField,
  Typography,
  alpha,
  Fade,
  Grow,
  Zoom,
  IconButton,
  Tooltip,
  LinearProgress,
  Badge,
  Collapse,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BriefcaseIcon from "@mui/icons-material/Work";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import InfoIcon from "@mui/icons-material/Info";
import LanguageIcon from "@mui/icons-material/Language";
import SaveIcon from "@mui/icons-material/Save";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "../../context/themecontext";

type Criterion = {
  id: string;
  name: string;
  coefficient: number;
};

type CompetencyGroup = {
  id: string;
  name: string;
  icon: string;
  description: string;
  criteria: Criterion[];
};

const defaultCompetencyGroups: CompetencyGroup[] = [
  {
    id: "education",
    name: "Trình độ học vấn",
    icon: "GraduationCap",
    description: "Bằng cấp, chứng chỉ học thuật",
    criteria: [
      { id: "edu-1", name: "Trung cấp / Cao đẳng", coefficient: 1.0 },
      { id: "edu-2", name: "Đại học", coefficient: 1.15 },
      { id: "edu-3", name: "Thạc sĩ", coefficient: 1.3 },
      { id: "edu-4", name: "Tiến sĩ", coefficient: 1.5 },
    ],
  },
  {
    id: "experience",
    name: "Kinh nghiệm làm việc",
    icon: "Briefcase",
    description: "Số năm kinh nghiệm trong ngành",
    criteria: [
      { id: "exp-1", name: "Dưới 1 năm", coefficient: 1.0 },
      { id: "exp-2", name: "1 - 3 năm", coefficient: 1.1 },
      { id: "exp-3", name: "3 - 5 năm", coefficient: 1.2 },
      { id: "exp-4", name: "5 - 10 năm", coefficient: 1.35 },
      { id: "exp-5", name: "Trên 10 năm", coefficient: 1.5 },
    ],
  },
  {
    id: "certification",
    name: "Chứng chỉ chuyên môn",
    icon: "EmojiEventsIcon",
    description: "Chứng chỉ nghề nghiệp, chuyên môn",
    criteria: [
      { id: "cert-0", name: "Không có", coefficient: 1.0 },
      { id: "cert-1", name: "Chứng chỉ cơ bản", coefficient: 1.05 },
      { id: "cert-2", name: "Chứng chỉ nâng cao", coefficient: 1.15 },
      { id: "cert-3", name: "Chứng chỉ chuyên gia", coefficient: 1.25 },
      { id: "cert-4", name: "Chứng chỉ quốc tế", coefficient: 1.4 },
    ],
  },
  {
    id: "language",
    name: "Ngoại ngữ",
    icon: "Languages",
    description: "Trình độ ngoại ngữ",
    criteria: [
      { id: "lang-0", name: "Không yêu cầu", coefficient: 1.0 },
      { id: "lang-1", name: "Giao tiếp cơ bản", coefficient: 1.05 },
      { id: "lang-2", name: "Giao tiếp tốt", coefficient: 1.15 },
      { id: "lang-3", name: "Thành thạo", coefficient: 1.25 },
      { id: "lang-4", name: "Song ngữ / Phiên dịch", coefficient: 1.4 },
    ],
  },
  {
    id: "skills",
    name: "Kỹ năng chuyên môn",
    icon: "FileCheck",
    description: "Kỹ năng liên quan đến công việc",
    criteria: [
      { id: "skill-1", name: "Cơ bản", coefficient: 1.0 },
      { id: "skill-2", name: "Trung bình", coefficient: 1.1 },
      { id: "skill-3", name: "Khá", coefficient: 1.2 },
      { id: "skill-4", name: "Giỏi", coefficient: 1.35 },
      { id: "skill-5", name: "Xuất sắc", coefficient: 1.5 },
    ],
  },
];

const defaultWeights: Record<string, number> = {
  education: 25,
  experience: 30,
  certification: 15,
  language: 10,
  skills: 20,
};

const iconMap: Record<string, ElementType> = {
  GraduationCap: SchoolIcon,
  Briefcase: BriefcaseIcon,
  EmojiEventsIcon: EmojiEventsIcon,
  Languages: LanguageIcon,
  FileCheck: FactCheckIcon,
};

export default function DanhGiaNangLuc() {
  const { isDark } = useTheme();
  const [competencyGroups, setCompetencyGroups] = useState<CompetencyGroup[]>(
    defaultCompetencyGroups,
  );
  const [weights, setWeights] =
    useState<Record<string, number>>(defaultWeights);
  const [activeTab, setActiveTab] = useState("criteria");
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddCriterionOpen, setIsAddCriterionOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [newGroupIcon, setNewGroupIcon] = useState("FileCheck");
  const [newCriterionName, setNewCriterionName] = useState("");
  const [newCriterionCoef, setNewCriterionCoef] = useState(1.0);
  const [simValues, setSimValues] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [animateValue, setAnimateValue] = useState(false);

  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const secondaryColor = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255,255,255,0.96)";
  const borderColor = isDark
    ? "rgba(71, 85, 105, 0.35)"
    : "rgba(226,232,240,0.95)";
  const inputBg = isDark ? "rgba(15, 23, 42, 0.6)" : "#f8fafc";
  const inputBorderColor = isDark ? "rgba(71, 85, 105, 0.5)" : "rgba(226,232,240,0.8)";

  const totalWeight = useMemo(
    () => Object.values(weights).reduce((sum, value) => sum + value, 0),
    [weights],
  );

  const totalCoefficient = useMemo(() => {
    let weightedSum = 0;
    let appliedWeight = 0;

    competencyGroups.forEach((group) => {
      const weight = weights[group.id] || 0;
      const selectedCriterionId = simValues[group.id];
      const criterion = group.criteria.find(
        (item) => item.id === selectedCriterionId,
      );
      const coefficient = criterion?.coefficient ?? 1.0;

      weightedSum += weight * coefficient;
      appliedWeight += weight;
    });

    if (appliedWeight === 0) return 1.0;
    return weightedSum / appliedWeight;
  }, [competencyGroups, simValues, weights]);

  const baseSalary = 10000000;
  const p2Salary = Math.round(baseSalary * (totalCoefficient - 1));

  useEffect(() => {
    setAnimateValue(true);
    const timer = setTimeout(() => setAnimateValue(false), 500);
    return () => clearTimeout(timer);
  }, [totalCoefficient]);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("vi-VN").format(num);

  const handleAddGroup = () => {
    if (!newGroupName.trim()) return;

    const groupId = `group-${Date.now()}`;
    const newGroup: CompetencyGroup = {
      id: groupId,
      name: newGroupName,
      icon: newGroupIcon,
      description: newGroupDesc,
      criteria: [
        { id: `crit-${Date.now()}`, name: "Mức cơ bản", coefficient: 1.0 },
      ],
    };

    setCompetencyGroups((prev) => [...prev, newGroup]);
    setWeights((prev) => ({ ...prev, [groupId]: 10 }));
    setNewGroupName("");
    setNewGroupDesc("");
    setNewGroupIcon("FileCheck");
    setIsAddGroupOpen(false);
    setSnackbar({
      open: true,
      message: "Đã thêm nhóm năng lực",
      severity: "success",
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    setCompetencyGroups((prev) => prev.filter((group) => group.id !== groupId));
    setWeights((prev) => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });
    setSimValues((prev) => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });
    setSnackbar({
      open: true,
      message: "Đã xóa nhóm năng lực",
      severity: "success",
    });
  };

  const handleAddCriterion = () => {
    if (!selectedGroupId || !newCriterionName.trim()) return;

    setCompetencyGroups((prev) =>
      prev.map((group) => {
        if (group.id !== selectedGroupId) return group;
        return {
          ...group,
          criteria: [
            ...group.criteria,
            {
              id: `crit-${Date.now()}`,
              name: newCriterionName,
              coefficient: newCriterionCoef,
            },
          ].sort((a, b) => b.coefficient - a.coefficient),
        };
      }),
    );

    setNewCriterionName("");
    setNewCriterionCoef(1.0);
    setIsAddCriterionOpen(false);
    setSnackbar({
      open: true,
      message: "Đã thêm mức đánh giá",
      severity: "success",
    });
  };

  const handleDeleteCriterion = (groupId: string, criterionId: string) => {
    setCompetencyGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          criteria: group.criteria.filter(
            (criterion) => criterion.id !== criterionId,
          ),
        };
      }),
    );
  };

  const handleUpdateCriterion = (
    groupId: string,
    criterionId: string,
    field: "name" | "coefficient",
    value: string | number,
  ) => {
    setCompetencyGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          criteria: group.criteria.map((criterion) =>
            criterion.id === criterionId
              ? { ...criterion, [field]: value }
              : criterion,
          ),
        };
      }),
    );
  };

  const getCompletionPercentage = () => {
    const selected = Object.values(simValues).filter(Boolean).length;
    return (selected / competencyGroups.length) * 100;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 3 },
        py: 3,
        background: isDark
          ? "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #eef6ff 50%, #f0f9ff 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        {/* Header Section */}
        <Fade in timeout={600}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    background: isDark
                      ? "linear-gradient(135deg, #60a5fa, #a78bfa)"
                      : "linear-gradient(135deg, #2563eb, #7c3aed)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Thiết lập khung năng lực
                </Typography>
                <Typography sx={{ mt: 1, color: secondaryColor, fontSize: "0.95rem" }}>
                  Cấu hình các chỉ số năng lực và hệ số tương ứng để tính lương P2
                </Typography>
              </Box>

              <Zoom in timeout={400}>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 3,
                    px: 3.5,
                    py: 1.5,
                    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                    boxShadow: "0 10px 25px rgba(37,99,235,.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 35px rgba(37,99,235,.4)",
                    },
                  }}
                >
                  Lưu cấu hình
                </Button>
              </Zoom>
            </Box>
          </Box>
        </Fade>

        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            background: "transparent",
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 56,
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 999,
                background: "linear-gradient(90deg,#2563eb,#06b6d4)",
              },
              "& .MuiTab-root": {
                minHeight: 56,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: secondaryColor,
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#2563eb",
                  transform: "translateY(-2px)",
                },
              },
              "& .Mui-selected": {
                color: "#2563eb !important",
              },
            }}
          >
            <Tab
              value="criteria"
              icon={<SettingsIcon />}
              iconPosition="start"
              label="Tiêu chí năng lực"
            />
            <Tab
              value="weights"
              icon={<EmojiEventsIcon />}
              iconPosition="start"
              label="Trọng số"
            />
            <Tab
              value="simulation"
              icon={<FactCheckIcon />}
              iconPosition="start"
              label="Mô phỏng"
            />
          </Tabs>
        </Paper>

        {/* Criteria Tab */}
        {activeTab === "criteria" && (
          <Stack spacing={3}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grow in timeout={300}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddGroupOpen(true)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 3,
                    py: 1,
                    px: 3,
                    borderColor: isDark
                      ? "rgba(148,163,184,.35)"
                      : "rgba(148,163,184,.4)",
                    color: textColor,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#2563eb",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Thêm nhóm năng lực
                </Button>
              </Grow>
            </Box>

            {competencyGroups.map((group, index) => {
              const IconComponent = iconMap[group.icon] || FactCheckIcon;
              const isExpanded = expandedGroups[group.id] ?? true;
              const isHovered = hoveredGroup === group.id;

              return (
                <Grow in timeout={300 + index * 100} key={group.id}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${borderColor}`,
                      background: cardBg,
                      boxShadow: isHovered
                        ? "0 20px 40px rgba(0,0,0,.15)"
                        : isDark
                        ? "0 14px 35px rgba(0,0,0,.24)"
                        : "0 14px 35px rgba(15,23,42,.06)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setHoveredGroup(group.id)}
                    onMouseLeave={() => setHoveredGroup(null)}
                  >
                    <CardHeader
                      sx={{ pb: 1.5, cursor: "pointer" }}
                      onClick={() => setExpandedGroups(prev => ({ ...prev, [group.id]: !isExpanded }))}
                      title={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Badge
                              badgeContent={group.criteria.length}
                              color="primary"
                              sx={{
                                "& .MuiBadge-badge": {
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                },
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 2.5,
                                  background: `linear-gradient(135deg, ${alpha("#2563eb", 0.15)}, ${alpha("#06b6d4", 0.15)})`,
                                  color: "#2563eb",
                                  transition: "all 0.3s ease",
                                  ...(isHovered && {
                                    transform: "scale(1.05)",
                                  }),
                                }}
                              >
                                <IconComponent />
                              </Avatar>
                            </Badge>
                            <Box>
                              <Typography
                                sx={{ fontWeight: 700, fontSize: "1.1rem", color: textColor }}
                              >
                                {group.name}
                              </Typography>
                              <Typography
                                sx={{ color: secondaryColor, fontSize: "0.8rem", mt: 0.25 }}
                              >
                                {group.description}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Tooltip title="Thêm mức đánh giá">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedGroupId(group.id);
                                  setIsAddCriterionOpen(true);
                                }}
                                sx={{ color: "#2563eb" }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa nhóm">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteGroup(group.id);
                                }}
                                sx={{ color: "#ef4444" }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedGroups(prev => ({ ...prev, [group.id]: !isExpanded }));
                              }}
                              sx={{ color: textColor }}
                            >
                              <ChevronRightIcon
                                sx={{
                                  transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      }
                    />

                    <Collapse in={isExpanded}>
                      <CardContent sx={{ pt: 0 }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ "& th": { borderBottom: `2px solid ${borderColor}` } }}>
                              <TableCell
                                sx={{
                                  width: "50%",
                                  color: secondaryColor,
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                  borderBottomColor: borderColor,
                                }}
                              >
                                Mức đánh giá
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ color: secondaryColor, fontWeight: 700, fontSize: "0.85rem", borderBottomColor: borderColor }}
                              >
                                Hệ số
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  width: 120,
                                  color: secondaryColor,
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                  borderBottomColor: borderColor,
                                }}
                              >
                                Thao tác
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {group.criteria.map((criterion) => (
                              <TableRow key={criterion.id} hover>
                                <TableCell sx={{ borderBottomColor: borderColor }}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    value={criterion.name}
                                    onChange={(event) =>
                                      handleUpdateCriterion(
                                        group.id,
                                        criterion.id,
                                        "name",
                                        event.target.value,
                                      )
                                    }
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        bgcolor: inputBg,
                                        color: textColor,
                                        transition: "all 0.2s ease",
                                        "& fieldset": {
                                          borderColor: inputBorderColor,
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "#2563eb",
                                        },
                                      },
                                      "& .MuiInputBase-input": {
                                        color: textColor,
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottomColor: borderColor }}>
                                  <TextField
                                    type="number"
                                    size="small"
                                    value={criterion.coefficient}
                                    inputProps={{ step: 0.05, min: 0.5, max: 3 }}
                                    onChange={(event) =>
                                      handleUpdateCriterion(
                                        group.id,
                                        criterion.id,
                                        "coefficient",
                                        Number(event.target.value) || 1,
                                      )
                                    }
                                    sx={{
                                      width: 110,
                                      mx: "auto",
                                      display: "block",
                                      "& .MuiOutlinedInput-root": {
                                        bgcolor: inputBg,
                                        color: textColor,
                                        "& fieldset": {
                                          borderColor: inputBorderColor,
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "#2563eb",
                                        },
                                      },
                                      "& .MuiInputBase-input": {
                                        color: textColor,
                                        textAlign: "center",
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right" sx={{ borderBottomColor: borderColor }}>
                                  <Tooltip title="Xóa mức">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() =>
                                        handleDeleteCriterion(group.id, criterion.id)
                                      }
                                      disabled={group.criteria.length <= 1}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grow>
              );
            })}
          </Stack>
        )}

        {/* Weights Tab */}
        {activeTab === "weights" && (
          <Grow in timeout={300}>
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${borderColor}`,
                background: cardBg,
                boxShadow: isDark
                  ? "0 14px 35px rgba(0,0,0,.24)"
                  : "0 14px 35px rgba(15,23,42,.06)",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontWeight: 700,
                      color: textColor,
                    }}
                  >
                    <EmojiEventsIcon sx={{ color: "#2563eb" }} />
                    Cấu hình trọng số
                  </Typography>
                }
                subheader={
                  <Typography sx={{ color: secondaryColor }}>
                    Phân bổ trọng số cho từng nhóm năng lực. Tổng trọng số phải bằng 100%.
                  </Typography>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <Stack spacing={3.5}>
                  {competencyGroups.map((group) => {
                    const IconComponent = iconMap[group.icon] || FactCheckIcon;
                    const weight = weights[group.id] || 0;

                    return (
                      <Box
                        key={group.id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1.5,
                                bgcolor: alpha("#2563eb", 0.1),
                                color: "#2563eb",
                              }}
                            >
                              <IconComponent sx={{ fontSize: "1rem" }} />
                            </Avatar>
                            <Typography
                              sx={{ fontWeight: 600, color: textColor }}
                            >
                              {group.name}
                            </Typography>
                          </Box>
                          <Chip
                            label={`${weight}%`}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: weight > 0 ? alpha("#2563eb", 0.1) : "transparent",
                              color: weight > 0 ? "#2563eb" : secondaryColor,
                            }}
                          />
                        </Box>
                        <Slider
                          value={weight}
                          min={0}
                          max={100}
                          step={5}
                          onChange={(_, value) =>
                            setWeights((prev) => ({
                              ...prev,
                              [group.id]: value as number,
                            }))
                          }
                          sx={{
                            "& .MuiSlider-track": {
                              background: "linear-gradient(90deg, #2563eb, #06b6d4)",
                              border: "none",
                            },
                            "& .MuiSlider-thumb": {
                              width: 16,
                              height: 16,
                              "&:hover": {
                                boxShadow: "0 0 0 8px rgba(37,99,235,.16)",
                              },
                            },
                          }}
                        />
                      </Box>
                    );
                  })}

                  <Divider sx={{ my: 1, borderColor: borderColor }} />

                  <Box sx={{ pt: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, color: textColor }}>
                        Tổng trọng số
                      </Typography>
                      <Chip
                        label={`${totalWeight}%`}
                        color={totalWeight === 100 ? "success" : "error"}
                        sx={{ fontWeight: 700 }}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(totalWeight, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: alpha("#ef4444", 0.2),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          background: totalWeight === 100
                            ? "linear-gradient(90deg, #22c55e, #10b981)"
                            : totalWeight > 100
                            ? "#ef4444"
                            : "linear-gradient(90deg, #f59e0b, #f97316)",
                        },
                      }}
                    />
                    {totalWeight !== 100 && (
                      <Typography
                        sx={{
                          mt: 1.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          color: "#ef4444",
                          fontSize: 13,
                        }}
                      >
                        <InfoIcon sx={{ fontSize: 16 }} />
                        Tổng trọng số phải bằng 100%
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        )}

        {/* Simulation Tab */}
        {activeTab === "simulation" && (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grow in timeout={300}>
                <Card
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${borderColor}`,
                    background: cardBg,
                    boxShadow: isDark
                      ? "0 14px 35px rgba(0,0,0,.24)"
                      : "0 14px 35px rgba(15,23,42,.06)",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontWeight: 700,
                          color: textColor,
                        }}
                      >
                        <FactCheckIcon sx={{ color: "#2563eb" }} />
                        Nhập chỉ số năng lực
                      </Typography>
                    }
                    subheader={
                      <Typography sx={{ color: secondaryColor }}>
                        Chọn mức năng lực cho từng nhóm để xem hệ số P2 tương ứng
                      </Typography>
                    }
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <Stack spacing={3}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="caption" sx={{ color: secondaryColor }}>
                            Tiến độ hoàn thành
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#2563eb" }}>
                            {Math.round(getCompletionPercentage())}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={getCompletionPercentage()}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: alpha("#2563eb", 0.1),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              background: "linear-gradient(90deg, #2563eb, #06b6d4)",
                            },
                          }}
                        />
                      </Box>

                      {competencyGroups.map((group) => {
                        const IconComponent = iconMap[group.icon] || FactCheckIcon;
                        const selectedValue = simValues[group.id] || "";
                        const selectedCriterion = group.criteria.find(c => c.id === selectedValue);

                        return (
                          <Box
                            key={group.id}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1.5,
                              p: 2,
                              borderRadius: 3,
                              bgcolor: selectedValue ? alpha("#2563eb", isDark ? 0.05 : 0.03) : "transparent",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 2,
                                  bgcolor: alpha("#2563eb", 0.1),
                                  color: "#2563eb",
                                }}
                              >
                                <IconComponent sx={{ fontSize: "1rem" }} />
                              </Avatar>
                              <Typography
                                sx={{ fontWeight: 600, color: textColor }}
                              >
                                {group.name}
                              </Typography>
                              <Chip
                                label={`${weights[group.id] || 0}%`}
                                variant="outlined"
                                size="small"
                                sx={{ ml: "auto", fontWeight: 700, color: textColor }}
                              />
                            </Box>

                            <FormControl fullWidth size="small">
                              <InputLabel sx={{ color: secondaryColor }}>Chọn mức năng lực</InputLabel>
                              <Select
                                value={selectedValue}
                                label="Chọn mức năng lực"
                                onChange={(event) =>
                                  setSimValues((prev) => ({
                                    ...prev,
                                    [group.id]: event.target.value,
                                  }))
                                }
                                sx={{
                                  bgcolor: inputBg,
                                  color: textColor,
                                  transition: "all 0.2s ease",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: inputBorderColor,
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2563eb",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2563eb",
                                  },
                                }}
                              >
                                {group.criteria.map((criterion) => (
                                  <MenuItem
                                    key={criterion.id}
                                    value={criterion.id}
                                    sx={{ color: textColor }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        width: "100%",
                                      }}
                                    >
                                      <span>{criterion.name}</span>
                                      <Chip
                                        label={`x${criterion.coefficient.toFixed(2)}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 600 }}
                                      />
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            {selectedCriterion && (
                              <Fade in>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                  <Chip
                                    icon={<CheckCircleIcon />}
                                    label={`Đã chọn: ${selectedCriterion.name}`}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha("#22c55e", 0.1),
                                      color: "#22c55e",
                                      fontWeight: 500,
                                    }}
                                  />
                                </Box>
                              </Fade>
                            )}
                          </Box>
                        );
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                <Grow in timeout={400}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: "1px solid rgba(37,99,235,.25)",
                      background: `linear-gradient(135deg, ${alpha("#2563eb", isDark ? 0.15 : 0.12)}, ${alpha("#06b6d4", isDark ? 0.08 : 0.06)})`,
                      transform: animateValue ? "scale(1.02)" : "scale(1)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <CardHeader
                      sx={{ pb: 1 }}
                      title={
                        <Typography
                          sx={{ fontSize: 18, fontWeight: 700, color: textColor }}
                        >
                          Hệ số năng lực (P2)
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: "3rem",
                          fontWeight: 800,
                          background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1,
                        }}
                      >
                        x{totalCoefficient.toFixed(3)}
                      </Typography>
                      <Typography
                        sx={{ mt: 1, color: secondaryColor, fontSize: 13 }}
                      >
                        Hệ số tổng hợp từ các chỉ số
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>

                <Grow in timeout={500}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${borderColor}`,
                      background: cardBg,
                    }}
                  >
                    <CardHeader
                      sx={{ pb: 1 }}
                      title={
                        <Typography
                          sx={{ fontSize: 18, fontWeight: 700, color: textColor }}
                        >
                          Ước tính lương P2
                        </Typography>
                      }
                      subheader={
                        <Typography sx={{ color: secondaryColor, fontSize: 12 }}>
                          Dựa trên lương P1 cơ bản: {formatNumber(baseSalary)} VND
                        </Typography>
                      }
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Stack spacing={1.6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 1,
                            borderBottom: `1px solid ${borderColor}`,
                          }}
                        >
                          <Typography sx={{ color: secondaryColor, fontSize: 14 }}>
                            Lương P1 (Vị trí)
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: textColor }}>
                            {formatNumber(baseSalary)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 1,
                            borderBottom: `1px solid ${borderColor}`,
                          }}
                        >
                          <Typography sx={{ color: secondaryColor, fontSize: 14 }}>
                            Phụ cấp P2 (Năng lực)
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: "#22c55e" }}>
                            +{formatNumber(p2Salary)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pt: 1.5,
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, color: textColor, fontSize: 16 }}>
                            Tổng P1 + P2
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: 22,
                              background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {formatNumber(baseSalary + p2Salary)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grow>

                <Grow in timeout={600}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${borderColor}`,
                      background: cardBg,
                    }}
                  >
                    <CardHeader
                      sx={{ pb: 1 }}
                      title={
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontSize: 14,
                            fontWeight: 700,
                            color: textColor,
                          }}
                        >
                          <InfoIcon sx={{ fontSize: 18 }} />
                          Công thức tính
                        </Typography>
                      }
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Typography
                        sx={{
                          color: secondaryColor,
                          fontSize: 13,
                          lineHeight: 1.8,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: textColor }}
                        >
                          Hệ số P2
                        </Box>{" "}
                        = Σ(Trọng số × Hệ số) / 100
                        <br />
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: textColor }}
                        >
                          Lương P2
                        </Box>{" "}
                        = Lương P1 × (Hệ số P2 - 1)
                      </Typography>
                      <Divider sx={{ my: 2, borderColor: borderColor }} />
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, color: "#2563eb" }} />
                        <Typography sx={{ color: secondaryColor, fontSize: 13 }}>
                          Đã chọn{" "}
                          <Box
                            component="span"
                            sx={{ fontWeight: 700, color: "#2563eb" }}
                          >
                            {Object.values(simValues).filter(Boolean).length}/{competencyGroups.length}
                          </Box>{" "}
                          nhóm trong mô phỏng
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* Add Group Dialog */}
      <Dialog
        open={isAddGroupOpen}
        onClose={() => setIsAddGroupOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            bgcolor: cardBg,
            backgroundImage: "none",
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: textColor }}>Thêm nhóm năng lực mới</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Tên nhóm"
              placeholder="VD: Kỹ năng mềm"
              value={newGroupName}
              onChange={(event) => setNewGroupName(event.target.value)}
              fullWidth
              autoFocus
              sx={{
                "& .MuiInputLabel-root": { color: secondaryColor },
                "& .MuiOutlinedInput-root": {
                  color: textColor,
                  "& fieldset": { borderColor: inputBorderColor },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                },
              }}
            />
            <TextField
              label="Mô tả"
              placeholder="Mô tả ngắn gọn"
              value={newGroupDesc}
              onChange={(event) => setNewGroupDesc(event.target.value)}
              fullWidth
              sx={{
                "& .MuiInputLabel-root": { color: secondaryColor },
                "& .MuiOutlinedInput-root": {
                  color: textColor,
                  "& fieldset": { borderColor: inputBorderColor },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: secondaryColor }}>Icon</InputLabel>
              <Select
                label="Icon"
                value={newGroupIcon}
                onChange={(event) => setNewGroupIcon(event.target.value)}
                sx={{
                  color: textColor,
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: inputBorderColor },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2563eb" },
                }}
              >
                <MenuItem value="GraduationCap" sx={{ color: textColor }}>📚 Học vấn</MenuItem>
                <MenuItem value="Briefcase" sx={{ color: textColor }}>💼 Công việc</MenuItem>
                <MenuItem value="EmojiEventsIcon" sx={{ color: textColor }}>🏆 Chứng chỉ</MenuItem>
                <MenuItem value="Languages" sx={{ color: textColor }}>🌐 Ngôn ngữ</MenuItem>
                <MenuItem value="FileCheck" sx={{ color: textColor }}>✅ Kỹ năng</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" onClick={() => setIsAddGroupOpen(false)} sx={{ color: textColor }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleAddGroup}
            disabled={!newGroupName.trim()}
          >
            Thêm nhóm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Criterion Dialog */}
      <Dialog
        open={isAddCriterionOpen}
        onClose={() => setIsAddCriterionOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            bgcolor: cardBg,
            backgroundImage: "none",
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: textColor }}>Thêm mức đánh giá</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Tên mức"
              placeholder="VD: Xuất sắc"
              value={newCriterionName}
              onChange={(event) => setNewCriterionName(event.target.value)}
              fullWidth
              autoFocus
              sx={{
                "& .MuiInputLabel-root": { color: secondaryColor },
                "& .MuiOutlinedInput-root": {
                  color: textColor,
                  "& fieldset": { borderColor: inputBorderColor },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                },
              }}
            />
            <TextField
              label="Hệ số"
              type="number"
              inputProps={{ step: 0.05, min: 0.5, max: 3 }}
              value={newCriterionCoef}
              onChange={(event) =>
                setNewCriterionCoef(Number(event.target.value) || 1)
              }
              fullWidth
              helperText="Hệ số càng cao, mức đánh giá càng tốt"
              sx={{
                "& .MuiInputLabel-root": { color: secondaryColor },
                "& .MuiOutlinedInput-root": {
                  color: textColor,
                  "& fieldset": { borderColor: inputBorderColor },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                },
                "& .MuiFormHelperText-root": { color: secondaryColor },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" onClick={() => setIsAddCriterionOpen(false)} sx={{ color: textColor }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleAddCriterion}
            disabled={!newCriterionName.trim()}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Zoom}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}