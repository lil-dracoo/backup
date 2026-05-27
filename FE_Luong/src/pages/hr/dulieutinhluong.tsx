import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DollarOutlined,
  DownloadOutlined,
  EyeOutlined,
  GiftOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  TrophyOutlined,
  WalletOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import type { TableColumnsType } from "antd";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

type DetailType =
  | "cong"
  | "ot"
  | "kpi"
  | "thuong"
  | "phat"
  | "khautru"
  | "phucap";

type EmployeeBase = {
  maNV: string;
  hoTen: string;
  phongBan: string;
  chucVu: string;
};

type PayrollRow = EmployeeBase & {
  ngayCong: number;
  ngayDiLam: number;
  ngayNghiPhep: number;
  ngayNghiKhongPhep: number;
  ngayDiMuon: number;
  ngayVeSom: number;
  tyLeChuyenCan: number;
  otNgayThuong: number;
  otCuoiTuan: number;
  otNgayLe: number;
  tongGioOT: number;
  kpiSanLuong: number;
  kpiChatLuong: number;
  kpiTienDo: number;
  kpiTinhThan: number;
  kpiTong: number;
  thuongKPI: number;
  thuongChuyenCan: number;
  thuongSangKien: number;
  thuongKhac: number;
  tongThuong: number;
  phatDiMuon: number;
  phatVeSom: number;
  phatDiLamKhongPhep: number;
  phatViPhamKhac: number;
  tongPhat: number;
  khauTruBHXH: number;
  khauTruBHYT: number;
  khauTruBHTN: number;
  khauTruDoanPhi: number;
  khauTruTamUng: number;
  tongKhauTru: number;
  phuCapXangXe: number;
  phuCapDienThoai: number;
  phuCapAnTrua: number;
  phuCapDocHai: number;
  phuCapKhac: number;
  tongPhuCap: number;
};

const employeeList: EmployeeBase[] = [
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

const generatePayrollInputData = (year: number, month: number): PayrollRow[] => {
  const isTetMonth = month === 1;
  const isSummer = month >= 5 && month <= 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return employeeList.map((emp) => {
    const ngayDiLam = isTetMonth ? 16 + Math.floor(Math.random() * 6) : 20 + Math.floor(Math.random() * 4);
    const ngayNghiPhep = Math.floor(Math.random() * 3);
    const ngayNghiKhongPhep = isTetMonth ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 1);
    const ngayDiMuon = Math.floor(Math.random() * 4);
    const ngayVeSom = Math.floor(Math.random() * 3);
    const ngayCong = Math.min(ngayDiLam, daysInMonth);
    const tyLeChuyenCan = Math.round((ngayCong / 22) * 100);
    const otNgayThuong = isSummer ? 4 + Math.floor(Math.random() * 12) : 2 + Math.floor(Math.random() * 8);
    const otCuoiTuan = Math.floor(Math.random() * 8);
    const otNgayLe = isTetMonth ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 2);
    const tongGioOT = otNgayThuong + otCuoiTuan + otNgayLe;
    const kpiSanLuong = 60 + Math.floor(Math.random() * 35);
    const kpiChatLuong = 65 + Math.floor(Math.random() * 30);
    const kpiTienDo = 55 + Math.floor(Math.random() * 40);
    const kpiTinhThan = 70 + Math.floor(Math.random() * 25);
    const kpiTong = Math.round((kpiSanLuong + kpiChatLuong + kpiTienDo + kpiTinhThan) / 4);
    const thuongKPI = kpiTong >= 90 ? 5000000 : kpiTong >= 80 ? 3000000 : kpiTong >= 70 ? 1500000 : kpiTong >= 60 ? 500000 : 0;
    const thuongChuyenCan = tyLeChuyenCan >= 95 ? 1000000 : tyLeChuyenCan >= 90 ? 500000 : 0;
    const thuongSangKien = Math.random() > 0.85 ? 2000000 : 0;
    const thuongKhac = Math.random() > 0.9 ? 1000000 : 0;
    const tongThuong = thuongKPI + thuongChuyenCan + thuongSangKien + thuongKhac;
    const phatDiMuon = ngayDiMuon * 200000;
    const phatVeSom = ngayVeSom * 100000;
    const phatDiLamKhongPhep = ngayNghiKhongPhep * 300000;
    const phatViPhamKhac = Math.random() > 0.92 ? 500000 : 0;
    const tongPhat = phatDiMuon + phatVeSom + phatDiLamKhongPhep + phatViPhamKhac;
    const khauTruBHXH = Math.floor(2500000 + Math.random() * 2000000);
    const khauTruBHYT = Math.floor(khauTruBHXH * 0.1875);
    const khauTruBHTN = Math.floor(khauTruBHXH * 0.125);
    const khauTruDoanPhi = 100000;
    const khauTruTamUng = Math.random() > 0.7 ? 5000000 : 0;
    const tongKhauTru = khauTruBHXH + khauTruBHYT + khauTruBHTN + khauTruDoanPhi + khauTruTamUng;
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

const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const detailLabels: Record<DetailType, string> = {
  cong: "Chấm công",
  ot: "Tăng ca",
  kpi: "KPI",
  thuong: "Thưởng",
  phat: "Phạt",
  khautru: "Khấu trừ",
  phucap: "Phụ cấp",
};

const formatMoney = (value: number) => `${(value / 1000000).toFixed(1)}M`;

export default function DuLieuTinhLuong() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [detailType, setDetailType] = useState<DetailType>("cong");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const payrollData = useMemo(
    () => generatePayrollInputData(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  const stats = useMemo(() => {
    return {
      soNhanVien: payrollData.length,
      tongNgayCong: payrollData.reduce((sum, item) => sum + item.ngayCong, 0),
      tyLeChuyenCanTB: Math.round(payrollData.reduce((sum, item) => sum + item.tyLeChuyenCan, 0) / payrollData.length),
      tongGioOT: payrollData.reduce((sum, item) => sum + item.tongGioOT, 0),
      kpiTrungBinh: Math.round(payrollData.reduce((sum, item) => sum + item.kpiTong, 0) / payrollData.length),
      tongThuong: payrollData.reduce((sum, item) => sum + item.tongThuong, 0),
      tongPhat: payrollData.reduce((sum, item) => sum + item.tongPhat, 0),
      tongKhauTru: payrollData.reduce((sum, item) => sum + item.tongKhauTru, 0),
      tongPhuCap: payrollData.reduce((sum, item) => sum + item.tongPhuCap, 0),
      soNguoiDiMuon: payrollData.filter((item) => item.ngayDiMuon > 0).length,
      soNguoiTangCaCao: payrollData.filter((item) => item.tongGioOT > 30).length,
      soNguoiKPIExcellent: payrollData.filter((item) => item.kpiTong >= 85).length,
    };
  }, [payrollData]);

  const departments = useMemo(
    () => Array.from(new Set(payrollData.map((item) => item.phongBan))),
    [payrollData]
  );

  const filteredPayrollData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return payrollData.filter((item) => {
      const matchesSearch =
        item.maNV.toLowerCase().includes(keyword) ||
        item.hoTen.toLowerCase().includes(keyword) ||
        item.chucVu.toLowerCase().includes(keyword);
      const matchesDepartment =
        departmentFilter === "all" || item.phongBan === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [departmentFilter, payrollData, search]);

  const topKPIEmployees = useMemo(
    () => [...payrollData].sort((a, b) => b.kpiTong - a.kpiTong).slice(0, 5),
    [payrollData]
  );

  const displayMonth = `${monthNames[selectedMonth]} ${selectedYear}`;
  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const subText = isDark ? "#94a3b8" : "#64748b";
  const bgColor = isDark ? "#020617" : "#f8fafc";
  const cardBg = isDark ? "#0f172a" : "#ffffff";
  const surfaceBg = isDark ? "#111827" : "#f8fafc";
  const borderColor = isDark ? "rgba(148,163,184,0.18)" : "#e2e8f0";
  const chartTextColor = isDark ? "#cbd5e1" : "#475569";
  const radius = 20;
  const chartPalette = ["#2563eb", "#14b8a6", "#f97316", "#e11d48"];

  const thongKeChartData = [
    { name: "Thưởng", value: stats.tongThuong / 1000000, color: chartPalette[1] },
    { name: "Phạt", value: stats.tongPhat / 1000000, color: chartPalette[3] },
    { name: "Khấu trừ", value: stats.tongKhauTru / 1000000, color: chartPalette[2] },
    { name: "Phụ cấp", value: stats.tongPhuCap / 1000000, color: chartPalette[0] },
  ];

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
      return;
    }
    setSelectedMonth(selectedMonth - 1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
      return;
    }
    setSelectedMonth(selectedMonth + 1);
  };

  const handleViewDetail = (type: DetailType) => {
    setDetailType(type);
    setOpenDetailDialog(true);
  };

  const metricCards = [
    {
      type: "cong" as DetailType,
      title: "Chấm công",
      value: stats.tongNgayCong,
      suffix: "ngày",
      note: `TB ${(stats.tongNgayCong / stats.soNhanVien).toFixed(1)} ngày/người`,
      progress: stats.tyLeChuyenCanTB,
      footer: `${stats.tyLeChuyenCanTB}% chuyên cần`,
      color: "#3b82f6",
      icon: <CalendarOutlined />,
    },
    {
      type: "ot" as DetailType,
      title: "Tăng ca",
      value: stats.tongGioOT,
      suffix: "giờ",
      note: `TB ${(stats.tongGioOT / stats.soNhanVien).toFixed(1)} giờ/người`,
      progress: Math.min(100, (stats.tongGioOT / (stats.soNhanVien * 40)) * 100),
      footer: `${stats.soNguoiTangCaCao} người trên 30 giờ`,
      color: "#f59e0b",
      icon: <ClockCircleOutlined />,
    },
    {
      type: "kpi" as DetailType,
      title: "KPI",
      value: stats.kpiTrungBinh,
      suffix: "%",
      note: `${stats.soNguoiKPIExcellent} nhân viên xuất sắc`,
      progress: stats.kpiTrungBinh,
      footer: `Trung bình ${stats.kpiTrungBinh}%`,
      color: "#8b5cf6",
      icon: <TrophyOutlined />,
    },
    {
      type: "thuong" as DetailType,
      title: "Thưởng",
      value: formatMoney(stats.tongThuong),
      note: `KPI ${formatMoney(payrollData.reduce((sum, item) => sum + item.thuongKPI, 0))}`,
      progress: Math.min(100, (stats.tongThuong / 50000000) * 100),
      footer: `Chuyên cần ${formatMoney(payrollData.reduce((sum, item) => sum + item.thuongChuyenCan, 0))}`,
      color: "#10b981",
      icon: <GiftOutlined />,
    },
    {
      type: "phat" as DetailType,
      title: "Phạt",
      value: formatMoney(stats.tongPhat),
      note: `Đi muộn ${formatMoney(payrollData.reduce((sum, item) => sum + item.phatDiMuon, 0))}`,
      progress: Math.min(100, (stats.tongPhat / 20000000) * 100),
      footer: `${stats.soNguoiDiMuon} người đi muộn`,
      color: "#ef4444",
      icon: <WarningOutlined />,
    },
    {
      type: "khautru" as DetailType,
      title: "Khấu trừ",
      value: formatMoney(stats.tongKhauTru),
      note: `BHXH ${formatMoney(payrollData.reduce((sum, item) => sum + item.khauTruBHXH, 0))}`,
      progress: Math.min(100, (stats.tongKhauTru / 100000000) * 100),
      footer: `Tạm ứng ${formatMoney(payrollData.reduce((sum, item) => sum + item.khauTruTamUng, 0))}`,
      color: "#f97316",
      icon: <WalletOutlined />,
    },
    {
      type: "phucap" as DetailType,
      title: "Phụ cấp",
      value: formatMoney(stats.tongPhuCap),
      note: `Ăn trưa ${formatMoney(payrollData.reduce((sum, item) => sum + item.phuCapAnTrua, 0))}`,
      progress: Math.min(100, (stats.tongPhuCap / 50000000) * 100),
      footer: `Xăng xe ${formatMoney(payrollData.reduce((sum, item) => sum + item.phuCapXangXe, 0))}`,
      color: "#06b6d4",
      icon: <DollarOutlined />,
    },
  ];

  const mainColumns: TableColumnsType<PayrollRow> = [
    {
      title: "Nhân viên",
      key: "employee",
      width: 260,
      fixed: "left",
      render: (_, record) => (
        <Space>
          <Avatar style={{ background: "#2563eb" }}>{record.hoTen.charAt(0)}</Avatar>
          <Space direction="vertical" size={0}>
            <Text style={{ color: textColor, fontWeight: 700 }}>{record.hoTen}</Text>
            <Text style={{ color: subText, fontSize: 12 }}>{record.maNV} · {record.chucVu}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "phongBan",
      width: 130,
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: "Công",
      dataIndex: "ngayCong",
      align: "center",
      width: 90,
    },
    {
      title: "OT",
      dataIndex: "tongGioOT",
      align: "center",
      width: 90,
      render: (value: number) => `${value}h`,
    },
    {
      title: "KPI",
      dataIndex: "kpiTong",
      width: 170,
      render: (value: number) => <Progress percent={value} size="small" />,
    },
    {
      title: "Thưởng",
      dataIndex: "tongThuong",
      align: "right",
      width: 110,
      render: (value: number) => <Text style={{ color: "#10b981", fontWeight: 700 }}>{formatMoney(value)}</Text>,
    },
    {
      title: "Phạt",
      dataIndex: "tongPhat",
      align: "right",
      width: 100,
      render: (value: number) => <Text style={{ color: "#ef4444", fontWeight: 700 }}>{formatMoney(value)}</Text>,
    },
    {
      title: "Khấu trừ",
      dataIndex: "tongKhauTru",
      align: "right",
      width: 110,
      render: (value: number) => <Text style={{ color: "#f97316", fontWeight: 700 }}>{formatMoney(value)}</Text>,
    },
    {
      title: "Phụ cấp",
      dataIndex: "tongPhuCap",
      align: "right",
      width: 110,
      render: (value: number) => <Text style={{ color: "#06b6d4", fontWeight: 700 }}>{formatMoney(value)}</Text>,
    },
  ];

  const detailColumns = useMemo<TableColumnsType<PayrollRow>>(() => {
    const base: TableColumnsType<PayrollRow> = [
      { title: "Mã NV", dataIndex: "maNV", width: 90, fixed: "left" },
      { title: "Họ tên", dataIndex: "hoTen", width: 180, fixed: "left" },
      { title: "Phòng ban", dataIndex: "phongBan", width: 120, render: (value) => <Tag>{value}</Tag> },
    ];

    const byType: Record<DetailType, TableColumnsType<PayrollRow>> = {
      cong: [
        { title: "Công", dataIndex: "ngayCong", align: "center" },
        { title: "Nghỉ phép", dataIndex: "ngayNghiPhep", align: "center" },
        { title: "Đi muộn", dataIndex: "ngayDiMuon", align: "center" },
        { title: "Về sớm", dataIndex: "ngayVeSom", align: "center" },
        { title: "Chuyên cần", dataIndex: "tyLeChuyenCan", align: "center", render: (value) => `${value}%` },
      ],
      ot: [
        { title: "OT thường", dataIndex: "otNgayThuong", align: "center", render: (value) => `${value}h` },
        { title: "OT cuối tuần", dataIndex: "otCuoiTuan", align: "center", render: (value) => `${value}h` },
        { title: "OT lễ", dataIndex: "otNgayLe", align: "center", render: (value) => `${value}h` },
        { title: "Tổng OT", dataIndex: "tongGioOT", align: "center", render: (value) => <Text strong>{value}h</Text> },
      ],
      kpi: [
        { title: "Sản lượng", dataIndex: "kpiSanLuong", align: "center", render: (value) => `${value}%` },
        { title: "Chất lượng", dataIndex: "kpiChatLuong", align: "center", render: (value) => `${value}%` },
        { title: "Tiến độ", dataIndex: "kpiTienDo", align: "center", render: (value) => `${value}%` },
        { title: "Tinh thần", dataIndex: "kpiTinhThan", align: "center", render: (value) => `${value}%` },
        { title: "Tổng KPI", dataIndex: "kpiTong", align: "center", render: (value) => <Text strong>{value}%</Text> },
      ],
      thuong: [
        { title: "Thưởng KPI", dataIndex: "thuongKPI", align: "right", render: formatMoney },
        { title: "Thưởng CC", dataIndex: "thuongChuyenCan", align: "right", render: formatMoney },
        { title: "Sáng kiến", dataIndex: "thuongSangKien", align: "right", render: formatMoney },
        { title: "Tổng", dataIndex: "tongThuong", align: "right", render: (value) => <Text strong>{formatMoney(value)}</Text> },
      ],
      phat: [
        { title: "Đi muộn", dataIndex: "phatDiMuon", align: "right", render: formatMoney },
        { title: "Về sớm", dataIndex: "phatVeSom", align: "right", render: formatMoney },
        { title: "Nghỉ KP", dataIndex: "phatDiLamKhongPhep", align: "right", render: formatMoney },
        { title: "Tổng", dataIndex: "tongPhat", align: "right", render: (value) => <Text strong>{formatMoney(value)}</Text> },
      ],
      khautru: [
        { title: "BHXH", dataIndex: "khauTruBHXH", align: "right", render: formatMoney },
        { title: "BHYT", dataIndex: "khauTruBHYT", align: "right", render: formatMoney },
        { title: "BHTN", dataIndex: "khauTruBHTN", align: "right", render: formatMoney },
        { title: "Tạm ứng", dataIndex: "khauTruTamUng", align: "right", render: formatMoney },
        { title: "Tổng", dataIndex: "tongKhauTru", align: "right", render: (value) => <Text strong>{formatMoney(value)}</Text> },
      ],
      phucap: [
        { title: "Xăng xe", dataIndex: "phuCapXangXe", align: "right", render: formatMoney },
        { title: "Điện thoại", dataIndex: "phuCapDienThoai", align: "right", render: formatMoney },
        { title: "Ăn trưa", dataIndex: "phuCapAnTrua", align: "right", render: formatMoney },
        { title: "Tổng", dataIndex: "tongPhuCap", align: "right", render: (value) => <Text strong>{formatMoney(value)}</Text> },
      ],
    };

    return [...base, ...byType[detailType]];
  }, [detailType]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 14,
          colorBgContainer: cardBg,
          colorBorderSecondary: borderColor,
          colorText: textColor,
          colorTextSecondary: subText,
        },
        components: {
          Card: { colorBgContainer: cardBg },
          Table: {
            headerBg: isDark ? "#111827" : "#f1f5f9",
            headerColor: textColor,
            rowHoverBg: isDark ? "#1e293b" : "#f8fafc",
            borderColor,
          },
          Modal: { contentBg: cardBg, headerBg: cardBg },
          Select: { selectorBg: isDark ? "#020617" : "#ffffff", colorBorder: borderColor },
          Input: { colorBgContainer: isDark ? "#020617" : "#ffffff", colorBorder: borderColor },
        },
      }}
    >
      <div style={{ minHeight: "100vh", background: bgColor, padding: "20px clamp(12px, 2vw, 24px)" }}>
        <Card
          style={{
            borderRadius: radius,
            border: `1px solid ${borderColor}`,
            marginBottom: 18,
            background: isDark
              ? "linear-gradient(135deg,#0f172a 0%,#111827 100%)"
              : "linear-gradient(135deg,#ffffff 0%,#eef6ff 100%)",
          }}
          bodyStyle={{ padding: 24 }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Space size={16} align="center">
                <Avatar
                  size={64}
                  icon={<DollarOutlined />}
                  style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}
                />
                <Space direction="vertical" size={4}>
                  <Title level={2} style={{ margin: 0, color: textColor }}>
                    Dữ liệu đầu vào tính lương
                  </Title>
                  <Text style={{ color: subText }}>
                    Tổng hợp chấm công, OT, KPI, thưởng, phạt, khấu trừ và phụ cấp
                  </Text>
                  <Tag color="blue">{stats.soNhanVien} nhân viên</Tag>
                </Space>
              </Space>
            </Col>
            <Col xs={24} lg={10}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }} wrap>
                <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
                <Tag
                  icon={<CalendarOutlined />}
                  color="processing"
                  style={{ padding: "7px 16px", borderRadius: 999, fontWeight: 700 }}
                >
                  {displayMonth}
                </Tag>
                <Button icon={<RightOutlined />} onClick={handleNextMonth} />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => message.success("Đã chuẩn bị dữ liệu xuất Excel")}
                >
                  Xuất Excel
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]} style={{ marginBottom: 18 }}>
          {metricCards.map((item) => (
            <Col xs={24} sm={12} lg={8} xl={6} xxl={6} key={item.type}>
              <Card
                style={{
                  height: "100%",
                  borderRadius: radius,
                  border: `1px solid ${borderColor}`,
                  overflow: "hidden",
                }}
                bodyStyle={{ padding: 18 }}
              >
                <div style={{ height: 4, margin: "-18px -18px 16px", background: item.color }} />
                <Row justify="space-between" align="top" gutter={12}>
                  <Col flex="auto" style={{ minWidth: 0 }}>
                    <Avatar
                      icon={item.icon}
                      style={{ background: `${item.color}18`, color: item.color, marginBottom: 12 }}
                      size={46}
                    />
                    <Text style={{ display: "block", color: textColor, fontWeight: 700 }}>
                      {item.title}
                    </Text>
                    <div style={{ color: item.color, fontSize: 28, fontWeight: 800, lineHeight: 1.15, marginTop: 6 }}>
                      {item.value}
                      {"suffix" in item ? <span style={{ fontSize: 16, marginLeft: 4 }}>{item.suffix}</span> : null}
                    </div>
                  </Col>
                  <Col>
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewDetail(item.type)}
                      style={{ color: item.color }}
                    />
                  </Col>
                </Row>
                <Text style={{ display: "block", color: subText, marginTop: 10 }}>{item.note}</Text>
                <Progress percent={Math.round(item.progress)} showInfo={false} strokeColor={item.color} />
                <Text style={{ color: subText, fontSize: 12 }}>{item.footer}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 18 }}>
          <Col xs={24} lg={12}>
            <Card title="Tổng hợp khoản lương" style={{ borderRadius: radius, border: `1px solid ${borderColor}` }}>
              <div style={{ height: 310 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={thongKeChartData} margin={{ left: -18, right: 10 }}>
                    <defs>
                      {thongKeChartData.map((entry, index) => (
                        <linearGradient
                          key={entry.name}
                          id={`payrollGradient${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.95} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.52} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis dataKey="name" tick={{ fill: chartTextColor }} />
                    <YAxis tick={{ fill: chartTextColor }} tickFormatter={(value) => `${value}M`} />
                    <RechartsTooltip
                      formatter={(value) => [`${Number(value).toFixed(1)}M`, "Giá trị"]}
                      contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 14 }}
                      cursor={{ fill: "transparent" }}
                    />
                    <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                      {thongKeChartData.map((entry, index) => (
                        <Cell key={entry.name} fill={`url(#payrollGradient${index})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Top 5 nhân viên KPI cao nhất" style={{ borderRadius: radius, border: `1px solid ${borderColor}` }}>
              <div style={{ height: 310 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topKPIEmployees} layout="vertical" margin={{ left: 16, right: 16 }}>
                    <defs>
                      <linearGradient id="kpi-modern-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={0.92} />
                        <stop offset="55%" stopColor="#7c3aed" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.86} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: chartTextColor }} />
                    <YAxis type="category" dataKey="hoTen" tick={{ fill: chartTextColor }} width={112} />
                    <RechartsTooltip
                      formatter={(value) => [`${value}%`, "KPI"]}
                      contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 14 }}
                      cursor={{ fill: "transparent" }}
                    />
                    <Bar dataKey="kpiTong" fill="url(#kpi-modern-gradient)" radius={[0, 12, 12, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>

        <Card
          title="Bảng dữ liệu tính lương"
          extra={
            <Space wrap>
              <Select
                value={departmentFilter}
                onChange={setDepartmentFilter}
                style={{ width: 180 }}
                options={[
                  { value: "all", label: "Tất cả phòng ban" },
                  ...departments.map((department) => ({ value: department, label: department })),
                ]}
              />
              <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm mã, tên hoặc chức vụ..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={{ width: 260 }}
              />
            </Space>
          }
          style={{ borderRadius: radius, border: `1px solid ${borderColor}` }}
        >
          <Table
            rowKey="maNV"
            columns={mainColumns}
            dataSource={filteredPayrollData}
            pagination={{ pageSize: 6, showSizeChanger: false }}
            scroll={{ x: 1150 }}
            size="middle"
          />
        </Card>

        <Modal
          open={openDetailDialog}
          footer={
            <Space>
              <Button onClick={() => setOpenDetailDialog(false)}>Đóng</Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => message.success(`Đã chuẩn bị xuất ${detailLabels[detailType]}`)}
              >
                Xuất Excel
              </Button>
            </Space>
          }
          centered
          zIndex={100000}
          width="min(1120px, calc(100vw - 32px))"
          closeIcon={<CloseOutlined />}
          onCancel={() => setOpenDetailDialog(false)}
          title={
            <Space direction="vertical" size={0}>
              <Title level={4} style={{ margin: 0, color: textColor }}>
                Chi tiết {detailLabels[detailType]}
              </Title>
              <Text style={{ color: subText }}>{displayMonth}</Text>
            </Space>
          }
          styles={{
            mask: {
              backdropFilter: "blur(14px)",
              background: isDark ? "rgba(2,6,23,0.82)" : "rgba(15,23,42,0.68)",
            },
            root: { borderRadius: radius, overflow: "hidden" },
            body: { paddingTop: 16 },
          }}
        >
          <div style={{ background: surfaceBg, border: `1px solid ${borderColor}`, borderRadius: radius, padding: 12 }}>
            <Table
              rowKey="maNV"
              columns={detailColumns}
              dataSource={payrollData}
              pagination={{ pageSize: 6, showSizeChanger: false }}
              scroll={{ x: 900 }}
              size="middle"
            />
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
