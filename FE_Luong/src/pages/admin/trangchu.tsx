
import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Progress,
  Table,
  Tag,
  Avatar,
  List,
  Button,
} from "antd";

import {
  TeamOutlined,
  DollarOutlined,
  RiseOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BankOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip as ReTooltip,
} from "recharts";
import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;



const ADTrangChu = () => {
  const { isDark } = useTheme();

  // ================= THEME =================

  const bgColor = isDark
    ? "#020617"
    : "#f8fafc";

  const cardColor = isDark
    ? "#0f172a"
    : "#ffffff";

  

  const textColor = isDark
    ? "#f8fafc"
    : "#0f172a";

  const subText = isDark
    ? "#94a3b8"
    : "#64748b";

  const borderColor = isDark
    ? "rgba(148,163,184,0.12)"
    : "#e2e8f0";

  const glassCard = {
    background: cardColor,

    border: `1px solid ${borderColor}`,

    borderRadius: 28,

    boxShadow: isDark
      ? "0 10px 40px rgba(0,0,0,0.25)"
      : "0 10px 30px rgba(15,23,42,0.06)",
  };

  // ================= DATA =================

  const chartData = [
    {
      month: "T1",
      salary: 220,
    },
    {
      month: "T2",
      salary: 250,
    },
    {
      month: "T3",
      salary: 300,
    },
    {
      month: "T4",
      salary: 280,
    },
    {
      month: "T5",
      salary: 360,
    },
    {
      month: "T6",
      salary: 420,
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
          color={
            value === "Hoạt động"
              ? "green"
              : "red"
          }
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
      status: "Hoạt động",
    },
    {
      key: 2,
      name: "Trần Thị B",
      department: "Kế toán",
      status: "Hoạt động",
    },
    {
      key: 3,
      name: "Lê Văn C",
      department: "HR",
      status: "Tạm khóa",
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

          overflow: "hidden",

          position: "relative",

          marginBottom: 28,
        }}
        bodyStyle={{
          padding: "36px 40px",
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

            background: isDark
              ? "rgba(59,130,246,0.10)"
              : "#dbeafe",
          }}
        />

        <Row
          justify="space-between"
          align="middle"
          gutter={[24, 24]}
        >
          <Col>
            <Space
              direction="vertical"
              size={10}
            >
              <Title
                level={1}
                style={{
                  margin: 0,

                  color: textColor,
                }}
              >
                Admin Dashboard
              </Title>

              <Text
                style={{
                  color: subText,

                  fontSize: 16,
                }}
              >
                Tổng quan hệ thống quản lý
                nhân sự & tính lương
              </Text>
            </Space>
          </Col>

          <Col>
            <Button
              type="primary"
              size="large"
              style={{
                height: 50,

                borderRadius: 16,

                paddingInline: 24,

                fontWeight: 600,
              }}
            >
              Xuất báo cáo
            </Button>
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
            title: "Tổng lương tháng",
            value: "850M",
            icon: <DollarOutlined />,
            color: "#22c55e",
            growth: "+8%",
          },
          {
            title: "Hiệu suất KPI",
            value: "91%",
            icon: <RiseOutlined />,
            color: "#f59e0b",
            growth: "+5%",
          },
          {
            title: "Tài khoản hoạt động",
            value: "231",
            icon: <UserOutlined />,
            color: "#8b5cf6",
            growth: "-2%",
          },
        ].map((item, index) => (
          <Col
            xs={24}
            md={12}
            xl={6}
            key={index}
          >
            <Card
              hoverable
              style={{
                ...glassCard,
              }}
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
                <Row
                  justify="space-between"
                  align="middle"
                >
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
                    color={
                      item.growth.includes(
                        "+"
                      )
                        ? "green"
                        : "red"
                    }
                    style={{
                      borderRadius: 999,

                      padding: "4px 12px",
                    }}
                  >
                    {item.growth.includes(
                      "+"
                    ) ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}

                    {item.growth}
                  </Tag>
                </Row>

                <Space
                  direction="vertical"
                  size={4}
                >
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
          marginTop: 6,
        }}
      >
        {/* SALARY */}

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
                    color: textColor,

                    marginBottom: 4,
                  }}
                >
                  Biến động quỹ lương
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Thống kê lương 6 tháng gần
                  nhất
                </Text>
              </div>

              <div
                style={{
                  width: "100%",

                  height: 340,
                }}
              >
                <ResponsiveContainer>
                  <AreaChart
                    data={chartData}
                  >
                    <defs>
                      <linearGradient
                        id="salary"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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

                    <XAxis
                      dataKey="month"
                      stroke={subText}
                    />

                    <ReTooltip />

                    <Area
                      type="monotone"
                      dataKey="salary"
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
            {/* ALERT */}

            <Card
              style={glassCard}
              bodyStyle={{
                padding: 24,
              }}
            >
              <Space
                align="start"
                size={18}
              >
                <Avatar
                  size={56}
                  style={{
                    background:
                      "rgba(245,158,11,0.12)",

                    color: "#f59e0b",
                  }}
                  icon={
                    <WarningOutlined />
                  }
                />

                <Space
                  direction="vertical"
                  size={6}
                >
                  <Title
                    level={4}
                    style={{
                      margin: 0,

                      color: textColor,
                    }}
                  >
                    12 nhân viên
                  </Title>

                  <Text
                    style={{
                      color: subText,
                    }}
                  >
                    Chưa hoàn thành KPI
                  </Text>
                </Space>
              </Space>
            </Card>

            {/* SYSTEM */}

            <Card
              style={glassCard}
              bodyStyle={{
                padding: 24,
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
                  Trạng thái hệ thống
                </Title>

                {[
                  {
                    title: "Server",
                    value: 96,
                  },
                  {
                    title: "Database",
                    value: 88,
                  },
                  {
                    title: "AI Camera",
                    value: 74,
                  },
                ].map((item, index) => (
                  <Space
                    key={index}
                    direction="vertical"
                    size={8}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Row justify="space-between">
                      <Text
                        style={{
                          color: textColor,
                        }}
                      >
                        {item.title}
                      </Text>

                      <Text
                        style={{
                          color: subText,
                        }}
                      >
                        {item.value}%
                      </Text>
                    </Row>

                    <Progress
                      percent={item.value}
                      showInfo={false}
                      strokeColor="#3b82f6"
                    />
                  </Space>
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
          marginTop: 6,
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
                  Nhân viên gần đây
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Danh sách cập nhật mới nhất
                </Text>
              </div>

              <Table
                columns={employeeColumns}
                dataSource={employeeData}
                pagination={false}
                style={{
                  background: "transparent",
                }}
              />
            </Space>
          </Card>
        </Col>

        {/* ACTIVITY */}

        <Col xs={24} xl={9}>
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
                  Hoạt động hệ thống
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Cập nhật gần nhất
                </Text>
              </div>

              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    icon:
                      <CheckCircleOutlined />,
                    text: "Cập nhật bảng lương tháng 6",
                  },
                  {
                    icon:
                      <BankOutlined />,
                    text: "Thêm phòng ban Marketing",
                  },
                  {
                    icon:
                      <CalendarOutlined />,
                    text: "Thiết lập nghỉ lễ mới",
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Space align="start">
                      <Avatar
                        style={{
                          background:
                            "rgba(59,130,246,0.12)",

                          color: "#3b82f6",
                        }}
                        icon={item.icon}
                      />

                      <Space
                        direction="vertical"
                        size={2}
                      >
                        <Text
                          style={{
                            color:
                              textColor,
                          }}
                        >
                          {item.text}
                        </Text>

                        <Text
                          style={{
                            color: subText,

                            fontSize: 13,
                          }}
                        >
                          5 phút trước
                        </Text>
                      </Space>
                    </Space>
                  </List.Item>
                )}
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ADTrangChu;

