import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  PauseCircleOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SearchOutlined,
  WarningOutlined,
  BarChartOutlined,
  TeamOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Timeline,
  Typography,
  Tabs,
  Badge,
  Descriptions,
  Divider,
  Radio,
  Alert,
} from "antd";

import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

// Dữ liệu chấm công chi tiết cho nhiều tháng
const generateAttendanceData = () => {
  const employees = [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      dept: "Công nghệ",
      position: "Frontend Developer",
      avatar: "N",
    },
    {
      id: 2,
      name: "Trần Gia Huy",
      dept: "Nhân sự",
      position: "HR Executive",
      avatar: "T",
    },
    {
      id: 3,
      name: "Lê Khánh Vy",
      dept: "Kế toán",
      position: "Accountant",
      avatar: "L",
    },
    {
      id: 4,
      name: "Phạm Hải Đăng",
      dept: "Marketing",
      position: "Designer",
      avatar: "P",
    },
    {
      id: 5,
      name: "Hoàng Thị Lan",
      dept: "Công nghệ",
      position: "Backend Developer",
      avatar: "H",
    },
    {
      id: 6,
      name: "Vũ Minh Tuấn",
      dept: "Kinh doanh",
      position: "Sales Manager",
      avatar: "V",
    },
    {
      id: 7,
      name: "Đặng Thùy Trang",
      dept: "Nhân sự",
      position: "Recruiter",
      avatar: "Đ",
    },
    {
      id: 8,
      name: "Bùi Quang Huy",
      dept: "Công nghệ",
      position: "DevOps",
      avatar: "B",
    },
  ];

  const months = [1, 2, 3, 4, 5, 6];
  const statuses = [
    "Đúng giờ",
    "Đi trễ",
    "Vắng có phép",
    "Vắng không phép",
    "Nghỉ thai sản",
  ];

  const data = [];

  for (const emp of employees) {
    for (const month of months) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const lateMinutes =
        status === "Đi trễ" ? Math.floor(Math.random() * 60) + 1 : 0;
      const otHours = Math.floor(Math.random() * 50) / 10;
      const workingDays =
        22 - (status.includes("Vắng") ? Math.floor(Math.random() * 5) + 1 : 0);

      data.push({
        key: `${emp.id}-${month}`,
        employeeId: emp.id,
        hoTen: emp.name,
        phongBan: emp.dept,
        chucVu: emp.position,
        thang: month,
        nam: 2024,
        soNgayDiLam: workingDays,
        soNgayVang: 22 - workingDays,
        soLanDiTre:
          status === "Đi trễ" ? Math.floor(Math.random() * 10) + 1 : 0,
        tongGioLam: (workingDays * 8 + otHours).toFixed(1),
        tongGioOT: otHours,
        trangThai: status,
        lateMinutes: lateMinutes,
        phep: status === "Vắng có phép" ? "Có" : "Không",
        thaiSan: status === "Nghỉ thai sản",
        vang: status === "Vắng không phép",
        checkins:
          status !== "Vắng không phép" && status !== "Nghỉ thai sản"
            ? [
                { time: "08:01", type: "Check in" },
                { time: "12:00", type: "Ra ngoài" },
                { time: "13:03", type: "Check in" },
                { time: "17:32", type: "Check out" },
              ]
            : [],
      });
    }
  }

  return data;
};

const attendanceData = generateAttendanceData();

// Thống kê theo tháng
const monthlyStats = [1, 2, 3, 4, 5, 6].map((month) => ({
  month: `T${month}`,
  monthValue: month,
  dungGio: 85 + Math.floor(Math.random() * 10),
  diTre: 3 + Math.floor(Math.random() * 8),
  vangCoPhep: 2 + Math.floor(Math.random() * 5),
  vangKhongPhep: 1 + Math.floor(Math.random() * 3),
  nghiThaiSan: 1,
  tyLeChuyenCan: 88 + Math.floor(Math.random() * 8),
}));

// Dữ liệu theo phòng ban
const deptStats = [
  {
    dept: "Công nghệ",
    nhanVien: 25,
    dungGio: 92,
    diTre: 5,
    vangCoPhep: 2,
    vangKhongPhep: 1,
    otTB: 2.5,
  },
  {
    dept: "Nhân sự",
    nhanVien: 12,
    dungGio: 88,
    diTre: 7,
    vangCoPhep: 3,
    vangKhongPhep: 2,
    otTB: 1.2,
  },
  {
    dept: "Kế toán",
    nhanVien: 8,
    dungGio: 95,
    diTre: 3,
    vangCoPhep: 1,
    vangKhongPhep: 1,
    otTB: 0.8,
  },
  {
    dept: "Marketing",
    nhanVien: 15,
    dungGio: 85,
    diTre: 10,
    vangCoPhep: 3,
    vangKhongPhep: 2,
    otTB: 3.2,
  },
  {
    dept: "Kinh doanh",
    nhanVien: 20,
    dungGio: 82,
    diTre: 12,
    vangCoPhep: 4,
    vangKhongPhep: 2,
    otTB: 4.5,
  },
];

// Chi tiết chấm công ngày
const dailyAttendance = [
  {
    date: "01/03/2024",
    thu: "Thứ 6",
    diMuon: 2,
    veSom: 1,
    diSom: 15,
    dungGio: 45,
    vang: 3,
    nghiPhep: 2,
  },
  {
    date: "02/03/2024",
    thu: "Thứ 7",
    diMuon: 1,
    veSom: 0,
    diSom: 18,
    dungGio: 42,
    vang: 2,
    nghiPhep: 1,
  },
  {
    date: "03/03/2024",
    thu: "Chủ nhật",
    diMuon: 0,
    veSom: 0,
    diSom: 0,
    dungGio: 0,
    vang: 0,
    nghiPhep: 0,
  },
  {
    date: "04/03/2024",
    thu: "Thứ 2",
    diMuon: 3,
    veSom: 2,
    diSom: 20,
    dungGio: 38,
    vang: 4,
    nghiPhep: 1,
  },
  {
    date: "05/03/2024",
    thu: "Thứ 3",
    diMuon: 1,
    veSom: 1,
    diSom: 22,
    dungGio: 40,
    vang: 2,
    nghiPhep: 2,
  },
  {
    date: "06/03/2024",
    thu: "Thứ 4",
    diMuon: 4,
    veSom: 1,
    diSom: 18,
    dungGio: 39,
    vang: 3,
    nghiPhep: 1,
  },
  {
    date: "07/03/2024",
    thu: "Thứ 5",
    diMuon: 2,
    veSom: 2,
    diSom: 21,
    dungGio: 37,
    vang: 3,
    nghiPhep: 1,
  },
];

export default function BangChamCongHR() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("table");

  // State cho modal chi tiết phòng ban/tháng
  const [openDeptDetail, setOpenDeptDetail] = useState(false);
  const [selectedDeptDetail, setSelectedDeptDetail] = useState<any>(null);
  const [, setOpenMonthlyDetail] = useState(false);
  const [, setSelectedMonthlyDetail] = useState<any>(null);

  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const subText = isDark ? "#94a3b8" : "#64748b";
  const cardColor = isDark ? "#0f172a" : "#ffffff";
  const borderColor = isDark ? "rgba(148,163,184,0.12)" : "#e2e8f0";
  const bgColor = isDark ? "#020617" : "#f8fafc";
  const surfaceColor = isDark ? "#111827" : "#f8fafc";
  const softRadius = 22;

  // Lọc dữ liệu
  const filteredData = useMemo(() => {
    return attendanceData.filter((item) => {
      const matchSearch = item.hoTen
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchDept =
        selectedDept === "all" || item.phongBan === selectedDept;
      const matchMonth = item.thang === selectedMonth;
      return matchSearch && matchDept && matchMonth;
    });
  }, [search, selectedDept, selectedMonth]);

  // Thống kê tổng hợp
  const statistics = useMemo(() => {
    const total = filteredData.length;
    const dungGio = filteredData.filter(
      (item) => item.trangThai === "Đúng giờ",
    ).length;
    const diTre = filteredData.filter(
      (item) => item.trangThai === "Đi trễ",
    ).length;
    const vangCoPhep = filteredData.filter(
      (item) => item.trangThai === "Vắng có phép",
    ).length;
    const vangKhongPhep = filteredData.filter(
      (item) => item.trangThai === "Vắng không phép",
    ).length;
    const nghiThaiSan = filteredData.filter(
      (item) => item.trangThai === "Nghỉ thai sản",
    ).length;

    const tongGioLam = filteredData.reduce(
      (sum, item) => sum + parseFloat(item.tongGioLam),
      0,
    );
    const tongGioOT = filteredData.reduce(
      (sum, item) => sum + item.tongGioOT,
      0,
    );
    const tongLanDiTre = filteredData.reduce(
      (sum, item) => sum + item.soLanDiTre,
      0,
    );

    return {
      total,
      dungGio,
      diTre,
      vangCoPhep,
      vangKhongPhep,
      nghiThaiSan,
      tyLeDungGio: ((dungGio / total) * 100).toFixed(1),
      tongGioLam: tongGioLam.toFixed(1),
      tongGioOT: tongGioOT.toFixed(1),
      tongLanDiTre,
      trungBinhGioLam: (tongGioLam / total).toFixed(1),
    };
  }, [filteredData]);

  // Lấy danh sách nhân viên theo phòng ban
  const getEmployeesByDept = (deptName: string) => {
    return attendanceData.filter(
      (item) => item.phongBan === deptName && item.thang === selectedMonth,
    );
  };

  // Lấy danh sách nhân viên theo tháng
 

  const columns = [
    {
      title: "Nhân viên",
      width: 280,
      fixed: "left" as const,
      render: (_: any, record: any) => (
        <Space size={14}>
          <Avatar
            size={48}
            style={{
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              cursor: "pointer",
            }}
          >
            {record.hoTen.charAt(0)}
          </Avatar>
          <div>
            <Text strong style={{ color: textColor, fontSize: 15 }}>
              {record.hoTen}
            </Text>
            <br />
            <Text style={{ color: subText, fontSize: 12 }}>
              {record.chucVu}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Số ngày làm",
      width: 120,
      align: "center" as const,
      render: (_: any, record: any) => (
        <div>
          <Text strong style={{ color: textColor, fontSize: 18 }}>
            {record.soNgayDiLam}
          </Text>
          <Text style={{ color: subText, fontSize: 12 }}> / 22 ngày</Text>
          <Progress
            percent={Math.round((record.soNgayDiLam / 22) * 100)}
            size="small"
            strokeColor="#22c55e"
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: "Tổng giờ làm",
      width: 130,
      align: "center" as const,
      render: (_: any, record: any) => (
        <div>
          <Text strong style={{ color: textColor, fontSize: 16 }}>
            {record.tongGioLam}h
          </Text>
          <br />
          <Tag color="purple" style={{ borderRadius: 999, marginTop: 4 }}>
            OT: {record.tongGioOT}h
          </Tag>
        </div>
      ),
    },
    {
      title: "Đi trễ",
      width: 120,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Badge
          count={record.soLanDiTre}
          style={{
            backgroundColor: record.soLanDiTre > 0 ? "#f59e0b" : "#22c55e",
            fontSize: 13,
          }}
        >
          <Tag
            color={record.soLanDiTre > 0 ? "orange" : "green"}
            style={{ borderRadius: 999 }}
          >
            {record.soLanDiTre > 0 ? `${record.lateMinutes} phút` : "Đúng giờ"}
          </Tag>
        </Badge>
      ),
    },
    {
      title: "Trạng thái",
      width: 150,
      render: (_: any, record: any) => {
        let color = "green";
        let icon = <CheckCircleOutlined />;

        if (record.trangThai === "Đi trễ") {
          color = "orange";
          icon = <WarningOutlined />;
        } else if (record.trangThai === "Vắng có phép") {
          color = "blue";
          icon = <ClockCircleOutlined />;
        } else if (record.trangThai === "Vắng không phép") {
          color = "red";
          icon = <CloseOutlined />;
        } else if (record.trangThai === "Nghỉ thai sản") {
          color = "purple";
          icon = <PauseCircleOutlined />;
        }

        return (
          <Tag
            icon={icon}
            color={color}
            style={{ borderRadius: 999, padding: "4px 12px" }}
          >
            {record.trangThai}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      width: 120,
      fixed: "right" as const,
      render: (_: any, record: any) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="middle"
          style={{ borderRadius: 12 }}
          onClick={() => {
            setSelectedEmployee(record);
            setOpenDetail(true);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const monthlyTableData = useMemo(
    () =>
      monthlyStats.map((item) => ({
        key: item.month,
        ...item,
        tongNgayCong: filteredData.reduce(
          (sum, row) => sum + row.soNgayDiLam,
          0,
        ),
        tongGioOT: filteredData
          .reduce((sum, row) => sum + row.tongGioOT, 0)
          .toFixed(1),
      })),
    [filteredData],
  );

  const filterBar = (
    <Card
      size="small"
      style={{
        borderRadius: 18,
        marginBottom: 16,
        border: `1px solid ${borderColor}`,
        background: surfaceColor,
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Chọn phòng ban"
            value={selectedDept}
            onChange={setSelectedDept}
            style={{ width: "100%" }}
            suffixIcon={<TeamOutlined />}
            options={[
              { label: "Tất cả phòng ban", value: "all" },
              ...deptStats.map((d) => ({ label: d.dept, value: d.dept })),
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Chọn tháng"
            value={selectedMonth}
            onChange={setSelectedMonth}
            style={{ width: "100%" }}
            suffixIcon={<ScheduleOutlined />}
            options={[
              { label: "Tháng 1", value: 1 },
              { label: "Tháng 2", value: 2 },
              { label: "Tháng 3", value: 3 },
              { label: "Tháng 4", value: 4 },
              { label: "Tháng 5", value: 5 },
              { label: "Tháng 6", value: 6 },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Chọn năm"
            value={selectedYear}
            onChange={setSelectedYear}
            style={{ width: "100%" }}
            options={[
              { label: "2024", value: 2024 },
              { label: "2023", value: 2023 },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm nhân viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: 42, borderRadius: 14 }}
            allowClear
          />
        </Col>
      </Row>
    </Card>
  );

  return (
    <div style={{ minHeight: "100vh", background: bgColor, padding: 24 }}>
      {/* Header với bộ lọc nâng cao */}
      <Card
        style={{
          borderRadius: 24,
          marginBottom: 24,
          border: `1px solid ${borderColor}`,
          background: cardColor,
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col flex="auto">
            <Space size={20}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 32,
                }}
              >
                <CalendarOutlined />
              </div>
              <div>
                <Title level={3} style={{ margin: 0, color: textColor }}>
                  Bảng Chấm Công Chi Tiết
                </Title>
                <Text style={{ color: subText }}>
                  Quản lý chấm công theo phòng ban, tháng, theo dõi giờ làm, OT,
                  đi trễ
                </Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space wrap size={12}>
              <Button icon={<DownloadOutlined />}>Xuất Excel</Button>
              <Button icon={<PrinterOutlined />}>In báo cáo</Button>
              <Button icon={<ReloadOutlined />}>Làm mới</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Thống kê nâng cao */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: 20,
              background: cardColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Statistic
              title="Tổng nhân viên"
              value={statistics.total}
              prefix={<TeamOutlined style={{ color: "#2563eb" }} />}
              valueStyle={{ color: textColor }}
            />
            <Progress
              percent={100}
              strokeColor="#2563eb"
              showInfo={false}
              strokeWidth={4}
              style={{ marginTop: 12 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: 20,
              background: cardColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Statistic
              title="Tỷ lệ đúng giờ"
              value={statistics.tyLeDungGio}
              suffix="%"
              prefix={<CheckCircleOutlined style={{ color: "#22c55e" }} />}
              valueStyle={{ color: "#22c55e" }}
            />
            <Progress
              percent={parseFloat(statistics.tyLeDungGio)}
              strokeColor="#22c55e"
              showInfo={false}
              strokeWidth={4}
              style={{ marginTop: 12 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: 20,
              background: cardColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Statistic
              title="Tổng giờ OT"
              value={statistics.tongGioOT}
              suffix="giờ"
              prefix={<ClockCircleOutlined style={{ color: "#a855f7" }} />}
              valueStyle={{ color: textColor }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Trung bình:{" "}
              {(parseFloat(statistics.tongGioOT) / statistics.total).toFixed(1)}
              h/người
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderRadius: 20,
              background: cardColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Statistic
              title="Số lần đi trễ"
              value={statistics.tongLanDiTre}
              prefix={<WarningOutlined style={{ color: "#f59e0b" }} />}
              valueStyle={{ color: "#f59e0b" }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Tỷ lệ vi phạm:{" "}
              {(
                (statistics.tongLanDiTre / (statistics.total * 22)) *
                100
              ).toFixed(1)}
              %
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Tabs và biểu đồ */}
      <Card
        style={{
          borderRadius: 24,
          marginBottom: 24,
          border: `1px solid ${borderColor}`,
          background: cardColor,
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "overview",
              label: (
                <span>
                  <BarChartOutlined /> Tổng quan
                </span>
              ),
              children: (
                <div>
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                      <Title level={5}>Xu hướng chấm công theo tháng</Title>
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={monthlyStats}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={borderColor}
                          />
                          <XAxis dataKey="month" stroke={subText} />
                          <YAxis stroke={subText} />
                          <ReTooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="dungGio"
                            stroke="#22c55e"
                            fill="#22c55e33"
                            name="Đúng giờ"
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="diTre"
                            stroke="#f59e0b"
                            fill="#f59e0b22"
                            name="Đi trễ"
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="vangKhongPhep"
                            stroke="#ef4444"
                            fill="#ef444422"
                            name="Vắng không phép"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Col>
                    <Col xs={24} lg={8}>
                      <Title level={5}>
                        Tỷ lệ chấm công tháng {selectedMonth}
                      </Title>
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Đúng giờ",
                                value: statistics.dungGio,
                                color: "#22c55e",
                              },
                              {
                                name: "Đi trễ",
                                value: statistics.diTre,
                                color: "#f59e0b",
                              },
                              {
                                name: "Vắng có phép",
                                value: statistics.vangCoPhep,
                                color: "#3b82f6",
                              },
                              {
                                name: "Vắng không phép",
                                value: statistics.vangKhongPhep,
                                color: "#ef4444",
                              },
                              {
                                name: "Nghỉ thai sản",
                                value: statistics.nghiThaiSan,
                                color: "#a855f7",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                            }
                            outerRadius={120}
                            dataKey="value"
                          >
                            {[
                              "#22c55e",
                              "#f59e0b",
                              "#3b82f6",
                              "#ef4444",
                              "#a855f7",
                            ].map((color, index) => (
                              <Cell key={`cell-${index}`} fill={color} />
                            ))}
                          </Pie>
                          <ReTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Col>
                  </Row>

                  <Divider />

                  <Title level={5}>Thống kê theo phòng ban</Title>
                  <Row gutter={[16, 16]}>
                    {deptStats.map((dept, idx) => (
                      <Col xs={24} md={12} lg={8} key={idx}>
                        <Card
                          size="small"
                          style={{ borderRadius: 16, cursor: "pointer" }}
                          hoverable
                          onClick={() => {
                            setSelectedDeptDetail(dept);
                            setOpenDeptDetail(true);
                          }}
                        >
                          <Space direction="vertical" style={{ width: "100%" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text strong>{dept.dept}</Text>
                              <Badge
                                count={`${dept.nhanVien} NV`}
                                style={{ backgroundColor: "#2563eb" }}
                              />
                            </div>
                            <Row gutter={12}>
                              <Col span={8}>
                                <Text type="secondary">Đúng giờ</Text>
                                <br />
                                <Text strong style={{ color: "#22c55e" }}>
                                  {dept.dungGio}%
                                </Text>
                              </Col>
                              <Col span={8}>
                                <Text type="secondary">Đi trễ</Text>
                                <br />
                                <Text strong style={{ color: "#f59e0b" }}>
                                  {dept.diTre}%
                                </Text>
                              </Col>
                              <Col span={8}>
                                <Text type="secondary">OT TB</Text>
                                <br />
                                <Text strong style={{ color: "#a855f7" }}>
                                  {dept.otTB}h
                                </Text>
                              </Col>
                            </Row>
                            <Progress
                              percent={dept.dungGio}
                              strokeColor="#22c55e"
                              showInfo={false}
                              size="small"
                            />
                          </Space>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ),
            },
            {
              key: "department",
              label: (
                <span>
                  <TeamOutlined /> Bảng theo phòng ban
                </span>
              ),
              children: (
                <div>
                  <Alert
                    message="Bảng chấm công theo phòng ban"
                    description="Nhấp vào từng dòng để xem chi tiết danh sách nhân viên trong phòng ban"
                    type="info"
                    showIcon
                    style={{ marginBottom: 16, borderRadius: 16 }}
                  />
                  <Table
                    rowKey="dept"
                    dataSource={deptStats}
                    pagination={false}
                    style={{
                      borderRadius: softRadius,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onRow={(record) => ({
                      onClick: () => {
                        setSelectedDeptDetail(record);
                        setOpenDeptDetail(true);
                      },
                      style: { cursor: "pointer" },
                    })}
                    columns={[
                      {
                        title: "Phòng ban",
                        dataIndex: "dept",
                        width: 220,
                        render: (value) => (
                          <Space>
                            <Avatar
                              style={{
                                background:
                                  "linear-gradient(135deg,#2563eb,#7c3aed)",
                              }}
                            >
                              {value.charAt(0)}
                            </Avatar>
                            <Text strong style={{ color: textColor }}>
                              {value}
                            </Text>
                          </Space>
                        ),
                      },
                      {
                        title: "Nhân viên",
                        dataIndex: "nhanVien",
                        align: "center",
                        render: (value) => (
                          <Tag color="blue" style={{ borderRadius: 999 }}>
                            {value} NV
                          </Tag>
                        ),
                      },
                      {
                        title: "Đúng giờ",
                        dataIndex: "dungGio",
                        render: (value) => (
                          <Progress percent={value} strokeColor="#22c55e" />
                        ),
                      },
                      {
                        title: "Đi trễ",
                        dataIndex: "diTre",
                        align: "center",
                        render: (value) => (
                          <Tag color="orange" style={{ borderRadius: 999 }}>
                            {value}%
                          </Tag>
                        ),
                      },
                      {
                        title: "Vắng có phép",
                        dataIndex: "vangCoPhep",
                        align: "center",
                        render: (value) => (
                          <Tag color="processing" style={{ borderRadius: 999 }}>
                            {value}%
                          </Tag>
                        ),
                      },
                      {
                        title: "Vắng không phép",
                        dataIndex: "vangKhongPhep",
                        align: "center",
                        render: (value) => (
                          <Tag color="red" style={{ borderRadius: 999 }}>
                            {value}%
                          </Tag>
                        ),
                      },
                      {
                        title: "OT TB",
                        dataIndex: "otTB",
                        align: "center",
                        render: (value) => (
                          <Text strong style={{ color: "#7c3aed" }}>
                            {value}h
                          </Text>
                        ),
                      },
                    ]}
                  />
                </div>
              ),
            },
            {
              key: "monthly",
              label: (
                <span>
                  <CalendarOutlined /> Bảng theo tháng
                </span>
              ),
              children: (
                <div>
                  <Alert
                    message="Bảng chấm công theo tháng"
                    description="Nhấp vào từng dòng để xem chi tiết danh sách nhân viên trong tháng đó"
                    type="info"
                    showIcon
                    style={{ marginBottom: 16, borderRadius: 16 }}
                  />
                  <Table
                    rowKey="month"
                    dataSource={monthlyTableData}
                    pagination={false}
                    style={{
                      borderRadius: softRadius,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onRow={(record) => ({
                      onClick: () => {
                        setSelectedMonthlyDetail(record);
                        setOpenMonthlyDetail(true);
                      },
                      style: { cursor: "pointer" },
                    })}
                    columns={[
                      {
                        title: "Tháng",
                        dataIndex: "month",
                        width: 120,
                        render: (value) => (
                          <Tag
                            color="blue"
                            style={{ borderRadius: 999, cursor: "pointer" }}
                          >
                            {value}
                          </Tag>
                        ),
                      },
                      {
                        title: "Tỷ lệ chuyên cần",
                        dataIndex: "tyLeChuyenCan",
                        render: (value) => (
                          <Progress percent={value} strokeColor="#2563eb" />
                        ),
                      },
                      {
                        title: "Đúng giờ",
                        dataIndex: "dungGio",
                        align: "center",
                        render: (value) => (
                          <Text strong style={{ color: "#22c55e" }}>
                            {value}%
                          </Text>
                        ),
                      },
                      {
                        title: "Đi trễ",
                        dataIndex: "diTre",
                        align: "center",
                        render: (value) => (
                          <Tag color="orange" style={{ borderRadius: 999 }}>
                            {value}%
                          </Tag>
                        ),
                      },
                      {
                        title: "Vắng có phép",
                        dataIndex: "vangCoPhep",
                        align: "center",
                        render: (value) => (
                          <Tag color="processing" style={{ borderRadius: 999 }}>
                            {value}%
                          </Tag>
                        ),
                      },
                      {
                        title: "Vắng không phép",
                        dataIndex: "vangKhongPhep",
                        align: "center",
                        render: (value) => (
                          <Tag color="red" style={{ borderRadius: 999 }}>
                            {value}%
                          </Tag>
                        ),
                      },
                      {
                        title: "Nghỉ thai sản",
                        dataIndex: "nghiThaiSan",
                        align: "center",
                        render: (value) => (
                          <Tag color="purple" style={{ borderRadius: 999 }}>
                            {value}
                          </Tag>
                        ),
                      },
                    ]}
                  />
                </div>
              ),
            },
            {
              key: "daily",
              label: (
                <span>
                  <ScheduleOutlined /> Chấm công hàng ngày
                </span>
              ),
              children: (
                <div>
                  <Alert
                    message="Bảng chấm công theo ngày"
                    description="Theo dõi tình hình đi muộn, về sớm, đi sớm của toàn công ty"
                    type="info"
                    showIcon
                    style={{ marginBottom: 16, borderRadius: 12 }}
                  />
                  <Table
                    dataSource={dailyAttendance}
                    columns={[
                      {
                        title: "Ngày",
                        dataIndex: "date",
                        key: "date",
                        width: 120,
                      },
                      {
                        title: "Thứ",
                        dataIndex: "thu",
                        key: "thu",
                        width: 100,
                      },
                      {
                        title: "Đi muộn",
                        dataIndex: "diMuon",
                        key: "diMuon",
                        render: (val) => (
                          <Badge
                            count={val}
                            style={{ backgroundColor: "#f59e0b" }}
                          />
                        ),
                      },
                      {
                        title: "Về sớm",
                        dataIndex: "veSom",
                        key: "veSom",
                        render: (val) => (
                          <Badge
                            count={val}
                            style={{ backgroundColor: "#f97316" }}
                          />
                        ),
                      },
                      {
                        title: "Đi sớm",
                        dataIndex: "diSom",
                        key: "diSom",
                        render: (val) => (
                          <Badge
                            count={val}
                            style={{ backgroundColor: "#22c55e" }}
                          />
                        ),
                      },
                      {
                        title: "Đúng giờ",
                        dataIndex: "dungGio",
                        key: "dungGio",
                        render: (val) => (
                          <Badge
                            count={val}
                            style={{ backgroundColor: "#3b82f6" }}
                          />
                        ),
                      },
                      {
                        title: "Vắng",
                        dataIndex: "vang",
                        key: "vang",
                        render: (val) => (
                          <Badge
                            count={val}
                            style={{ backgroundColor: "#ef4444" }}
                          />
                        ),
                      },
                      {
                        title: "Nghỉ phép",
                        dataIndex: "nghiPhep",
                        key: "nghiPhep",
                        render: (val) => (
                          <Badge
                            count={val}
                            style={{ backgroundColor: "#a855f7" }}
                          />
                        ),
                      },
                    ]}
                    pagination={false}
                    size="small"
                  />
                </div>
              ),
            },
            {
              key: "table",
              label: (
                <span>
                  <FileTextOutlined /> Bảng chấm công chi tiết
                </span>
              ),
              children: (
                <div>
                  {filterBar}
                  <div
                    style={{
                      marginBottom: 16,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Space>
                      <Radio.Group
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                        buttonStyle="solid"
                      >
                        <Radio.Button value="table">Dạng bảng</Radio.Button>
                        <Radio.Button value="card">Dạng thẻ</Radio.Button>
                      </Radio.Group>
                      <Text type="secondary">
                        Hiển thị {filteredData.length} nhân viên
                      </Text>
                    </Space>
                  </div>

                  {viewMode === "table" ? (
                    <Table
                      columns={columns}
                      dataSource={filteredData}
                      pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Tổng ${total} nhân viên`,
                      }}
                      scroll={{ x: 1200 }}
                      rowClassName={() => "table-row"}
                    />
                  ) : (
                    <Row gutter={[16, 16]}>
                      {filteredData.map((record) => (
                        <Col xs={24} sm={12} lg={8} key={record.key}>
                          <Card
                            hoverable
                            style={{ borderRadius: 16 }}
                            actions={[
                              <EyeOutlined
                                key="view"
                                onClick={() => {
                                  setSelectedEmployee(record);
                                  setOpenDetail(true);
                                }}
                              />,
                            ]}
                          >
                            <Space
                              direction="vertical"
                              style={{ width: "100%" }}
                              size={12}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Space>
                                  <Avatar
                                    size={50}
                                    style={{
                                      background:
                                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                                    }}
                                  >
                                    {record.hoTen.charAt(0)}
                                  </Avatar>
                                  <div>
                                    <Text strong>{record.hoTen}</Text>
                                    <br />
                                    <Text
                                      type="secondary"
                                      style={{ fontSize: 12 }}
                                    >
                                      {record.chucVu}
                                    </Text>
                                  </div>
                                </Space>
                                <Tag
                                  color={
                                    record.trangThai === "Đúng giờ"
                                      ? "green"
                                      : "orange"
                                  }
                                  style={{ borderRadius: 999 }}
                                >
                                  {record.trangThai}
                                </Tag>
                              </div>
                              <Divider style={{ margin: 0 }} />
                              <Row gutter={12}>
                                <Col span={12}>
                                  <Text type="secondary">Ngày làm</Text>
                                  <br />
                                  <Text strong>{record.soNgayDiLam}/22</Text>
                                </Col>
                                <Col span={12}>
                                  <Text type="secondary">Tổng giờ</Text>
                                  <br />
                                  <Text strong>{record.tongGioLam}h</Text>
                                </Col>
                                <Col span={12}>
                                  <Text type="secondary">OT</Text>
                                  <br />
                                  <Text strong>{record.tongGioOT}h</Text>
                                </Col>
                                <Col span={12}>
                                  <Text type="secondary">Đi trễ</Text>
                                  <br />
                                  <Text strong>{record.soLanDiTre} lần</Text>
                                </Col>
                              </Row>
                            </Space>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              ),
            },
          ]}
        />
      </Card>

    {/* =========================
    MODAL CHI TIẾT PHÒNG BAN
========================= */}

<Modal
  open={openDeptDetail}
  footer={null}
  closable={false}
  centered
  destroyOnHidden
  getContainer={document.body}
  zIndex={999999}
  width="92%"
  style={{
    top: 18,
    maxWidth: 1280,
    paddingBottom: 0,
  }}
  styles={{
    mask: {
      backdropFilter: "blur(14px)",
      background: isDark
        ? "rgba(2,6,23,0.82)"
        : "rgba(15,23,42,0.55)",
    },

    root: {
      padding: 0,

      overflow: "hidden",

      borderRadius: 30,

      background: cardColor,

      boxShadow:
        "0 25px 80px rgba(0,0,0,0.25)",
    },

    body: {
      padding: 0,

      maxHeight: "88vh",

      overflow: "auto",
    },
  }}
  onCancel={() =>
    setOpenDeptDetail(false)
  }
>
  {selectedDeptDetail && (
    <div>
      {/* HEADER */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",

          padding: 30,

          position: "sticky",

          top: 0,

          zIndex: 10,
        }}
      >
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() =>
            setOpenDeptDetail(false)
          }
          style={{
            position: "absolute",

            top: 18,

            right: 18,

            color: "#fff",
          }}
        />

        <Space size={20}>
          <Avatar
            size={80}
            style={{
              background:
                "rgba(255,255,255,0.18)",

              fontSize: 34,
            }}
          >
            {selectedDeptDetail.dept.charAt(
              0
            )}
          </Avatar>

          <div>
            <Title
              level={2}
              style={{
                margin: 0,

                color: "#fff",
              }}
            >
              {
                selectedDeptDetail.dept
              }
            </Title>

            <Text
              style={{
                color:
                  "rgba(255,255,255,0.85)",

                fontSize: 15,
              }}
            >
              Chi tiết chấm công
              phòng ban
            </Text>
          </div>
        </Space>
      </div>

      {/* BODY */}

      <div
        style={{
          padding: 24,
        }}
      >
        {/* STATS */}

        <Row
          gutter={[16, 16]}
          style={{
            marginBottom: 24,
          }}
        >
          <Col
            xs={24}
            md={12}
            xl={6}
          >
            <Card
              style={{
                borderRadius: 20,
              }}
            >
              <Statistic
                title="Nhân viên"
                value={
                  selectedDeptDetail.nhanVien
                }
                suffix="người"
              />
            </Card>
          </Col>

          <Col
            xs={24}
            md={12}
            xl={6}
          >
            <Card
              style={{
                borderRadius: 20,
              }}
            >
              <Statistic
                title="Đúng giờ"
                value={
                  selectedDeptDetail.dungGio
                }
                suffix="%"
                valueStyle={{
                  color: "#22c55e",
                }}
              />
            </Card>
          </Col>

          <Col
            xs={24}
            md={12}
            xl={6}
          >
            <Card
              style={{
                borderRadius: 20,
              }}
            >
              <Statistic
                title="Đi trễ"
                value={
                  selectedDeptDetail.diTre
                }
                suffix="%"
                valueStyle={{
                  color: "#f59e0b",
                }}
              />
            </Card>
          </Col>

          <Col
            xs={24}
            md={12}
            xl={6}
          >
            <Card
              style={{
                borderRadius: 20,
              }}
            >
              <Statistic
                title="OT trung bình"
                value={
                  selectedDeptDetail.otTB
                }
                suffix="h"
                valueStyle={{
                  color: "#7c3aed",
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* TABLE */}

        <Card
          style={{
            borderRadius: 24,
          }}
        >
          <Space
            direction="vertical"
            size={18}
            style={{
              width: "100%",
            }}
          >
            <Row
              justify="space-between"
              align="middle"
              gutter={[16, 16]}
            >
              <Col>
                <div>
                  <Title
                    level={4}
                    style={{
                      margin: 0,
                    }}
                  >
                    Danh sách nhân viên
                  </Title>

                  <Text type="secondary">
                    Thống kê chấm công
                    tháng{" "}
                    {
                      selectedMonth
                    }
                  </Text>
                </div>
              </Col>

              <Col>
                <Input
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tìm nhân viên..."
                  style={{
                    width: 280,

                    height: 42,

                    borderRadius: 14,
                  }}
                />
              </Col>
            </Row>

            <Table
              dataSource={getEmployeesByDept(
                selectedDeptDetail.dept
              )}
              pagination={{
                pageSize: 8,
              }}
              scroll={{
                x: "max-content",
              }}
              columns={[
                {
                  title:
                    "Nhân viên",

                  width: 260,

                  render:
                    (
                      _: any,
                      record: any
                    ) => (
                      <Space>
                        <Avatar
                          style={{
                            background:
                              "linear-gradient(135deg,#2563eb,#7c3aed)",
                          }}
                        >
                          {record.hoTen.charAt(
                            0
                          )}
                        </Avatar>

                        <div>
                          <Text strong>
                            {
                              record.hoTen
                            }
                          </Text>

                          <br />

                          <Text
                            type="secondary"
                            style={{
                              fontSize: 12,
                            }}
                          >
                            {
                              record.chucVu
                            }
                          </Text>
                        </div>
                      </Space>
                    ),
                },

                {
                  title:
                    "Ngày làm",

                  dataIndex:
                    "soNgayDiLam",

                  width: 120,

                  align:
                    "center",

                  render:
                    (
                      val: number
                    ) => (
                      <Tag
                        color="blue"
                        style={{
                          borderRadius: 999,
                        }}
                      >
                        {val}/22
                      </Tag>
                    ),
                },

                {
                  title:
                    "Tổng giờ",

                  dataIndex:
                    "tongGioLam",

                  width: 120,

                  align:
                    "center",

                  render:
                    (
                      val: number
                    ) => (
                      <Text strong>
                        {val}h
                      </Text>
                    ),
                },

                {
                  title:
                    "OT",

                  dataIndex:
                    "tongGioOT",

                  width: 100,

                  align:
                    "center",

                  render:
                    (
                      val: number
                    ) => (
                      <Tag
                        color="purple"
                        style={{
                          borderRadius: 999,
                        }}
                      >
                        {val}h
                      </Tag>
                    ),
                },

                {
                  title:
                    "Đi trễ",

                  dataIndex:
                    "soLanDiTre",

                  width: 120,

                  align:
                    "center",

                  render:
                    (
                      val: number
                    ) => (
                      <Badge
                        count={val}
                        style={{
                          backgroundColor:
                            val > 0
                              ? "#f59e0b"
                              : "#22c55e",
                        }}
                      />
                    ),
                },

                {
                  title:
                    "Trạng thái",

                  dataIndex:
                    "trangThai",

                  width: 180,

                  render:
                    (
                      val: string
                    ) => {
                      let color =
                        "green";

                      if (
                        val ===
                        "Đi trễ"
                      )
                        color =
                          "orange";

                      if (
                        val ===
                        "Vắng không phép"
                      )
                        color =
                          "red";

                      if (
                        val ===
                        "Nghỉ thai sản"
                      )
                        color =
                          "purple";

                      return (
                        <Tag
                          color={
                            color
                          }
                          style={{
                            borderRadius: 999,
                          }}
                        >
                          {val}
                        </Tag>
                      );
                    },
                },

                {
                  title:
                    "",

                  width: 120,

                  fixed:
                    "right",

                  render:
                    (
                      _: any,
                      record: any
                    ) => (
                      <Button
                        type="primary"
                        size="small"
                        icon={
                          <EyeOutlined />
                        }
                        style={{
                          borderRadius: 12,
                        }}
                        onClick={() => {
                          setSelectedEmployee(
                            record
                          );

                          setOpenDetail(
                            true
                          );

                          setOpenDeptDetail(
                            false
                          );
                        }}
                      >
                        Xem
                      </Button>
                    ),
                },
              ]}
            />
          </Space>
        </Card>
      </div>
    </div>
  )}
</Modal>



      {/* Modal chi tiết nhân viên */}
      <Modal
        open={openDetail}
        footer={null}
        closable={false}
        centered
        zIndex={100000}
        width="90%"
        style={{ maxWidth: 1200 }}
        onCancel={() => setOpenDetail(false)}
        styles={{
          mask: {
            backdropFilter: "blur(16px)",
            background: isDark ? "rgba(2,6,23,0.82)" : "rgba(15,23,42,0.68)",
          },
          root: {
            padding: 0,
            borderRadius: softRadius,
            overflow: "hidden",
            background: "transparent",
            boxShadow: "0 30px 80px rgba(0,0,0,0.22)",
          },
          body: {
            padding: 0,
            borderRadius: softRadius,
            overflow: "hidden",
            background: "transparent",
          },
        }}
      >
        {selectedEmployee && (
          <div>
            {/* Header với gradient */}
            <div
              style={{
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                padding: 32,
                borderRadius: "20px 20px 0 0",
                position: "relative",
              }}
            >
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setOpenDetail(false)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  color: "#fff",
                }}
              />
              <Space size={24}>
                <Avatar
                  size={80}
                  style={{ background: "rgba(255,255,255,0.2)", fontSize: 36 }}
                >
                  {selectedEmployee.hoTen.charAt(0)}
                </Avatar>
                <div>
                  <Title level={3} style={{ margin: 0, color: "#fff" }}>
                    {selectedEmployee.hoTen}
                  </Title>
                  <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                    {selectedEmployee.chucVu} | {selectedEmployee.phongBan}
                  </Text>
                </div>
              </Space>
            </div>

            {/* Nội dung chi tiết */}
            <div style={{ padding: 28 }}>
              <Row gutter={[24, 24]}>
                {/* Thông tin chấm công */}
                <Col xs={24} lg={14}>
                  <Card
                    title="📊 Thống kê chấm công tháng {selectedMonth}/{selectedYear}"
                    style={{ borderRadius: 20 }}
                  >
                    <Descriptions column={{ xs: 1, sm: 2 }} bordered>
                      <Descriptions.Item label="Số ngày đi làm">
                        <Text strong>
                          {selectedEmployee.soNgayDiLam}/22 ngày
                        </Text>
                        <Progress
                          percent={Math.round(
                            (selectedEmployee.soNgayDiLam / 22) * 100,
                          )}
                          size="small"
                          strokeColor="#22c55e"
                          style={{ marginTop: 8 }}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="Tổng giờ làm">
                        <Text strong>{selectedEmployee.tongGioLam} giờ</Text>
                        <br />
                        <Text type="secondary">
                          OT: {selectedEmployee.tongGioOT} giờ
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Số lần đi trễ">
                        <Badge
                          count={selectedEmployee.soLanDiTre}
                          style={{
                            backgroundColor:
                              selectedEmployee.soLanDiTre > 0
                                ? "#f59e0b"
                                : "#22c55e",
                          }}
                        />
                        {selectedEmployee.soLanDiTre > 0 && (
                          <Text type="secondary" style={{ marginLeft: 8 }}>
                            (Tổng {selectedEmployee.lateMinutes} phút)
                          </Text>
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Trạng thái">
                        <Tag
                          color={
                            selectedEmployee.trangThai === "Đúng giờ"
                              ? "green"
                              : selectedEmployee.trangThai === "Đi trễ"
                                ? "orange"
                                : selectedEmployee.trangThai === "Vắng có phép"
                                  ? "blue"
                                  : selectedEmployee.trangThai ===
                                      "Vắng không phép"
                                    ? "red"
                                    : "purple"
                          }
                          style={{ borderRadius: 999, padding: "4px 16px" }}
                        >
                          {selectedEmployee.trangThai}
                        </Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>

                  {/* Timeline chấm công */}
                  {selectedEmployee.checkins.length > 0 && (
                    <Card
                      title="⏰ Timeline chấm công trong ngày"
                      style={{ borderRadius: 20, marginTop: 20 }}
                    >
                      <Timeline
                        items={selectedEmployee.checkins.map((item: any) => ({
                          color: item.type === "Check out" ? "red" : "blue",
                          dot:
                            item.type === "Check in" ? (
                              <CheckCircleOutlined />
                            ) : (
                              <ClockCircleOutlined />
                            ),
                          children: (
                            <div>
                              <Text strong>{item.time}</Text>
                              <br />
                              <Text type="secondary">{item.type}</Text>
                            </div>
                          ),
                        }))}
                      />
                    </Card>
                  )}
                </Col>

                {/* Thông tin bổ sung */}
                <Col xs={24} lg={10}>
                  <Card
                    title="ℹ️ Thông tin bổ sung"
                    style={{ borderRadius: 20, marginBottom: 20 }}
                  >
                    <Space
                      direction="vertical"
                      size={16}
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Text type="secondary">Phòng ban</Text>
                        <br />
                        <Tag color="blue">{selectedEmployee.phongBan}</Tag>
                      </div>
                      <div>
                        <Text type="secondary">Chức vụ</Text>
                        <br />
                        <Text>{selectedEmployee.chucVu}</Text>
                      </div>
                      <div>
                        <Text type="secondary">Nghỉ phép</Text>
                        <br />
                        <Text>
                          {selectedEmployee.phep === "Có"
                            ? "Đã đăng ký nghỉ phép"
                            : "Không nghỉ phép"}
                        </Text>
                      </div>
                      {selectedEmployee.thaiSan && (
                        <div>
                          <Text type="secondary">Chế độ thai sản</Text>
                          <br />
                          <Tag color="purple">Đang nghỉ thai sản</Tag>
                        </div>
                      )}
                    </Space>
                  </Card>

                  {/* Đề xuất */}
                  {selectedEmployee.soLanDiTre > 5 && (
                    <Alert
                      message="Cảnh báo đi trễ nhiều"
                      description={`Nhân viên đã đi trễ ${selectedEmployee.soLanDiTre} lần trong tháng, cần nhắc nhở.`}
                      type="warning"
                      showIcon
                      style={{ borderRadius: 16 }}
                    />
                  )}
                  {selectedEmployee.tongGioOT > 30 && (
                    <Alert
                      message="Làm thêm giờ nhiều"
                      description={`Nhân viên đã làm thêm ${selectedEmployee.tongGioOT} giờ trong tháng.`}
                      type="info"
                      showIcon
                      style={{ borderRadius: 16, marginTop: 16 }}
                    />
                  )}
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}


{/* <style>{`
.ant-modal-root {
  z-index: 999999 !important;
}

.ant-modal-mask {
  z-index: 999998 !important;
}

.table-row:hover {
  background: ${
    isDark
      ? "rgba(255,255,255,0.05)"
      : "#f8fafc"
  };

  transition: all 0.3s;
}

.ant-modal-wrap {
  z-index: 999999 !important;

  overflow-y: auto !important;
}

.ant-tabs-content-holder {
  overflow: visible !important;
}

.ant-layout {
  overflow: visible !important;
}

.ant-layout-content {
  overflow: visible !important;
}

.ant-modal-content {
  overflow: hidden !important;
}

.ant-table-wrapper {
  overflow: hidden !important;
}
`}</style> */}
