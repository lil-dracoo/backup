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
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  TrophyOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { useMemo, useState } from "react";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

const { TextArea } = Input;

const ThietLapKhungNangLuc = () => {
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

  // ================= STATE =================

  const [search, setSearch] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [editingData, setEditingData] =
    useState<any>(null);

  const [form] = Form.useForm();

  const [mucDanhGia, setMucDanhGia] =
    useState([
      {
        id: 1,

        tenMuc: "Khá",

        diem: 80,

        heSo: 1.2,
      },

      {
        id: 2,

        tenMuc: "Giỏi",

        diem: 90,

        heSo: 1.4,
      },
    ]);

  // ================= DATA =================

  const [groups] = useState([
    {
      id: 1,

      ten:
        "Trình độ học vấn",

      trongSo: 25,

      trangThai: true,

      soMuc: 4,

      moTa:
        "Đánh giá bằng cấp và học vấn",
    },

    {
      id: 2,

      ten:
        "Kinh nghiệm",

      trongSo: 35,

      trangThai: true,

      soMuc: 5,

      moTa:
        "Đánh giá số năm kinh nghiệm",
    },

    {
      id: 3,

      ten:
        "Kỹ năng chuyên môn",

      trongSo: 30,

      trangThai: true,

      soMuc: 6,

      moTa:
        "Đánh giá kỹ năng chuyên môn",
    },

    {
      id: 4,

      ten:
        "Ngoại ngữ",

      trongSo: 20,

      trangThai: false,

      soMuc: 4,

      moTa:
        "Đánh giá khả năng ngoại ngữ",
    },
  ]);

  // ================= TOTAL =================

  const totalWeight = useMemo(() => {
    return groups.reduce(
      (sum, item) =>
        sum + item.trongSo,
      0
    );
  }, [groups]);

  // ================= FILTER =================

  const filteredData =
    groups.filter((item) =>
      item.ten
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ================= TABLE =================

  const columns = [
    {
      title:
        "Nhóm năng lực",

      dataIndex: "ten",

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

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              background:
                "rgba(37,99,235,0.12)",

              color: "#2563eb",

              fontSize: 18,
            }}
          >
            <TrophyOutlined />
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
              {record.moTa}
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title:
        "Trọng số",

      dataIndex: "trongSo",

      render: (value: number) => (
        <div
          style={{
            width: 140,
          }}
        >
          <Space
            direction="vertical"
            size={4}
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                color:
                  textColor,

                fontWeight: 600,
              }}
            >
              {value}%
            </Text>

            <Progress
              percent={value}
              showInfo={false}
              strokeColor="#2563eb"
            />
          </Space>
        </div>
      ),
    },

    {
      title:
        "Số mức đánh giá",

      dataIndex: "soMuc",

      render: (
        value: number
      ) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,

            padding:
              "5px 14px",

            fontWeight: 600,
          }}
        >
          {value} mức
        </Tag>
      ),
    },

    {
      title:
        "Trạng thái",

      dataIndex: "trangThai",

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
        <Space size={2}>
          <Tooltip title="Cập nhật">
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
          </Tooltip>

          <Tooltip title="Xóa">
            <Popconfirm title="Xóa nhóm năng lực?">
              <Button
                danger
                type="text"
                icon={
                  <DeleteOutlined />
                }
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // ================= ADD ROW =================

  const handleAddRow = () => {
    setMucDanhGia([
      ...mucDanhGia,

      {
        id: Date.now(),

        tenMuc: "",

        diem: 0,

        heSo: 1,
      },
    ]);
  };

  // ================= DELETE ROW =================

  const handleDeleteRow = (
    id: number
  ) => {
    setMucDanhGia(
      mucDanhGia.filter(
        (item) => item.id !== id
      )
    );
  };

  // ================= UPDATE ROW =================

  const handleUpdateRow = (
    id: number,
    field: string,
    value: any
  ) => {
    setMucDanhGia(
      mucDanhGia.map((item) =>
        item.id === id
          ? {
              ...item,

              [field]: value,
            }
          : item
      )
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer:
            cardColor,

          colorText:
            textColor,
        },
      }}
    >
      <div
        style={{
          background:
            bgColor,

          minHeight:
            "100vh",

          padding: 28,
        }}
      >
        {/* HEADER */}

        <Card
          style={{
            marginBottom: 24,

            borderRadius: 26,

            border: `1px solid ${borderColor}`,

            background:
              cardColor,
          }}
          bodyStyle={{
            padding:
              "30px 34px",
          }}
        >
          <Row
            justify="space-between"
            align="middle"
          >
            <Col>
              <Space
                direction="vertical"
                size={6}
              >
                <Title
                  level={2}
                  style={{
                    margin: 0,

                    color:
                      textColor,
                  }}
                >
                  Thiết lập khung
                  năng lực
                </Title>

                <Text
                  style={{
                    color:
                      subText,
                  }}
                >
                  Quản lý nhóm năng
                  lực và mức đánh
                  giá
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

                  setMucDanhGia([
                    {
                      id: 1,

                      tenMuc: "",

                      diem: 0,

                      heSo: 1,
                    },
                  ]);

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
                Thêm nhóm
              </Button>
            </Col>
          </Row>
        </Card>

        {/* ALERT */}

        <Alert
          style={{
            marginBottom: 24,

            borderRadius: 18,
          }}
          type={
            totalWeight > 100
              ? "error"
              : totalWeight === 100
                ? "success"
                : "warning"
          }
          message={`Tổng trọng số hiện tại: ${totalWeight}%`}
          description={
            totalWeight > 100
              ? "Tổng trọng số đang vượt quá 100%."
              : totalWeight < 100
                ? "Tổng trọng số chưa đủ 100%."
                : "Tổng trọng số hợp lệ."
          }
          showIcon
        />

        {/* TABLE */}

        <Card
          style={{
            borderRadius: 26,

            border: `1px solid ${borderColor}`,

            background:
              cardColor,
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
            <Row
              justify="space-between"
              align="middle"
            >
              <Col>
                <Space wrap>
                  <Input
                    prefix={
                      <SearchOutlined />
                    }
                    placeholder="Tìm kiếm nhóm năng lực..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target
                          .value
                      )
                    }
                    style={{
                      width: 340,

                      height: 46,

                      borderRadius: 14,
                    }}
                  />

                  <Select
                    placeholder="Trạng thái"
                    style={{
                      width: 180,
                    }}
                    options={[
                      {
                        label:
                          "Hoạt động",

                        value: 1,
                      },

                      {
                        label:
                          "Tạm khóa",

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

                    padding:
                      "6px 16px",

                    fontWeight: 600,
                  }}
                >
                  Tổng:{" "}
                  {
                    filteredData.length
                  }{" "}
                  nhóm
                </Tag>
              </Col>
            </Row>

            <Table
              columns={columns}
              dataSource={
                filteredData
              }
              rowKey="id"
              pagination={{
                pageSize: 6,
              }}
            />
          </Space>
        </Card>

        {/* MODAL */}

        <Modal
        closeIcon={false}
          open={openModal}
          footer={null}
          centered
          width={1000}
          destroyOnClose
          maskClosable={false}
          zIndex={9999}
          onCancel={() => {
            setOpenModal(false);

            form.resetFields();
          }}
          styles={{
            mask: {
              backdropFilter:
                "blur(10px)",

              background:
                isDark
                  ? "rgba(2,6,23,0.78)"
                  : "rgba(15,23,42,0.35)",
            },

            root: {
              borderRadius: 34,

              overflow: "hidden",

              padding: 0,

              background:
                cardColor,

              boxShadow:
                "0 25px 80px rgba(0,0,0,0.35)",
            },

            body: {
              padding: 0,

              overflow: "hidden",

              borderRadius: 34,

              background:
                cardColor,
            },
          }}
        >
          {/* HEADER */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#4f46e5)",

              padding:
                "34px 38px",

              color: "#fff",

              position: "relative",

              overflow: "hidden",

              borderTopLeftRadius: 34,

              borderTopRightRadius: 34,

              boxShadow:
                "0 15px 40px rgba(37,99,235,0.25)",
            }}
          >
            {/* DECOR */}

            <div
              style={{
                position:
                  "absolute",

                top: -90,

                right: -70,

                width: 240,

                height: 240,

                borderRadius:
                  "50%",

                background:
                  "rgba(255,255,255,0.08)",
              }}
            />

            <div
              style={{
                position:
                  "absolute",

                bottom: -70,

                left: -50,

                width: 180,

                height: 180,

                borderRadius:
                  "50%",

                background:
                  "rgba(255,255,255,0.06)",
              }}
            />

            {/* CLOSE */}

            <Button
              type="text"
              icon={
                <CloseOutlined />
              }
              onClick={() => {
                setOpenModal(
                  false
                );

                form.resetFields();
              }}
              style={{
                position:
                  "absolute",

                top: 18,

                right: 18,

                color: "#fff",

                width: 42,

                height: 42,

                borderRadius: 14,

                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.12)",

                backdropFilter:
                  "blur(10px)",

                zIndex: 3,
              }}
            />

            {/* CONTENT */}

            <div
              style={{
                position:
                  "relative",

                zIndex: 2,
              }}
            >
              <Space
                direction="vertical"
                size={4}
              >
                <Title
                  level={2}
                  style={{
                    margin: 0,

                    color:
                      "#fff",

                    fontWeight: 700,
                  }}
                >
                  {editingData
                    ? "Cập nhật nhóm năng lực"
                    : "Thêm nhóm năng lực"}
                </Title>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.82)",

                    fontSize: 15,
                  }}
                >
                  Thiết lập nhóm
                  năng lực và các
                  mức đánh giá
                </Text>
              </Space>
            </div>
          </div>

          {/* BODY */}

          <div
            style={{
              padding: 28,

              maxHeight: "78vh",

              overflowY: "auto",

              background:
                cardColor,
            }}
          >
            <Form
              layout="vertical"
              form={form}
            >
              {/* THÔNG TIN */}

              <Card
                style={{
                  borderRadius: 24,

                  background:
                    isDark
                      ? "#111827"
                      : "#f8fafc",

                  border: `1px solid ${borderColor}`,

                  marginBottom: 24,
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

                        color:
                          textColor,
                      }}
                    >
                      Thông tin nhóm
                    </Title>

                    <Text
                      style={{
                        color:
                          subText,
                      }}
                    >
                      Thiết lập
                      thông tin cơ
                      bản
                    </Text>
                  </div>

                  <Row
                    gutter={[22, 22]}
                  >
                    <Col
                      xs={24}
                      md={12}
                    >
                      <Form.Item
                        label="Tên nhóm năng lực"
                        name="ten"
                      >
                        <Input
                          size="large"
                          placeholder="Nhập tên nhóm..."
                          style={{
                            height: 50,

                            borderRadius: 14,
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      md={12}
                    >
                      <Form.Item
                        label="Trọng số (%)"
                        name="trongSo"
                      >
                        <InputNumber
                          size="large"
                          style={{
                            width:
                              "100%",

                            height: 50,
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label="Mô tả"
                        name="moTa"
                      >
                        <TextArea
                          rows={4}
                          style={{
                            borderRadius: 14,
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <div
                        style={{
                          display:
                            "flex",

                          justifyContent:
                            "space-between",

                          alignItems:
                            "center",

                          padding:
                            "18px 20px",

                          borderRadius: 18,

                          border: `1px solid ${borderColor}`,

                          background:
                            isDark
                              ? "#0b1220"
                              : "#ffffff",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              textColor,

                            fontWeight: 500,
                          }}
                        >
                          Kích hoạt
                          nhóm năng
                          lực
                        </Text>

                        <Switch defaultChecked />
                      </div>
                    </Col>
                  </Row>
                </Space>
              </Card>

              {/* MỨC ĐÁNH GIÁ */}

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
                  size={20}
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
                        size={2}
                      >
                        <Title
                          level={4}
                          style={{
                            margin: 0,

                            color:
                              textColor,
                          }}
                        >
                          Mức đánh
                          giá
                        </Title>

                        <Text
                          style={{
                            color:
                              subText,
                          }}
                        >
                          Thiết lập
                          điểm và hệ
                          số đánh giá
                        </Text>
                      </Space>
                    </Col>

                    <Col>
                      <Button
                        type="primary"
                        icon={
                          <PlusOutlined />
                        }
                        onClick={
                          handleAddRow
                        }
                        style={{
                          borderRadius: 12,
                        }}
                      >
                        Thêm mức
                      </Button>
                    </Col>
                  </Row>

                  {/* HEADER */}

                  <div
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "2fr 1fr 1fr 80px",

                      gap: 16,

                      padding:
                        "0 12px 12px",

                      color:
                        subText,

                      fontWeight: 600,

                      fontSize: 13,
                    }}
                  >
                    <div>
                      Tên mức
                    </div>

                    <div>
                      Điểm
                    </div>

                    <div>
                      Hệ số
                    </div>

                    <div></div>
                  </div>

                  {/* ROW */}

                  <Space
                    direction="vertical"
                    size={14}
                    style={{
                      width: "100%",
                    }}
                  >
                    {mucDanhGia.map(
                      (
                        item
                      ) => (
                        <div
                          key={
                            item.id
                          }
                          style={{
                            display:
                              "grid",

                            gridTemplateColumns:
                              "2fr 1fr 1fr 80px",

                            gap: 16,

                            padding:
                              14,

                            borderRadius: 18,

                            border: `1px solid ${borderColor}`,

                            background:
                              isDark
                                ? "#0b1220"
                                : "#ffffff",

                            alignItems:
                              "center",
                          }}
                        >
                          <Input
                            value={
                              item.tenMuc
                            }
                            placeholder="Ví dụ: Giỏi"
                            onChange={(
                              e
                            ) =>
                              handleUpdateRow(
                                item.id,

                                "tenMuc",

                                e
                                  .target
                                  .value
                              )
                            }
                            style={{
                              height: 46,

                              borderRadius: 12,
                            }}
                          />

                          <InputNumber
                            value={
                              item.diem
                            }
                            onChange={(
                              value
                            ) =>
                              handleUpdateRow(
                                item.id,

                                "diem",

                                value
                              )
                            }
                            style={{
                              width:
                                "100%",
                            }}
                          />

                          <InputNumber
                            step={0.1}
                            value={
                              item.heSo
                            }
                            onChange={(
                              value
                            ) =>
                              handleUpdateRow(
                                item.id,

                                "heSo",

                                value
                              )
                            }
                            style={{
                              width:
                                "100%",
                            }}
                          />

                          <Button
                            danger
                            type="text"
                            icon={
                              <DeleteOutlined />
                            }
                            onClick={() =>
                              handleDeleteRow(
                                item.id
                              )
                            }
                          />
                        </div>
                      )
                    )}
                  </Space>
                </Space>
              </Card>

              <Divider />

              {/* ACTION */}

              <Row justify="end">
                <Space size={14}>
                  <Button
                    size="large"
                    onClick={() => {
                      setOpenModal(
                        false
                      );

                      form.resetFields();
                    }}
                    style={{
                      height: 48,

                      borderRadius: 14,

                      paddingInline: 22,
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

                      paddingInline: 22,

                      fontWeight: 600,
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
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default ThietLapKhungNangLuc;