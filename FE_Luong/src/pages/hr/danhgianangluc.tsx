import {
  FileDoneOutlined,
  PercentageOutlined,
  SaveOutlined,
  SearchOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Input,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  Slider,
  Statistic,
  message,
} from "antd";

import { useMemo, useState } from "react";

import { useTheme } from "../../context/themecontext";

const { Title, Text } = Typography;

const employees = [
  {
    id: 1,

    maNV: "NV001",

    hoTen: "Nguyễn Minh Anh",

    phongBan: "Công nghệ",

    chucVu: "Frontend Developer",

    avatar: "N",
  },

  {
    id: 2,

    maNV: "NV002",

    hoTen: "Trần Gia Huy",

    phongBan: "Nhân sự",

    chucVu: "HR Executive",

    avatar: "T",
  },

  {
    id: 3,

    maNV: "NV003",

    hoTen: "Lê Khánh Vy",

    phongBan: "Kế toán",

    chucVu: "Accountant",

    avatar: "L",
  },
];

const competencyGroups = [
  {
    title:
      "Năng lực chuyên môn",

    weight: 40,

    items: [
      {
        label:
          "Kiến thức chuyên môn",

        key: "knowledge",
      },

      {
        label:
          "Khả năng xử lý công việc",

        key: "problemSolving",
      },

      {
        label:
          "Hiệu suất công việc",

        key: "performance",
      },
    ],
  },

  {
    title:
      "Kỹ năng mềm",

    weight: 30,

    items: [
      {
        label:
          "Giao tiếp",

        key: "communication",
      },

      {
        label:
          "Làm việc nhóm",

        key: "teamwork",
      },

      {
        label:
          "Quản lý thời gian",

        key: "timeManagement",
      },
    ],
  },

  {
    title:
      "Thái độ & phát triển",

    weight: 30,

    items: [
      {
        label:
          "Tinh thần trách nhiệm",

        key: "responsibility",
      },

      {
        label:
          "Chủ động học hỏi",

        key: "learning",
      },

      {
        label:
          "Kỷ luật",

        key: "discipline",
      },
    ],
  },
];

export default function DanhGiaP2HR() {
  const { isDark } = useTheme();

  const [search, setSearch] =
    useState("");

  const [selectedEmployee, setSelectedEmployee] =
    useState<any>(
      employees[0]
    );

  const [scores, setScores] =
    useState<any>({
      knowledge: 80,

      problemSolving: 75,

      performance: 90,

      communication: 85,

      teamwork: 90,

      timeManagement: 70,

      responsibility: 95,

      learning: 88,

      discipline: 92,
    });

  const textColor = isDark
    ? "#f8fafc"
    : "#0f172a";

  const subText = isDark
    ? "#94a3b8"
    : "#64748b";

  const cardColor = isDark
    ? "#0f172a"
    : "#ffffff";

  const borderColor = isDark
    ? "rgba(148,163,184,0.12)"
    : "#e2e8f0";

  const bgColor = isDark
    ? "#020617"
    : "#f8fafc";

  const filteredEmployees =
    useMemo(() => {
      return employees.filter(
        (item) =>
          item.hoTen
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.maNV
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search]);

  const calculateGroupScore =
    (group: any) => {
      const total =
        group.items.reduce(
          (
            sum: number,
            item: any
          ) =>
            sum +
            scores[item.key],
          0
        );

      return Math.round(
        total /
          group.items.length
      );
    };

  const calculateFinalP2 =
    () => {
      let total = 0;

      competencyGroups.forEach(
        (group) => {
          total +=
            calculateGroupScore(
              group
            ) *
            (group.weight /
              100);
        }
      );

      return (
        total / 20
      ).toFixed(2);
    };

  const columns = [
    {
      title: "Nhân viên",

      render: (
        _: any,
        record: any
      ) => (
        <div
          style={{
            minWidth: 220,
          }}
        >
          <Space size={14}>
            <Avatar
              size={50}
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",

                fontWeight: 700,
              }}
            >
              {
                record.avatar
              }
            </Avatar>

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
                {
                  record.hoTen
                }
              </Text>

              <Text
                style={{
                  color:
                    subText,
                }}
              >
                {record.maNV}
              </Text>
            </Space>
          </Space>
        </div>
      ),
    },

    {
      title: "Phòng ban",

      dataIndex:
        "phongBan",

      render: (
        value: string
      ) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,
          }}
        >
          {value}
        </Tag>
      ),
    },

    {
      title: "Chức vụ",

      dataIndex:
        "chucVu",

      render: (
        value: string
      ) => (
        <Text
          style={{
            color:
              textColor,
          }}
        >
          {value}
        </Text>
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
          borderRadius: 34,

          overflow:
            "hidden",

          border: `1px solid ${borderColor}`,

          background:
            cardColor,

          marginBottom: 24,
        }}
        bodyStyle={{
          padding: 34,
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          gutter={[20, 20]}
        >
          <Col flex="auto">
            <Space
              size={18}
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

                  fontSize: 38,
                }}
              >
                <TrophyOutlined />
              </div>

              <Space
                direction="vertical"
                size={8}
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
                    Đánh giá năng lực P2
                  </Title>

                  <Text
                    style={{
                      color:
                        subText,

                      fontSize: 15,
                    }}
                  >
                    HR đánh giá năng lực theo nhóm tiêu chí
                    để tính hệ số lương P2
                  </Text>
                </div>

                <Space wrap>
                  <Tag
                    color="blue"
                    style={{
                      borderRadius: 999,
                    }}
                  >
                    146 nhân viên
                  </Tag>

                  <Tag
                    color="green"
                    style={{
                      borderRadius: 999,
                    }}
                  >
                    Đánh giá theo %
                  </Tag>

                  <Tag
                    color="purple"
                    style={{
                      borderRadius: 999,
                    }}
                  >
                    Tính tự động P2
                  </Tag>
                </Space>
              </Space>
            </Space>
          </Col>

          <Col>
            <Card
              style={{
                borderRadius: 24,

                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",

                border:
                  "none",
              }}
            >
              <Statistic
                title={
                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.82)",
                    }}
                  >
                    Hệ số P2
                  </Text>
                }
                value={
                  calculateFinalP2()
                }
                prefix={
                  <PercentageOutlined />
                }
                valueStyle={{
                  color:
                    "#fff",

                  fontWeight: 700,
                }}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* CONTENT */}

      <Row gutter={[20, 20]}>
        {/* LEFT */}

        <Col
          xs={24}
          lg={24}
          xl={8}
        >
          <Card
            style={{
              borderRadius: 30,

              border: `1px solid ${borderColor}`,

              background:
                cardColor,
            }}
            bodyStyle={{
              padding: 22,
            }}
          >
            <Space
              direction="vertical"
              size={18}
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
                  Nhân viên
                </Title>

                <Text
                  style={{
                    color:
                      subText,
                  }}
                >
                  Chọn nhân viên để đánh giá
                </Text>
              </div>

              <Input
                prefix={
                  <SearchOutlined />
                }
                placeholder="Tìm nhân viên..."
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
                  height: 46,

                  borderRadius: 16,
                }}
              />

              <div
                style={{
                  overflowX:
                    "auto",
                }}
              >
                <Table
                  columns={
                    columns
                  }
                  dataSource={
                    filteredEmployees
                  }
                  rowKey="id"
                  pagination={{
                    pageSize: 5,
                  }}
                  scroll={{
                    x: 700,
                  }}
                  onRow={(
                    record
                  ) => ({
                    onClick:
                      () =>
                        setSelectedEmployee(
                          record
                        ),

                    style: {
                      cursor:
                        "pointer",

                      background:
                        selectedEmployee?.id ===
                        record.id
                          ? isDark
                            ? "rgba(37,99,235,0.10)"
                            : "#eff6ff"
                          : "",
                    },
                  })}
                />
              </div>
            </Space>
          </Card>
        </Col>

        {/* RIGHT */}

        <Col
          xs={24}
          lg={24}
          xl={16}
        >
          <Space
            direction="vertical"
            size={20}
            style={{
              width: "100%",
            }}
          >
            {/* EMPLOYEE */}

            <Card
              style={{
                borderRadius: 30,

                border: `1px solid ${borderColor}`,

                background:
                  cardColor,
              }}
              bodyStyle={{
                padding: 26,
              }}
            >
              <Row
                justify="space-between"
                align="middle"
                gutter={[20, 20]}
              >
                <Col flex="auto">
                  <Space
                    size={18}
                  >
                    <Avatar
                      size={76}
                      style={{
                        background:
                          "linear-gradient(135deg,#2563eb,#7c3aed)",

                        fontSize: 28,

                        fontWeight: 700,
                      }}
                    >
                      {
                        selectedEmployee?.avatar
                      }
                    </Avatar>

                    <Space
                      direction="vertical"
                      size={2}
                    >
                      <Title
                        level={3}
                        style={{
                          margin: 0,

                          color:
                            textColor,
                        }}
                      >
                        {
                          selectedEmployee?.hoTen
                        }
                      </Title>

                      <Text
                        style={{
                          color:
                            subText,
                        }}
                      >
                        {
                          selectedEmployee?.maNV
                        }{" "}
                        •{" "}
                        {
                          selectedEmployee?.phongBan
                        }
                      </Text>

                      <Tag
                        color="blue"
                        style={{
                          borderRadius: 999,

                          width:
                            "fit-content",
                        }}
                      >
                        {
                          selectedEmployee?.chucVu
                        }
                      </Tag>
                    </Space>
                  </Space>
                </Col>

                <Col>
                  <Progress
                    type="dashboard"
                    percent={
                      Number(
                        calculateFinalP2()
                      ) * 20
                    }
                    size={170}
                    strokeColor={{
                      "0%":
                        "#60a5fa",

                      "100%":
                        "#7c3aed",
                    }}
                    format={() => (
                      <Space
                        direction="vertical"
                        size={0}
                      >
                        <Title
                          level={3}
                          style={{
                            margin: 0,

                            color:
                              textColor,
                          }}
                        >
                          {calculateFinalP2()}
                        </Title>

                        <Text
                          style={{
                            color:
                              subText,
                          }}
                        >
                          Hệ số P2
                        </Text>
                      </Space>
                    )}
                  />
                </Col>
              </Row>
            </Card>

            {/* GROUPS */}

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
                    Nhóm tiêu chí đánh giá
                  </Title>

                  <Text
                    style={{
                      color:
                        subText,
                    }}
                  >
                    HR đánh giá từng mục theo %
                  </Text>
                </div>

                <Collapse
                  ghost
                  size="large"
                  items={competencyGroups.map(
                    (
                      group,
                      index
                    ) => ({
                      key:
                        index,

                      label: (
                        <Row
                          justify="space-between"
                          align="middle"
                          style={{
                            width:
                              "100%",
                          }}
                        >
                          <Col>
                            <Space
                              direction="vertical"
                              size={0}
                            >
                              <Text
                                style={{
                                  color:
                                    textColor,

                                  fontWeight: 700,

                                  fontSize: 16,
                                }}
                              >
                                {
                                  group.title
                                }
                              </Text>

                              <Text
                                style={{
                                  color:
                                    subText,
                                }}
                              >
                                Trọng số{" "}
                                {
                                  group.weight
                                }
                                %
                              </Text>
                            </Space>
                          </Col>

                          <Col>
                            <Tag
                              color="purple"
                              style={{
                                borderRadius: 999,
                              }}
                            >
                              {calculateGroupScore(
                                group
                              )}
                              %
                            </Tag>
                          </Col>
                        </Row>
                      ),

                      children: (
                        <Space
                          direction="vertical"
                          size={24}
                          style={{
                            width:
                              "100%",
                          }}
                        >
                          {group.items.map(
                            (
                              item,
                              idx
                            ) => (
                              <div
                                key={
                                  idx
                                }
                              >
                                <Row
                                  justify="space-between"
                                  align="middle"
                                  gutter={[
                                    20,
                                    20,
                                  ]}
                                >
                                  <Col
                                    xs={
                                      24
                                    }
                                    md={
                                      10
                                    }
                                  >
                                    <Text
                                      style={{
                                        color:
                                          textColor,

                                        fontWeight: 600,
                                      }}
                                    >
                                      {
                                        item.label
                                      }
                                    </Text>
                                  </Col>

                                  <Col
                                    xs={
                                      24
                                    }
                                    md={
                                      14
                                    }
                                  >
                                    <Row
                                      gutter={[
                                        14,
                                        14,
                                      ]}
                                      align="middle"
                                    >
                                      <Col flex="auto">
                                        <Slider
                                          min={
                                            0
                                          }
                                          max={
                                            100
                                          }
                                          value={
                                            scores[
                                              item
                                                .key
                                            ]
                                          }
                                          onChange={(
                                            value
                                          ) =>
                                            setScores(
                                              {
                                                ...scores,

                                                [
                                                  item
                                                    .key
                                                ]:
                                                  value,
                                              }
                                            )
                                          }
                                        />
                                      </Col>

                                      <Col>
                                        <Tag
                                          color="blue"
                                          style={{
                                            borderRadius: 999,

                                            minWidth: 70,

                                            textAlign:
                                              "center",
                                          }}
                                        >
                                          {
                                            scores[
                                              item
                                                .key
                                            ]
                                          }
                                          %
                                        </Tag>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>

                                <Divider />
                              </div>
                            )
                          )}
                        </Space>
                      ),
                    })
                  )}
                />
              </Space>
            </Card>

            {/* ACTION */}

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
              <Row
                justify="space-between"
                align="middle"
                gutter={[20, 20]}
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

                        color:
                          textColor,
                      }}
                    >
                      Kết quả đánh giá
                    </Title>

                    <Text
                      style={{
                        color:
                          subText,
                      }}
                    >
                      Hệ số P2 được tính tự động
                    </Text>
                  </Space>
                </Col>

                <Col>
                  <Space wrap>
                    <Button
                      size="large"
                      icon={
                        <SaveOutlined />
                      }
                      style={{
                        height: 50,

                        borderRadius: 18,

                        paddingInline:
                          26,

                        fontWeight: 700,
                      }}
                      onClick={() =>
                        message.success(
                          "Đã lưu nháp đánh giá"
                        )
                      }
                    >
                      Lưu nháp
                    </Button>

                    <Button
                      type="primary"
                      size="large"
                      icon={
                        <FileDoneOutlined />
                      }
                      style={{
                        height: 50,

                        borderRadius: 18,

                        paddingInline:
                          30,

                        fontWeight: 700,
                      }}
                      onClick={() =>
                        message.success(
                          "Đã hoàn tất đánh giá"
                        )
                      }
                    >
                      Hoàn tất đánh giá
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}