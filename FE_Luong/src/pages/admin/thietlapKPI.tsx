import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Input,
  Table,
  Tag,
  Modal,
  Form,
  Select,
  InputNumber,
  Switch,
  Tooltip,
  ConfigProvider,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  BarChartOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { useState } from "react";

import { useTheme } from "../../context/themecontext";
import { CloseOutlined } from "@mui/icons-material";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CauHinhKPI = () => {
  const { isDark } = useTheme();

  // ================= STATE =================

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const [editingKPI, setEditingKPI] = useState<any>(null);

  const [form] = Form.useForm();

  // ================= THEME =================

  const bgColor = isDark ? "#020617" : "#f8fafc";

  const cardColor = isDark ? "#0f172a" : "#ffffff";

  const textColor = isDark ? "#f8fafc" : "#0f172a";

  const subText = isDark ? "#94a3b8" : "#64748b";

  const borderColor = isDark ? "rgba(148,163,184,0.12)" : "#e2e8f0";

  const glassCard = {
    background: cardColor,

    border: `1px solid ${borderColor}`,

    borderRadius: 24,

    overflow: "hidden",

    boxShadow: isDark
      ? "0 10px 30px rgba(0,0,0,0.24)"
      : "0 10px 30px rgba(15,23,42,0.06)",
  };

  // ================= DATA =================

  const kpiData = [
    {
      key: 1,

      maKPI: "KPI001",

      tenKPI: "Hiệu suất công việc",

      phongBan: "CNTT",

      trongSo: 40,

      trangThai: "Đang áp dụng",
    },

    {
      key: 2,

      maKPI: "KPI002",

      tenKPI: "Đi làm đúng giờ",

      phongBan: "Nhân sự",

      trongSo: 20,

      trangThai: "Tạm khóa",
    },

    {
      key: 3,

      maKPI: "KPI003",

      tenKPI: "Doanh số bán hàng",

      phongBan: "Kinh doanh",

      trongSo: 35,

      trangThai: "Đang áp dụng",
    },
  ];

  // ================= FILTER =================

  const filteredData = kpiData.filter((item) =>
    item.tenKPI.toLowerCase().includes(search.toLowerCase()),
  );

  // ================= TABLE =================

  const columns = [
    {
      title: "KPI",

      dataIndex: "tenKPI",

      render: (value: string, record: any) => (
        <Space size={14}>
          <div
            style={{
              width: 44,

              height: 44,

              borderRadius: 14,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              background: "rgba(37,99,235,0.12)",

              color: "#2563eb",

              fontSize: 18,
            }}
          >
            <BarChartOutlined />
          </div>

          <Space direction="vertical" size={0}>
            <Text
              style={{
                color: textColor,

                fontWeight: 700,

                fontSize: 15,
              }}
            >
              {value}
            </Text>

            <Text
              style={{
                color: subText,

                fontSize: 13,
              }}
            >
              {record.maKPI}
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title: "Phòng ban",

      dataIndex: "phongBan",

      render: (value: string) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,

            padding: "4px 14px",

            fontWeight: 600,
          }}
        >
          {value}
        </Tag>
      ),
    },

    {
      title: "Trọng số",

      dataIndex: "trongSo",

      render: (value: number) => (
        <Text
          style={{
            color: textColor,

            fontWeight: 600,
          }}
        >
          {value}%
        </Text>
      ),
    },

    {
      title: "Trạng thái",

      dataIndex: "trangThai",

      render: (value: string) => (
        <Tag
          color={value === "Đang áp dụng" ? "green" : "red"}
          style={{
            borderRadius: 999,

            padding: "4px 14px",

            fontWeight: 600,
          }}
        >
          {value}
        </Tag>
      ),
    },

    {
      title: "",

      render: (_: any, record: any) => (
        <Space size={4}>
          <Tooltip title="Cập nhật">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{
                color: isDark ? "#cbd5e1" : "#475569",
              }}
              onClick={() => {
                setEditingKPI(record);

                setOpenModal(true);

                form.setFieldsValue({
                  tenKPI: record.tenKPI,

                  maKPI: record.maKPI,

                  phongBan: record.phongBan,

                  trongSo: record.trongSo,
                });
              }}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Tooltip>

          <Tooltip title="Khác">
            <Button
              type="text"
              icon={<MoreOutlined />}
              style={{
                color: isDark ? "#cbd5e1" : "#475569",
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: cardColor,

          colorText: textColor,
        },
      }}
    >
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

            marginBottom: 24,
          }}
          bodyStyle={{
            padding: "34px 36px",
          }}
        >
          <Row justify="space-between" align="middle" gutter={[20, 20]}>
            <Col>
              <Space direction="vertical" size={6}>
                <Title
                  level={2}
                  style={{
                    margin: 0,

                    color: textColor,
                  }}
                >
                  Cấu hình KPI
                </Title>

                <Text
                  style={{
                    color: subText,

                    fontSize: 15,
                  }}
                >
                  Quản lý cấu hình KPI hệ thống
                </Text>
              </Space>
            </Col>

            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                  setEditingKPI(null);

                  form.resetFields();

                  setOpenModal(true);
                }}
                style={{
                  height: 48,

                  borderRadius: 14,

                  paddingInline: 22,

                  fontWeight: 600,
                }}
              >
                Thêm KPI
              </Button>
            </Col>
          </Row>
        </Card>

        {/* TABLE */}

        <Card
          style={glassCard}
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
            {/* TOOLBAR */}

            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Space size={14} wrap>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Tìm kiếm KPI..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: 320,

                      height: 46,

                      borderRadius: 14,
                    }}
                  />

                  <Select
                    placeholder="Trạng thái"
                    style={{
                      width: 180,

                      height: 46,
                    }}
                    options={[
                      {
                        label: "Đang áp dụng",

                        value: 1,
                      },

                      {
                        label: "Tạm khóa",

                        value: 2,
                      },
                    ]}
                  />
                </Space>
              </Col>

              <Col>
                <Tag
                  color="blue"
                  style={{
                    borderRadius: 999,

                    padding: "6px 16px",

                    fontWeight: 600,
                  }}
                >
                  Tổng: {filteredData.length} KPI
                </Tag>
              </Col>
            </Row>

            {/* TABLE */}

            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 6,
              }}
              rowKey="key"
            />
          </Space>
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
          styles={{
            mask: {
              backdropFilter: "blur(10px)",

              background: isDark ? "rgba(2,6,23,0.72)" : "rgba(15,23,42,0.35)",
            },

            root: {
              padding: 0,

              overflow: "hidden",

              borderRadius: 30,
            },

            body: {
              padding: 0,

              borderRadius: 30,

              overflow: "hidden",

              background: isDark ? "#0f172a" : "#ffffff",
            },
          }}
        >
          {/* TOP */}

          <div
            style={{
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",

              padding: "30px 34px",

              color: "#fff",
            }}
          >
            <Space direction="vertical" size={6}>
              <Title
                level={2}
                style={{
                  margin: 0,

                  color: "#fff",
                }}
              >
                {editingKPI ? "Cập nhật KPI" : "Thêm KPI"}
              </Title>

              <Text
                style={{
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                Thiết lập cấu hình KPI hệ thống
              </Text>
            </Space>
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

                color: "#fff",

                width: 42,

                height: 42,

                borderRadius: 14,

                background: "rgba(255,255,255,0.08)",

                border: "1px solid rgba(255,255,255,0.12)",

                backdropFilter: "blur(10px)",

                zIndex: 3,
              }}
            />
          </div>

          {/* BODY */}

          <div
            style={{
              padding: 30,

              background: isDark ? "#0f172a" : "#ffffff",

              maxHeight: "78vh",

              overflowY: "auto",
            }}
          >
            <Form layout="vertical" form={form}>
              {/* INFO */}

              <Card
                style={{
                  marginBottom: 22,

                  borderRadius: 24,

                  background: isDark ? "#111827" : "#f8fafc",

                  border: `1px solid ${borderColor}`,
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
                      level={4}
                      style={{
                        marginBottom: 4,

                        color: textColor,
                      }}
                    >
                      Thông tin KPI
                    </Title>

                    <Text
                      style={{
                        color: subText,
                      }}
                    >
                      Thiết lập dữ liệu KPI
                    </Text>
                  </div>

                  <Row gutter={[22, 22]}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Tên KPI" name="tenKPI">
                        <Input
                          size="large"
                          placeholder="Nhập tên KPI"
                          style={{
                            height: 52,

                            borderRadius: 16,
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item label="Mã KPI" name="maKPI">
                        <Input
                          size="large"
                          placeholder="Ví dụ: KPI001"
                          style={{
                            height: 52,

                            borderRadius: 16,
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item label="Phòng ban" name="phongBan">
                        <Select
                          size="large"
                          placeholder="Chọn phòng ban"
                          style={{
                            height: 52,
                          }}
                          options={[
                            {
                              label: "CNTT",

                              value: "CNTT",
                            },

                            {
                              label: "Nhân sự",

                              value: "Nhân sự",
                            },

                            {
                              label: "Kinh doanh",

                              value: "Kinh doanh",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item label="Trọng số (%)" name="trongSo">
                        <InputNumber
                          size="large"
                          style={{
                            width: "100%",

                            height: 52,
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Mô tả" name="moTa">
                        <TextArea
                          rows={5}
                          placeholder="Nhập mô tả KPI..."
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

              {/* SETTINGS */}

              <Card
                style={{
                  borderRadius: 24,

                  background: isDark ? "#111827" : "#f8fafc",

                  border: `1px solid ${borderColor}`,
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
                      Thiết lập KPI
                    </Title>

                    <Text
                      style={{
                        color: subText,
                      }}
                    >
                      Cấu hình hệ thống
                    </Text>
                  </div>

                  {[
                    "Tự động tính KPI",

                    "Cho phép AI đánh giá",

                    "Yêu cầu phê duyệt",

                    "Khóa KPI cuối tháng",
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        padding: "18px 20px",

                        borderRadius: 18,

                        background: isDark ? "#0b1220" : "#ffffff",

                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <Text
                        style={{
                          color: textColor,

                          fontWeight: 500,

                          fontSize: 15,
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
                  marginTop: 30,
                }}
              >
                <Space size={14}>
                  <Button
                    size="large"
                    onClick={() => {
                      setOpenModal(false);

                      form.resetFields();
                    }}
                    style={{
                      height: 50,

                      borderRadius: 14,

                      paddingInline: 26,
                    }}
                  >
                    Hủy
                  </Button>

                  <Button
                    type="primary"
                    size="large"
                    style={{
                      height: 50,

                      borderRadius: 14,

                      paddingInline: 26,

                      fontWeight: 600,
                    }}
                  >
                    {editingKPI ? "Cập nhật KPI" : "Lưu KPI"}
                  </Button>
                </Space>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default CauHinhKPI;
