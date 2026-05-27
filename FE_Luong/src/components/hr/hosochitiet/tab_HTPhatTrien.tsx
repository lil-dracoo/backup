import { Card, Col,  Row, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
interface IPhatTrienProps {
  glassCard: React.CSSProperties;
  isDark: boolean;
  textColor: string;
  subText: string;
  lichsu: any[];
}
const PhatTrien = (props: IPhatTrienProps) => {
  const { glassCard, isDark, textColor, subText, lichsu } = props;
  const colors = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];
  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Card
        style={{
          ...glassCard,
          background: isDark
            ? "linear-gradient(135deg, #1e293b 0%, #172033 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        }}
        bodyStyle={{ padding: 28 }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={10}>
            <Space direction="vertical" size={16}>
              <Tag color="blue" style={{ borderRadius: 20 }}>
                Career Path
              </Tag>
              <Title level={2} style={{ margin: 0, color: textColor }}>
                Hành trình phát triển
              </Title>
              <Paragraph style={{ color: subText }}>
                Toàn bộ quá trình phát triển, thăng tiến và đảm nhận vị trí của
                nhân viên.
              </Paragraph>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {lichsu.map((item, idx) => {
          const color = colors[idx % colors.length];

          return (
            <Col xs={24} md={12} xl={8} key={idx}>
              <Card
                hoverable
                style={{
                  ...glassCard,

                  borderRadius: 32,

                  overflow: "hidden",

                  border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,

                  background: isDark
                    ? "linear-gradient(180deg,#111827,#0f172a)"
                    : "linear-gradient(180deg,#ffffff,#f8fafc)",

                  position: "relative",

                  transition: "all .35s ease",
                }}
                bodyStyle={{
                  padding: 0,
                }}
              >
                {/* TOP */}

                <div
                  style={{
                    height: 140,

                    background: `linear-gradient(135deg, ${color}, ${color}99)`,

                    position: "relative",

                    padding: 26,

                    overflow: "hidden",
                  }}
                >
                  {/* BG CIRCLE */}

                  <div
                    style={{
                      position: "absolute",

                      width: 180,

                      height: 180,

                      borderRadius: "50%",

                      background: "rgba(255,255,255,0.08)",

                      right: -60,

                      top: -70,
                    }}
                  />

                  <Space
                    direction="vertical"
                    size={14}
                    style={{
                      position: "relative",

                      zIndex: 2,
                    }}
                  >
                    <Tag
                      color="default"
                      style={{
                        borderRadius: 999,

                        background: "rgba(255,255,255,0.16)",

                        border: "none",

                        color: "#fff",

                        width: "fit-content",

                        paddingInline: 14,

                        paddingBlock: 4,

                        fontWeight: 600,
                      }}
                    >
                      {item.loai_thay_doi}
                    </Tag>

                    <div>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.8)",

                          fontSize: 13,
                        }}
                      >
                        Số quyết định
                      </Text>

                      <Title
                        level={3}
                        style={{
                          margin: "4px 0 0",

                          color: "#fff",
                        }}
                      >
                        {item.so_quyet_dinh}
                      </Title>
                    </div>
                  </Space>
                </div>

                {/* CONTENT */}

                <div
                  style={{
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
                    {/* TIMELINE */}

                    <div
                      style={{
                        display: "flex",

                        gap: 16,
                      }}
                    >
                      {/* LINE */}

                      <div
                        style={{
                          display: "flex",

                          flexDirection: "column",

                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 16,

                            height: 16,

                            borderRadius: "50%",

                            background: color,

                            boxShadow: `0 0 0 6px ${color}22`,
                          }}
                        />

                        <div
                          style={{
                            width: 2,

                            flex: 1,

                            background: isDark ? "#334155" : "#e2e8f0",

                            marginTop: 6,
                          }}
                        />
                      </div>

                      {/* INFO */}

                      <Space
                        direction="vertical"
                        size={18}
                        style={{
                          flex: 1,
                        }}
                      >
                        {/* NGÀY HIỆU LỰC */}

                        <div>
                          <Text
                            style={{
                              color: subText,

                              fontSize: 12,

                              fontWeight: 600,

                              textTransform: "uppercase",

                              letterSpacing: 1,
                            }}
                          >
                            Ngày hiệu lực
                          </Text>

                          <Title
                            level={5}
                            style={{
                              margin: "6px 0 0",

                              color: textColor,
                            }}
                          >
                            {item.ngay_hieu_luc}
                          </Title>
                        </div>

                        {/* NGÀY HẾT HẠN */}

                        <div>
                          <Text
                            style={{
                              color: subText,

                              fontSize: 12,

                              fontWeight: 600,

                              textTransform: "uppercase",

                              letterSpacing: 1,
                            }}
                          >
                            Ngày hết hạn
                          </Text>

                          <Title
                            level={5}
                            style={{
                              margin: "6px 0 0",

                              color: textColor,
                            }}
                          >
                            {item.ngay_het_han
                              ? item.ngay_het_han
                              : "--/--/----"}
                          </Title>
                        </div>

                        {/* NGƯỜI KÝ */}

                        <div>
                          <Text
                            style={{
                              color: subText,

                              fontSize: 12,

                              fontWeight: 600,

                              textTransform: "uppercase",

                              letterSpacing: 1,
                            }}
                          >
                            Người ký quyết định
                          </Text>

                          <Paragraph
                            style={{
                              margin: "6px 0 0",

                              color: textColor,

                              fontWeight: 600,

                              fontSize: 15,
                            }}
                          >
                            {item.nguoi_ky}
                          </Paragraph>
                        </div>
                      </Space>
                    </div>

                    {/* STATUS */}

                    <div
                      style={{
                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        paddingTop: 18,

                        borderTop: `1px dashed ${
                          isDark ? "#334155" : "#e2e8f0"
                        }`,
                      }}
                    >
                      <div>
                        <Text
                          style={{
                            color: subText,

                            fontSize: 12,
                          }}
                        >
                          Trạng thái
                        </Text>

                        <br />

                        <Text
                          strong
                          style={{
                            color: textColor,
                          }}
                        >
                          {item.trang_thai}
                        </Text>
                      </div>

                      <div
                        style={{
                          padding: "10px 18px",

                          borderRadius: 999,

                          background: `${color}15`,

                          color: color,

                          fontWeight: 700,

                          fontSize: 13,
                        }}
                      >
                        ACTIVE
                      </div>
                    </div>
                  </Space>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Space>
  );
};
export default PhatTrien;
