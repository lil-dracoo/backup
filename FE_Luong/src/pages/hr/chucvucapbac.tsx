import {
  ArrowUpOutlined,
  BankOutlined,
  CrownOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

import { useMemo, useState } from "react";

import { useTheme } from "../../context/themecontext";
import { CloseOutlined } from "@mui/icons-material";

const { Title, Text } = Typography;

const roleData = [
  {
    id: 1,

    chucVu: "Frontend Developer",

    capBac: "Senior",

    phongBan: "CNTT",

    nhanSu: 12,

    luongTB: "28.000.000",

    nangLuc: 92,

    moTa:
      "Phát triển giao diện hệ thống",

    kyNang: [
      "ReactJS",

      "TypeScript",

      "UI/UX",
    ],
  },

  {
    id: 2,

    chucVu: "HR Executive",

    capBac: "Middle",

    phongBan: "Nhân sự",

    nhanSu: 8,

    luongTB: "18.000.000",

    nangLuc: 84,

    moTa:
      "Quản lý hồ sơ và tuyển dụng",

    kyNang: [
      "Tuyển dụng",

      "Excel",

      "Giao tiếp",
    ],
  },

  {
    id: 3,

    chucVu: "Kế toán tổng hợp",

    capBac: "Junior",

    phongBan: "Kế toán",

    nhanSu: 6,

    luongTB: "14.000.000",

    nangLuc: 76,

    moTa:
      "Quản lý dữ liệu tài chính",

    kyNang: [
      "Excel",

      "ERP",

      "Báo cáo",
    ],
  },
];

const ChucVuCapBacHR = () => {
  const { isDark } = useTheme();

  const [search, setSearch] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedRole, setSelectedRole] =
    useState<any>(null);

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

  const filteredData = useMemo(() => {
    return roleData.filter(
      (item) =>
        item.chucVu
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }, [search]);

  const columns = [
    {
      title: "Chức vụ",

      dataIndex: "chucVu",

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
                "linear-gradient(135deg,#2563eb,#7c3aed)",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              color: "#fff",

              fontSize: 22,
            }}
          >
            <CrownOutlined />
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
              {value}
            </Text>

            <Text
              style={{
                color:
                  subText,
              }}
            >
              {record.moTa}
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title: "Cấp bậc",

      dataIndex: "capBac",

      render: (
        value: string
      ) => (
        <Tag
          color={
            value ===
            "Senior"
              ? "purple"
              : value ===
                "Middle"
              ? "blue"
              : "green"
          }
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
      title: "Phòng ban",

      dataIndex: "phongBan",

      render: (
        value: string
      ) => (
        <Space>
          <BankOutlined
            style={{
              color:
                "#2563eb",
            }}
          />

          <Text
            style={{
              color:
                textColor,
            }}
          >
            {value}
          </Text>
        </Space>
      ),
    },

    {
      title: "Nhân sự",

      dataIndex: "nhanSu",

      render: (
        value: number
      ) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,

            padding:
              "4px 14px",
          }}
        >
          {value} nhân sự
        </Tag>
      ),
    },

    {
      title: "Năng lực",

      dataIndex: "nangLuc",

      render: (
        value: number
      ) => (
        <div
          style={{
            width: 160,
          }}
        >
          <Progress
            percent={value}
            size="small"
            strokeColor={{
              "0%": "#60a5fa",

              "100%":
                "#7c3aed",
            }}
          />
        </div>
      ),
    },

    {
      title: "",

      render: (
        _: any,
        record: any
      ) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          style={{
            height: 42,

            borderRadius: 14,

            fontWeight: 600,
          }}
          onClick={() => {
            setSelectedRole(
              record
            );

            setOpenModal(
              true
            );
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          bgColor,

        padding: 24,
      }}
    >
      {/* HEADER */}

      <Card
        style={{
          borderRadius: 32,

          overflow: "hidden",

          border: `1px solid ${borderColor}`,

          background:
            cardColor,

          position:
            "relative",

          marginBottom: 24,
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div
          style={{
            position:
              "absolute",

            inset: 0,

            background:
              isDark
                ? `
                radial-gradient(circle at top right, rgba(124,58,237,0.18), transparent 28%),
                radial-gradient(circle at bottom left, rgba(37,99,235,0.14), transparent 24%)
              `
                : `
                radial-gradient(circle at top right, rgba(124,58,237,0.10), transparent 28%),
                radial-gradient(circle at bottom left, rgba(37,99,235,0.08), transparent 24%)
              `,
          }}
        />

        <div
          style={{
            position:
              "relative",

            zIndex: 2,

            padding: 34,
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            gutter={[24, 24]}
          >
            <Col flex="auto">
              <Space
                size={20}
                align="start"
              >
                <div
                  style={{
                    width: 86,

                    height: 86,

                    borderRadius: 28,

                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    color:
                      "#fff",

                    fontSize: 36,

                    boxShadow:
                      "0 12px 30px rgba(37,99,235,0.25)",
                  }}
                >
                  <SafetyCertificateOutlined />
                </div>

                <Space
                  direction="vertical"
                  size={10}
                >
                  <div>
                    <Title
                      level={2}
                      style={{
                        margin: 0,

                        color:
                          textColor,
                      }}
                    >
                      Chức vụ & Cấp bậc
                    </Title>

                    <Text
                      style={{
                        color:
                          subText,

                        fontSize: 15,
                      }}
                    >
                      Quản lý vị trí,
                      năng lực và cơ cấu
                      cấp bậc nhân sự
                    </Text>
                  </div>

                  <Space wrap>
                    <Tag
                      color="blue"
                      style={{
                        borderRadius: 999,

                        padding:
                          "6px 14px",

                        fontWeight: 600,
                      }}
                    >
                      18 chức vụ
                    </Tag>

                    <Tag
                      color="purple"
                      style={{
                        borderRadius: 999,

                        padding:
                          "6px 14px",

                        fontWeight: 600,
                      }}
                    >
                      5 cấp bậc
                    </Tag>

                    <Tag
                      color="green"
                      style={{
                        borderRadius: 999,

                        padding:
                          "6px 14px",

                        fontWeight: 600,
                      }}
                    >
                      146 nhân sự
                    </Tag>
                  </Space>
                </Space>
              </Space>
            </Col>

            <Col>
              <Row gutter={[16, 16]}>
                {[
                  {
                    title:
                      "Chức vụ đang hoạt động",

                    value: "18",
                  },

                  {
                    title:
                      "Cấp bậc cao nhất",

                    value:
                      "Senior",
                  },

                  {
                    title:
                      "Hiệu suất TB",

                    value: "84%",
                  },
                ].map(
                  (
                    item,
                    index
                  ) => (
                    <Col key={index}>
                      <div
                        style={{
                          minWidth:
                            170,

                          padding:
                            "18px 20px",

                          borderRadius: 24,

                          background:
                            isDark
                              ? "rgba(15,23,42,0.72)"
                              : "rgba(255,255,255,0.72)",

                          border: `1px solid ${borderColor}`,

                          backdropFilter:
                            "blur(12px)",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              subText,

                            fontSize: 13,
                          }}
                        >
                          {
                            item.title
                          }
                        </Text>

                        <Title
                          level={3}
                          style={{
                            margin:
                              "8px 0 0",

                            color:
                              textColor,
                          }}
                        >
                          {
                            item.value
                          }
                        </Title>
                      </div>
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </Card>

      {/* OVERVIEW */}

      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
        }}
      >
        {[
          {
            title:
              "Chức vụ phổ biến",

            value:
              "Frontend Developer",

            color:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
          },

          {
            title:
              "Cấp bậc cao nhất",

            value:
              "Senior Level",

            color:
              "linear-gradient(135deg,#10b981,#06b6d4)",
          },

          {
            title:
              "Nhóm năng lực mạnh",

            value:
              "Khối CNTT",

            color:
              "linear-gradient(135deg,#f59e0b,#f97316)",
          },
        ].map(
          (
            item,
            index
          ) => (
            <Col
              xs={24}
              md={8}
              key={index}
            >
              <div
                style={{
                  padding:
                    "18px 20px",

                  borderRadius: 24,

                  background:
                    item.color,

                  color: "#fff",
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.82)",

                    fontSize: 13,
                  }}
                >
                  {item.title}
                </Text>

                <Title
                  level={4}
                  style={{
                    margin:
                      "8px 0 0",

                    color: "#fff",
                  }}
                >
                  {item.value}
                </Title>
              </div>
            </Col>
          )
        )}
      </Row>

      {/* TABLE */}

      <Card
        style={{
          borderRadius: 32,

          background:
            cardColor,

          border: `1px solid ${borderColor}`,
        }}
        bodyStyle={{
          padding: 26,
        }}
      >
        <Space
          direction="vertical"
          size={24}
          style={{
            width: "100%",
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            gutter={[16, 16]}
          >
            <Col flex="auto">
              <Space
                direction="vertical"
                size={0}
              >
                <Title
                  level={4}
                  style={{
                    margin: 0,

                    color:
                      textColor,
                  }}
                >
                  Danh sách chức vụ
                </Title>

                <Text
                  style={{
                    color:
                      subText,
                  }}
                >
                  Theo dõi vị trí và
                  cấp bậc nhân sự
                </Text>
              </Space>
            </Col>

            <Col>
              <Space wrap>
                <Input
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tìm chức vụ..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target
                        .value
                    )
                  }
                  style={{
                    width: 260,

                    height: 46,

                    borderRadius: 16,
                  }}
                />

                <Select
                  placeholder="Cấp bậc"
                  style={{
                    width: 180,

                    height: 46,
                  }}
                  options={[
                    {
                      label:
                        "Senior",

                      value:
                        "Senior",
                    },

                    {
                      label:
                        "Middle",

                      value:
                        "Middle",
                    },

                    {
                      label:
                        "Junior",

                      value:
                        "Junior",
                    },
                  ]}
                />
              </Space>
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
            locale={{
              emptyText: (
                <Empty description="Không có dữ liệu chức vụ" />
              ),
            }}
          />
        </Space>
      </Card>

      {/* MODAL */}

      <Modal
        open={openModal}
        footer={null}
        centered
        closable={false}
        width={1000}
        zIndex={99999}
        onCancel={() =>
          setOpenModal(false)
        }
        styles={{
          mask: {
            backdropFilter:
              "blur(12px)",

            background:
              "rgba(15,23,42,0.52)",
          },

          root: {
            padding: 0,

            borderRadius: 32,

            overflow:
              "hidden",

            background:
              "transparent",
          },

          body: {
            padding: 0,
          },
        }}
      >
        <div
          style={{
            background:
              isDark
                ? "#0f172a"
                : "#ffffff",

            borderRadius: 32,

            overflow:
              "hidden",
          }}
        >
          {/* HEADER */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",

              padding:
                "32px 36px",

              position:
                "relative",
            }}
          >
            <Button
              type="text"
              icon={
                <CloseOutlined />
              }
              onClick={() =>
                setOpenModal(false)
              }
              style={{
                position:
                  "absolute",

                top: 20,

                right: 20,

                width: 46,

                height: 46,

                borderRadius: 18,

                background:
                  "rgba(255,255,255,0.12)",

                color:
                  "#fff",
              }}
            />

            <Space
              direction="vertical"
              size={4}
            >
              <Tag
                color="blue"
                style={{
                  width:
                    "fit-content",

                  borderRadius: 999,

                  padding:
                    "4px 14px",

                  fontWeight: 700,
                }}
              >
                {
                  selectedRole?.capBac
                }
              </Tag>

              <Title
                level={2}
                style={{
                  margin: 0,

                  color:
                    "#fff",
                }}
              >
                {
                  selectedRole?.chucVu
                }
              </Title>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.82)",
                }}
              >
                Chi tiết chức vụ và
                yêu cầu năng lực
              </Text>
            </Space>
          </div>

          {/* BODY */}

          <div
            style={{
              padding: 28,

              maxHeight:
                "76vh",

              overflowY:
                "auto",
            }}
          >
            <Row gutter={[20, 20]}>
              {/* LEFT */}

              <Col
                xs={24}
                xl={15}
              >
                <Space
                  direction="vertical"
                  size={20}
                  style={{
                    width:
                      "100%",
                  }}
                >
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
                      size={16}
                    >
                      <Avatar
                        size={74}
                        style={{
                          background:
                            "linear-gradient(135deg,#2563eb,#7c3aed)",

                          fontSize: 28,
                        }}
                      >
                        <UserOutlined />
                      </Avatar>

                      <Space
                        direction="vertical"
                        size={2}
                      >
                        <Text
                          style={{
                            color:
                              subText,
                          }}
                        >
                          Chức vụ
                        </Text>

                        <Title
                          level={4}
                          style={{
                            margin: 0,

                            color:
                              textColor,
                          }}
                        >
                          {
                            selectedRole?.chucVu
                          }
                        </Title>

                        <Space>
                          <BankOutlined
                            style={{
                              color:
                                "#2563eb",
                            }}
                          />

                          <Text
                            style={{
                              color:
                                textColor,
                            }}
                          >
                            {
                              selectedRole?.phongBan
                            }
                          </Text>
                        </Space>

                        <Space>
                          <TeamOutlined
                            style={{
                              color:
                                "#2563eb",
                            }}
                          />

                          <Text
                            style={{
                              color:
                                textColor,
                            }}
                          >
                            {
                              selectedRole?.nhanSu
                            }{" "}
                            nhân sự
                          </Text>
                        </Space>
                      </Space>
                    </Space>
                  </Card>

                  {/* SKILL */}

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
                        width:
                          "100%",
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
                          Kỹ năng yêu cầu
                        </Title>

                        <Text
                          style={{
                            color:
                              subText,
                          }}
                        >
                          Các kỹ năng cần
                          có cho vị trí
                        </Text>
                      </div>

                      <Space wrap>
                        {selectedRole?.kyNang?.map(
                          (
                            skill: string,
                            index: number
                          ) => (
                            <Tag
                              key={
                                index
                              }
                              color="blue"
                              style={{
                                borderRadius: 999,

                                padding:
                                  "8px 16px",

                                fontSize: 14,
                              }}
                            >
                              {
                                skill
                              }
                            </Tag>
                          )
                        )}
                      </Space>
                    </Space>
                  </Card>
                </Space>
              </Col>

              {/* RIGHT */}

              <Col
                xs={24}
                xl={9}
              >
                <Space
                  direction="vertical"
                  size={20}
                  style={{
                    width:
                      "100%",
                  }}
                >
                  {/* KPI */}

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
                        width:
                          "100%",
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
                          Năng lực trung bình
                        </Title>

                        <Text
                          style={{
                            color:
                              subText,
                          }}
                        >
                          Hiệu suất nhân
                          sự vị trí này
                        </Text>
                      </div>

                      <div
                        style={{
                          display:
                            "flex",

                          justifyContent:
                            "center",
                        }}
                      >
                        <Progress
                          type="dashboard"
                          percent={
                            selectedRole?.nangLuc
                          }
                          size={220}
                          strokeColor={{
                            "0%":
                              "#60a5fa",

                            "100%":
                              "#7c3aed",
                          }}
                        />
                      </div>
                    </Space>
                  </Card>

                  {/* SALARY */}

                  <Card
                    style={{
                      borderRadius: 24,

                      background:
                        "linear-gradient(135deg,#10b981,#06b6d4)",

                      border:
                        "none",
                    }}
                  >
                    <Space
                      direction="vertical"
                      size={12}
                    >
                      <div
                        style={{
                          width: 64,

                          height: 64,

                          borderRadius: 20,

                          background:
                            "rgba(255,255,255,0.16)",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          fontSize: 30,

                          color:
                            "#fff",
                        }}
                      >
                        <ArrowUpOutlined />
                      </div>

                      <div>
                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.82)",
                          }}
                        >
                          Lương trung bình
                        </Text>

                        <Title
                          level={3}
                          style={{
                            margin:
                              "6px 0 0",

                            color:
                              "#fff",
                          }}
                        >
                          {
                            selectedRole?.luongTB
                          }{" "}
                          VNĐ
                        </Title>
                      </div>
                    </Space>
                  </Card>
                </Space>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChucVuCapBacHR;