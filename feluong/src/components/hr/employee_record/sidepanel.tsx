import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LineChart as RechartsLineChart,
  Line,
  RadarChart as RechartsRadarChart,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { useMemo } from "react";
import { getSidePanelStyles } from "../../../styles/hr_sidepanel";
import HeaderSidePanel from "./header_sidepanel";
interface ISidePanelProps {
  isDark: boolean;
  selectedEmployee: any;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<any>>;
  detailTabValue: number;
  handleDetailTabChange: (
    event: React.SyntheticEvent,
    newValue: number,
  ) => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`detail-tabpanel-${index}`}
      aria-labelledby={`detail-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}
const familyData = [
  { id: 1, hoTen: "Nguyễn Thị Anh", quanHe: "Vợ", ngaySinh: "1991-07-20" },
  {
    id: 2,
    hoTen: "Nguyễn Minh Đạt",
    quanHe: "Con trai",
    ngaySinh: "2015-03-10",
  },
  {
    id: 3,
    hoTen: "Nguyễn Gia Linh",
    quanHe: "Con gái",
    ngaySinh: "2018-11-25",
  },
];

const historyData = [
  {
    id: 1,
    ngay: "2018-03-01",
    viTri: "Recruiter Junior",
    phongBan: "Nhân sự",
    loaiThayDoi: "Vào làm",
    luong: "12.5 triệu",
  },
  {
    id: 2,
    ngay: "2019-06-15",
    viTri: "Recruiter Senior",
    phongBan: "Nhân sự",
    loaiThayDoi: "Nâng chức",
    luong: "18.8 triệu",
  },
  {
    id: 3,
    ngay: "2021-01-10",
    viTri: "C&B Specialist",
    phongBan: "Nhân sự",
    loaiThayDoi: "Điều chuyển",
    luong: "25.5 triệu",
  },
  {
    id: 4,
    ngay: "2023-09-01",
    viTri: "HRBP Senior",
    phongBan: "Nhân sự",
    loaiThayDoi: "Nâng chức",
    luong: "45.5 triệu",
  },
];

const skillData = [
  { nam: 2020, skill: "Recruitment", diem: 8.5 },
  { nam: 2020, skill: "Training & Development", diem: 7.8 },
  { nam: 2021, skill: "Compensation & Benefits", diem: 8.2 },
  { nam: 2021, skill: "Employee Relations", diem: 8.8 },
  { nam: 2022, skill: "HR Strategy", diem: 8.5 },
  { nam: 2022, skill: "People Management", diem: 9.0 },
  { nam: 2023, skill: "HR Analytics", diem: 8.3 },
  { nam: 2023, skill: "Performance Management", diem: 8.7 },
];
const SidePanel = (props: ISidePanelProps) => {
  const salaryValues = useMemo(() => {
    return historyData.map((h) => {
      const num = h.luong.replace(/[^0-9.,]/g, "").replace(/,/g, ".");
      return {
        name: new Date(h.ngay).getFullYear().toString(),
        value: parseFloat(num) || 0,
      };
    });
  }, [historyData]);

  const radarDataset = useMemo(() => {
    const map = new Map<string, { nam: number; skill: string; diem: number }>();
    skillData.forEach((s) => {
      const prev = map.get(s.skill);
      if (!prev || s.nam > prev.nam) map.set(s.skill, s);
    });
    return Array.from(map.values()).map((v) => ({
      name: v.skill,
      value: v.diem,
    }));
  }, [skillData]);

  const {
    isDark,
    selectedEmployee,
    setSelectedEmployee,
    detailTabValue,
    handleDetailTabChange,
  } = props;
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: selectedEmployee ? "0%" : "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "100%",
        zIndex: 1200,
        pointerEvents: selectedEmployee ? "auto" : "none",
      }}
    >
      <Box sx={getSidePanelStyles(isDark)}>
        {/* Header */}
        <HeaderSidePanel
          isDark={isDark}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />

        {/* Content - Giữ nguyên từ code cũ */}
        <Box sx={{ p: 3 }}>
          <Tabs
            value={detailTabValue}
            onChange={handleDetailTabChange}
            sx={{
              borderBottom: isDark
                ? "1px solid rgba(100, 116, 139, 0.2)"
                : "1px solid #e2e8f0",
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#2563eb",
                height: "3px",
              },
              "& .MuiTab-root": {
                color: isDark ? "#94a3b8" : "#64748b",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
                transition: "color 0.2s ease",
                "&.Mui-selected": {
                  color: isDark ? "#f0f9ff" : "#0f172a",
                  fontWeight: 700,
                },
                "&:hover": {
                  color: isDark ? "#cbd5e1" : "#475569",
                },
              },
            }}
          >
            <Tab label="Hồ sơ" />
            <Tab label="Thân nhân" />
          </Tabs>

          {/* Profile Tab - Giữ nguyên */}
          <TabPanel value={detailTabValue} index={0}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Stack spacing={2.5}>
                <Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Avatar
                      sx={{
                        width: 90,
                        height: 90,
                        backgroundColor: "#2563eb",
                        fontSize: "2.5rem",
                        fontWeight: 800,
                      }}
                    >
                      {selectedEmployee?.hoTen.charAt(0)}
                    </Avatar>
                  </Box>
                </Box>
                <Divider
                  sx={{
                    borderColor: isDark ? "rgba(71, 85, 105, 0.3)" : "#e2e8f0",
                  }}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {selectedEmployee?.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Điện thoại
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {selectedEmployee?.soDienThoai}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Ngày sinh
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {selectedEmployee?.ngaySinh}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Địa chỉ
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {selectedEmployee?.diaChi}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Phòng ban
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {selectedEmployee?.phongBan}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#cbd5e1" : "#334155",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Ngày vào làm
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        fontWeight: 500,
                      }}
                    >
                      {selectedEmployee?.ngayVaoLam}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </motion.div>
          </TabPanel>
          {/* Family Tab - Giữ nguyên */}
          <TabPanel value={detailTabValue} index={1}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: isDark ? "#e2e8f0" : "#0f172a",
                }}
              >
                Thành viên gia đình
              </Typography>
              <Stack spacing={1.5}>
                {familyData.map((member) => (
                  <Paper
                    key={member.id}
                    sx={{
                      p: 2,
                      backgroundColor: isDark
                        ? "rgba(30, 41, 59, 0.5)"
                        : "#f8fafc",
                      border: isDark
                        ? "1px solid rgba(100, 116, 139, 0.25)"
                        : "1px solid #e2e8f0",
                      borderRadius: 1,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: isDark
                          ? "rgba(30, 41, 59, 0.7)"
                          : "#f1f5f9",
                        borderColor: isDark
                          ? "rgba(100, 116, 139, 0.4)"
                          : "#cbd5e1",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: isDark ? "#e2e8f0" : "#0f172a",
                          }}
                        >
                          {member.hoTen}
                        </Typography>
                        <Typography
                          sx={{
                            color: isDark ? "#94a3b8" : "#64748b",
                            fontSize: "0.9rem",
                          }}
                        >
                          {member.quanHe}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: isDark ? "#cbd5e1" : "#334155" }}
                      >
                        {member.ngaySinh}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </motion.div>
          </TabPanel>
        </Box>
      </Box>
    </motion.div>
  );
};
export default SidePanel;
