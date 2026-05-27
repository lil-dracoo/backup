import {
  AppstoreOutlined,
  CalculatorOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Progress,
  Row,
  Space,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
  message,
} from "antd";

import { useState } from "react";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

const { TextArea } = Input;

const formatCurrency = (
  value: number
) => {
  return new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",

      currency: "VND",

      maximumFractionDigits: 0,
    }
  ).format(value);
};

const initialDeductions = [
  {
    id: 1,

    name: "Bảo hiểm xã hội",

    code: "BHXH",

    employeeRate: 8,

    employerRate: 17.5,

    description:
      "Bảo hiểm xã hội bắt buộc",

    active: true,

    category: "insurance",
  },

  {
    id: 2,

    name: "Bảo hiểm y tế",

    code: "BHYT",

    employeeRate: 1.5,

    employerRate: 3,

    description:
      "Bảo hiểm y tế bắt buộc",

    active: true,

    category: "insurance",
  },

  {
    id: 3,

    name: "Đoàn phí công đoàn",

    code: "CD",

    employeeRate: 1,

    employerRate: 2,

    description:
      "Khấu trừ công đoàn",

    active: true,

    category: "other",
  },
];

const taxData = [
  {
    key: 1,

    from: "0",

    to: "5.000.000",

    rate: "5%",
  },

  {
    key: 2,

    from: "5.000.000",

    to: "10.000.000",

    rate: "10%",
  },

  {
    key: 3,

    from: "10.000.000",

    to: "18.000.000",

    rate: "15%",
  },

  {
    key: 4,

    from: "18.000.000",

    to: "32.000.000",

    rate: "20%",
  },

  {
    key: 5,

    from: "32.000.000",

    to: "52.000.000",

    rate: "25%",
  },

  {
    key: 6,

    from: "52.000.000",

    to: "80.000.000",

    rate: "30%",
  },

  {
    key: 7,

    from: "80.000.000",

    to: "∞",

    rate: "35%",
  },
];


const ThietLapKhauTru = () => {
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] =
    useState("insurance");

  const [deductions] = useState(
    initialDeductions
  );

  const [openModal, setOpenModal] =
    useState(false);

  const [editingData, setEditingData] =
    useState<any>(null);

  const [search, setSearch] =
    useState("");

  const [form] = Form.useForm();

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

  const totalEmployee =
    deductions.reduce(
      (sum, item) =>
        sum + item.employeeRate,
      0
    );

  const totalEmployer =
    deductions.reduce(
      (sum, item) =>
        sum + item.employerRate,
      0
    );

  const filteredData =
    deductions.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const columns = [
    {
      title:
        "Khoản khấu trừ",

      dataIndex: "name",

      render: (
        value: string,
        record: any
      ) => (
        <Space size={14}>
          <div
            style={{
              width: 48,

              height: 48,

              borderRadius: 16,

              background:
                "rgba(37,99,235,0.12)",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              color: "#2563eb",

              fontSize: 20,
            }}
          >
            <CalculatorOutlined />
          </div>

          <Space
            direction="vertical"
            size={0}
          >
            <Text
              style={{
                color:
                  textColor,

                fontWeight: 700,

                fontSize: 15,
              }}
            >
              {value}
            </Text>

            <Text
              style={{
                color:
                  subText,

                fontSize: 13,
              }}
            >
              {record.description}
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title:
        "Mã",

      dataIndex: "code",

      render: (
        value: string
      ) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,

            padding:
              "4px 14px",

            fontWeight: 600,
          }}
        >
          {value}
        </Tag>
      ),
    },

    {
      title:
        "NLĐ đóng",

      dataIndex:
        "employeeRate",

      render: (
        value: number
      ) => (
        <div
          style={{
            width: 120,
          }}
        >
          <Text
            style={{
              color:
                textColor,

              fontWeight: 700,
            }}
          >
            {value}%
          </Text>

          <Progress
            percent={value}
            showInfo={false}
            strokeColor="#2563eb"
          />
        </div>
      ),
    },

    {
      title:
        "Doanh nghiệp đóng",

      dataIndex:
        "employerRate",

      render: (
        value: number
      ) => (
        <div
          style={{
            width: 120,
          }}
        >
          <Text
            style={{
              color:
                textColor,

              fontWeight: 700,
            }}
          >
            {value}%
          </Text>

          <Progress
            percent={value}
            showInfo={false}
            strokeColor="#7c3aed"
          />
        </div>
      ),
    },

    {
      title:
        "Trạng thái",

      dataIndex: "active",

      render: (
        value: boolean
      ) => (
        <Badge
          status={
            value
              ? "success"
              : "error"
          }
          text={
            <Text
              style={{
                color:
                  textColor,
              }}
            >
              {value
                ? "Hoạt động"
                : "Tạm khóa"}
            </Text>
          }
        />
      ),
    },

    {
      title: "",

      render: (
        _: any,
        record: any
      ) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingData(
                record
              );

              form.setFieldsValue(
                record
              );

              setOpenModal(
                true
              );
            }}
            style={{
              color:
                isDark
                  ? "#cbd5e1"
                  : "#475569",
            }}
          />

          <Popconfirm title="Xóa khoản khấu trừ?">
            <Button
              danger
              type="text"
              icon={
                <DeleteOutlined />
              }
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer:
            cardColor,

          colorText:
            textColor,

          borderRadius: 18,
        },
      }}
    >
      <div
        style={{
          minHeight:
            "100vh",

          background:
            bgColor,

          padding: 28,
        }}
      >
        {/* HEADER */}

        <Card
          style={{
            marginBottom: 24,

            borderRadius: 28,

            background:
              cardColor,

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding:
              "30px 34px",
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            gutter={[20, 20]}
          >
            <Col>
              <Space
                direction="vertical"
                size={4}
              >
                <Title
                  level={2}
                  style={{
                    margin: 0,

                    color:
                      textColor,
                  }}
                >
                  Thiết lập khấu trừ
                </Title>

                <Text
                  style={{
                    color:
                      subText,
                  }}
                >
                  Cấu hình bảo
                  hiểm, thuế và các
                  khoản khấu trừ
                </Text>
              </Space>
            </Col>

            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                  setEditingData(
                    null
                  );

                  form.resetFields();

                  setOpenModal(
                    true
                  );
                }}
                style={{
                  height: 48,

                  borderRadius: 14,

                  paddingInline: 22,

                  fontWeight: 600,
                }}
              >
                Thêm khấu trừ
              </Button>
            </Col>
          </Row>
        </Card>

        {/* STATS */}

        <Row
          gutter={[20, 20]}
          style={{
            marginBottom: 24,
          }}
        >
          <Col
            xs={24}
            md={8}
          >
            <Card
              style={{
                borderRadius: 24,

                background:
                  cardColor,

                border: `1px solid ${borderColor}`,
              }}
            >
              <Statistic
                title="Tổng tỷ lệ NLĐ"
                value={
                  totalEmployee
                }
                suffix="%"
                valueStyle={{
                  color:
                    "#2563eb",

                  fontWeight: 700,
                }}
              />
            </Card>
          </Col>

          <Col
            xs={24}
            md={8}
          >
            <Card
              style={{
                borderRadius: 24,

                background:
                  cardColor,

                border: `1px solid ${borderColor}`,
              }}
            >
              <Statistic
                title="Tổng tỷ lệ doanh nghiệp"
                value={
                  totalEmployer
                }
                suffix="%"
                valueStyle={{
                  color:
                    "#7c3aed",

                  fontWeight: 700,
                }}
              />
            </Card>
          </Col>

          <Col
            xs={24}
            md={8}
          >
            <Card
              style={{
                borderRadius: 24,

                background:
                  cardColor,

                border: `1px solid ${borderColor}`,
              }}
            >
              <Statistic
                title="Số khoản khấu trừ"
                value={
                  deductions.length
                }
                valueStyle={{
                  color:
                    "#10b981",

                  fontWeight: 700,
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* TAB */}

        <Card
          style={{
            borderRadius: 28,

            background:
              cardColor,

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding: 24,
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "insurance",

                label:
                  "Bảo hiểm",

                icon: (
                  <UserOutlined />
                ),
              },

              {
                key: "tax",

                label:
                  "Thuế TNCN",

                icon: (
                  <CalculatorOutlined />
                ),
              },

              {
                key: "other",

                label: "Khác",

                icon: (
                  <AppstoreOutlined />
                ),
              },
            ]}
          />

          {/* INSURANCE */}

          {activeTab ===
            "insurance" && (
            <Space
              direction="vertical"
              size={20}
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
                  <Input
                    prefix={
                      <SearchOutlined />
                    }
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(
                      e
                    ) =>
                      setSearch(
                        e.target
                          .value
                      )
                    }
                    style={{
                      width: 320,

                      height: 44,

                      borderRadius: 14,
                    }}
                  />
                </Col>

                <Col>
                  <Alert
                    type="info"
                    showIcon
                    message={`Tổng khấu trừ NLĐ: ${totalEmployee}%`}
                    style={{
                      borderRadius: 14,
                    }}
                  />
                </Col>
              </Row>

              <Table
                columns={columns}
                dataSource={
                  filteredData
                }
                rowKey="id"
                pagination={{
                  pageSize: 5,
                }}
              />
            </Space>
          )}

        {/* TAX */}

{activeTab === "tax" && (
  <Row gutter={[24, 24]}>
    {/* LEFT */}

    <Col xs={24} xl={8}>
      <Space
        direction="vertical"
        size={24}
        style={{
          width: "100%",
        }}
      >
        {/* CONFIG */}

        <Card
          style={{
            borderRadius: 28,

            background: cardColor,

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding: 24,
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
                level={4}
                style={{
                  color: textColor,

                  marginBottom: 4,
                }}
              >
                Giảm trừ gia cảnh
              </Title>

              <Text
                style={{
                  color: subText,
                }}
              >
                Thiết lập mức giảm
                trừ thuế TNCN hiện
                hành
              </Text>
            </div>

            {/* SELF */}

            <Card
              style={{
                borderRadius: 22,

                background: isDark
                  ? "#111827"
                  : "#f8fafc",

                border: `1px solid ${borderColor}`,
              }}
            >
              <Space
                direction="vertical"
                size={16}
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  <div
                    style={{
                      width: 48,

                      height: 48,

                      borderRadius: 16,

                      background:
                        "rgba(37,99,235,0.12)",

                      display: "flex",

                      alignItems: "center",

                      justifyContent:
                        "center",

                      color: "#2563eb",

                      fontSize: 20,
                    }}
                  >
                    <UserOutlined />
                  </div>

                  <Space
                    direction="vertical"
                    size={0}
                  >
                    <Text
                      style={{
                        color:
                          textColor,

                        fontWeight: 700,
                      }}
                    >
                      Giảm trừ bản
                      thân
                    </Text>

                    <Text
                      style={{
                        color:
                          subText,
                      }}
                    >
                      Mức áp dụng
                      cho nhân viên
                    </Text>
                  </Space>
                </Space>

                <Statistic
                  value={11000000}
                  formatter={(value) =>
                    formatCurrency(
                      Number(value)
                    )
                  }
                  valueStyle={{
                    color: "#2563eb",

                    fontSize: 28,

                    fontWeight: 700,
                  }}
                />

                <InputNumber
                  addonAfter="VNĐ"
                  defaultValue={
                    11000000
                  }
                  style={{
                    width: "100%",

                    height: 48,
                  }}
                />
              </Space>
            </Card>

            {/* DEPENDENT */}

            <Card
              style={{
                borderRadius: 22,

                background: isDark
                  ? "#111827"
                  : "#f8fafc",

                border: `1px solid ${borderColor}`,
              }}
            >
              <Space
                direction="vertical"
                size={16}
                style={{
                  width: "100%",
                }}
              >
                <Space>
                  <div
                    style={{
                      width: 48,

                      height: 48,

                      borderRadius: 16,

                      background:
                        "rgba(124,58,237,0.12)",

                      display: "flex",

                      alignItems: "center",

                      justifyContent:
                        "center",

                      color: "#7c3aed",

                      fontSize: 20,
                    }}
                  >
                    <AppstoreOutlined />
                  </div>

                  <Space
                    direction="vertical"
                    size={0}
                  >
                    <Text
                      style={{
                        color:
                          textColor,

                        fontWeight: 700,
                      }}
                    >
                      Người phụ thuộc
                    </Text>

                    <Text
                      style={{
                        color:
                          subText,
                      }}
                    >
                      Giảm trừ cho
                      mỗi người phụ
                      thuộc
                    </Text>
                  </Space>
                </Space>

                <Statistic
                  value={4400000}
                  formatter={(value) =>
                    formatCurrency(
                      Number(value)
                    )
                  }
                  valueStyle={{
                    color: "#7c3aed",

                    fontSize: 28,

                    fontWeight: 700,
                  }}
                />

                <InputNumber
                  addonAfter="VNĐ"
                  defaultValue={
                    4400000
                  }
                  style={{
                    width: "100%",

                    height: 48,
                  }}
                />
              </Space>
            </Card>

            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              style={{
                height: 54,

                borderRadius: 16,

                fontWeight: 700,
              }}
              block
            >
              Lưu cấu hình
            </Button>
          </Space>
        </Card>

        {/* CURRENT */}

        <Card
          style={{
            borderRadius: 28,

            background: cardColor,

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding: 24,
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
                  margin: 0,

                  color: textColor,
                }}
              >
                Cấu hình hiện hành
              </Title>

              <Text
                style={{
                  color: subText,
                }}
              >
                Thông tin đang được
                áp dụng
              </Text>
            </div>

            <div
              style={{
                padding: 20,

                borderRadius: 20,

                border: `1px solid ${borderColor}`,

                background: isDark
                  ? "#111827"
                  : "#f8fafc",
              }}
            >
              <Space
                direction="vertical"
                size={18}
                style={{
                  width: "100%",
                }}
              >
                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Giảm trừ bản
                    thân
                  </Text>

                  <Text
                    style={{
                      color:
                        textColor,

                      fontWeight: 700,
                    }}
                  >
                    11.000.000 VNĐ
                  </Text>
                </Row>

                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Người phụ thuộc
                  </Text>

                  <Text
                    style={{
                      color:
                        textColor,

                      fontWeight: 700,
                    }}
                  >
                    4.400.000 VNĐ
                  </Text>
                </Row>

                <Divider
                  style={{
                    margin: 0,
                  }}
                />

                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Hiệu lực
                  </Text>

                  <Tag color="green">
                    2026
                  </Tag>
                </Row>

                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Cập nhật gần
                    nhất
                  </Text>

                  <Text
                    style={{
                      color:
                        textColor,

                      fontWeight: 600,
                    }}
                  >
                    19/05/2026
                  </Text>
                </Row>
              </Space>
            </div>
          </Space>
        </Card>
      </Space>
    </Col>

    {/* RIGHT */}

    <Col xs={24} xl={16}>
      <Space
        direction="vertical"
        size={24}
        style={{
          width: "100%",
        }}
      >
        {/* TABLE */}

        <Card
          style={{
            borderRadius: 28,

            background: cardColor,

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding: 24,
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{
              marginBottom: 24,
            }}
          >
            <Col>
              <Space
                direction="vertical"
                size={0}
              >
                <Title
                  level={4}
                  style={{
                    margin: 0,

                    color: textColor,
                  }}
                >
                  Biểu thuế lũy tiến
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Thuế thu nhập cá
                  nhân theo từng bậc
                </Text>
              </Space>
            </Col>

            <Col>
              <Tag
                color="red"
                style={{
                  borderRadius: 999,

                  padding:
                    "6px 16px",

                  fontWeight: 700,
                }}
              >
                7 bậc thuế
              </Tag>
            </Col>
          </Row>

          <Table
            pagination={false}
            rowKey="key"
            dataSource={taxData}
            columns={[
              {
                title: "Bậc",

                render: (
                  _: any,
                  __: any,
                  index: number
                ) => (
                  <div
                    style={{
                      width: 38,

                      height: 38,

                      borderRadius: 12,

                      background:
                        "rgba(37,99,235,0.12)",

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      color: "#2563eb",

                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </div>
                ),
              },

              {
                title:
                  "Thu nhập từ",

                dataIndex:
                  "from",
              },

              {
                title:
                  "Thu nhập đến",

                dataIndex: "to",
              },

              {
                title:
                  "Thuế suất",

                dataIndex:
                  "rate",

                render: (
                  value: string
                ) => (
                  <Tag
                    color="red"
                    style={{
                      borderRadius: 999,

                      padding:
                        "6px 16px",

                      fontWeight: 700,
                    }}
                  >
                    {value}
                  </Tag>
                ),
              },
            ]}
          />
        </Card>

        {/* PREVIEW */}

        <Card
          style={{
            borderRadius: 28,

            background: cardColor,

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding: 24,
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
                level={4}
                style={{
                  margin: 0,

                  color: textColor,
                }}
              >
                Xem trước tính thuế
              </Title>

              <Text
                style={{
                  color: subText,
                }}
              >
                Mô phỏng thu nhập
                chịu thuế của nhân
                viên
              </Text>
            </div>

            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <InputNumber
                  addonBefore="Lương Gross"
                  addonAfter="VNĐ"
                  defaultValue={
                    25000000
                  }
                  style={{
                    width: "100%",

                    height: 48,
                  }}
                />
              </Col>

              <Col xs={24} md={12}>
                <InputNumber
                  addonBefore="Người phụ thuộc"
                  defaultValue={2}
                  style={{
                    width: "100%",

                    height: 48,
                  }}
                />
              </Col>
            </Row>

            <Card
              style={{
                borderRadius: 22,

                background: isDark
                  ? "#111827"
                  : "#f8fafc",

                border: `1px solid ${borderColor}`,
              }}
            >
              <Space
                direction="vertical"
                size={16}
                style={{
                  width: "100%",
                }}
              >
                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Lương gross
                  </Text>

                  <Text
                    style={{
                      color:
                        textColor,

                      fontWeight: 700,
                    }}
                  >
                    25.000.000 VNĐ
                  </Text>
                </Row>

                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Giảm trừ bản
                    thân
                  </Text>

                  <Text
                    style={{
                      color:
                        "#ef4444",

                      fontWeight: 700,
                    }}
                  >
                    -11.000.000 VNĐ
                  </Text>
                </Row>

                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Người phụ thuộc
                  </Text>

                  <Text
                    style={{
                      color:
                        "#ef4444",

                      fontWeight: 700,
                    }}
                  >
                    -8.800.000 VNĐ
                  </Text>
                </Row>

                <Divider
                  style={{
                    margin: 0,
                  }}
                />

                <Row justify="space-between">
                  <Text
                    style={{
                      color:
                        textColor,

                      fontWeight: 700,
                    }}
                  >
                    Thu nhập chịu
                    thuế
                  </Text>

                  <Text
                    style={{
                      color:
                        "#10b981",

                      fontWeight: 800,

                      fontSize: 18,
                    }}
                  >
                    5.200.000 VNĐ
                  </Text>
                </Row>
              </Space>
            </Card>
          </Space>
        </Card>
      </Space>
    </Col>
  </Row>
)}
          {/* OTHER */}

          {activeTab ===
            "other" && (
            <Card
              style={{
                borderRadius: 24,

                background:
                  isDark
                    ? "#111827"
                    : "#f8fafc",

                border: `1px solid ${borderColor}`,
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
                >
                  <Col>
                    <Space
                      direction="vertical"
                      size={0}
                    >
                      <Title
                        level={4}
                        style={{
                          color:
                            textColor,

                          margin: 0,
                        }}
                      >
                        Khấu trừ khác
                      </Title>

                      <Text
                        style={{
                          color:
                            subText,
                        }}
                      >
                        Quản lý các
                        khoản khấu trừ
                        đặc biệt
                      </Text>
                    </Space>
                  </Col>

                  <Col>
                    <Button
                      type="primary"
                      icon={
                        <PlusOutlined />
                      }
                      style={{
                        borderRadius: 14,

                        height: 46,

                        paddingInline: 20,
                      }}
                    >
                      Thêm khoản
                    </Button>
                  </Col>
                </Row>

                {deductions
                  .filter(
                    (
                      item
                    ) =>
                      item.category ===
                      "other"
                  )
                  .map(
                    (
                      item
                    ) => (
                      <Card
                        key={
                          item.id
                        }
                        size="small"
                        style={{
                          borderRadius: 20,

                          border: `1px solid ${borderColor}`,

                          background:
                            isDark
                              ? "#0b1220"
                              : "#ffffff",
                        }}
                        bodyStyle={{
                          padding: 20,
                        }}
                      >
                        <Row
                          justify="space-between"
                          align="middle"
                          gutter={[
                            20,
                            20,
                          ]}
                        >
                          <Col flex={1}>
                            <Space size={16}>
                              <div
                                style={{
                                  width: 52,

                                  height: 52,

                                  borderRadius: 18,

                                  background:
                                    "rgba(124,58,237,0.12)",

                                  display:
                                    "flex",

                                  alignItems:
                                    "center",

                                  justifyContent:
                                    "center",

                                  color:
                                    "#7c3aed",

                                  fontSize: 20,
                                }}
                              >
                                <SettingOutlined />
                              </div>

                              <Space
                                direction="vertical"
                                size={2}
                              >
                                <Text
                                  style={{
                                    color:
                                      textColor,

                                    fontWeight: 700,

                                    fontSize: 15,
                                  }}
                                >
                                  {
                                    item.name
                                  }
                                </Text>

                                <Text
                                  style={{
                                    color:
                                      subText,
                                  }}
                                >
                                  {
                                    item.description
                                  }
                                </Text>

                                <Space>
                                  <Tag color="purple">
                                    NLĐ:{" "}
                                    {
                                      item.employeeRate
                                    }
                                    %
                                  </Tag>

                                  <Tag color="blue">
                                    DN:{" "}
                                    {
                                      item.employerRate
                                    }
                                    %
                                  </Tag>
                                </Space>
                              </Space>
                            </Space>
                          </Col>

                          <Col>
                            <Space size={12}>
                              <Switch defaultChecked />

                              <Button
                                type="text"
                                icon={
                                  <EditOutlined />
                                }
                                style={{
                                  color:
                                    isDark
                                      ? "#cbd5e1"
                                      : "#475569",
                                }}
                              />

                              <Button
                                danger
                                type="text"
                                icon={
                                  <DeleteOutlined />
                                }
                              />
                            </Space>
                          </Col>
                        </Row>
                      </Card>
                    )
                  )}
              </Space>
            </Card>
          )}
        </Card>

        {/* MODAL */}

       <Modal
  closeIcon={false}
  open={openModal}
  onCancel={() => {
    setOpenModal(false);

    form.resetFields();
  }}
  footer={null}
  centered
  width={920}
  destroyOnClose
  maskClosable={false}
  zIndex={2000}
  style={{
    top: 16,
  }}
  styles={{
    mask: {
      backdropFilter: "blur(14px)",

      background: isDark
        ? "rgba(2,6,23,0.76)"
        : "rgba(15,23,42,0.42)",
    },

    root: {
      padding: 0,

      overflow: "hidden",

      borderRadius: 28,

      background: "transparent",

      boxShadow:
        "0 30px 80px rgba(0,0,0,0.22)",
    },

    body: {
      padding: 0,

      overflow: "hidden",

      borderRadius: 28,

      background: "transparent",
    },
  }}
>
  {/* CONTAINER */}

  <div
    style={{
      borderRadius: 28,

      overflow: "hidden",

      background: isDark
        ? "#0f172a"
        : "#ffffff",
    }}
  >
    {/* HEADER */}

    <div
      style={{
        position: "relative",

        background:
          "linear-gradient(135deg,#2563eb,#4f46e5)",

        padding: "28px 32px",

        overflow: "hidden",
      }}
    >
      {/* EFFECT */}

      <div
        style={{
          position: "absolute",

          top: -120,

          right: -100,

          width: 240,

          height: 240,

          borderRadius: "50%",

          background:
            "rgba(255,255,255,0.08)",
        }}
      />

      {/* CLOSE */}

      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={() => {
          setOpenModal(false);

          form.resetFields();
        }}
        style={{
          position: "absolute",

          top: 18,

          right: 18,

          width: 48,

          height: 48,

          borderRadius: 18,

          background:
            "rgba(255,255,255,0.12)",

          border:
            "2px solid rgba(147,197,253,0.65)",

          color: "#fff",

          fontSize: 16,

          backdropFilter: "blur(10px)",

          zIndex: 3,
        }}
      />

      {/* TEXT */}

      <Space
        direction="vertical"
        size={2}
        style={{
          position: "relative",

          zIndex: 2,
        }}
      >
        <Title
          level={2}
          style={{
            margin: 0,

            color: "#fff",

            fontSize: 30,

            lineHeight: 1.2,

            fontWeight: 700,
          }}
        >
          {editingData
            ? "Cập nhật khấu trừ"
            : "Thêm khoản khấu trừ"}
        </Title>

        <Text
          style={{
            color:
              "rgba(255,255,255,0.82)",

            fontSize: 14,
          }}
        >
          Thiết lập thông tin khấu
          trừ cho hệ thống
        </Text>
      </Space>
    </div>

    {/* BODY */}

    <div
      style={{
        padding: 28,

        background: isDark
          ? "#0f172a"
          : "#ffffff",

        maxHeight: "75vh",

        overflowY: "auto",
      }}
    >
      <Form layout="vertical" form={form}>
        {/* CARD */}

        <Card
          style={{
            borderRadius: 24,

            background: isDark
              ? "#111827"
              : "#f8fafc",

            border: `1px solid ${borderColor}`,

            boxShadow: isDark
              ? "0 8px 24px rgba(0,0,0,0.22)"
              : "0 8px 24px rgba(15,23,42,0.05)",
          }}
          bodyStyle={{
            padding: 24,
          }}
        >
          <Space
            direction="vertical"
            size={22}
            style={{
              width: "100%",
            }}
          >
            {/* TITLE */}

            <div>
              <Title
                level={4}
                style={{
                  marginBottom: 4,

                  color: textColor,

                  fontSize: 20,
                }}
              >
                Thông tin khấu trừ
              </Title>

              <Text
                style={{
                  color: subText,

                  fontSize: 14,
                }}
              >
                Thiết lập dữ liệu khấu
                trừ hệ thống
              </Text>
            </div>

            {/* FORM */}

            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <Form.Item label="Tên khoản khấu trừ">
                  <Input
                    size="large"
                    placeholder="Nhập tên..."
                    style={{
                      height: 50,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Mã khấu trừ">
                  <Input
                    size="large"
                    placeholder="Ví dụ: BHXH"
                    style={{
                      height: 50,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Tỷ lệ NLĐ (%)">
                  <InputNumber
                    size="large"
                    style={{
                      width: "100%",

                      height: 50,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Tỷ lệ doanh nghiệp (%)">
                  <InputNumber
                    size="large"
                    style={{
                      width: "100%",

                      height: 50,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Mô tả">
                  <TextArea
                    rows={4}
                    placeholder="Nhập mô tả..."
                    style={{
                      borderRadius: 16,

                      resize: "none",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Space>
        </Card>

        {/* SETTING */}

        <Card
          style={{
            marginTop: 22,

            borderRadius: 24,

            background: isDark
              ? "#111827"
              : "#f8fafc",

            border: `1px solid ${borderColor}`,
          }}
          bodyStyle={{
            padding: 22,
          }}
        >
          <Space
            direction="vertical"
            size={16}
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

                  fontSize: 20,
                }}
              >
                Thiết lập hệ thống
              </Title>

              <Text
                style={{
                  color: subText,

                  fontSize: 14,
                }}
              >
                Cấu hình trạng thái khấu
                trừ
              </Text>
            </div>

            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                padding: "16px 18px",

                borderRadius: 16,

                background: isDark
                  ? "#0b1220"
                  : "#ffffff",

                border: `1px solid ${borderColor}`,
              }}
            >
              <Space
                direction="vertical"
                size={0}
              >
                <Text
                  style={{
                    color: textColor,

                    fontWeight: 600,

                    fontSize: 14,
                  }}
                >
                  Kích hoạt khấu trừ
                </Text>

                <Text
                  style={{
                    color: subText,

                    fontSize: 13,
                  }}
                >
                  Cho phép hệ thống áp
                  dụng khoản khấu trừ
                  này
                </Text>
              </Space>

              <Switch defaultChecked />
            </div>
          </Space>
        </Card>

        {/* ACTION */}

        <Row
          justify="end"
          style={{
            marginTop: 28,
          }}
        >
          <Space size={12}>
            <Button
              size="large"
              onClick={() => {
                setOpenModal(false);

                form.resetFields();
              }}
              style={{
                height: 48,

                borderRadius: 14,

                paddingInline: 24,
              }}
            >
              Hủy
            </Button>

            <Button
              type="primary"
              size="large"
              style={{
                height: 48,

                borderRadius: 14,

                paddingInline: 24,

                fontWeight: 700,
              }}
              onClick={() => {
                message.success(
                  editingData
                    ? "Cập nhật thành công"
                    : "Thêm thành công"
                );

                setOpenModal(false);
              }}
            >
              {editingData
                ? "Cập nhật"
                : "Lưu dữ liệu"}
            </Button>
          </Space>
        </Row>
      </Form>
    </div>
  </div>
</Modal>
      </div>
    </ConfigProvider>
  );
};

export default ThietLapKhauTru;