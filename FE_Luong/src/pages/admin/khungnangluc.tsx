import {
  BarChartOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from "antd";

import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

const mappingRules = [
  {
    key: 1,

    tenBang: "Không Đạt",

    nhom: "Năng lực chuyên môn",

    tu: 0,

    den: 49,

    heSo: 0.8,

    muc: "Chưa đạt",

    mau: "red",

    moTa: "Hiệu suất thấp",
  },

  {
    key: 2,

    tenBang: "Cần cải thiện",

    nhom: "Năng lực chuyên môn",

    tu: 50,

    den: 69,

    heSo: 1.0,

    muc: "Đạt",

    mau: "blue",

    moTa: "Đạt yêu cầu",
  },

  {
    key: 3,

    tenBang: "Đạt",

    nhom: "Năng lực chuyên môn",

    tu: 70,

    den: 84,

    heSo: 1.2,

    muc: "Khá",

    mau: "orange",

    moTa: "Hiệu suất tốt",
  },

  {
    key: 4,

    tenBang: "Xuất sắc",

    nhom: "Năng lực chuyên môn",

    tu: 85,

    den: 100,

    heSo: 1.5,

    muc: "Xuất sắc",

    mau: "green",

    moTa: "Hiệu suất vượt trội",
  },
];

const chartData = [
  {
    month: "T1",

    score: 68,

    p2: 1,
  },

  {
    month: "T2",

    score: 76,

    p2: 1.2,
  },

  {
    month: "T3",

    score: 88,

    p2: 1.5,
  },

  {
    month: "T4",

    score: 92,

    p2: 1.5,
  },
];

export default function QuyDoiHeSoP2() {
  const { isDark } = useTheme();

  const [search, setSearch] = useState("");

  const [openCreate, setOpenCreate] = useState(false);

  const [, setOpenView] = useState(false);

  const [, setOpenEdit] = useState(false);

  const [, setSelectedRow] = useState<any>(null);

  const textColor = isDark ? "#f8fafc" : "#0f172a";

  const subText = isDark ? "#94a3b8" : "#64748b";

  const cardColor = isDark ? "#0f172a" : "#ffffff";

  const borderColor = isDark ? "rgba(148,163,184,0.12)" : "#e2e8f0";

  const bgColor = isDark ? "#020617" : "#f8fafc";

  const filteredData = useMemo(() => {
    return mappingRules.filter((item) =>
      item.tenBang.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const columns = [
    {
      title: "Xếp loại",

      width: 320,

      render: (_: any, record: any) => (
        <Space size={14}>
          <Avatar
            size={52}
            style={{
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            }}
          >
            Q
          </Avatar>

          <div>
            <Text
              style={{
                color: textColor,

                fontWeight: 700,
              }}
            >
              {record.tenBang}
            </Text>

            <br />

            <Text
              style={{
                color: subText,

                fontSize: 12,
              }}
            >
              {record.nhom}
            </Text>
          </div>
        </Space>
      ),
    },

    {
      title: "Khoảng điểm TH",

      width: 180,

      align: "center" as any,

      render: (_: any, record: any) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,

            paddingInline: 14,
          }}
        >
          {record.tu} - {record.den}
        </Tag>
      ),
    },

    {
      title: "Mức đánh giá",

      width: 180,

      align: "center" as any,

      render: (_: any, record: any) => (
        <Tag
          color={record.mau}
          style={{
            borderRadius: 999,

            paddingInline: 16,
          }}
        >
          {record.muc}
        </Tag>
      ),
    },

    {
      title: "Hệ số P2",

      width: 180,

      align: "center" as any,

      render: (_: any, record: any) => (
        <Text
          strong
          style={{
            color: "#2563eb",

            fontSize: 16,
          }}
        >
          x{record.heSo}
        </Text>
      ),
    },

    {
      title: "",

      width: 220,

      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            style={{
              borderRadius: 12,
            }}
            onClick={() => {
              setSelectedRow(record);

              setOpenView(true);
            }}
          >
            Xem
          </Button>

          <Button
            size="small"
            icon={<EditOutlined />}
            style={{
              borderRadius: 12,
            }}
            onClick={() => {
              setSelectedRow(record);

              setOpenEdit(true);
            }}
          >
            Sửa
          </Button>

          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            style={{
              borderRadius: 12,
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const renderModalHeader = (
    title: string,
    desc: string,
    close: () => void,
  ) => (
    <div
      style={{
        background: "linear-gradient(135deg,#2563eb,#7c3aed)",

        padding: 28,

        position: "sticky",

        top: 0,

        zIndex: 10,
      }}
    >
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={close}
        style={{
          position: "absolute",

          top: 18,

          right: 18,

          width: 42,

          height: 42,

          borderRadius: 14,

          background: "rgba(255,255,255,0.12)",

          color: "#fff",
        }}
      />

      <Space size={18}>
        <div
          style={{
            width: 76,

            height: 76,

            borderRadius: 24,

            background: "rgba(255,255,255,0.14)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "#fff",

            fontSize: 30,
          }}
        >
          <CalculatorOutlined />
        </div>

        <div>
          <Title
            level={2}
            style={{
              margin: 0,

              color: "#fff",
            }}
          >
            {title}
          </Title>

          <Text
            style={{
              color: "rgba(255,255,255,0.82)",
            }}
          >
            {desc}
          </Text>
        </div>
      </Space>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",

        background: bgColor,

        padding: 20,
      }}
    >
      <style>{`
      .ant-modal-root {
        z-index: 999999 !important;
      }

      .ant-modal-mask {
        z-index: 999998 !important;

        backdrop-filter: blur(14px);
      }

      .ant-modal-wrap {
        z-index: 999999 !important;
      }

      .table-row:hover {
        background: ${isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"};

        transition: all .3s;
      }
      `}</style>

      {/* HEADER */}

      <Card
        style={{
          borderRadius: 30,

          marginBottom: 20,

          background: cardColor,

          border: `1px solid ${borderColor}`,
        }}
      >
        <Row justify="space-between" align="middle" gutter={[20, 20]}>
          <Col>
            <Space size={18}>
              <div
                style={{
                  width: 78,

                  height: 78,

                  borderRadius: 24,

                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  color: "#fff",

                  fontSize: 34,
                }}
              >
                <CalculatorOutlined />
              </div>

              <div>
                <Title
                  level={3}
                  style={{
                    margin: 0,

                    color: textColor,
                  }}
                >
                  Bảng quy đổi hệ số năng lực P2
                </Title>

                <Text
                  style={{
                    color: subText,
                  }}
                >
                  Quy đổi điểm tổng hợp năng lực → hệ số tính lương P2
                </Text>
              </div>
            </Space>
          </Col>

          <Col>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              style={{
                borderRadius: 16,

                height: 46,
              }}
              onClick={() => setOpenCreate(true)}
            >
              Thêm quy đổi
            </Button>
          </Col>
        </Row>
      </Card>

      {/* STATS */}

      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 20,
        }}
      >
        {[
          {
            title: "Bảng quy đổi",

            value: 12,

            icon: <SettingOutlined />,
          },

          {
            title: "Mức đánh giá",

            value: 28,

            icon: <CheckCircleOutlined />,
          },

          {
            title: "Hệ số cao nhất",

            value: "x2.0",

            icon: <TrophyOutlined />,
          },

          {
            title: "Đang hoạt động",

            value: 24,

            icon: <BarChartOutlined />,
          },
        ].map((item, index) => (
          <Col xs={24} sm={12} xl={6} key={index}>
            <Card
              style={{
                borderRadius: 24,
              }}
            >
              <Statistic
                title={item.title}
                value={item.value}
                prefix={item.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* CHART */}

      <Card
        style={{
          borderRadius: 28,

          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 320,
          }}
        >
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                fill="#2563eb33"
                name="Điểm TH"
              />

              <Area
                type="monotone"
                dataKey="p2"
                stroke="#7c3aed"
                fill="#7c3aed22"
                name="Hệ số P2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* TABLE */}

      <Card
        style={{
          borderRadius: 28,
        }}
      >
        <Space
          direction="vertical"
          size={18}
          style={{
            width: "100%",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <div>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  Danh sách quy đổi
                </Title>

                <Text type="secondary">Mapping điểm năng lực</Text>
              </div>
            </Col>

            <Col>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm quy đổi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: 260,

                  height: 42,

                  borderRadius: 14,
                }}
              />
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 6,
            }}
            scroll={{
              x: "max-content",
            }}
            rowClassName={() => "table-row"}
          />
        </Space>
      </Card>

      {/* CREATE */}

      <Modal
        open={openCreate}
        footer={null}
        closable={false}
        centered
        destroyOnHidden
        getContainer={document.body}
        zIndex={999999}
        width="92%"
        style={{
          maxWidth: 1000,

          top: 18,
        }}
        styles={{
          mask: {
            backdropFilter: "blur(14px)",

            background: isDark ? "rgba(2,6,23,0.82)" : "rgba(15,23,42,0.55)",
          },

          root: {
            padding: 0,

            overflow: "hidden",

            borderRadius: 30,

            background: cardColor,
          },

          body: {
            padding: 0,
          },
        }}
        onCancel={() => setOpenCreate(false)}
      >
        {renderModalHeader(
          "Thêm quy đổi hệ số",
          "Thiết lập khoảng điểm → hệ số P2",
          () => setOpenCreate(false),
        )}

        <div
          style={{
            padding: 24,
          }}
        >
          <Card
            style={{
              borderRadius: 24,
            }}
          >
            <Row gutter={[18, 18]}>
              <Col xs={24} md={12}>
                <Text strong>Tên bảng quy đổi</Text>

                <Input
                  placeholder="VD: Quy đổi Developer"
                  style={{
                    marginTop: 8,

                    height: 46,

                    borderRadius: 14,
                  }}
                />
              </Col>

              <Col xs={24} md={12}>
                <Text strong>Nhóm năng lực</Text>

                <Select
                  placeholder="Chọn nhóm"
                  style={{
                    width: "100%",

                    marginTop: 8,
                  }}
                  size="large"
                />
              </Col>

              <Col xs={24} md={6}>
                <Text strong>Từ điểm</Text>

                <Input
                  placeholder="70"
                  style={{
                    marginTop: 8,

                    height: 46,

                    borderRadius: 14,
                  }}
                />
              </Col>

              <Col xs={24} md={6}>
                <Text strong>Đến điểm</Text>

                <Input
                  placeholder="84"
                  style={{
                    marginTop: 8,

                    height: 46,

                    borderRadius: 14,
                  }}
                />
              </Col>

              <Col xs={24} md={6}>
                <Text strong>Hệ số P2</Text>

                <Input
                  placeholder="1.2"
                  style={{
                    marginTop: 8,

                    height: 46,

                    borderRadius: 14,
                  }}
                />
              </Col>

              <Col xs={24} md={6}>
                <Text strong>Mức đánh giá</Text>

                <Select
                  placeholder="Chọn mức"
                  style={{
                    width: "100%",

                    marginTop: 8,
                  }}
                  size="large"
                />
              </Col>
            </Row>

            <Divider />

            <Row justify="end">
              <Space>
                <Button
                  size="large"
                  style={{
                    borderRadius: 14,
                  }}
                  onClick={() => setOpenCreate(false)}
                >
                  Hủy
                </Button>

                <Button
                  type="primary"
                  size="large"
                  style={{
                    borderRadius: 14,
                  }}
                  onClick={() => {
                    message.success("Tạo quy đổi thành công");

                    setOpenCreate(false);
                  }}
                >
                  Lưu cấu hình
                </Button>
              </Space>
            </Row>
          </Card>
        </div>
      </Modal>
    </div>
  );
}
