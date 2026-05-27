import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Avatar,
  Tag,
  Table,
  Progress,
  Button,
} from "antd";

import {
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

const HRDashboard = () => {
  const { isDark } = useTheme();

  // ================= THEME =================

  const bgColor = isDark ? "#020617" : "#f8fafc";

  const cardColor = isDark ? "#0f172a" : "#ffffff";

  const textColor = isDark ? "#f8fafc" : "#0f172a";

  const subText = isDark ? "#94a3b8" : "#64748b";

  const borderColor = isDark ? "rgba(148,163,184,0.12)" : "#e2e8f0";

  const glassCard = {
    background: cardColor,

    border: `1px solid ${borderColor}`,

    borderRadius: 28,

    overflow: "hidden",

    boxShadow: isDark
      ? "0 10px 40px rgba(0,0,0,0.24)"
      : "0 10px 30px rgba(15,23,42,0.06)",
  };

  // ================= DATA =================

  const salaryChart = [
    {
      month: "T1",
      value: 220,
    },
    {
      month: "T2",
      value: 260,
    },
    {
      month: "T3",
      value: 310,
    },
    {
      month: "T4",
      value: 280,
    },
    {
      month: "T5",
      value: 360,
    },
    {
      month: "T6",
      value: 430,
    },
  ];

  const attendanceChart = [
    {
      name: "Đi làm",
      value: 220,
    },
    {
      name: "Nghỉ phép",
      value: 18,
    },
    {
      name: "Đi trễ",
      value: 12,
    },
    {
      name: "OT",
      value: 35,
    },
  ];

  const employeeColumns = [
    {
      title: "Nhân viên",
      dataIndex: "name",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: string) => (
        <Tag
          color={value === "Đang làm" ? "green" : "orange"}
          style={{
            borderRadius: 999,
            padding: "4px 12px",
          }}
        >
          {value}
        </Tag>
      ),
    },
  ];

  const employeeData = [
    {
      key: 1,
      name: "Nguyễn Văn A",
      department: "CNTT",
      status: "Đang làm",
    },
    {
      key: 2,
      name: "Trần Thị B",
      department: "HR",
      status: "Đang làm",
    },
    {
      key: 3,
      name: "Lê Văn C",
      department: "Kế toán",
      status: "Nghỉ phép",
    },
  ];

  return (
    <div
      style={{
        background: bgColor,

        minHeight: "100vh",

        padding: 28,
      }}
    >
      {/* HEADER */}

      <Card
        style={{
          ...glassCard,

          position: "relative",

          marginBottom: 28,
        }}
        bodyStyle={{
          padding: "40px 42px",
        }}
      >
        {/* DECOR */}

        <div
          style={{
            position: "absolute",

            top: -70,

            right: -70,

            width: 240,

            height: 240,

            borderRadius: "50%",

            background: isDark ? "rgba(59,130,246,0.10)" : "#dbeafe",
          }}
        />

        <Row justify="space-between" align="middle" gutter={[24, 24]}>
          <Col>
            <Space direction="vertical" size={10}>
              <Title
                level={1}
                style={{
                  margin: 0,

                  color: textColor,
                }}
              >
                HR Dashboard
              </Title>

              <Text
                style={{
                  color: subText,

                  fontSize: 16,
                }}
              >
                Tổng quan quản lý nhân sự, chấm công và tính lương
              </Text>
            </Space>
          </Col>

          <Col>
            <Space size={16}>
              <Button
                size="large"
                style={{
                  height: 48,

                  borderRadius: 16,

                  fontWeight: 600,
                }}
              >
                Xuất Excel
              </Button>

              <Button
                type="primary"
                size="large"
                style={{
                  height: 48,

                  borderRadius: 16,

                  fontWeight: 600,
                }}
              >
                Thêm nhân viên
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* STATS */}

      <Row gutter={[22, 22]}>
        {[
          {
            title: "Tổng nhân viên",
            value: "248",
            icon: <TeamOutlined />,
            color: "#3b82f6",
            growth: "+12%",
          },
          {
            title: "Đi làm hôm nay",
            value: "221",
            icon: <CheckCircleOutlined />,
            color: "#22c55e",
            growth: "+5%",
          },
          {
            title: "Nghỉ phép",
            value: "18",
            icon: <CalendarOutlined />,
            color: "#f59e0b",
            growth: "-2%",
          },
          {
            title: "Quỹ lương",
            value: "850M",
            icon: <DollarOutlined />,
            color: "#8b5cf6",
            growth: "+8%",
          },
        ].map((item, index) => (
          <Col xs={24} md={12} xl={6} key={index}>
            <Card
              hoverable
              style={glassCard}
              bodyStyle={{
                padding: 26,
              }}
            >
              <Space
                direction="vertical"
                size={22}
                style={{
                  width: "100%",
                }}
              >
                <Row justify="space-between" align="middle">
                  <Avatar
                    size={60}
                    style={{
                      background: `${item.color}20`,

                      color: item.color,

                      fontSize: 24,
                    }}
                    icon={item.icon}
                  />

                  <Tag
                    color={item.growth.includes("+") ? "green" : "red"}
                    style={{
                      borderRadius: 999,

                      padding: "4px 12px",
                    }}
                  >
                    {item.growth.includes("+") ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}

                    {item.growth}
                  </Tag>
                </Row>

                <Space direction="vertical" size={4}>
                  <Text
                    style={{
                      color: subText,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Title
                    level={2}
                    style={{
                      margin: 0,

                      color: textColor,
                    }}
                  >
                    {item.value}
                  </Title>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CHART */}

      <Row
        gutter={[22, 22]}
        style={{
          marginTop: 8,
        }}
      >
        {/* LEFT */}

        <Col xs={24} xl={16}>
          <Card
            style={{
              ...glassCard,

              height: "100%",
            }}
            bodyStyle={{
              padding: 28,
            }}
          >
            <Space
              direction="vertical"
              size={24}
              style={{
                width: "100%",
              }}
            >
              <div>
                <Title
                  level={3}
                  style={{
                    marginBottom: 4,

                    color: textColor,
                  }}
                >
                  Biến động quỹ lương
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Thống kê lương 6 tháng gần nhất
                </Text>
              </div>

              <div
                style={{
                  width: "100%",

                  height: 340,
                }}
              >
                <ResponsiveContainer>
                  <AreaChart data={salaryChart}>
                    <defs>
                      <linearGradient id="salary" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />

                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis dataKey="month" stroke={subText} />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#salary)"
                      strokeWidth={4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Space>
          </Card>
        </Col>

        {/* RIGHT */}

        <Col xs={24} xl={8}>
          <Space
            direction="vertical"
            size={22}
            style={{
              width: "100%",
            }}
          >
            {/* KPI */}

            <Card
              style={glassCard}
              bodyStyle={{
                padding: 26,
              }}
            >
              <Space
                direction="vertical"
                size={20}
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <Title
                    level={4}
                    style={{
                      marginBottom: 4,

                      color: textColor,
                    }}
                  >
                    KPI toàn công ty
                  </Title>

                  <Text
                    style={{
                      color: subText,
                    }}
                  >
                    Hiệu suất làm việc hiện tại
                  </Text>
                </div>

                <div
                  style={{
                    display: "flex",

                    justifyContent: "center",
                  }}
                >
                  <Progress
                    type="dashboard"
                    percent={91}
                    strokeColor="#3b82f6"
                  />
                </div>
              </Space>
            </Card>

            {/* QUICK */}

            <Card
              style={glassCard}
              bodyStyle={{
                padding: 26,
              }}
            >
              <Space
                direction="vertical"
                size={18}
                style={{
                  width: "100%",
                }}
              >
                <Title
                  level={4}
                  style={{
                    margin: 0,

                    color: textColor,
                  }}
                >
                  Cảnh báo hệ thống
                </Title>

                {[
                  {
                    icon: <WarningOutlined />,
                    text: "12 nhân viên đi trễ",
                    color: "#f59e0b",
                  },
                  {
                    icon: <ClockCircleOutlined />,
                    text: "5 yêu cầu nghỉ phép",
                    color: "#3b82f6",
                  },
                  {
                    icon: <TrophyOutlined />,
                    text: "8 nhân viên KPI cao",
                    color: "#22c55e",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",

                      alignItems: "center",

                      gap: 16,

                      padding: 16,

                      borderRadius: 18,

                      background: isDark ? "#111827" : "#f8fafc",

                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <Avatar
                      style={{
                        background: `${item.color}20`,

                        color: item.color,
                      }}
                      icon={item.icon}
                    />

                    <Text
                      style={{
                        color: textColor,
                      }}
                    >
                      {item.text}
                    </Text>
                  </div>
                ))}
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* BOTTOM */}

      <Row
        gutter={[22, 22]}
        style={{
          marginTop: 8,
        }}
      >
        {/* TABLE */}

        <Col xs={24} xl={15}>
          <Card
            style={glassCard}
            bodyStyle={{
              padding: 28,
            }}
          >
            <Space
              direction="vertical"
              size={22}
              style={{
                width: "100%",
              }}
            >
              <div>
                <Title
                  level={3}
                  style={{
                    marginBottom: 4,

                    color: textColor,
                  }}
                >
                  Nhân viên gần đây
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Danh sách nhân viên mới cập nhật
                </Text>
              </div>

              <Table
                columns={employeeColumns}
                dataSource={employeeData}
                pagination={false}
              />
            </Space>
          </Card>
        </Col>

        {/* BAR CHART */}

        <Col xs={24} xl={9}>
          <Card
            style={glassCard}
            bodyStyle={{
              padding: 28,
            }}
          >
            <Space
              direction="vertical"
              size={24}
              style={{
                width: "100%",
              }}
            >
              <div>
                <Title
                  level={3}
                  style={{
                    marginBottom: 4,

                    color: textColor,
                  }}
                >
                  Chấm công hôm nay
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Thống kê trạng thái làm việc
                </Text>
              </div>

              <div
                style={{
                  width: "100%",

                  height: 320,
                }}
              >
                <ResponsiveContainer>
                  <BarChart data={attendanceChart}>
                    <XAxis dataKey="name" stroke={subText} />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HRDashboard;
