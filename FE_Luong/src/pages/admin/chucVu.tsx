import {
  AppstoreOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";

import { useEffect, useState } from "react";


import { useTheme } from "../../context/themecontext";
import TableCVu from "../../components/admin/CVu/tableCVu";
import API from "../../services/api";
import ModalCVu from "../../components/admin/CVu/modalCVu";

const { Title, Text } = Typography;



export default function QuanLyChucVu() {
  const { isDark } = useTheme();

  const [search, setSearch] = useState("");

  const [OpenModal, setOpenModal] = useState(false);

  const [selectedRole, setSelectedRole] = useState<any>(null);

  const [form] = Form.useForm();

  const textColor = isDark ? "#f8fafc" : "#0f172a";

  const subText = isDark ? "#94a3b8" : "#64748b";

  const cardColor = isDark ? "#0f172a" : "#ffffff";

  const borderColor = isDark ? "#1e293b" : "#e2e8f0";

  const bgColor = isDark ? "#020617" : "#f8fafc";

  const inputBg = isDark ? "#0f172a" : "#ffffff";

  const inputBorder = isDark ? "#334155" : "#dbe2ea";

  const glassCard = {
    background: cardColor,

    border: `1px solid ${borderColor}`,

    boxShadow: isDark
      ? "0 10px 40px rgba(0,0,0,0.3)"
      : "0 10px 40px rgba(15,23,42,0.06)",
  };
  const [mockData, setMockData] = useState<any[]>([]);
  useEffect(() => {
    getAPICVu();
  }, []);
  // LẤY DỮ LIỆU API
  const sortRoles = (roles: any[]) =>
    [...roles].sort((a, b) =>
      String(a.id_chuc_vu).localeCompare(String(b.id_chuc_vu), "vi", {
        numeric: true,
        sensitivity: "base",
      }),
    );

  const getAPICVu = async () => {
    const res = await API.get("/chuc-vu/");
    setMockData(sortRoles(res.data.data));
  };

  const handleRoleUpdated = (id: string, updatedRole: any) => {
    setMockData((prev) =>
      sortRoles(
        prev.map((role) =>
          role.id_chuc_vu === id
            ? {
                ...role,
                ...updatedRole,
                id_chuc_vu: id,
              }
            : role,
        ),
      ),
    );
    setSelectedRole(null);
  };

  const filteredData = mockData.filter((item) =>
    item.ten_chuc_vu.toLowerCase().includes(search.toLowerCase()),
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

      .dark-table-row td {
        background: #0f172a !important;

        color: #f8fafc !important;

        border-color: #1e293b !important;
      }

      .dark-table-row:hover td {
        background: #172033 !important;
      }

      .light-table-row:hover td {
        background: #f8fafc !important;
      }

      .ant-table {
        background: ${isDark ? "#0f172a" : "#ffffff"} !important;
      }

      .ant-table-thead > tr > th {
        background: ${isDark ? "#111827" : "#f8fafc"} !important;

        color: ${isDark ? "#f8fafc" : "#0f172a"} !important;

        border-color: ${isDark ? "#1e293b" : "#e2e8f0"} !important;
      }

      .ant-input,
      .ant-input-affix-wrapper,
      .ant-select-selector,
      .ant-input-textarea {
        background: ${isDark ? "#0f172a" : "#fff"} !important;

        color: ${isDark ? "#f8fafc" : "#0f172a"} !important;

        border-color: ${isDark ? "#334155" : "#dbe2ea"} !important;
      }

      .ant-input[disabled],
      .ant-input-disabled {
        background: ${isDark ? "#1e293b" : "#f1f5f9"} !important;

        color: ${isDark ? "#64748b" : "#94a3b8"} !important;

        border-color: ${isDark ? "#334155" : "#cbd5e1"} !important;

        cursor: not-allowed !important;
      }
      `}</style>

      {/* HEADER */}

      <Card
        style={{
          ...glassCard,

          borderRadius: 32,

          marginBottom: 20,
        }}
      >
        <Row justify="space-between" align="middle" gutter={[20, 20]}>
          <Col>
            <Space size={18}>
              <div
                style={{
                  width: 82,

                  height: 82,

                  borderRadius: 28,

                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  color: "#fff",

                  fontSize: 34,
                }}
              >
                <UserSwitchOutlined />
              </div>

              <div>
                <Title
                  level={2}
                  style={{
                    margin: 0,

                    color: textColor,
                  }}
                >
                  Quản lý chức vụ
                </Title>

                <Text
                  style={{
                    color: subText,

                    fontSize: 15,
                  }}
                >
                  Chức vụ trong hệ thống quản trị
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

                height: 48,
              }}
              onClick={() => {
                setSelectedRole(null);
                form.resetFields();
                setOpenModal(true);
              }}
            >
              Thêm chức vụ
            </Button>
          </Col>
        </Row>
      </Card>

      {/* STATS */}

      <Row
        gutter={[18, 18]}
        style={{
          marginBottom: 20,
        }}
      >
        {[
          {
            title: "Tổng chức vụ",

            value: 24,

            icon: <AppstoreOutlined />,
          },

          {
            title: "Đang hoạt động",

            value: 19,

            icon: <CheckCircleOutlined />,
          },

          {
            title: "Nhân sự quản lý",

            value: 82,

            icon: <TeamOutlined />,
          },

          {
            title: "Chức vụ hệ thống",

            value: 12,

            icon: <UserSwitchOutlined />,
          },
        ].map((item, index) => (
          <Col xs={24} sm={12} xl={6} key={index}>
            <Card
              style={{
                ...glassCard,

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


      {/* TABLE */}

      <TableCVu
        search={search}
        setSearch={setSearch}
        filteredData={filteredData}
        isDark={isDark}
        textColor={textColor}
        subText={subText}
        inputBg={inputBg}
        inputBorder={inputBorder}
        glassCard={glassCard}
        setSelectedRole={setSelectedRole}
        setOpenEdit={setOpenModal}
        GetAPI={getAPICVu}
      />

      <ModalCVu
        isDark={isDark}
        openModal={OpenModal}
        setOpenModal={setOpenModal}
        selectedRole={selectedRole}
        form={form}
        textColor={textColor}
        subText={subText}
        borderColor={borderColor}
        GetAPI={getAPICVu}
        onRoleUpdated={handleRoleUpdated}
      />
    </div>
  );
}
