import { Box } from "@mui/material";
import { ConfigProvider, Table } from "antd";
import { getEmployeeTableStyles } from "../../../styles/hr_table_styles";
interface ITableChiTietProps {
  isDark: boolean;
  columns: any[];
  filteredData: any[];
  setSelectedEmployee: React.Dispatch<React.SetStateAction<any>>;
  setDetailTabValue: React.Dispatch<React.SetStateAction<number>>;
  ResizableTitle: any;
}
const TableChiTiet = (props: ITableChiTietProps) => {
  const {
    isDark,
    columns,
    filteredData,
    setSelectedEmployee,
    setDetailTabValue,
    ResizableTitle,
  } = props;
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
          columns={columns}
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
          onRow={(record) => ({
            onClick: () => {
              setSelectedEmployee(record);

              setDetailTabValue(0);
            },
          })}
        />
      </ConfigProvider>
    </Box>
  );
};
export default TableChiTiet;
