import {
  Avatar,
  Card,
  Col,
  ConfigProvider,
  Row,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import {
  DollarOutlined,
  HistoryOutlined,
  TrophyOutlined,
  UserOutlined,
  BankOutlined,
  RiseOutlined,
  CalendarOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useTheme as useAppTheme } from "../../context/themecontext";
import { useParams } from "react-router-dom";
import { ChiTietNhanVien } from "../../services/api.service";
import { useEffect, useMemo, useState } from "react";
import HeaderCard from "../../components/hr/hosochitiet/header_card";
import ThongTinCaNhan from "../../components/hr/hosochitiet/tab_TTCN";
import TabThanNhan from "../../components/hr/hosochitiet/tab_ThanNhan";
import PhatTrien from "../../components/hr/hosochitiet/tab_HTPhatTrien";
import TabLuong from "../../components/hr/hosochitiet/tab_luong";

const { Title, Text } = Typography;

interface EmployeeDetailProps {
  isDark?: boolean;
}

const HoSoChiTiet = ({ isDark: isDarkProp }: EmployeeDetailProps) => {
  const { isDark: contextIsDark } = useAppTheme();
  const isDark = isDarkProp ?? contextIsDark;

  const parseMoneyValue = (value: any) => {
    if (typeof value === "number") return value;
    if (!value) return 0;

    const normalized = String(value).replace(/[^\d]/g, "");
    return Number(normalized) || 0;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN").format(value);

  const formatShortCurrency = (value: number) => {
    if (!value) return "0";
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    return formatCurrency(value);
  };

  const achievementData = [
    {
      key: "1",
      title: "Nhân viên xuất sắc quý 1",
      year: 2025,
      desc: "Hoàn thành KPI 150%",
      icon: <TrophyOutlined />,
      color: "#f59e0b",
    },
    {
      key: "2",
      title: "Top Performance",
      year: 2024,
      desc: "Lead dự án nội bộ",
      icon: <TrophyOutlined />,
      color: "#3b82f6",
    },
  ];

  const allowanceData = [
    {
      key: "1",
      name: "Phụ cấp ăn trưa",
      money: "1.000.000 VNĐ",
      status: "Đang áp dụng",
    },
    {
      key: "2",
      name: "Phụ cấp xăng xe",
      money: "500.000 VNĐ",
      status: "Đang áp dụng",
    },
  ];

  // Colors based on theme
  const bgColor = isDark ? "#0f172a" : "#f0f2f5";
  const cardColor = isDark ? "#1e293b" : "#ffffff";
  const surfaceColor = isDark ? "#172033" : "#ffffff";
  const mutedSurfaceColor = isDark ? "#243044" : "#fafafa";
  const borderColor = isDark ? "#334155" : "#e8e8e8";
  const textColor = isDark ? "#f1f5f9" : "#1f1f1f";
  const subText = isDark ? "#94a3b8" : "#666666";
  const accentColor = "#3b82f6";

  const glassCard = {
    background: cardColor,
    border: `1px solid ${borderColor}`,
    borderRadius: 24,
    boxShadow: isDark
      ? "0 8px 24px rgba(2, 6, 23, 0.28)"
      : "0 8px 24px rgba(0,0,0,0.06)",
  };
  const { id } = useParams<{ id: string }>();
  const [ThongTinNhanVien, setThongTinNhanVien] = useState([]);
  const [ThanNhan, setThanNhan] = useState([]);
  const [lichsu, setLichSu] = useState([]);
  const [lichsuluong , setLichSuLuong] = useState([]);
  console.log("CCCD from URL:", id);
  useEffect(() => {
    DatAPI();
  }, [id]);

  const salaryChart = useMemo(
    () =>
      [...lichsuluong]
        .sort(
          (a: any, b: any) =>
            new Date(a.ngay_ap_dung).getTime() -
            new Date(b.ngay_ap_dung).getTime(),
        )
        .map((item: any) => ({
          month: item.ngay_ap_dung || item.so_quyet_dinh || "--",
          salary: parseMoneyValue(item.luong_p1),
        }))
        .filter((item) => item.salary > 0),
    [lichsuluong],
  );

  const currentSalary =
    salaryChart.length > 0 ? salaryChart[salaryChart.length - 1].salary : 0;

  const previousSalary =
    salaryChart.length > 1 ? salaryChart[salaryChart.length - 2].salary : 0;

  const latestIncrease =
    previousSalary > 0
      ? `${(((currentSalary - previousSalary) / previousSalary) * 100).toFixed(
          0,
        )}%`
      : "--";

  const DatAPI = async () => {
    if (!id) return;
    const req = await ChiTietNhanVien(id);
    setThongTinNhanVien(req.data.data.thong_tin_chung);
    setThanNhan(req.data.data.than_nhan || []);
    setLichSuLuong(req.data.data.lich_su_luong || []);
    setLichSu(req.data.data.lich_su_nhan_su || []);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: cardColor,
          colorText: textColor,
          colorBorder: borderColor,
          colorPrimary: accentColor,
          colorTextSecondary: subText,
          borderRadius: 16,
        },
        components: {
          Tabs: {
            itemColor: subText,
            itemSelectedColor: accentColor,
            itemHoverColor: accentColor,
            inkBarColor: accentColor,
          },
          Table: {
            headerBg: mutedSurfaceColor,
            headerColor: textColor,
            rowHoverBg: isDark ? "#263449" : "#f5f5f5",
          },
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: bgColor,
          padding: 24,
          transition: "all 0.3s ease",
        }}
      >
        {/* Hero Section */}
        <HeaderCard
          isDark={isDark}
          textColor={textColor}
          subText={subText}
          glassCard={glassCard}
          employee={ThongTinNhanVien}
        />

        {/* Stats Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          {[
            {
              title: "Tổng lương hiện tại",
              value: "20.5M",
              suffix: "VNĐ",
              icon: <DollarOutlined />,
              color: "#22c55e",
              bg: isDark ? "#22c55e15" : "#f0fdf4",
            },
            {
              title: "Kinh nghiệm",
              value: "4",
              suffix: "Năm",
              icon: <HistoryOutlined />,
              color: "#3b82f6",
              bg: isDark ? "#3b82f615" : "#eff6ff",
            },
            {
              title: "Hiệu suất",
              value: "92",
              suffix: "%",
              icon: <RiseOutlined />,
              color: "#f59e0b",
              bg: isDark ? "#f59e0b15" : "#fffbeb",
            },
            {
              title: "Thâm niên",
              value: "3",
              suffix: "Năm",
              icon: <CalendarOutlined />,
              color: "#8b5cf6",
              bg: isDark ? "#8b5cf615" : "#f5f3ff",
            },
          ].map((stat, idx) => (
            <Col xs={24} sm={12} md={6} key={idx}>
              <Card hoverable style={glassCard}>
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: stat.bg,
                      borderRadius: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <Statistic
                    title={<Text style={{ color: subText }}>{stat.title}</Text>}
                    value={stat.value}
                    suffix={
                      <Text style={{ fontSize: 14, color: subText }}>
                        {stat.suffix}
                      </Text>
                    }
                    valueStyle={{ color: textColor, fontWeight: 600 }}
                  />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main Tabs */}
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          items={[
            {
              key: "1",
              label: (
                <span>
                  <UserOutlined /> Thông tin cá nhân
                </span>
              ),
              children: (
                <ThongTinCaNhan
                  glassCard={glassCard}
                  textColor={textColor}
                  subText={subText}
                  employee={ThongTinNhanVien}
                  mutedSurfaceColor={mutedSurfaceColor}
                  cardColor={cardColor}
                />
              ),
            },
            {
              key: "2",
              label: (
                <span>
                  <HeartOutlined /> Thân nhân
                </span>
              ),

              children: (
                <TabThanNhan
                  familyData={ThanNhan}
                  glassCard={glassCard}
                  isDark={isDark}
                  textColor={textColor}
                  subText={subText}
                  surfaceColor={surfaceColor}
                  borderColor={borderColor}
                />
              ),
            },
            {
              key: "3",
              label: (
                <span>
                  <RiseOutlined /> Quá trình công tác
                </span>
              ),
              children: (
                <PhatTrien
                  glassCard={glassCard}
                  isDark={isDark}
                  textColor={textColor}
                  subText={subText}
                  lichsu={lichsu}
                />
              ),
            },
            {
              key: "4",
              label: (
                <span>
                  <BankOutlined /> Phụ cấp
                </span>
              ),
              children: (
                <Space direction="vertical" size={24} style={{ width: "100%" }}>
                  <Row gutter={[20, 20]}>
                    {[
                      {
                        title: "Tổng phụ cấp",
                        value: "1.5M",
                        suffix: "VNĐ",
                        color: "#22c55e",
                        icon: <DollarOutlined />,
                      },
                      {
                        title: "Khoản đang áp dụng",
                        value: allowanceData.length,
                        suffix: "khoản",
                        color: "#3b82f6",
                        icon: <BankOutlined />,
                      },
                      {
                        title: "Cập nhật gần nhất",
                        value: "01/2025",
                        suffix: "",
                        color: "#f59e0b",
                        icon: <CalendarOutlined />,
                      },
                    ].map((item) => (
                      <Col xs={24} md={8} key={item.title}>
                        <Card style={glassCard} bodyStyle={{ padding: 22 }}>
                          <Space align="center" size={16}>
                            <Avatar
                              size={48}
                              style={{
                                background: `${item.color}22`,
                                color: item.color,
                              }}
                              icon={item.icon}
                            />
                            <div>
                              <Text style={{ color: subText }}>
                                {item.title}
                              </Text>
                              <div
                                style={{
                                  color: textColor,
                                  fontSize: 24,
                                  fontWeight: 800,
                                  lineHeight: 1.2,
                                }}
                              >
                                {item.value}{" "}
                                <Text style={{ color: subText, fontSize: 13 }}>
                                  {item.suffix}
                                </Text>
                              </div>
                            </div>
                          </Space>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Card style={glassCard} bodyStyle={{ padding: 24 }}>
                    <Space
                      align="center"
                      style={{
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: 18,
                      }}
                      wrap
                    >
                      <div>
                        <Title
                          level={4}
                          style={{ color: textColor, margin: 0 }}
                        >
                          Danh sách phụ cấp
                        </Title>
                        <Text style={{ color: subText }}>
                          Các khoản hỗ trợ đang áp dụng cho nhân viên.
                        </Text>
                      </div>
                      <Tag
                        color="blue"
                        style={{ borderRadius: 20, padding: "4px 12px" }}
                      >
                        Đang hiệu lực
                      </Tag>
                    </Space>
                    <Table
                      pagination={false}
                      dataSource={allowanceData}
                      columns={[
                        {
                          title: "Tên phụ cấp",
                          dataIndex: "name",
                          key: "name",
                        },
                        { title: "Số tiền", dataIndex: "money", key: "money" },
                        {
                          title: "Trạng thái",
                          dataIndex: "status",
                          key: "status",
                          render: (value: string) => (
                            <Tag color="green" style={{ borderRadius: 12 }}>
                              {value}
                            </Tag>
                          ),
                        },
                      ]}
                    />
                  </Card>
                </Space>
              ),
            },
            {
              key: "5",
              label: (
                <span>
                  <TrophyOutlined /> Thành tích
                </span>
              ),
              children: (
                <Space direction="vertical" size={24} style={{ width: "100%" }}>
                  <Card
                    style={{
                      ...glassCard,
                      background: isDark
                        ? "linear-gradient(135deg, #1e293b 0%, #263449 100%)"
                        : "linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)",
                    }}
                    bodyStyle={{ padding: 28 }}
                  >
                    <Row gutter={[24, 24]} align="middle">
                      <Col flex="auto">
                        <Tag
                          color="gold"
                          style={{ borderRadius: 20, marginBottom: 12 }}
                        >
                          Performance Highlights
                        </Tag>
                        <Title
                          level={3}
                          style={{ color: textColor, margin: 0 }}
                        >
                          Thành tích nổi bật
                        </Title>
                        <Text style={{ color: subText }}>
                          Tổng hợp các ghi nhận hiệu suất và đóng góp quan
                          trọng.
                        </Text>
                      </Col>
                      <Col>
                        <Statistic
                          value={achievementData.length}
                          suffix="giải thưởng"
                          valueStyle={{ color: "#f59e0b", fontWeight: 800 }}
                        />
                      </Col>
                    </Row>
                  </Card>

                  <Row gutter={[24, 24]}>
                    {achievementData.map((item) => (
                      <Col xs={24} md={12} key={item.key}>
                        <Card
                          hoverable
                          style={glassCard}
                          bodyStyle={{ padding: 24 }}
                        >
                          <Space
                            direction="vertical"
                            size={18}
                            style={{ width: "100%" }}
                          >
                            <Space size={16} align="start">
                              <Avatar
                                size={56}
                                style={{
                                  background: `${item.color}22`,
                                  color: item.color,
                                  border: `1px solid ${item.color}55`,
                                }}
                                icon={item.icon}
                              />
                              <div>
                                <Title
                                  level={4}
                                  style={{ margin: 0, color: textColor }}
                                >
                                  {item.title}
                                </Title>
                                <Text style={{ color: subText }}>
                                  Năm {item.year}
                                </Text>
                              </div>
                            </Space>
                            <div
                              style={{
                                padding: 16,
                                borderRadius: 16,
                                background: isDark ? surfaceColor : "#f8fafc",
                                border: `1px solid ${borderColor}`,
                              }}
                            >
                              <Text style={{ color: textColor }}>
                                {item.desc}
                              </Text>
                            </div>
                          </Space>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Space>
              ),
            },
            {
              key: "6",
              label: (
                <span>
                  <DollarOutlined /> Lịch sử lương
                </span>
              ),
              children: (
                <Space direction="vertical" size={24} style={{ width: "100%" }}>
                  <Row gutter={[20, 20]}>
                    {[
                      {
                        title: "Lương hiện tại",
                        value: formatShortCurrency(currentSalary),
                        color: "#22c55e",
                      },
                      {
                        title: "Tăng gần nhất",
                        value: latestIncrease,
                        color: "#3b82f6",
                      },
                      {
                        title: "Chu kỳ xét",
                        value: `${salaryChart.length} mốc`,
                        color: "#f59e0b",
                      },
                    ].map((item) => (
                      <Col xs={24} md={8} key={item.title}>
                        <Card style={glassCard} bodyStyle={{ padding: 22 }}>
                          <Text style={{ color: subText }}>{item.title}</Text>
                          <div
                            style={{
                              color: item.color,
                              fontSize: 28,
                              fontWeight: 800,
                              marginTop: 6,
                            }}
                          >
                            {item.value}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Card style={glassCard} bodyStyle={{ padding: 26 }}>
                    <Space
                      direction="vertical"
                      size={8}
                      style={{ marginBottom: 24 }}
                    >
                      <Title level={3} style={{ color: textColor }}>
                        Biểu đồ tăng trưởng lương
                      </Title>
                      <Text style={{ color: subText }}>
                        Theo dõi sự thay đổi mức lương theo từng giai đoạn.
                      </Text>
                    </Space>
                    <div
                      style={{
                        width: "100%",
                        height: 330,
                        background: surfaceColor,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 20,
                        padding: 16,
                      }}
                    >
                      <ResponsiveContainer>
                        <AreaChart data={salaryChart}>
                          <defs>
                            <linearGradient
                              id="salaryGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor={accentColor}
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor={accentColor}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={borderColor}
                          />
                          <XAxis dataKey="month" stroke={subText} />
                          <YAxis
                            stroke={subText}
                            tickFormatter={(value) =>
                              formatShortCurrency(Number(value))
                            }
                          />
                          <RechartsTooltip
                            contentStyle={{
                              background: cardColor,
                              border: `1px solid ${borderColor}`,
                              borderRadius: 12,
                            }}
                            formatter={(value) => [
                              `${formatCurrency(Number(value))} VNĐ`,
                              "Lương",
                            ]}
                          />
                          <Area
                            type="monotone"
                            dataKey="salary"
                            stroke={accentColor}
                            fill="url(#salaryGrad)"
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  
                    <TabLuong
                      glassCard={glassCard}
                      isDark={isDark}
                      textColor={textColor}
                      subText={subText}
                      lichsuluong={lichsuluong}
                    />
                </Space>
              ),
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
};

export default HoSoChiTiet;
