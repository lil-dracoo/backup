import { Box, Chip, Avatar } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../../context/themecontext";
import { type GridColDef } from "@mui/x-data-grid";

import EmpTable from "../../components/hr/employee_record/card_table";


import { GetData_NhanVien } from "../../services/api.service";

const HoSoNhanVien = () => {
  const { isDark } = useTheme();

  // =========================
  // API DATA
  // =========================

  const [employeeDataSample, setEmployeeDataSample] = useState<any[]>([]);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const req = await GetData_NhanVien();

      console.log(req.data.data);

      // ADD ID CHO TABLE
      const dataWithId = req.data.data.map(
        (item: any, index: number) => ({
          ...item,
          id: index + 1,
        }),
      );

      setEmployeeDataSample(dataWithId);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DETAIL PANEL
  // =========================

  const [, setSelectedEmployee] =
    useState<any | null>(null);

  const [, setDetailTabValue] = useState(0);



  // =========================
  // COLUMN VISIBILITY
  // =========================

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<
    Record<string, boolean>
  >(() => {
    const saved = localStorage.getItem("employeeGridColumns");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      cccd: true,
      ho_ten: true,
      vi_tri: true,
      phong_ban: true,
      email: true,
      sdt: true,
      ngay_sinh: true,
      ngay_vao_lam: true,
      luong_hien_tai: true,
      trang_thai: true,
    };
  });

  // =========================
  // COLUMNS
  // =========================

  const employeeColumns = useMemo<GridColDef[]>(() => {
    return [
      {
        field: "cccd",
        headerName: "Mã NV",
        width: 120,
        filterable: true,
      },

      {
        field: "ho_ten",
        headerName: "Họ tên",
        width: 220,
        filterable: true,

        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: "0.75rem",
                bgcolor: "#2563eb",
              }}
            >
              {params.value?.charAt(0) || "N"}
            </Avatar>

            {params.value}
          </Box>
        ),
      },

      {
        field: "vi_tri",
        headerName: "Vị trí",
        width: 180,
        filterable: true,
      },

      {
        field: "phong_ban",
        headerName: "Phòng ban",
        width: 150,
        filterable: true,
      },

      {
        field: "email",
        headerName: "Email",
        width: 250,
        filterable: true,
      },

      {
        field: "sdt",
        headerName: "Điện thoại",
        width: 140,
        filterable: true,
      },

      {
        field: "ngay_sinh",
        headerName: "Ngày sinh",
        width: 140,
        filterable: true,
      },

      {
        field: "ngay_vao_lam",
        headerName: "Ngày vào làm",
        width: 160,
        filterable: true,
      },

      {
        field: "luong_hien_tai",
        headerName: "Lương hiện tại",
        width: 160,
        align: "right",
        headerAlign: "right",
        filterable: true,
      },

      {
        field: "trang_thai",
        headerName: "Trạng thái",
        width: 150,
        filterable: true,

        renderCell: (params) => (
          <Chip
            label={params.value as string}
            size="small"
            sx={{
              bgcolor: isDark
                ? "rgba(22, 163, 74, 0.2)"
                : "#dcfce7",

              color: isDark ? "#86efac" : "#166534",

              fontWeight: 600,
            }}
          />
        ),
      },
    ];
  }, [isDark]);

  // =========================
  // RENDER
  // =========================

  return (
    <Box
      sx={{
        height: "108vh",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",

        p: {
          xs: 0.5,
          md: 0,
        },
      }}
    >
      <EmpTable
        isDark={isDark}
        employeeDataSample={employeeDataSample}
        employeeColumns={employeeColumns}
        columnVisibilityModel={columnVisibilityModel}
        setColumnVisibilityModel={setColumnVisibilityModel}
        setSelectedEmployee={setSelectedEmployee}
        setDetailTabValue={setDetailTabValue}
      />

      </Box>
  );
};

export default HoSoNhanVien;