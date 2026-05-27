import {
  BankOutlined,
  CalendarOutlined,
  CloseOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  GiftOutlined,
  GlobalOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";

import { useMemo, useState } from "react";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

const { TextArea } = Input;

const allowanceData = [
  {
    id: 1,
    name: "Phụ cấp ăn trưa",
    code: "PCA",
    amount: 850000,
    scope: "company",
    applyFor: "Toàn bộ nhân viên",
    taxable: false,
    active: true,
    cycle: "Hàng tháng",
  },

  {
    id: 2,
    name: "Phụ cấp IT",
    code: "PCIT",
    amount: 1500000,
    scope: "department",
    applyFor: "Phòng IT",
    taxable: true,
    active: true,
    cycle: "Hàng tháng",
  },

  {
    id: 3,
    name: "Phụ cấp quản lý",
    code: "PCQL",
    amount: 3000000,
    scope: "position",
    applyFor: "Trưởng phòng",
    taxable: true,
    active: true,
    cycle: "Hàng tháng",
  },

  {
    id: 4,
    name: "Phụ cấp cá nhân",
    code: "PCCN",
    amount: 1200000,
    scope: "employee",
    applyFor: "Nguyễn Văn A",
    taxable: false,
    active: true,
    cycle: "Theo tháng",
  },
];

const scopeConfig: any = {
  company: {
    label: "Toàn công ty",
    color: "blue",
    icon: <GlobalOutlined />,
  },

  department: {
    label: "Phòng ban",
    color: "purple",
    icon: <BankOutlined />,
  },

  position: {
    label: "Chức vụ",
    color: "orange",
    icon: <TeamOutlined />,
  },

  employee: {
    label: "Cá nhân",
    color: "green",
    icon: <UserOutlined />,
  },

  year: {
    label: "Theo năm",
    color: "cyan",
    icon: <CalendarOutlined />,
  },

  month: {
    label: "Theo tháng",
    color: "magenta",
    icon: <CalendarOutlined />,
  },
};

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

const ThietLapPhuCap = () => {
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] =
    useState("company");

  const [search, setSearch] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [editingData, setEditingData] =
    useState<any>(null);

  const [form] = Form.useForm();

  const bgColor = isDark
    ? "#020617"
    : "#f1f5f9";

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

  const filteredData = useMemo(() => {
    return allowanceData.filter(
      (item) => {
        const matchSearch =
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchTab =
          activeTab === "all"
            ? true
            : item.scope === activeTab;

        return (
          matchSearch &&
          matchTab
        );
      }
    );
  }, [search, activeTab]);

  const getTabDescription = () => {
    switch (activeTab) {
      case "company":
        return "Phụ cấp áp dụng cho toàn bộ nhân viên trong công ty";

      case "department":
        return "Phụ cấp áp dụng theo từng phòng ban";

      case "position":
        return "Phụ cấp áp dụng theo chức vụ nhân viên";

      case "employee":
        return "Phụ cấp riêng cho từng cá nhân";

      case "year":
        return "Phụ cấp thưởng và hỗ trợ theo năm";

      case "month":
        return "Phụ cấp hỗ trợ theo tháng";

      default:
        return "";
    }
  };

  const columns = [
    {
      title: "Phụ cấp",

      dataIndex: "name",

      render: (
        value: string,
        record: any
      ) => (
        <Space size={14}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 18,
              background:
                "rgba(37,99,235,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              fontSize: 22,
              color: "#2563eb",
            }}
          >
            <GiftOutlined />
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
              }}
            >
              {
                record.applyFor
              }
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title: "Loại",

      dataIndex: "scope",

      render: (
        value: string
      ) => (
        <Tag
          color={
            scopeConfig[value]
              ?.color
          }
          style={{
            borderRadius: 999,
            padding:
              "4px 14px",
          }}
        >
          <Space size={4}>
            {
              scopeConfig[value]
                ?.icon
            }

            {
              scopeConfig[value]
                ?.label
            }
          </Space>
        </Tag>
      ),
    },

    {
      title: "Giá trị",

      dataIndex: "amount",

      render: (
        value: number
      ) => (
        <Text
          style={{
            color:
              "#10b981",
            fontWeight: 700,
          }}
        >
          {formatCurrency(
            value
          )}
        </Text>
      ),
    },

    {
      title: "Chu kỳ",

      dataIndex: "cycle",

      render: (
        value: string
      ) => (
        <Tag
          color="gold"
          style={{
            borderRadius: 999,
          }}
        >
          {value}
        </Tag>
      ),
    },

    {
      title: "Thuế",

      dataIndex: "taxable",

      render: (
        value: boolean
      ) => (
        <Badge
          status={
            value
              ? "processing"
              : "success"
          }
          text={
            value
              ? "Có thuế"
              : "Miễn thuế"
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
                record );

              form.setFieldsValue(
                record
              );

              setOpenModal(
                true
              );
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
      ),
    },
  ];

  return (
    <ConfigProvider>
      <div
        style={{
          minHeight: "100vh",
          background:
            bgColor,
          padding: 24,
        }}
      >
        {/* HEADER */}

        <Card
          style={{
            borderRadius: 30,
            border: `1px solid ${borderColor}`,
            marginBottom: 24,
            background:
              cardColor,
          }}
          bodyStyle={{
            padding:
              "28px 32px",
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            gutter={[20, 20]}
          >
            <Col>
              <Space size={18}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 22,
                    background:
                      isDark
                        ? "#111827"
                        : "#eff6ff",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    fontSize: 30,
                    color: "#2563eb",
                  }}
                >
                  <DollarOutlined />
                </div>

                <Space
                  direction="vertical"
                  size={0}
                >
                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      color:
                        textColor,
                    }}
                  >
                    Thiết lập phụ cấp
                  </Title>

                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    Quản lý phụ cấp
                    theo từng phạm vi
                    áp dụng
                  </Text>
                </Space>
              </Space>
            </Col>

            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{
                  height: 50,
                  borderRadius: 16,
                  paddingInline: 24,
                  fontWeight: 700,
                }}
                onClick={() => {
                  setEditingData(
                    null
                  );

                  form.resetFields();

                  setOpenModal(
                    true
                  );
                }}
              >
                Thêm phụ cấp
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
                border: `1px solid ${borderColor}`,
              }}
            >
              <Statistic
                title="Tổng phụ cấp"
                value={
                  allowanceData.length
                }
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
                border: `1px solid ${borderColor}`,
              }}
            >
              <Statistic
                title="Ngân sách"
                value={allowanceData.reduce(
                  (
                    sum,
                    item
                  ) =>
                    sum +
                    item.amount,
                  0
                )}
                formatter={(
                  value
                ) =>
                  formatCurrency(
                    Number(value)
                  )
                }
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
                border: `1px solid ${borderColor}`,
              }}
            >
              <Statistic
                title="Đang hoạt động"
                value={allowanceData.filter(
                  (
                    item
                  ) =>
                    item.active
                ).length}
              />
            </Card>
          </Col>
        </Row>

        {/* MAIN */}

        <Card
          style={{
            borderRadius: 30,
            border: `1px solid ${borderColor}`,
            background:
              cardColor,
          }}
          bodyStyle={{
            padding: 24,
          }}
        >
          {/* TABS */}

          <Tabs
            activeKey={activeTab}
            onChange={(
              value
            ) =>
              setActiveTab(
                value
              )
            }
            items={[
              {
                key: "company",
                label:
                  "Toàn công ty",
              },

              {
                key:
                  "department",
                label:
                  "Phòng ban",
              },

              {
                key:
                  "position",
                label:
                  "Chức vụ",
              },

              {
                key:
                  "employee",
                label:
                  "Cá nhân",
              },

              {
                key: "year",
                label:
                  "Theo năm",
              },

              {
                key: "month",
                label:
                  "Theo tháng",
              },
            ]}
          />

          {/* DESCRIPTION */}

          <Card
            style={{
              marginBottom: 24,
              borderRadius: 20,
              background:
                isDark
                  ? "#111827"
                  : "#f8fafc",
              border: `1px solid ${borderColor}`,
            }}
          >
            <Space
              direction="vertical"
              size={2}
            >
              <Title
                level={5}
                style={{
                  margin: 0,
                  color:
                    textColor,
                }}
              >
                {
                  scopeConfig[
                    activeTab
                  ]?.label
                }
              </Title>

              <Text
                style={{
                  color:
                    subText,
                }}
              >
                {getTabDescription()}
              </Text>
            </Space>
          </Card>

          {/* FILTER */}

          <Row
            justify="space-between"
            align="middle"
            gutter={[20, 20]}
            style={{
              marginBottom: 22,
            }}
          >
            <Col>
              <Input
                prefix={
                  <SearchOutlined />
                }
                placeholder="Tìm phụ cấp..."
                size="large"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
                style={{
                  width: 320,
                  borderRadius: 14,
                }}
              />
            </Col>
          </Row>

          {/* TABLE */}

          {filteredData.length >
          0 ? (
            <Table
              rowKey="id"
              columns={columns}
              dataSource={
                filteredData
              }
              pagination={{
                pageSize: 5,
              }}
            />
          ) : (
            <Empty />
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
            ? "Cập nhật phụ cấp"
            : "Thêm phụ cấp"}
        </Title>

        <Text
          style={{
            color:
              "rgba(255,255,255,0.82)",

            fontSize: 14,
          }}
        >
          Thiết lập thông tin phụ cấp
          cho hệ thống
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
                Thông tin phụ cấp
              </Title>

              <Text
                style={{
                  color: subText,

                  fontSize: 14,
                }}
              >
                Thiết lập dữ liệu phụ
                cấp hệ thống
              </Text>
            </div>

            {/* FORM */}

            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <Form.Item label="Tên phụ cấp">
                  <Input
                    size="large"
                    placeholder="Nhập tên phụ cấp"
                    style={{
                      height: 50,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Mã phụ cấp">
                  <Input
                    size="large"
                    placeholder="Ví dụ: PCA"
                    style={{
                      height: 50,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Giá trị">
                  <InputNumber
                    size="large"
                    addonAfter="VNĐ"
                    style={{
                      width: "100%",

                      height: 50,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Loại phụ cấp">
                  <Select
                    size="large"
                    placeholder="Chọn loại"
                    style={{
                      height: 50,
                    }}
                    options={[
                      {
                        value: "company",

                        label:
                          "Toàn công ty",
                      },

                      {
                        value:
                          "department",

                        label:
                          "Phòng ban",
                      },

                      {
                        value:
                          "position",

                        label:
                          "Chức vụ",
                      },

                      {
                        value:
                          "employee",

                        label:
                          "Cá nhân",
                      },

                      {
                        value: "year",

                        label:
                          "Theo năm",
                      },

                      {
                        value:
                          "month",

                        label:
                          "Theo tháng",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Đối tượng áp dụng">
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Chọn đối tượng"
                    style={{
                      height: 50,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Ngày bắt đầu">
                  <DatePicker
                    size="large"
                    style={{
                      width: "100%",

                      height: 50,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Ngày kết thúc">
                  <DatePicker
                    size="large"
                    style={{
                      width: "100%",

                      height: 50,

                      borderRadius: 16,
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
                Cấu hình trạng thái phụ
                cấp
              </Text>
            </div>

            {[
              "Kích hoạt phụ cấp",

              "Tính thuế",

              "Cho phép chỉnh sửa",

              "Tự động áp dụng",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  padding:
                    "16px 18px",

                  borderRadius: 16,

                  background: isDark
                    ? "#0b1220"
                    : "#ffffff",

                  border: `1px solid ${borderColor}`,
                }}
              >
                <Text
                  style={{
                    color: textColor,

                    fontWeight: 600,

                    fontSize: 14,
                  }}
                >
                  {item}
                </Text>

                <Switch defaultChecked />
              </div>
            ))}
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
            >
              {editingData
                ? "Cập nhật phụ cấp"
                : "Lưu phụ cấp"}
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

export default ThietLapPhuCap;