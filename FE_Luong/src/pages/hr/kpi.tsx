import {
  ArrowUpOutlined,
  BarChartOutlined,
  CloseOutlined,
  EyeOutlined,
  RiseOutlined,
  SearchOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
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
  Statistic,
  Table,
  Tag,
  Typography,
  theme,
} from "antd";
import type { TableColumnsType } from "antd";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

type Employee = {
  key: string;
  name: string;
  chucVu: string;
  kpi: number;
  p3: string;
};

type Department = {
  key: number;
  phongBan: string;
  truongPhong: string;
  nhanVien: number;
  kpi: number;
  target: number;
  thuong: string;
  monthly: Array<{ month: string; kpi: number; target: number; p3: number }>;
  employees: Employee[];
};

const departments: Department[] = [
  {
    key: 1,
    phongBan: "Công nghệ",
    truongPhong: "Nguyễn Minh Anh",
    nhanVien: 28,
    kpi: 92,
    target: 90,
    thuong: "Phòng ban xuất sắc",
    monthly: [
      { month: "T1", kpi: 78, target: 90, p3: 68 },
      { month: "T2", kpi: 82, target: 90, p3: 74 },
      { month: "T3", kpi: 86, target: 90, p3: 81 },
      { month: "T4", kpi: 88, target: 90, p3: 86 },
      { month: "T5", kpi: 90, target: 90, p3: 94 },
      { month: "T6", kpi: 92, target: 90, p3: 102 },
    ],
    employees: [
      {
        key: "cn-1",
        name: "Nguyễn Văn A",
        chucVu: "Frontend Dev",
        kpi: 95,
        p3: "3.200.000",
      },
      {
        key: "cn-2",
        name: "Trần Văn B",
        chucVu: "Backend Dev",
        kpi: 88,
        p3: "2.600.000",
      },
      {
        key: "cn-3",
        name: "Lê Văn C",
        chucVu: "Tester",
        kpi: 82,
        p3: "1.800.000",
      },
    ],
  },
  {
    key: 2,
    phongBan: "Nhân sự",
    truongPhong: "Trần Gia Huy",
    nhanVien: 16,
    kpi: 84,
    target: 85,
    thuong: "Onboarding tốt",
    monthly: [
      { month: "T1", kpi: 72, target: 85, p3: 42 },
      { month: "T2", kpi: 75, target: 85, p3: 48 },
      { month: "T3", kpi: 78, target: 85, p3: 53 },
      { month: "T4", kpi: 80, target: 85, p3: 58 },
      { month: "T5", kpi: 82, target: 85, p3: 63 },
      { month: "T6", kpi: 84, target: 85, p3: 69 },
    ],
    employees: [
      {
        key: "ns-1",
        name: "Nguyễn HR",
        chucVu: "HR Executive",
        kpi: 90,
        p3: "2.200.000",
      },
      {
        key: "ns-2",
        name: "Phạm HR",
        chucVu: "Recruitment",
        kpi: 78,
        p3: "1.600.000",
      },
    ],
  },
];

const compareData = [
  { month: "T1", congNghe: 78, nhanSu: 72 },
  { month: "T2", congNghe: 82, nhanSu: 75 },
  { month: "T3", congNghe: 86, nhanSu: 78 },
  { month: "T4", congNghe: 88, nhanSu: 80 },
  { month: "T5", congNghe: 90, nhanSu: 82 },
  { month: "T6", congNghe: 92, nhanSu: 84 },
];

const pieData = [
  { name: "Xuất sắc", value: 62 },
  { name: "Đạt KPI", value: 28 },
  { name: "Chưa đạt", value: 10 },
];

const COLORS = ["#2563eb", "#7c3aed", "#22c55e"];

export default function KPIHRDashboard() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [departmentStatus, setDepartmentStatus] = useState("all");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeKpiFilter, setEmployeeKpiFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(
    null
  );

  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const subText = isDark ? "#94a3b8" : "#64748b";
  const cardColor = isDark ? "#0f172a" : "#ffffff";
  const surfaceColor = isDark ? "#111827" : "#f8fafc";
  const borderColor = isDark ? "rgba(148,163,184,0.18)" : "#e2e8f0";
  const bgColor = isDark ? "#020617" : "#f8fafc";
  const gridColor = isDark ? "rgba(148,163,184,0.18)" : "#e2e8f0";
  const chartTextColor = isDark ? "#cbd5e1" : "#475569";
  const cardRadius = 20;
  const controlRadius = 14;

  const filteredDepartments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return departments.filter((item) => {
      const matchesSearch =
        item.phongBan.toLowerCase().includes(keyword) ||
        item.truongPhong.toLowerCase().includes(keyword);
      const matchesStatus =
        departmentStatus === "all" ||
        (departmentStatus === "achieved" && item.kpi >= item.target) ||
        (departmentStatus === "missing" && item.kpi < item.target);

      return matchesSearch && matchesStatus;
    });
  }, [departmentStatus, search]);

  const filteredEmployees = useMemo(() => {
    const keyword = employeeSearch.trim().toLowerCase();

    return (selectedDepartment?.employees ?? []).filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.chucVu.toLowerCase().includes(keyword);
      const matchesKpi =
        employeeKpiFilter === "all" ||
        (employeeKpiFilter === "excellent" && item.kpi >= 90) ||
        (employeeKpiFilter === "achieved" && item.kpi >= 80 && item.kpi < 90) ||
        (employeeKpiFilter === "missing" && item.kpi < 80);

      return matchesSearch && matchesKpi;
    });
  }, [employeeKpiFilter, employeeSearch, selectedDepartment]);

  const totalEmployees = departments.reduce((sum, item) => sum + item.nhanVien, 0);
  const averageKpi = Math.round(
    departments.reduce((sum, item) => sum + item.kpi, 0) / departments.length
  );
  const bestDepartment = departments.reduce((best, item) =>
    item.kpi > best.kpi ? item : best
  );
  const achievedDepartments = departments.filter(
    (item) => item.kpi >= item.target
  ).length;
  const selectedP3Total =
    selectedDepartment?.monthly.at(-1)?.p3 ?? 0;

  const departmentColumns: TableColumnsType<Department> = [
    {
      title: "Phòng ban",
      key: "phongBan",
      width: "28%",
      render: (_, record) => (
        <Space size={12} style={{ maxWidth: "100%" }}>
          <Avatar
            size={42}
            style={{
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              flex: "0 0 auto",
              fontWeight: 700,
            }}
          >
            {record.phongBan.charAt(0)}
          </Avatar>
          <Space direction="vertical" size={0} style={{ minWidth: 0 }}>
            <Text ellipsis style={{ color: textColor, fontWeight: 700 }}>
              {record.phongBan}
            </Text>
            <Text ellipsis style={{ color: subText }}>
              TP: {record.truongPhong}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "KPI thực tế",
      key: "kpi",
      width: "22%",
      render: (_, record) => (
        <Progress
          percent={record.kpi}
          size="small"
          strokeColor={{ "0%": "#60a5fa", "100%": "#7c3aed" }}
        />
      ),
    },
    {
      title: "Mục tiêu",
      dataIndex: "target",
      width: "12%",
      align: "center",
      render: (value: number) => <Tag color="purple">{value}%</Tag>,
    },
    {
      title: "Nhân sự",
      dataIndex: "nhanVien",
      width: "12%",
      align: "center",
      render: (value: number) => <Tag color="blue">{value} người</Tag>,
    },
    {
      title: "Thành tích",
      dataIndex: "thuong",
      width: "18%",
      ellipsis: true,
      render: (value: string) => <Tag color="green">{value}</Tag>,
    },
    {
      title: "",
      key: "action",
      width: "8%",
      align: "right",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedDepartment(record);
            setEmployeeSearch("");
            setEmployeeKpiFilter("all");
            setOpenModal(true);
          }}
        />
      ),
    },
  ];

  const employeeColumns: TableColumnsType<Employee> = [
    {
      title: "Nhân viên",
      key: "name",
      width: "36%",
      render: (_, record) => (
        <Space style={{ minWidth: 0 }}>
          <Avatar icon={<UserOutlined />} style={{ background: "#2563eb" }} />
          <Text ellipsis style={{ color: textColor, fontWeight: 600 }}>
            {record.name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Chức vụ",
      dataIndex: "chucVu",
      width: "24%",
      ellipsis: true,
    },
    {
      title: "KPI",
      key: "kpi",
      width: "24%",
      render: (_, record) => (
        <Progress
          percent={record.kpi}
          size="small"
          strokeColor={{ "0%": "#60a5fa", "100%": "#7c3aed" }}
        />
      ),
    },
    {
      title: "Lương KPI P3",
      dataIndex: "p3",
      width: "16%",
      align: "right",
      render: (value: string) => (
        <Text style={{ color: "#2563eb", fontWeight: 700 }}>{value}</Text>
      ),
    },
  ];

  const cardStyle = {
    border: `1px solid ${borderColor}`,
    background: cardColor,
    borderRadius: cardRadius,
  };

  const smallCardStyle = {
    border: `1px solid ${borderColor}`,
    background: surfaceColor,
    borderRadius: controlRadius,
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorBgContainer: cardColor,
          colorBorderSecondary: borderColor,
          colorText: textColor,
          colorTextSecondary: subText,
          borderRadius: controlRadius,
        },
        components: {
          Card: {
            colorBgContainer: cardColor,
          },
          Input: {
            colorBgContainer: isDark ? "#020617" : "#ffffff",
            colorBorder: borderColor,
          },
          Modal: {
            contentBg: cardColor,
            headerBg: cardColor,
          },
          Select: {
            selectorBg: isDark ? "#020617" : "#ffffff",
            colorBorder: borderColor,
          },
          Table: {
            headerBg: isDark ? "#111827" : "#f1f5f9",
            headerColor: textColor,
            rowHoverBg: isDark ? "#1e293b" : "#f8fafc",
            borderColor,
          },
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          maxWidth: "100%",
          overflowX: "hidden",
          background: bgColor,
          padding: "20px clamp(12px, 2vw, 24px)",
        }}
      >
        <Card style={{ ...cardStyle, marginBottom: 20 }} bodyStyle={{ padding: 24 }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col flex="auto" style={{ minWidth: 0 }}>
              <Space size={16} align="start" style={{ maxWidth: "100%" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 auto",
                    fontSize: 28,
                    color: "#fff",
                  }}
                >
                  <BarChartOutlined />
                </div>
                <Space direction="vertical" size={8} style={{ minWidth: 0 }}>
                  <Title level={2} style={{ margin: 0, color: textColor }}>
                    KPI Phòng Ban
                  </Title>
                  <Text style={{ color: subText, fontSize: 15 }}>
                    Theo dõi KPI thực tế, KPI theo tháng và KPI nhân viên dùng
                    tính lương P3
                  </Text>
                  <Space wrap>
                    <Tag color="blue">KPI theo tháng</Tag>
                    <Tag color="purple">So sánh phòng ban</Tag>
                    <Tag color="green">KPI tính lương</Tag>
                  </Space>
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          {[
            {
              title: "KPI trung bình",
              value: `${averageKpi}%`,
              icon: <RiseOutlined />,
              color: "linear-gradient(135deg,#2563eb,#7c3aed)",
            },
            {
              title: "Phòng ban tốt nhất",
              value: bestDepartment.phongBan,
              icon: <TrophyOutlined />,
              color: "linear-gradient(135deg,#10b981,#06b6d4)",
            },
            {
              title: "Tổng nhân sự",
              value: totalEmployees,
              icon: <TeamOutlined />,
              color: "linear-gradient(135deg,#f59e0b,#f97316)",
            },
            {
              title: "Đạt mục tiêu",
              value: `${achievedDepartments}/${departments.length}`,
              icon: <ArrowUpOutlined />,
              color: "linear-gradient(135deg,#ec4899,#8b5cf6)",
            },
          ].map((item) => (
            <Col xs={24} md={12} xl={6} key={item.title}>
              <Card
                style={{
                  border: "none",
                  background: item.color,
                  borderRadius: cardRadius,
                  height: "100%",
                }}
                bodyStyle={{
                  height: 114,
                  padding: "22px 76px 22px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(255,255,255,0.82)",
                      fontSize: 14,
                      marginBottom: 10,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={String(item.title)}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      fontSize: 26,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={String(item.value)}
                  >
                    {item.value}
                  </div>
                </div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#fff",
                    position: "absolute",
                    right: 24,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {item.icon}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={24} xl={16}>
            <Card style={cardStyle}>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <div>
                  <Title level={4} style={{ marginBottom: 4, color: textColor }}>
                    So sánh KPI phòng ban
                  </Title>
                  <Text style={{ color: subText }}>KPI thực tế theo từng tháng</Text>
                </div>
                <div style={{ width: "100%", height: 340 }}>
                  <ResponsiveContainer>
                    <AreaChart data={compareData} margin={{ left: -16, right: 8 }}>
                      <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fill: chartTextColor }} />
                      <YAxis tick={{ fill: chartTextColor }} domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "KPI"]}
                        contentStyle={{
                          background: cardColor,
                          border: `1px solid ${borderColor}`,
                          color: textColor,
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="congNghe"
                        stroke="#2563eb"
                        fill="#2563eb55"
                        name="Công nghệ"
                      />
                      <Area
                        type="monotone"
                        dataKey="nhanSu"
                        stroke="#7c3aed"
                        fill="#7c3aed33"
                        name="Nhân sự"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} xl={8}>
            <Card style={{ ...cardStyle, height: "100%" }}>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <div>
                  <Title level={4} style={{ marginBottom: 4, color: textColor }}>
                    Tổng quan KPI
                  </Title>
                  <Text style={{ color: subText }}>Tỷ lệ phân nhóm hiệu suất</Text>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius="48%"
                        outerRadius="76%"
                        dataKey="value"
                        nameKey="name"
                        label={({ value }) => `${value}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Tỷ lệ"]}
                        contentStyle={{
                          background: cardColor,
                          border: `1px solid ${borderColor}`,
                          color: textColor,
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        <Card style={cardStyle}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Row justify="space-between" align="middle" gutter={[12, 12]}>
              <Col xs={24} lg={10}>
                <Title level={4} style={{ margin: 0, color: textColor }}>
                  Danh sách phòng ban
                </Title>
                <Text style={{ color: subText }}>Theo dõi KPI từng phòng ban</Text>
              </Col>
              <Col xs={24} lg={14}>
                <Row gutter={[10, 10]} justify="end">
                  <Col xs={24} md={10}>
                    <Select
                      value={departmentStatus}
                      onChange={setDepartmentStatus}
                      style={{ width: "100%" }}
                      options={[
                        { value: "all", label: "Tất cả trạng thái" },
                        { value: "achieved", label: "Đạt mục tiêu" },
                        { value: "missing", label: "Chưa đạt" },
                      ]}
                    />
                  </Col>
                  <Col xs={24} md={14}>
                    <Input
                      prefix={<SearchOutlined />}
                      placeholder="Tìm phòng ban hoặc trưởng phòng..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Table
              columns={departmentColumns}
              dataSource={filteredDepartments}
              pagination={{ pageSize: 5, showSizeChanger: false }}
              tableLayout="fixed"
              size="middle"
            />
          </Space>
        </Card>

        <Modal
          open={openModal}
          footer={null}
          centered
          closable={false}
          width="min(1180px, calc(100vw - 32px))"
          zIndex={99999}
          onCancel={() => setOpenModal(false)}
          styles={{
            mask: {
              backdropFilter: "blur(10px)",
              background: "rgba(15,23,42,0.55)",
            },
            root: {
              padding: 0,
              overflow: "hidden",
              borderRadius: cardRadius,
              background: "transparent",
            },
            body: { padding: 0 },
          }}
        >
          <div style={{ background: cardColor }}>
            <div
              style={{
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                padding: "28px clamp(20px, 4vw, 36px)",
                position: "relative",
              }}
            >
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setOpenModal(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 40,
                  height: 40,
                  borderRadius: controlRadius,
                  background: "rgba(255,255,255,0.14)",
                  color: "#fff",
                }}
              />

              <Space size={16} style={{ maxWidth: "calc(100% - 48px)" }}>
                <Avatar
                  size={66}
                  style={{
                    background: "rgba(255,255,255,0.16)",
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  {selectedDepartment?.phongBan.charAt(0)}
                </Avatar>
                <Space direction="vertical" size={2} style={{ minWidth: 0 }}>
                  <Title level={2} style={{ margin: 0, color: "#fff" }}>
                    {selectedDepartment?.phongBan}
                  </Title>
                  <Text style={{ color: "rgba(255,255,255,0.82)" }}>
                    Trưởng phòng: {selectedDepartment?.truongPhong}
                  </Text>
                </Space>
              </Space>
            </div>

            <div style={{ padding: "20px clamp(14px, 3vw, 28px)" }}>
              <Row gutter={[14, 14]} style={{ marginBottom: 16 }}>
                {[
                  {
                    label: "KPI hiện tại",
                    value: `${selectedDepartment?.kpi ?? 0}%`,
                  },
                  {
                    label: "Mục tiêu",
                    value: `${selectedDepartment?.target ?? 0}%`,
                  },
                  {
                    label: "Nhân sự",
                    value: selectedDepartment?.nhanVien ?? 0,
                  },
                  {
                    label: "Quỹ P3 tháng này",
                    value: `${selectedP3Total} triệu`,
                  },
                ].map((item) => (
                  <Col xs={12} lg={6} key={item.label}>
                    <Card style={smallCardStyle} bodyStyle={{ padding: 14 }}>
                      <Statistic
                        title={<Text style={{ color: subText }}>{item.label}</Text>}
                        value={item.value}
                        valueStyle={{
                          color: textColor,
                          fontSize: 22,
                          fontWeight: 700,
                        }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} xl={15}>
                  <Card style={cardStyle}>
                    <Space direction="vertical" size={14} style={{ width: "100%" }}>
                      <div>
                        <Title level={5} style={{ margin: 0, color: textColor }}>
                          KPI và quỹ P3 theo tháng
                        </Title>
                        <Text style={{ color: subText }}>
                          So sánh KPI thực tế với mục tiêu và biến động P3
                        </Text>
                      </div>
                      <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                          <BarChart
                            data={selectedDepartment?.monthly ?? []}
                            margin={{ left: -16, right: 8 }}
                          >
                            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fill: chartTextColor }} />
                            <YAxis yAxisId="kpi" tick={{ fill: chartTextColor }} />
                            <YAxis
                              yAxisId="p3"
                              orientation="right"
                              tick={{ fill: chartTextColor }}
                            />
                            <Tooltip
                              formatter={(value, name) => [
                                name === "P3" ? `${value} triệu` : `${value}%`,
                                name,
                              ]}
                              contentStyle={{
                                background: cardColor,
                                border: `1px solid ${borderColor}`,
                                color: textColor,
                              }}
                            />
                            <Legend />
                            <Bar
                              yAxisId="kpi"
                              dataKey="kpi"
                              name="KPI"
                              fill="#2563eb"
                              radius={[8, 8, 0, 0]}
                            />
                            <Bar
                              yAxisId="kpi"
                              dataKey="target"
                              name="Mục tiêu"
                              fill="#22c55e"
                              radius={[8, 8, 0, 0]}
                            />
                            <Bar
                              yAxisId="p3"
                              dataKey="p3"
                              name="P3"
                              fill="#7c3aed"
                              radius={[8, 8, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} xl={9}>
                  <Card style={{ ...cardStyle, height: "100%" }}>
                    <Space
                      direction="vertical"
                      size={16}
                      align="center"
                      style={{ width: "100%" }}
                    >
                      <div style={{ width: "100%" }}>
                        <Title level={5} style={{ margin: 0, color: textColor }}>
                          Mức hoàn thành mục tiêu
                        </Title>
                        <Text style={{ color: subText }}>
                          KPI hiện tại so với mục tiêu phòng ban
                        </Text>
                      </div>
                      <Progress
                        type="dashboard"
                        percent={selectedDepartment?.kpi ?? 0}
                        size={220}
                        strokeColor={{ "0%": "#60a5fa", "100%": "#7c3aed" }}
                        trailColor={isDark ? "#1e293b" : "#e2e8f0"}
                      />
                      <Space wrap>
                        <Tag color="blue">KPI: {selectedDepartment?.kpi ?? 0}%</Tag>
                        <Tag color="green">
                          Mục tiêu: {selectedDepartment?.target ?? 0}%
                        </Tag>
                        <Tag
                          color={
                            (selectedDepartment?.kpi ?? 0) >=
                            (selectedDepartment?.target ?? 0)
                              ? "success"
                              : "warning"
                          }
                        >
                          {(selectedDepartment?.kpi ?? 0) >=
                          (selectedDepartment?.target ?? 0)
                            ? "Đạt"
                            : "Cần cải thiện"}
                        </Tag>
                      </Space>
                    </Space>
                  </Card>
                </Col>
              </Row>

              <Card style={{ ...cardStyle, marginTop: 16 }}>
                <Space direction="vertical" size={14} style={{ width: "100%" }}>
                  <Row justify="space-between" align="middle" gutter={[12, 12]}>
                    <Col xs={24} lg={9}>
                      <Title level={5} style={{ margin: 0, color: textColor }}>
                        Nhân viên trong phòng ban
                      </Title>
                      <Text style={{ color: subText }}>
                        Lọc nhanh theo tên, chức vụ và mức KPI
                      </Text>
                    </Col>
                    <Col xs={24} lg={15}>
                      <Row gutter={[10, 10]} justify="end">
                        <Col xs={24} md={9}>
                          <Select
                            value={employeeKpiFilter}
                            onChange={setEmployeeKpiFilter}
                            style={{ width: "100%" }}
                            options={[
                              { value: "all", label: "Tất cả KPI" },
                              { value: "excellent", label: "Xuất sắc" },
                              { value: "achieved", label: "Đạt KPI" },
                              { value: "missing", label: "Chưa đạt" },
                            ]}
                          />
                        </Col>
                        <Col xs={24} md={15}>
                          <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm nhân viên hoặc chức vụ..."
                            value={employeeSearch}
                            onChange={(e) => setEmployeeSearch(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Table
                    rowKey="key"
                    pagination={{ pageSize: 5, showSizeChanger: false }}
                    columns={employeeColumns}
                    dataSource={filteredEmployees}
                    tableLayout="fixed"
                    size="middle"
                  />
                </Space>
              </Card>
            </div>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
