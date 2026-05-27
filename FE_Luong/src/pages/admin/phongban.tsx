import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Input,
  Tag,
  Form,
  Select,
  ConfigProvider,
} from "antd";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import { useTheme } from "../../context/themecontext";
import { GetDataPBan } from "../../services/apiPBan.service";
import TablePBan from "../../components/admin/PBan/tablePBan";
import ModalPBan from "../../components/admin/PBan/modal";

const { Title, Text } = Typography;

const QuanLyPhongBan = () => {
  const { isDark } = useTheme();

  // ================= STATE =================

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const [editingDepartment, setEditingDepartment] = useState<any>(null);

  const [form] = Form.useForm();

  // ================= THEME =================

  const bgColor = isDark ? "#020617" : "#f8fafc";

  const cardColor = isDark ? "#0f172a" : "#ffffff";

  const textColor = isDark ? "#f8fafc" : "#0f172a";

  const subText = isDark ? "#94a3b8" : "#64748b";

  const borderColor = isDark ? "rgba(148,163,184,0.12)" : "#e2e8f0";

  const glassCard = {
    background: cardColor,

    border: `1px solid ${borderColor}`,

    borderRadius: 24,

    overflow: "hidden",

    boxShadow: isDark
      ? "0 10px 30px rgba(0,0,0,0.24)"
      : "0 10px 30px rgba(15,23,42,0.06)",
  };

  // ================= DATA API =================
  const [departmentData, setDepartmentData] = useState<any[]>([]);
  useEffect(() => {
    GetAPI();
  }, []);

  const sortDepartments = (departments: any[]) =>
    [...departments].sort((a, b) =>
      String(a.id_pb).localeCompare(String(b.id_pb), "vi", {
        numeric: true,
        sensitivity: "base",
      }),
    );

  const GetAPI = async () => {
    const data = await GetDataPBan();
    setDepartmentData(sortDepartments(data.data.data));
  };

  const handleDepartmentUpdated = (id: string, updatedDepartment: any) => {
    setDepartmentData((prev) =>
      sortDepartments(
        prev.map((department) =>
          department.id_pb === id
            ? {
                ...department,
                ...updatedDepartment,
                id_pb: id,
              }
            : department,
        ),
      ),
    );
    setEditingDepartment(null);
  };

  // ================= FILTER =================

  const filteredData = departmentData.filter((item) =>
    item.ten_pb.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: cardColor,

          colorText: textColor,

          borderRadius: 16,
        },
      }}
    >
      <div
        style={{
          background: bgColor,

          minHeight: "100vh",

          padding: 28,
        }}
      >
        {/* HEADER */}

        <Card
          style={{
            ...glassCard,

            marginBottom: 24,
          }}
          bodyStyle={{
            padding: "34px 36px",
          }}
        >
          <Row justify="space-between" align="middle" gutter={[20, 20]}>
            <Col>
              <Space direction="vertical" size={6}>
                <Title
                  level={2}
                  style={{
                    margin: 0,

                    color: textColor,
                  }}
                >
                  Quản lý phòng ban
                </Title>

                <Text
                  style={{
                    color: subText,

                    fontSize: 15,
                  }}
                >
                  Cấu hình và quản lý thông tin phòng ban doanh nghiệp
                </Text>
              </Space>
            </Col>

            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                  setEditingDepartment(null);

                  form.resetFields();

                  setOpenModal(true);
                }}
                style={{
                  height: 48,

                  borderRadius: 14,

                  paddingInline: 22,

                  fontWeight: 600,
                }}
              >
                Thêm phòng ban
              </Button>
            </Col>
          </Row>
        </Card>

        {/* TABLE */}

        <Card
          style={glassCard}
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
            {/* TOOLBAR */}

            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Space size={14} wrap>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Tìm kiếm phòng ban..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: 320,

                      height: 46,

                      borderRadius: 14,
                    }}
                  />

                  <Select
                    placeholder="Trạng thái"
                    style={{
                      width: 180,

                      height: 46,
                    }}
                    options={[
                      {
                        label: "Hoạt động",

                        value: 1,
                      },

                      {
                        label: "Tạm khóa",

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

                    padding: "6px 16px",

                    fontWeight: 600,
                  }}
                >
                  Tổng: {filteredData.length} phòng ban
                </Tag>
              </Col>
            </Row>

            {/* TABLE */}

            <TablePBan
              filteredData={filteredData}
              isDark={isDark}
              textColor={textColor}
              subText={subText}
              GetAPI={GetAPI}
              setEditingDepartment={setEditingDepartment}
              setOpenModal={setOpenModal}
              form={form}
            />
          </Space>
        </Card>

        {/* ================= MODAL ================= */}
        <ModalPBan
          isDark={isDark}
          openModal={openModal}
          setOpenModal={setOpenModal}
          editingDepartment={editingDepartment}
          form={form}
          textColor={textColor}
          subText={subText}
          borderColor={borderColor}
          GetAPI={GetAPI}
          onDepartmentUpdated={handleDepartmentUpdated}
        />
      </div>
    </ConfigProvider>
  );
};

export default QuanLyPhongBan;
