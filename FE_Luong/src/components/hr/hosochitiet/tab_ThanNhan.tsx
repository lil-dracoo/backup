import { Avatar, Card, Col, Row, Space, Tag } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
interface IThanNhanProps {
  glassCard: React.CSSProperties;
  isDark: boolean;
  textColor: string;
  subText: string;
  familyData: any[];
  surfaceColor: string;
  borderColor: string;
}
const TabThanNhan = (props: IThanNhanProps) => {
  const {
    glassCard,
    isDark,
    textColor,
    subText,
    familyData,
    surfaceColor,
    borderColor,
  } = props;
  return familyData.length !== 0 ? (
    <Row gutter={[20, 20]} style={{ width: "100%" }}>
      {familyData.map((item) => (
        <Col xs={24} lg={12} key={item.key} style={{ minWidth: 0 }}>
          <Card
            hoverable
            style={{
              ...glassCard,

              width: "100%",

              minWidth: 0,

              overflow: "hidden",

              position: "relative",

              borderRadius: 26,
            }}
            bodyStyle={{
              padding: 24,
            }}
          >
            {/* TOP DECOR */}

            <div
              style={{
                position: "absolute",

                top: 0,

                right: 0,

                width: 120,

                height: 120,

                background: isDark
                  ? "linear-gradient(135deg,#3b82f620,#8b5cf620)"
                  : "linear-gradient(135deg,#dbeafe,#ede9fe)",

                borderRadius: "0 0 0 100%",
              }}
            />

            <Space
              direction="vertical"
              size={20}
              style={{
                width: "100%",
              }}
            >
              {/* HEADER */}

              <Space
                size={16}
                align="center"
                style={{ width: "100%", minWidth: 0 }}
              >
                <Avatar
                  size={72}
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",

                    fontSize: 24,

                    fontWeight: 700,
                  }}
                  icon={<UserOutlined />}
                />

                <div style={{ minWidth: 0, flex: 1 }}>
                  <Title
                    level={4}
                    style={{
                      margin: 0,

                      color: textColor,

                      maxWidth: "100%",
                    }}
                    ellipsis
                  >
                    {item.ho_ten}
                  </Title>

                  <Text
                    style={{
                      color: subText,

                      fontSize: 15,
                    }}
                  >
                    {item.quan_he}
                  </Text>
                </div>
              </Space>

              {/* INFO */}

              <Space
                direction="vertical"
                size={14}
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    gap: 12,

                    minWidth: 0,
                  }}
                >
                  <Text
                    style={{
                      color: subText,
                      flexShrink: 0,
                    }}
                  >
                    Năm sinh
                  </Text>

                  <Text
                    strong
                    style={{
                      color: textColor,
                      minWidth: 0,
                      textAlign: "right",
                    }}
                  >
                    {item.ngay_sinh}
                  </Text>
                </div>

                <div
                  style={{
                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    gap: 12,

                    minWidth: 0,
                  }}
                >
                  <Text
                    style={{
                      color: subText,
                      flexShrink: 0,
                    }}
                  >
                    Mã Định Danh
                  </Text>

                  <Tag
                    color="blue"
                    style={{
                      borderRadius: 12,
                      maxWidth: "60%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.key}
                  </Tag>
                </div>
              </Space>

              {/* FOOTER */}

              <div
                style={{
                  marginTop: 8,

                  padding: 14,

                  borderRadius: 18,

                  background: isDark ? surfaceColor : "#f8fafc",

                  border: `1px solid ${borderColor}`,
                }}
              >
                <Space align="center" style={{ minWidth: 0 }}>
                  <HeartOutlined
                    style={{
                      color: "#ef4444",
                    }}
                  />

                  <Text
                    style={{
                      color: subText,
                      minWidth: 0,
                    }}
                    ellipsis
                  >
                    Thành viên gia đình
                  </Text>
                </Space>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <div
      style={{
        width: "100%",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "80px 20px",
      }}
    >
      <Card
        style={{
          width: "100%",

          maxWidth: 500,

          borderRadius: 30,

          textAlign: "center",

          background: isDark
            ? "linear-gradient(135deg,#0f172a,#111827)"
            : "linear-gradient(135deg,#ffffff,#f8fafc)",

          border: `1px solid ${borderColor}`,

          boxShadow: isDark
            ? "0 10px 40px rgba(0,0,0,0.35)"
            : "0 10px 40px rgba(15,23,42,0.08)",
        }}
        bodyStyle={{
          padding: "48px 32px",
        }}
      >
        <Space
          direction="vertical"
          size={18}
          style={{
            width: "100%",
          }}
        >
          {/* ICON */}

          <div
            style={{
              width: 92,

              height: 92,

              margin: "0 auto",

              borderRadius: 28,

              background: isDark
                ? "linear-gradient(135deg,#3b82f620,#8b5cf620)"
                : "linear-gradient(135deg,#dbeafe,#ede9fe)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontSize: 42,

              color: "#8b5cf6",
            }}
          >
            <HeartOutlined />
          </div>

          {/* TITLE */}

          <div>
            <Title
              level={3}
              style={{
                marginBottom: 8,

                color: textColor,
              }}
            >
              Chưa có thông tin thân nhân
            </Title>

            <Text
              style={{
                color: subText,

                fontSize: 15,

                lineHeight: 1.8,
              }}
            >
              Nhân viên hiện chưa khai báo thông tin người thân hoặc dữ liệu
              chưa được cập nhật vào hệ thống.
            </Text>
          </div>

          {/* TAG */}

          <div>
            <Tag
              color="purple"
              style={{
                borderRadius: 999,

                padding: "6px 14px",

                fontSize: 13,
              }}
            >
              HR Management System
            </Tag>
          </div>
        </Space>
      </Card>
    </div>
  );
};
export default TabThanNhan;
