import { Box, Card, CardContent } from "@mui/material";
import type { ColumnsType } from "antd/es/table";

import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

import { useMemo, useState } from "react";
import Toolbar from "./toolbar";
import FromTuyChinhCot from "./from_tuy_chinh_cot";
import TableChiTiet from "./table_chitiet";

interface IEmpTableProps {
  isDark: boolean;
  employeeDataSample: any[];
  employeeColumns: any[];
  columnVisibilityModel: any;
  setColumnVisibilityModel: (model: any) => void;
  setSelectedEmployee: (employee: any) => void;
  setDetailTabValue: React.Dispatch<React.SetStateAction<number>>;
}

// =========================
// RESIZE HEADER
// =========================

const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      minConstraints={[60, 0]}
      maxConstraints={[600, 0]}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const EmpTable = (props: IEmpTableProps) => {
  const {
    isDark,
    employeeDataSample,
    employeeColumns,
    columnVisibilityModel,
    setColumnVisibilityModel,
    setSelectedEmployee,
    setDetailTabValue,
  } = props;

  const [searchText, setSearchText] = useState("");

  const [openDrawer, setOpenDrawer] = useState(false);

  // =========================
  // COLUMN WIDTH
  // =========================

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    () => {
      const saved = localStorage.getItem("columnWidths");

      return saved ? JSON.parse(saved) : {};
    },
  );

  const handleResize =
    (field: string) =>
    (_: any, { size }: any) => {
      const newWidths = {
        ...columnWidths,

        [field]: Math.max(60, Math.min(size.width, 600)),
      };

      setColumnWidths(newWidths);

      localStorage.setItem("columnWidths", JSON.stringify(newWidths));
    };

  // =========================
  // PIN COLUMN
  // =========================

  const [pinnedColumns, setPinnedColumns] = useState<string[]>(
    JSON.parse(localStorage.getItem("pinnedColumns") || "[]"),
  );

  const togglePinColumn = (field: string) => {
    let newPinnedColumns: string[] = [];

    if (pinnedColumns.includes(field)) {
      newPinnedColumns = pinnedColumns.filter((item) => item !== field);
    } else {
      newPinnedColumns = [...pinnedColumns, field];
    }

    setPinnedColumns(newPinnedColumns);

    localStorage.setItem("pinnedColumns", JSON.stringify(newPinnedColumns));
  };

  // =========================
  // SEARCH
  // =========================

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return employeeDataSample;

    const keyword = searchText.toLowerCase();

    return employeeDataSample.filter((item) => {
      return (
        item.hoTen?.toLowerCase().includes(keyword) ||
        item.maNhanVien?.toLowerCase().includes(keyword) ||
        item.phongBan?.toLowerCase().includes(keyword) ||
        item.viTri?.toLowerCase().includes(keyword)
      );
    });
  }, [employeeDataSample, searchText]);

  // =========================
  // COLUMN
  // =========================

  const visibleColumns = employeeColumns.filter(
    (col: any) => columnVisibilityModel[col.field] !== false,
  );

  const pinned = visibleColumns.filter((col: any) =>
    pinnedColumns.includes(col.field),
  );

  const normal = visibleColumns.filter(
    (col: any) => !pinnedColumns.includes(col.field),
  );

  const orderedColumns = [...pinned, ...normal];

  const columns: ColumnsType<any> = orderedColumns.map((col: any) => {
    return {
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            userSelect: "none",
          }}
        >
          <span>{col.headerName}</span>

          <span
            onClick={(e) => {
              e.stopPropagation();

              togglePinColumn(col.field);
            }}
            style={{
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {pinnedColumns.includes(col.field) ? "📌" : "📍"}
          </span>
        </Box>
      ),

      dataIndex: col.field,

      key: col.field,

      width: columnWidths[col.field] || col.width || 180,

      fixed: pinnedColumns.includes(col.field) ? "left" : undefined,

      onHeaderCell: () => ({
        width: columnWidths[col.field] || col.width || 180,

        onResize: handleResize(col.field),
      }),

      sorter: (a: any, b: any) => {
        const valueA = a[col.field];

        const valueB = b[col.field];

        if (typeof valueA === "number") {
          return valueA - valueB;
        }

        return String(valueA || "").localeCompare(String(valueB || ""));
      },

      render: (value: any, record: any) => {
        if (col.renderCell) {
          return col.renderCell({
            value,
            row: record,
          });
        }

        return value;
      },
    };
  });

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,

          border: isDark
            ? "1px solid rgba(71, 85, 105, 0.3)"
            : "1px solid rgba(226,232,240,0.9)",

          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",

          background: isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(255,255,255,0.92)",

          overflow: "hidden",

          flex: 1,

          display: "flex",

          flexDirection: "column",

          minHeight: 0,
        }}
      >
        <CardContent
          sx={{
            p: 0,

            height: "calc(100vh - 0px)",
            width: "100%",

            display: "flex",

            flexDirection: "column",
            
          }}
        >
          {/* TOOLBAR */}

          <Toolbar
            isDark={isDark}
            setOpenDrawer={setOpenDrawer}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          {/* TABLE */}

          <TableChiTiet
            isDark={isDark}
            columns={columns}
            filteredData={filteredData}
            setSelectedEmployee={setSelectedEmployee}
            setDetailTabValue={setDetailTabValue}
            ResizableTitle={ResizableTitle}
          />
        </CardContent>
      </Card>
      {/* DRAWER */}

      <FromTuyChinhCot
        isDark={isDark}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        columnVisibilityModel={columnVisibilityModel}
        setColumnVisibilityModel={setColumnVisibilityModel}
        employeeColumns={employeeColumns}
      />
    </>
  );
};

export default EmpTable;
