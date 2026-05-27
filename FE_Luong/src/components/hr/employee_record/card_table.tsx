import {
  Box,
  Card,
  CardContent,
  Popover,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import type { ColumnsType } from "antd/es/table";
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

import {  useMemo, useState } from "react";
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

// =========================
// FILTER COMPONENT
// =========================

interface FilterPopoverProps {
  isDark: boolean;
  column: any;
  data: any[];
  filterValue: string[];
  onFilterChange: (values: string[]) => void;
}

const FilterPopover = ({
  isDark,
  column,
  data,
  filterValue,
  onFilterChange,
}: FilterPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(filterValue);

  const uniqueValues = useMemo(() => {
    const values = data
      .map((item) => {
        const value = item[column.field];
        if (value && typeof value === "string") {
          return value;
        }
        return null;
      })
      .filter((v): v is string => v !== null && v !== undefined && v !== "");

    return [...new Set(values)].sort();
  }, [data, column.field]);

  const filteredValues = useMemo(() => {
    if (!searchTerm) return uniqueValues;
    return uniqueValues.filter((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [uniqueValues, searchTerm]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm("");
  };

  const handleToggleValue = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleApply = () => {
    onFilterChange(selectedValues);
    handleClose();
  };

  const handleClear = () => {
    setSelectedValues([]);
    onFilterChange([]);
    handleClose();
  };

  const handleSelectAll = () => {
    if (selectedValues.length === filteredValues.length) {
      setSelectedValues([]);
    } else {
      setSelectedValues([...filteredValues]);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? `filter-popover-${column.field}` : undefined;

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          p: 0.5,
          ml: 0.5,
          color:
            filterValue.length > 0 ? "#2563eb" : isDark ? "#94a3b8" : "#64748b",
          "&:hover": {
            bgcolor: isDark
              ? "rgba(100, 116, 139, 0.2)"
              : "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <FilterIcon sx={{ fontSize: 16 }} />
        {filterValue.length > 0 && (
          <Box
            component="span"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 8,
              height: 8,
              bgcolor: "#2563eb",
              borderRadius: "50%",
            }}
          />
        )}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 320,

              maxHeight: 500,

              overflow: "hidden",

              borderRadius: "24px",

              backdropFilter: "blur(20px)",

              background: isDark
                ? "linear-gradient(145deg, #0f172a, #1e293b)"
                : "linear-gradient(145deg, #ffffff, #f8fafc)",

              color: isDark ? "#f8fafc" : "#0f172a",

              border: isDark
                ? "1px solid rgba(148,163,184,0.15)"
                : "1px solid rgba(226,232,240,0.9)",

              boxShadow: isDark
                ? "0 25px 60px rgba(0,0,0,0.55)"
                : "0 25px 60px rgba(15,23,42,0.12)",
            },
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          {/* HEADER */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: "0.95rem",

                color: isDark ? "#f8fafc" : "#0f172a",
              }}
            >
              Lọc theo {column.headerName}
            </Typography>

            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",

                transition: "all 0.2s ease",

                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(59,130,246,0.12)"
                    : "rgba(37,99,235,0.06)",

                  transform: "rotate(90deg)",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>

          {/* SEARCH */}

          <TextField
            size="small"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <SearchIcon
                    sx={{
                      fontSize: 16,

                      mr: 1.2,

                      color: isDark ? "#94a3b8" : "#64748b",
                    }}
                  />
                ),
              },
            }}
            sx={{
              mb: 2,

              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",

                px: 1,

                py: 0.15,

                backdropFilter: "blur(14px)",

                background: isDark
                  ? "rgba(15,23,42,0.88)"
                  : "rgba(248,250,252,0.92)",

                transition: "all 0.25s ease",

                boxShadow: isDark
                  ? "0 8px 25px rgba(0,0,0,0.35)"
                  : "0 8px 25px rgba(15,23,42,0.06)",

                "& input": {
                  color: isDark ? "#f8fafc" : "#0f172a",

                  fontSize: "0.92rem",

                  fontWeight: 500,
                },

                "& input::placeholder": {
                  color: isDark ? "#94a3b8" : "#64748b",

                  opacity: 1,
                },

                "& fieldset": {
                  borderColor: isDark ? "rgba(148,163,184,0.15)" : "#e2e8f0",
                },

                "&:hover fieldset": {
                  borderColor: isDark ? "#475569" : "#cbd5e1",
                },

                "&.Mui-focused": {
                  transform: "translateY(-1px)",

                  boxShadow: isDark
                    ? "0 0 0 4px rgba(37,99,235,0.18)"
                    : "0 0 0 4px rgba(37,99,235,0.12)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#2563eb",

                  borderWidth: "1.5px",
                },
              },
            }}
          />

          {/* ACTION */}

          <Box
            sx={{
              mb: 1.5,

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              gap: 1,
            }}
          >
            <Button
              size="small"
              onClick={handleSelectAll}
              variant="text"
              sx={{
                color: "#2563eb",

                textTransform: "none",

                fontSize: "0.78rem",

                fontWeight: 700,

                borderRadius: "10px",

                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(37,99,235,0.12)"
                    : "rgba(37,99,235,0.06)",
                },
              }}
            >
              {selectedValues.length === filteredValues.length &&
              filteredValues.length > 0
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </Button>

            <Button
              size="small"
              onClick={handleClear}
              variant="text"
              sx={{
                color: isDark ? "#f87171" : "#ef4444",

                textTransform: "none",

                fontSize: "0.78rem",

                fontWeight: 700,

                borderRadius: "10px",

                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(248,113,113,0.12)"
                    : "rgba(239,68,68,0.06)",
                },
              }}
            >
              Xóa lọc
            </Button>
          </Box>

          {/* LIST */}

          <List
            sx={{
              maxHeight: 250,

              overflow: "auto",

              p: 0.5,

              "&::-webkit-scrollbar": {
                width: "6px",
              },

              "&::-webkit-scrollbar-thumb": {
                background: isDark
                  ? "rgba(148,163,184,0.35)"
                  : "rgba(148,163,184,0.5)",

                borderRadius: "20px",
              },
            }}
          >
            {filteredValues.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",

                  py: 4,
                }}
              >
                <Typography
                  sx={{
                    color: isDark ? "#94a3b8" : "#64748b",
                  }}
                >
                  Không tìm thấy kết quả
                </Typography>
              </Box>
            ) : (
              filteredValues.map((value) => (
                <ListItem
                  key={value}
                  dense
                  onClick={() => handleToggleValue(value)}
                  sx={{
                    borderRadius: "14px",

                    mb: 0.7,

                    cursor: "pointer",

                    transition: "all 0.2s ease",

                    bgcolor: selectedValues.includes(value)
                      ? isDark
                        ? "rgba(37,99,235,0.16)"
                        : "rgba(37,99,235,0.08)"
                      : "transparent",

                    "&:hover": {
                      transform: "translateX(2px)",

                      bgcolor: isDark
                        ? "rgba(59,130,246,0.12)"
                        : "rgba(37,99,235,0.05)",
                    },
                  }}
                >
                  <Checkbox
                    checked={selectedValues.includes(value)}
                    size="small"
                    sx={{
                      color: isDark ? "#94a3b8" : "#64748b",

                      "&.Mui-checked": {
                        color: "#2563eb",
                      },
                    }}
                  />

                  <ListItemText
                    primary={value}
                    slotProps={{
                      primary: {
                        sx: {
                          color: isDark ? "#f8fafc" : "#0f172a",

                          fontSize: "0.9rem",

                          fontWeight: selectedValues.includes(value) ? 700 : 500,
                        },
                      },
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>

          {/* FOOTER */}

          <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClose}
              sx={{
                textTransform: "none",

                borderRadius: "14px",

                py: 1,

                fontWeight: 700,

                borderColor: isDark ? "rgba(148,163,184,0.15)" : "#e2e8f0",

                color: isDark ? "#cbd5e1" : "#475569",

                bgcolor: isDark ? "rgba(15,23,42,0.65)" : "#ffffff",

                "&:hover": {
                  borderColor: isDark ? "#475569" : "#cbd5e1",

                  bgcolor: isDark ? "rgba(30,41,59,0.9)" : "#f8fafc",
                },
              }}
            >
              Hủy
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={handleApply}
              sx={{
                textTransform: "none",

                borderRadius: "14px",

                py: 1,

                fontWeight: 800,

                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",

                boxShadow: "0 10px 25px rgba(37,99,235,0.28)",

                "&:hover": {
                  background: "linear-gradient(135deg, #1d4ed8, #1e40af)",

                  transform: "translateY(-1px)",
                },
              }}
            >
              Áp dụng ({selectedValues.length})
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
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
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>(
    {},
  );

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
  // HANDLE FILTER CHANGE
  // =========================

  const handleFilterChange = (field: string, values: string[]) => {
    setColumnFilters((prev) => {
      if (values.length === 0) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: values };
    });
  };

  // =========================
  // SEARCH & FILTER
  // =========================

  const filteredData = useMemo(() => {
    let data = [...employeeDataSample];

    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      data = data.filter((item) => {
        return (
          item.ho_ten?.toLowerCase().includes(keyword) ||
          item.cccd?.toLowerCase().includes(keyword) ||
          item.phong_ban?.toLowerCase().includes(keyword) ||
          item.vi_tri?.toLowerCase().includes(keyword)
        );
      });
    }

    for (const [field, filterValues] of Object.entries(columnFilters)) {
      if (filterValues.length > 0) {
        data = data.filter((item) => {
          const value = item[field];
          return filterValues.includes(value);
        });
      }
    }

    return data;
  }, [employeeDataSample, searchText, columnFilters]);

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
            justifyContent: "space-between",
            gap: 1,
            userSelect: "none",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: isDark ? "#f1f5f9" : "#0f172a" }}
            >
              {col.headerName}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                togglePinColumn(col.field);
              }}
              sx={{
                p: 0,
                color: isDark ? "#94a3b8" : "#64748b",
                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(100, 116, 139, 0.2)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              {pinnedColumns.includes(col.field) ? "📌" : "📍"}
            </IconButton>
          </Box>

          <FilterPopover
            isDark={isDark}
            column={col}
            data={employeeDataSample}
            filterValue={columnFilters[col.field] || []}
            onFilterChange={(values) => handleFilterChange(col.field, values)}
          />
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
        return (
          <Typography
            variant="body2"
            sx={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
          >
            {value}
          </Typography>
        );
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
          background: isDark ? "#0f172a" : "rgba(255,255,255,0.92)",
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
          <Toolbar
            isDark={isDark}
            setOpenDrawer={setOpenDrawer}
            searchText={searchText}
            setSearchText={setSearchText}
          />

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
