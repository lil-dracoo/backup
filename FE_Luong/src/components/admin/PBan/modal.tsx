import {
  Row,
  Col,
  Card,
  Space,
  Input,
  Form,
  DatePicker,
  notification,
  Switch,
} from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { createPBan, UpdatePBan } from "../../../services/apiPBan.service";
import FormModalLayout from "../../common/formModalLayout";

interface ModalPBanProps {
  isDark: boolean;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  editingDepartment: any;
  form: any;
  textColor: string;
  subText: string;
  borderColor: string;
  GetAPI: () => void;
  onDepartmentUpdated: (id: string, data: any) => void;
}

const ModalPBan = (props: ModalPBanProps) => {
  const {
    isDark,
    openModal,
    setOpenModal,
    editingDepartment,
    form,
    textColor,
    subText,
    borderColor,
    GetAPI,
    onDepartmentUpdated,
  } = props;
  // Xử lý khi nút Tạo Pban API
  const HandleCreate = async () => {
    try {
      const values = await form.validateFields();

      await createPBan({
        ...values,
        ngay_thanh_lap: values.ngay_thanh_lap.format("YYYY-MM-DD"),
      });

      notification.success({
        message: "SUCCESS",
        description: "Thêm phòng ban thành công",
        placement: "topRight",
      });

      setOpenModal(false);

      await GetAPI();
      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: "ERROR",
        description: error.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  };

  // Xử lý update phòng ban API
  const HandleUpdate = async (id: string) => {
    try {
      const values = await form.validateFields();
      const isActive =
        values.trang_thai === undefined
          ? editingDepartment?.trang_thai === "hoat_dong"
          : values.trang_thai === true || values.trang_thai === "hoat_dong";
      const trangThai = isActive ? "hoat_dong" : "tam_khoa";
      const payload = {
        ...values,
        ngay_thanh_lap: values.ngay_thanh_lap.format("YYYY-MM-DD"),
        trang_thai: trangThai,
      };

      await UpdatePBan(id, payload);

      notification.success({
        message: "SUCCESS",
        description: "Cập nhật phòng ban thành công",
        placement: "topRight",
      });

      onDepartmentUpdated(id, {
        ...editingDepartment,
        ...values,
        ngay_thanh_lap: values.ngay_thanh_lap.format("DD/MM/YYYY"),
        trang_thai: trangThai,
      });

      setOpenModal(false);
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
      title={editingDepartment ? "Cập nhật phòng ban" : "Thêm phòng ban"}
      subtitle="Thiết lập thông tin và cấu hình phòng ban"
      onSubmit={
        editingDepartment
          ? () => HandleUpdate(editingDepartment.id_pb)
          : HandleCreate
      }
      submitText={editingDepartment ? "Cập nhật phòng ban" : "Lưu phòng ban"}
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
            direction="vertical"
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
                Thông tin phòng ban
              </Title>

              <Text
                style={{
                  color: subText,
                }}
              >
                Thiết lập dữ liệu cơ bản cho phòng ban
              </Text>
            </div>

            <Row gutter={[22, 22]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tên phòng ban"
                  name="ten_pb"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên phòng ban",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Nhập tên phòng ban"
                    style={{
                      height: 52,

                      borderRadius: 16,

                      
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Mã phòng ban"
                  name="id_pb"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã phòng ban",
                    },
                  ]}
                >
                  <Input
                    disabled={editingDepartment}
                    size="large"
                    placeholder="Ví dụ: PB001"
                    style={{
                      height: 52,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Trưởng phòng"
                  name="truong_phong"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập trưởng phòng",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Nhập tên trưởng phòng"
                    style={{
                      height: 52,

                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Ngày thành lập"
                  name="ngay_thanh_lap"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày thành lập",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    size="large"
                    style={{
                      width: "100%",
                      height: 52,
                      borderRadius: 16,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Mô tả" name="mo_ta">
                  <Input.TextArea
                    rows={5}
                    placeholder="Nhập mô tả phòng ban..."
                    style={{
                      borderRadius: 16,

                      resize: "none",
                    }}
                  />
                </Form.Item>
              </Col>

              {editingDepartment && (
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
                        Trạng thái phòng ban
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
export default ModalPBan;
