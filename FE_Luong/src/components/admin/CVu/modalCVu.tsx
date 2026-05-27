import { Card, Col, Form, Input, notification, Row, Space, Switch } from "antd";
import FormModalLayout from "../../common/formModalLayout";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { useEffect } from "react";
import { createCVu, UpdateCVu } from "../../../services/api.CVu";
interface ModalCVuProps {
  isDark: boolean;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  selectedRole: any;
  form: any;
  textColor: string;
  subText: string;
  borderColor: string;
  GetAPI: () => void;
  onRoleUpdated?: (id: string, data: any) => void;
}

const ModalCVu = (props: ModalCVuProps) => {
  const {
    isDark,
    openModal,
    setOpenModal,
    selectedRole,
    form,
    textColor,
    subText,
    GetAPI,
    borderColor,
    onRoleUpdated,
  } = props;

  useEffect(() => {
    if (selectedRole) {
      form.setFieldsValue({
        id_chuc_vu: selectedRole.id_chuc_vu,
        ten_chuc_vu: selectedRole.ten_chuc_vu,
        trang_thai: selectedRole.trang_thai === "hoat_dong",
      });
    }
  }, [form, selectedRole]);
  // Lấy dữ liệu API tạo chức vụ
  const HandleCreate = async () => {
    try {
      const values = await form.validateFields();

      await createCVu(values);

      notification.success({
        message: "SUCCESS",
        description: "Thêm chức vụ thành công",
        placement: "topRight",
        style: {
          zIndex: 1000000,
        },
      });

      setOpenModal(false);

      await GetAPI();
      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: "ERROR",
        description: error.response?.data?.message || "Có lỗi xảy ra",
        style: {
          zIndex: 10000,
        },
      });
    }
  };

  // Lấy dữ liệu API cập nhật chức vụ
  const HandleUpdate = async (id: string) => {
    try {
      const values = await form.validateFields();
      const isActive =
        values.trang_thai === undefined
          ? selectedRole?.trang_thai === "hoat_dong"
          : values.trang_thai === true || values.trang_thai === "hoat_dong";
      const trangThai = isActive ? "hoat_dong" : "tam_khoa";
      const payload = {
        ...values,
        trang_thai: trangThai,
      };

      await UpdateCVu(id, payload);

      notification.success({
        message: "SUCCESS",
        description: "Cập nhật chức vụ thành công",
        placement: "topRight",
      });

      setOpenModal(false);

      onRoleUpdated?.(id, {
        ...selectedRole,
        ...values,
        trang_thai: trangThai,
      });
      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: "ERROR",
        description: error.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  };
  return (
    <FormModalLayout
      open={openModal}
      setOpen={setOpenModal}
      isDark={isDark}
      title={selectedRole ? "Cập nhật chức vụ" : "Thêm chức vụ"}
      subtitle="Thiết lập thông tin và cấu hình chức vụ"
      onSubmit={
        selectedRole
          ? () => HandleUpdate(selectedRole.id_chuc_vu)
          : HandleCreate
      }
      submitText={selectedRole ? "Cập nhật chức vụ" : "Lưu chức vụ"}
    >
      <Form layout="vertical" form={form}>
        {/* INFO */}

        <Card
          style={{
            marginBottom: 22,

            borderRadius: 24,

            background: isDark ? "#111827" : "#f8fafc",

            border: `1px solid ${borderColor}`,
          }}
        >
          <Space
            orientation="vertical"
            size={22}
            style={{
              width: "100%",
            }}
          >
            <div>
              <Title
                level={4}
                style={{
                  marginBottom: 4,

                  color: textColor,
                }}
              >
                Thông tin chức vụ
              </Title>

              <Text
                style={{
                  color: subText,
                }}
              >
                Thiết lập dữ liệu cơ bản cho chức vụ
              </Text>
            </div>

            <Row gutter={[22, 22]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Mã chức vụ"
                  name="id_chuc_vu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã chức vụ",
                    },
                  ]}
                >
                  <Input
                    disabled={!!selectedRole}
                    size="large"
                    placeholder="Nhập mã chức vụ"
                    style={{
                      height: 52,

                      borderRadius: 16,

                      background: selectedRole ? "#f1f5f9" : undefined,

                      color: selectedRole ? "#94a3b8" : undefined,

                      cursor: selectedRole ? "not-allowed" : undefined,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Tên chức vụ"
                  name="ten_chuc_vu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên chức vụ",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Ví dụ: Trưởng phòng"
                    style={{
                      height: 52,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              {selectedRole && (
                <Col span={24}>
                  <div
                    style={{
                      padding: "18px 22px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 18,
                      background: "#fafafa",

                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Trạng thái chức vụ
                      </div>

                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: 14,
                        }}
                      >
                        Cho phép hoạt động hoặc tạm khóa phòng ban
                      </div>
                    </div>

                    <Form.Item
                      name="trang_thai"
                      valuePropName="checked"
                      style={{ marginBottom: 0 }}
                    >
                      <Switch
                        checkedChildren="Hoạt động"
                        unCheckedChildren="Tạm khóa"
                        style={{
                          minWidth: 110,
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              )}
            </Row>
          </Space>
        </Card>
      </Form>
    </FormModalLayout>
  );
};

export default ModalCVu;
