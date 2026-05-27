import { Modal, Button, Space, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  isDark: boolean;

  title: string;
  subtitle?: string;

  children: React.ReactNode;

  onSubmit?: () => void;
  submitText?: string;

  width?: number;

  loading?: boolean;
}

const FormModalLayout = ({
  open,
  setOpen,
  isDark,
  title,
  subtitle,
  children,
  onSubmit,
  submitText = "Lưu dữ liệu",
  width = 920,
  loading = false,
}: Props) => {
  return (
    <>
      <style>{`
        .ant-notification {
          z-index: 1000001 !important;
        }

        .ant-form-item-explain,
        .ant-form-item-extra {
          position: relative;
          z-index: 2;
        }
      `}</style>

      <Modal
        open={open}
        footer={null}
        centered
        width={width}
        closeIcon={false}
        onCancel={() => setOpen(false)}
        destroyOnClose
        zIndex={9999}
        styles={{
        mask: {
          backdropFilter: "blur(12px)",

          background: isDark
            ? "rgba(2,6,23,0.72)"
            : "rgba(15,23,42,0.45)",
        },

        root: {
          padding: 0,

          overflow: "hidden",

          borderRadius: 32,

          background: "transparent",

          boxShadow: isDark
            ? "0 25px 80px rgba(0,0,0,0.55)"
            : "0 25px 80px rgba(15,23,42,0.20)",
        },

          body: {
            padding: 0,
            overflow: "visible",
          },
        }}
      >
      {/* WRAPPER */}
      <div
        style={{
          background: isDark ? "#0f172a" : "#ffffff",

          borderRadius: 32,

          overflow: "hidden",

          position: "relative",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",

            padding: "34px 36px",

            position: "relative",

            overflow: "hidden",
          }}
        >
          {/* DECOR */}
          <div
            style={{
              position: "absolute",

              top: -70,

              right: -70,

              width: 220,

              height: 220,

              borderRadius: "50%",

              background: "rgba(255,255,255,0.08)",
            }}
          />

          {/* CLOSE BUTTON */}
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",

              top: 20,

              right: 20,

              width: 46,

              height: 46,

              borderRadius: 16,

              color: "#fff",

              border: "1px solid rgba(255,255,255,0.25)",

              background: "rgba(255,255,255,0.08)",

              backdropFilter: "blur(10px)",

              zIndex: 2,
            }}
          />

          <Space direction="vertical" size={4}>
            <Title
              level={2}
              style={{
                margin: 0,

                color: "#fff",

                fontWeight: 700,
              }}
            >
              {title}
            </Title>

            <Text
              style={{
                color: "rgba(255,255,255,0.82)",

                fontSize: 15,
              }}
            >
              {subtitle}
            </Text>
          </Space>
        </div>

        {/* BODY */}
        <div
          style={{
            padding: 28,

            background: isDark ? "#0f172a" : "#ffffff",

            maxHeight: "72vh",

            overflowY: "auto",
          }}
        >
          {children}

          {/* FOOTER */}
          <Row
            justify="end"
            style={{
              marginTop: 32,

              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid #f1f5f9",

              paddingTop: 24,
            }}
          >
            <Space size={14}>
              <Button
                size="large"
                onClick={() => setOpen(false)}
                style={{
                  height: 48,

                  borderRadius: 14,

                  paddingInline: 24,
                }}
              >
                Hủy
              </Button>

              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={onSubmit}
                style={{
                  height: 48,

                  borderRadius: 14,

                  paddingInline: 24,

                  fontWeight: 600,
                }}
              >
                {submitText}
              </Button>
            </Space>
          </Row>
        </div>
      </div>
      </Modal>
    </>
  );
};

export default FormModalLayout;
