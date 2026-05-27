import {  Card, Col, Row, Space, Tag, Typography } from "antd";
const { Title, Text } = Typography;


interface IHeaderCardProps {
    glassCard: React.CSSProperties;
    isDark: boolean;
    textColor: string;
    subText: string;
    employee: any;
   
}    
const headerCard = (props: IHeaderCardProps) => {
  const { glassCard, isDark, textColor, subText, employee } = props;
  return (
    <Card
      style={{
        ...glassCard,

        marginBottom: 24,

        overflow: "hidden",

        position: "relative",
      }}
      bodyStyle={{
        padding: "24px 28px",
      }}
    >
      {/* DECOR */}

      <div
        style={{
          position: "absolute",

          top: -52,

          right: -52,

          width: 150,

          height: 150,

          borderRadius: "50%",

          background: isDark ? "rgba(59,130,246,0.12)" : "#dbeafe",
        }}
      />

      <Row gutter={[28, 20]} align="middle">
        {/* AVATAR */}

        <Col>
          {/* <Avatar
            size={88}
            src={employee.avatar}
            style={{
              border: "3px solid rgba(59,130,246,0.25)",

              boxShadow: "0 8px 22px rgba(59,130,246,0.22)",
            }}
          /> */}
        </Col>

        {/* INFO */}

        <Col flex={1}>
          <Space direction="vertical" size={8}>
            <div>
              <Title
                level={2}
                style={{
                  margin: 0,

                  color: textColor,

                  fontSize: 28,

                  lineHeight: 1.18,
                }}
              >
                {employee.ho_ten}
              </Title>

              <Text
                style={{
                  color: subText,

                  fontSize: 15,
                }}
              >
                {employee.chuc_vu}
              </Text>
            </div>

            <Space wrap>
              <Tag
                color="blue"
                style={{
                  borderRadius: 20,

                  padding: "2px 10px",
                }}
              >
                {employee.phong_ban}
              </Tag>

              <Tag
                color="green"
                style={{
                  borderRadius: 20,

                  padding: "2px 10px",
                }}
              >
                {employee.trang_thai}
              </Tag>
            </Space>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default headerCard;
