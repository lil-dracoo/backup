import { EditOutlined, SearchOutlined, StopOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { DeleteCVu, GetDetail_CVu } from "../../../services/api.CVu";
import { notification } from "antd";

interface TableCVuProps {
  GetAPI: () => void;
  search: string;
  setSearch: (value: string) => void;
  filteredData: any[];
  isDark: boolean;
  textColor: string;
  subText: string;
  inputBg: string;
  inputBorder: string;
  glassCard: React.CSSProperties;
  setSelectedRole: (record: any) => void;
  setOpenEdit: (open: boolean) => void;
}
const TableCVu = (props: TableCVuProps) => {
  const {
    search,
    setSearch,
    filteredData,
    isDark,
    textColor,
    subText,
    inputBg,
    inputBorder,
    glassCard,
    setSelectedRole,
    setOpenEdit,
    GetAPI,
  } = props;

  // XỬ LÝ DỮ LIỆU GỌI API
  const handleDetail = async (id: string) => {
    const res = await GetDetail_CVu(id);
    setSelectedRole(res.data.data);
    setOpenEdit(true);
  };

  // XỬ LÝ DỮ LIỆU XÓA CHỨC VỤ
  const handleDelete = async (id: string) => {
    try {
      await DeleteCVu(id);

      notification.success({
        message: "SUCCESS",
        description: "Tạm khóa chức vụ thành công",
        placement: "topRight",
      });

      await GetAPI();
    } catch (error: any) {
      console.error("Error deleting department:", error);

      notification.error({
        message: "ERROR",
        description:
          error.response?.data?.message ||
          "Có lỗi xảy ra khi tạm khóa phòng ban",
        placement: "topRight",
      });
    }
  };

  const columns = [
    {
      title: "Chức vụ",

      width: 320,

      render: (_: any, record: any) => (
        <Space size={14}>
          <Avatar
            size={56}
            style={{
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            }}
          >
            {record.ten_chuc_vu[0]}
          </Avatar>

          <div>
            <Text
              style={{
                color: textColor,

                fontWeight: 700,

                fontSize: 15,
              }}
            >
              {record.ten_chuc_vu}
            </Text>

            <br />

            <Text
              style={{
                color: subText,

                fontSize: 12,
              }}
            >
              {record.id_chuc_vu}
            </Text>
          </div>
        </Space>
      ),
    },

    // {
    //   title: "Phòng ban",

    //   width: 180,

    //   render: (_: any, record: any) => (
    //     <Tag
    //       color="blue"
    //       style={{
    //         borderRadius: 999,

    //         paddingInline: 14,
    //       }}
    //     >
    //       {record.phongBan}
    //     </Tag>
    //   ),
    // },

    // {
    //   title: "Nhân viên",

    //   width: 140,

    //   align: "center" as const,

    //   render: (_: any, record: any) => (
    //     <Text
    //       strong
    //       style={{
    //         color: textColor,
    //       }}
    //     >
    //       {record.nhanVien}
    //     </Text>
    //   ),
    // },

    // {
    //   title: "Ngày tạo",

    //   width: 180,

    //   render: (_: any, record: any) => (
    //     <Space>
    //       <CalendarOutlined
    //         style={{
    //           color: "#3b82f6",
    //         }}
    //       />

    //       <Text
    //         style={{
    //           color: subText,
    //         }}
    //       >
    //         {record.ngayTao}
    //       </Text>
    //     </Space>
    //   ),
    // },

    {
      title: "Trạng thái",

      width: 180,

      render: (_: any, record: any) =>
        record.trang_thai === "hoat_dong" ? (
          <Tag
            color="green"
            style={{
              borderRadius: 999,

              paddingInline: 14,
            }}
          >
            Hoạt động
          </Tag>
        ) : (
          <Tag
            color="red"
            style={{
              borderRadius: 999,

              paddingInline: 14,
            }}
          >
            Tạm khóa
          </Tag>
        ),
    },

    {
      title: "Hành động",

      width: 220,

      align: "center" as const,

      render: (_: any, record: any) => ( 
        <Space size={4}>
          <Tooltip title="Cập nhật">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{
                color: isDark ? "#cbd5e1" : "#475569",
              }}
              onClick={() => {
                handleDetail(record.id_chuc_vu);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Tạm khóa chức vụ"
            description="Bạn có chắc muốn tạm khóa chức vụ này?"
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.id_chuc_vu)}
          >
            <Tooltip title="Tạm Khóa">
              <Button danger type="text" icon={<StopOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        ...glassCard,

        borderRadius: 28,
      }}
    >
      <Space
        orientation="vertical"
        size={20}
        style={{
          width: "100%",
        }}
      >
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            <div>
              <Title
                level={4}
                style={{
                  margin: 0,

                  color: textColor,
                }}
              >
                Danh sách chức vụ
              </Title>

              <Text
                style={{
                  color: subText,
                }}
              >
                Toàn bộ chức vụ hệ thống
              </Text>
            </div>
          </Col>

          <Col>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm chức vụ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: 280,

                height: 46,

                borderRadius: 14,

                background: inputBg,

                color: textColor,

                border: `1px solid ${inputBorder}`,
              }}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id_chuc_vu"
          pagination={{
            pageSize: 6,
          }}
          scroll={{
            x: "max-content",
          }}
          rowClassName={() => (isDark ? "dark-table-row" : "light-table-row")}
        />
      </Space>
    </Card>
  );
};
export default TableCVu;
