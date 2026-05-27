import { Box } from "@mui/material";
import { ConfigProvider, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getEmployeeTableStyles } from "../../../styles/hr_table_styles";
interface ITableChiTietProps {
  isDark: boolean;
  columns: any[];
  filteredData: any[];
  setDetailTabValue: React.Dispatch<React.SetStateAction<number>>;
  setSelectedEmployee: (employee: any) => void;
  ResizableTitle: any;
}

const TableChiTiet = (props: ITableChiTietProps) => {
  const navigate = useNavigate();
  const {
    isDark,
    columns,
    filteredData,

    ResizableTitle,
  } = props;

  // CUSTOM COLUMN CLICK CCCD
  const customColumns = columns.map((col: any) => {
    if (col.dataIndex === "cccd") {
      return {
        ...col,

        render: (value: any, record: any) => (
          <span
            onClick={async(e) => {
              e.stopPropagation();
              // API CALL LẤY CHI TIẾT NHÂN VIÊN
              // try {
              //   const req = await ChiTietNhanVien(record.cccd);

              //   setSelectedEmployee(req.data);

              //   setDetailTabValue(0);
              // } catch (error) {
              //   console.log(error);
              // }
              navigate(`${record.cccd}`);
            }}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            {value}
          </span>
        ),
      };
    }

    return col;
  });

  return (
    <Box
      sx={{
        ...getEmployeeTableStyles(isDark),

        flex: 1,

        width: "100%",

        minHeight: 0,
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: isDark ? "#0f172a" : "#ffffff",

            colorText: isDark ? "#f8fafc" : "#0f172a",
          },
        }}
      >
        <Table
          tableLayout="fixed"
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          rowKey="id"
          columns={customColumns}
          dataSource={filteredData}
          sticky
          bordered={false}
          size="middle"
          pagination={{
            pageSize: 10,

            showSizeChanger: true,
          }}
          scroll={{
            x: "max-content",

            y: "calc(100vh - 200px)",
          }}
        />
      </ConfigProvider>
    </Box>
  );
};

export default TableChiTiet;
