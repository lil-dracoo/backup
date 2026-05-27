import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Descriptions, Row, Space } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
interface IThongTinCaNhanProps {
  glassCard: React.CSSProperties;
  textColor: string;
  subText: string;
  employee: any;
  mutedSurfaceColor: string;
  cardColor: string;
}
const ThongTinCaNhan = (props: IThongTinCaNhanProps) => {
  const {
    glassCard,
    textColor,
    subText,
    employee,
    mutedSurfaceColor,
    cardColor,
  } = props;
  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Row gutter={[20, 20]}>
        {[
          {
            label: "Email",
            value: employee.email,
            icon: <MailOutlined />,
            color: "#3b82f6",
          },
          {
            label: "Điện thoại",
            value: employee.sdt,
            icon: <PhoneOutlined />,
            color: "#22c55e",
          },
          {
            label: "Ngày sinh",
            value: employee.ngay_sinh,
            icon: <CalendarOutlined />,
            color: "#f59e0b",
          },
          {
            label: "Địa chỉ",
            value: employee.dia_chi,
            icon: <EnvironmentOutlined />,
            color: "#ef4444",
          },
        ].map((item) => (
          <Col xs={24} md={12} key={item.label} style={{ minWidth: 0 }}>
            <Card style={glassCard} bodyStyle={{ padding: 20 }}>
              <Space
                size={14}
                align="start"
                style={{ width: "100%", minWidth: 0 }}
              >
                <Avatar
                  size={44}
                  style={{
                    background: `${item.color}22`,
                    color: item.color,
                    border: `1px solid ${item.color}55`,
                    flexShrink: 0,
                  }}
                  icon={item.icon}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Text style={{ color: subText }}>{item.label}</Text>
                  <Title
                    level={5}
                    style={{
                      color: textColor,
                      margin: "4px 0 0",
                      fontSize: 16,
                    }}
                    ellipsis
                  >
                    {item.value}
                  </Title>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={glassCard}>
        <Descriptions
          bordered
          column={{ xs: 1, sm: 2, md: 2 }}
          labelStyle={{
            background: mutedSurfaceColor,
            color: textColor,
            fontWeight: 600,
          }}
          contentStyle={{
            background: cardColor,
            color: textColor,
          }}
        >
          <Descriptions.Item label="Họ tên">{employee.ho_ten}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {employee.gioi_tinh ? "Nam" : "Nữ"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {employee.ngay_sinh}
          </Descriptions.Item>
          <Descriptions.Item label="Dân tộc">
            {employee.dan_toc}
          </Descriptions.Item>
          <Descriptions.Item label="CCCD">{employee.cccd}</Descriptions.Item>
          <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
          <Descriptions.Item label="Điện thoại">
            {employee.sdt}
          </Descriptions.Item>
          <Descriptions.Item label="Chuyên ngành">
            {employee.chuyen_nganh}
          </Descriptions.Item>
          <Descriptions.Item label="Phòng ban">
            {employee.phong_ban}
          </Descriptions.Item>
          <Descriptions.Item label="Chức vụ">
            {employee.chuc_vu}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày vào làm">
            {employee.ngay_vao_lam}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nghỉ việc">
            {employee.ngay_nghi_viec ? employee.ngay_nghi_viec : "Đang làm việc"}
          </Descriptions.Item>
          <Descriptions.Item label="BHXH">
            {employee.so_bhxh}
          </Descriptions.Item>
          <Descriptions.Item label="BHYT">
            {employee.so_bhyt}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={2}>
            {employee.dia_chi}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};
export default ThongTinCaNhan;
