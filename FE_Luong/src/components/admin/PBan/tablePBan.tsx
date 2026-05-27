import {
  BankOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import Text from "antd/es/typography/Text";
import EditPBan from "./editPBan";
import { DeletePBan } from "../../../services/apiPBan.service";
import { notification } from "antd";
interface TablePBanProps {
  GetAPI: () => void;
  filteredData: any[];
  isDark: boolean;
  textColor: string;
  subText: string;
  setEditingDepartment: (record: any) => void;
  setOpenModal: (open: boolean) => void;
  form: any;
}

const TablePBan = (props: TablePBanProps) => {
  const {
    GetAPI,
    filteredData,
    isDark,
    textColor,
    subText,
    setEditingDepartment,
    setOpenModal,
    form,
  } = props;
  const handleDelete = async (id: string) => {
    try {
      await DeletePBan(id);

      notification.success({
        message: "SUCCESS",
        description: "Tạm khóa phòng ban thành công",
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
      title: "Phòng ban",

      dataIndex: "ten_pb",

      render: (value: string, record: any) => (
        <Space size={14}>
          <Avatar
            size={46}
            style={{
              background: "rgba(59,130,246,0.12)",

              color: "#3b82f6",

              fontSize: 20,
            }}
            icon={<BankOutlined />}
          />

          <Space direction="vertical" size={0}>
            <Text
              style={{
                color: textColor,

                fontWeight: 700,

                fontSize: 15,
              }}
            >
              {value}
            </Text>

            <Text
              style={{
                color: subText,

                fontSize: 13,
              }}
            >
              {record.id_pb}
            </Text>
          </Space>
        </Space>
      ),
    },

    {
      title: "Trưởng phòng",

      dataIndex: "truong_phong",

      render: (value: string) => (
        <Space size={12}>
          <Avatar icon={<UserOutlined />} />

          <Text
            style={{
              color: textColor,

              fontWeight: 500,
            }}
          >
            {value}
          </Text>
        </Space>
      ),
    },

    {
      title: "Nhân sự",

      dataIndex: "so_luong_nhan_vien",

      render: (value: number) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 999,

            padding: "4px 14px",

            fontWeight: 600,
          }}
        >
          {value} nhân viên
        </Tag>
      ),
    },

    {
      title: "Ngày thành lập",

      dataIndex: "ngay_thanh_lap",

      render: (value: string) => (
        <Text
          style={{
            color: subText,
          }}
        >
          {value}
        </Text>
      ),
    },

    {
      title: "Trạng thái",

      dataIndex: "trang_thai",

      render: (value: string) => (
        <Tag
          color={value === "hoat_dong" ? "green" : "red"}
          style={{
            borderRadius: 999,

            padding: "4px 14px",

            fontWeight: 600,
          }}
        >
          {value === "hoat_dong" ? "Hoạt động" : "Tạm khóa"}
        </Tag>
      ),
    },

    {
      title: "Hành Động",

      render: (_: any, record: any) => (
        <Space size={4}>
          {/* EDIT */}
          <EditPBan
            isDark={isDark}
            setEditingDepartment={setEditingDepartment}
            setOpenModal={setOpenModal}
            form={form}
            record={record}
          />

          {/* DELETE */}
          <Popconfirm
            title="Tạm khóa phòng ban"
            description="Bạn có chắc muốn tạm khóa phòng ban này?"
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.id_pb)}
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
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={{
        pageSize: 6,
      }}
      rowKey="id_pb"
    />
  );
};

export default TablePBan;
