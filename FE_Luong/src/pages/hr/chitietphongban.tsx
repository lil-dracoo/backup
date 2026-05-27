import {
  ApartmentOutlined,
  BankOutlined,
  CloseOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  TrophyOutlined,
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

const { Title, Text } = Typography;

const departments = [
  {
    id: 1,

    tenPhong: "Phòng Công nghệ thông tin",

    maPhong: "CNTT",

    truongPhong: "Nguyễn Văn Hưng",

    nhanVien: 28,

    email: "cntt@company.com",

    sdt: "028 9999 8888",

    hieuSuat: 92,

    kpi: "Xuất sắc",

    giaiThuong:
      "Phòng ban xuất sắc quý II",

    members: [
      "Nguyễn Hoàng An",

      "Lê Minh Khang",

      "Trần Quốc Bảo",

      "Phạm Thành Đạt",

      "Đỗ Hữu Nghĩa",

      "Nguyễn Minh Nhật",
    ],
  },

  {
    id: 2,

    tenPhong: "Phòng Nhân sự",

    maPhong: "HR",

    truongPhong: "Trần Minh Anh",

    nhanVien: 12,

    email: "hr@company.com",

    sdt: "028 2222 8888",

    hieuSuat: 84,

    kpi: "Tốt",

    giaiThuong:
      "Đào tạo nhân sự tốt nhất",

    members: [
      "Nguyễn Minh Huy",

      "Lý Gia Hân",

      "Đặng Bảo Trâm",

      "Phạm Tuấn Kiệt",
    ],
  },

  {
    id: 3,

    tenPhong: "Phòng Kế toán",

    maPhong: "KT",

    truongPhong: "Lê Quốc Bảo",

    nhanVien: 16,

    email: "kt@company.com",

    sdt: "028 7777 8888",

    hieuSuat: 76,

    kpi: "Khá",

    giaiThuong:
      "Quản lý ngân sách hiệu quả",

    members: [
      "Nguyễn Hải Nam",

      "Trần Bảo Ngọc",

      "Lê Thanh Huyền",
    ],
  },
];

const QuanLyPhongBanHR = () => {
  const { isDark } = useTheme();

  const [search, setSearch] =
    useState("");

  const [managerSearch,] =
    useState("");

  const [performanceFilter, setPerformanceFilter] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedDepartment, setSelectedDepartment] =
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
    return departments.filter(
      (item) => {
        const matchDepartment =
          item.tenPhong
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchManager =
          item.truongPhong
            .toLowerCase()
            .includes(
              managerSearch.toLowerCase()
            );

        const matchPerformance =
          performanceFilter === ""
            ? true
            : item.kpi ===
              performanceFilter;

        return (
          matchDepartment &&
          matchManager &&
          matchPerformance
        );
      }
    );
  }, [
    search,
    managerSearch,
    performanceFilter,
  ]);

  const columns = [
    {
      title: "Phòng ban",

      dataIndex: "tenPhong",

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

              color: "#2563eb",

              fontSize: 22,
            }}
          >
            <BankOutlined />
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

                fontSize: 13,
              }}
            >
              {record.maPhong}
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title: "Trưởng phòng",

      dataIndex: "truongPhong",

      render: (
        value: string
      ) => (
        <Space size={12}>
          <Avatar
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
            }}
          >
            {value.charAt(0)}
          </Avatar>

          <Text
            style={{
              color:
                textColor,

              fontWeight: 600,
            }}
          >
            {value}
          </Text>
        </Space>
      ),
    },

    {
      title: "Nhân sự",

      dataIndex: "nhanVien",

      render: (
        value: number
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
          {value} nhân viên
        </Tag>
      ),
    },

    {
      title: "Hiệu suất",

      dataIndex: "hieuSuat",

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
      title: "Đánh giá",

      dataIndex: "kpi",

      render: (
        value: string
      ) => (
        <Tag
          color={
            value ===
            "Xuất sắc"
              ? "green"
              : value ===
                "Tốt"
              ? "blue"
              : "orange"
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
            setSelectedDepartment(
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

          marginBottom: 24,

          overflow: "hidden",

          border: `1px solid ${borderColor}`,

          background:
            cardColor,

          position:
            "relative",
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
            gutter={[24, 24]}
            justify="space-between"
            align="middle"
          >
            <Col flex="auto">
              <Space
                size={20}
                align="start"
              >
                <div
                  style={{
                    width: 84,

                    height: 84,

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

                    fontSize: 34,

                    boxShadow:
                      "0 12px 30px rgba(37,99,235,0.28)",
                  }}
                >
                  <ApartmentOutlined />
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
                      Quản lý phòng ban
                    </Title>

                    <Text
                      style={{
                        color:
                          subText,

                        fontSize: 15,
                      }}
                    >
                      Theo dõi cơ cấu
                      tổ chức và hiệu
                      suất phòng ban
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
                      12 phòng ban
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
                      146 nhân sự
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
                      KPI ổn định
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
                      "Tổng phòng ban",

                    value: "12",
                  },

                  {
                    title:
                      "Tổng nhân sự",

                    value: "146",
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
                    <Col
                      key={index}
                    >
                      <div
                        style={{
                          minWidth:
                            150,

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
              "Phòng hiệu suất cao",

            value:
              "CNTT",

            color:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
          },

          {
            title:
              "Nhiều nhân sự nhất",

            value:
              "28 nhân viên",

            color:
              "linear-gradient(135deg,#10b981,#06b6d4)",
          },

          {
            title:
              "Đạt thưởng quý",

            value:
              "03 phòng ban",

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

                  color:
                    "#fff",
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

                    color:
                      "#fff",
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
                  Danh sách phòng ban
                </Title>

                <Text
                  style={{
                    color:
                      subText,
                  }}
                >
                  Theo dõi thông tin
                  và hiệu suất phòng
                  ban
                </Text>
              </Space>
            </Col>

            <Col>
              <Space wrap>
                <Input
                  prefix={
                    <SearchOutlined />
                  }
                  placeholder="Tìm phòng ban..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target
                        .value
                    )
                  }
                  style={{
                    width: 240,

                    height: 46,

                    borderRadius: 16,
                  }}
                />
                <Select
                  placeholder="Hiệu suất"
                  style={{
                    width: 180,

                    height: 46,
                  }}
                  onChange={(
                    value
                  ) =>
                    setPerformanceFilter(
                      value
                    )
                  }
                  allowClear
                  options={[
                    {
                      label:
                        "Xuất sắc",

                      value:
                        "Xuất sắc",
                    },

                    {
                      label:
                        "Tốt",

                      value:
                        "Tốt",
                    },

                    {
                      label:
                        "Khá",

                      value:
                        "Khá",
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
                <Empty description="Không có dữ liệu phòng ban" />
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
        onCancel={() =>
          setOpenModal(false)
        }
        closable={false}
        width={1000}
        zIndex={99999}
        styles={{
          mask: {
            backdropFilter:
              "blur(12px)",

            background:
              "rgba(15,23,42,0.52)",
          },

          root: {
            padding: 0,

            overflow:
              "hidden",

            borderRadius: 32,

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
          {/* MODAL HEADER */}

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
                  selectedDepartment?.maPhong
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
                  selectedDepartment?.tenPhong
                }
              </Title>

              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.82)",
                }}
              >
                Tổng quan phòng ban
                doanh nghiệp
              </Text>
            </Space>
          </div>

          {/* MODAL BODY */}

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
                  {/* MANAGER */}

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
                        size={70}
                        style={{
                          background:
                            "linear-gradient(135deg,#2563eb,#7c3aed)",

                          fontSize: 24,

                          fontWeight: 700,
                        }}
                      >
                        {selectedDepartment?.truongPhong?.charAt(
                          0
                        )}
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
                          Trưởng phòng
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
                            selectedDepartment?.truongPhong
                          }
                        </Title>

                        <Space>
                          <MailOutlined
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
                              selectedDepartment?.email
                            }
                          </Text>
                        </Space>

                        <Space>
                          <PhoneOutlined
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
                              selectedDepartment?.sdt
                            }
                          </Text>
                        </Space>
                      </Space>
                    </Space>
                  </Card>

                  {/* MEMBERS */}

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
                      <Row
                        justify="space-between"
                        align="middle"
                      >
                        <Col>
                          <div>
                            <Title
                              level={4}
                              style={{
                                marginBottom: 4,

                                color:
                                  textColor,
                              }}
                            >
                              Danh sách nhân viên
                            </Title>

                            <Text
                              style={{
                                color:
                                  subText,
                              }}
                            >
                              Nhân sự thuộc
                              phòng ban
                            </Text>
                          </div>
                        </Col>

                        <Col>
                          <Input
                            prefix={
                              <SearchOutlined />
                            }
                            placeholder="Tìm nhân viên..."
                            style={{
                              width: 240,

                              height: 42,

                              borderRadius: 14,
                            }}
                          />
                        </Col>
                      </Row>

                      {selectedDepartment?.members?.map(
                        (
                          member: string,
                          index: number
                        ) => (
                          <div
                            key={
                              index
                            }
                            style={{
                              display:
                                "flex",

                              justifyContent:
                                "space-between",

                              alignItems:
                                "center",

                              padding:
                                "14px 16px",

                              borderRadius: 18,

                              background:
                                isDark
                                  ? "#0b1220"
                                  : "#ffffff",

                              border: `1px solid ${borderColor}`,
                            }}
                          >
                            <Space
                              size={14}
                            >
                              <Avatar
                                style={{
                                  background:
                                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                                }}
                              >
                                {member.charAt(
                                  0
                                )}
                              </Avatar>

                              <Text
                                style={{
                                  color:
                                    textColor,

                                  fontWeight: 600,
                                }}
                              >
                                {
                                  member
                                }
                              </Text>
                            </Space>

                            <Tag
                              color="blue"
                              style={{
                                borderRadius: 999,
                              }}
                            >
                              Active
                            </Tag>
                          </div>
                        )
                      )}
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
                          Hiệu suất KPI
                        </Title>

                        <Text
                          style={{
                            color:
                              subText,
                          }}
                        >
                          Đánh giá hoạt
                          động phòng ban
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
                            selectedDepartment?.hieuSuat
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

                      <Tag
                        color="green"
                        style={{
                          width:
                            "100%",

                          textAlign:
                            "center",

                          borderRadius: 16,

                          padding:
                            "10px 14px",

                          fontWeight: 700,

                          fontSize: 14,
                        }}
                      >
                        KPI:{" "}
                        {
                          selectedDepartment?.kpi
                        }
                      </Tag>
                    </Space>
                  </Card>

                  {/* AWARD */}

                  <Card
                    style={{
                      borderRadius: 24,

                      background:
                        "linear-gradient(135deg,#f59e0b,#f97316)",

                      border:
                        "none",
                    }}
                  >
                    <Space
                      direction="vertical"
                      size={14}
                      style={{
                        width:
                          "100%",
                      }}
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
                        <TrophyOutlined />
                      </div>

                      <div>
                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.82)",
                          }}
                        >
                          Giải thưởng
                        </Text>

                        <Title
                          level={4}
                          style={{
                            margin:
                              "6px 0 0",

                            color:
                              "#fff",
                          }}
                        >
                          {
                            selectedDepartment?.giaiThuong
                          }
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

export default QuanLyPhongBanHR;