import { Box, Chip, Avatar } from "@mui/material";
import { useState, useMemo } from "react";
import { useTheme } from "../../context/themecontext";
import {
  type GridColDef,
} from "@mui/x-data-grid";

import HeaderEmployeeRecord from "../../components/hr/employee_record/header";
import EmpTable from "../../components/hr/employee_record/card_table";
import SidePanel from "../../components/hr/employee_record/sidepanel";

// Custom toolbar với nút tùy chỉnh cột

const employeeDataSample = [
  {
    id: 1,
    maNhanVien: "NV001",
    hoTen: "Nguyễn Trúc Linh",
    viTri: "HRBP Senior",
    phongBan: "Nhân sự",
    email: "linh.nguyen@company.com",
    soDienThoai: "0912345678",
    ngaySinh: "1990-05-15",
    diaChi: "123 Nguyễn Huệ, TP.HCM",
    ngayVaoLam: "2018-03-01",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "45.5 triệu",
  },
  {
    id: 2,
    maNhanVien: "NV002",
    hoTen: "Phạm Hoàng Duy",
    viTri: "Recruiter",
    phongBan: "Nhân sự",
    email: "duy.pham@company.com",
    soDienThoai: "0923456789",
    ngaySinh: "1995-08-22",
    diaChi: "456 Lê Lợi, Hà Nội",
    ngayVaoLam: "2019-06-15",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "22.3 triệu",
  },
  {
    id: 3,
    maNhanVien: "NV003",
    hoTen: "Lê Minh Anh",
    viTri: "C&B Specialist",
    phongBan: "Nhân sự",
    email: "anh.le@company.com",
    soDienThoai: "0934567890",
    ngaySinh: "1992-12-10",
    diaChi: "789 Hàm Nghi, Đà Nẵng",
    ngayVaoLam: "2017-09-01",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "32.8 triệu",
  },
  {
    id: 4,
    maNhanVien: "NV004",
    hoTen: "Võ Gia Hân",
    viTri: "Kế toán",
    phongBan: "Kế toán",
    email: "han.vo@company.com",
    soDienThoai: "0945678901",
    ngaySinh: "1993-03-28",
    diaChi: "321 Bạch Đằng, Hải Phòng",
    ngayVaoLam: "2020-01-10",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "18.5 triệu",
  },
  {
    id: 5,
    maNhanVien: "NV005",
    hoTen: "Trần Hữu Nam",
    viTri: "Quản lý sản xuất",
    phongBan: "Sản xuất",
    email: "nam.tran@company.com",
    soDienThoai: "0956789012",
    ngaySinh: "1988-11-05",
    diaChi: "654 Phạm Văn Đồng, Cần Thơ",
    ngayVaoLam: "2016-05-20",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "38.2 triệu",
  },
  {
    id: 6,
    maNhanVien: "NV006",
    hoTen: "Lê Minh Quân",
    viTri: "Chuyên viên nhân sự",
    phongBan: "Nhân sự",
    email: "quan.le@company.com",
    soDienThoai: "0912345678",
    ngaySinh: "1994-03-14",
    diaChi: "12 Nguyễn Huệ, Đà Nẵng",
    ngayVaoLam: "2020-09-10",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "18.5 triệu",
  },

  {
    id: 7,
    maNhanVien: "NV007",
    hoTen: "Phạm Thu Hằng",
    viTri: "Kế toán trưởng",
    phongBan: "Tài chính",
    email: "hang.pham@company.com",
    soDienThoai: "0988123456",
    ngaySinh: "1987-07-22",
    diaChi: "45 Võ Văn Kiệt, TP.HCM",
    ngayVaoLam: "2015-11-03",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "32.8 triệu",
  },

  {
    id: 8,
    maNhanVien: "NV008",
    hoTen: "Nguyễn Quốc Bảo",
    viTri: "Frontend Developer",
    phongBan: "Công nghệ",
    email: "bao.nguyen@company.com",
    soDienThoai: "0933445566",
    ngaySinh: "1999-01-09",
    diaChi: "88 Lê Lợi, Huế",
    ngayVaoLam: "2023-02-15",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "21.3 triệu",
  },

  {
    id: 9,
    maNhanVien: "NV009",
    hoTen: "Đỗ Gia Huy",
    viTri: "Chuyên viên Marketing",
    phongBan: "Marketing",
    email: "huy.do@company.com",
    soDienThoai: "0977665544",
    ngaySinh: "1996-05-18",
    diaChi: "101 Trần Hưng Đạo, Hải Phòng",
    ngayVaoLam: "2021-06-01",
    loaiHopDong: "Part-time",
    trangThai: "Đang làm việc",
    luongHienTai: "15.7 triệu",
  },

  {
    id: 10,
    maNhanVien: "NV010",
    hoTen: "Bùi Thanh Tâm",
    viTri: "UI/UX Designer",
    phongBan: "Thiết kế",
    email: "tam.bui@company.com",
    soDienThoai: "0909988776",
    ngaySinh: "1997-12-30",
    diaChi: "77 Điện Biên Phủ, Nha Trang",
    ngayVaoLam: "2022-08-12",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "19.9 triệu",
  },
  {
    id: 11,
    maNhanVien: "NV011",
    hoTen: "Bùi Thanh Tâm",
    viTri: "UI/UX Designer",
    phongBan: "Thiết kế",
    email: "tam.bui@company.com",
    soDienThoai: "0909988776",
    ngaySinh: "1997-12-30",
    diaChi: "77 Điện Biên Phủ, Nha Trang",
    ngayVaoLam: "2022-08-12",
    loaiHopDong: "Full-time",
    trangThai: "Đang làm việc",
    luongHienTai: "19.9 triệu",
  },
];

const HoSoNhanVien = () => {
  const { isDark } = useTheme();
  const [selectedEmployee, setSelectedEmployee] = useState<
    (typeof employeeDataSample)[0] | null
  >(null);
  const [detailTabValue, setDetailTabValue] = useState(0);
  // const [isColumnDrawerOpen, setIsColumnDrawerOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<
    Record<string, boolean>
  >(() => {
    // Load từ localStorage nếu có
    const saved = localStorage.getItem("employeeGridColumns");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      maNhanVien: true,
      hoTen: true,
      viTri: true,
      phongBan: true,
      email: true,
      soDienThoai: true,
      ngaySinh: true,
      ngayVaoLam: true,
      luongHienTai: true,
      trangThai: true,
    };
  });

  const handleDetailTabChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setDetailTabValue(newValue);
  };

  // Định nghĩa columns - BỎ PINNED vì bản free không hỗ trợ tốt
  const employeeColumns = useMemo<GridColDef[]>(() => {
    return [
      {
        field: "maNhanVien",
        headerName: "Mã NV",
        width: 100,
        filterable: true,
      },
      {
        field: "hoTen",
        headerName: "Họ tên",
        width: 180,
        filterable: true,
        renderCell: (params) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
        field: "viTri",
        headerName: "Vị trí",
        width: 180,
        filterable: true,
      },
      {
        field: "phongBan",
        headerName: "Phòng ban",
        width: 130,
        filterable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        filterable: true,
      },
      {
        field: "soDienThoai",
        headerName: "Điện thoại",
        width: 130,
        filterable: true,
      },
      {
        field: "ngaySinh",
        headerName: "Ngày sinh",
        width: 120,
        filterable: true,
      },
      {
        field: "ngayVaoLam",
        headerName: "Ngày vào làm",
        width: 130,
        filterable: true,
      },
      {
        field: "luongHienTai",
        headerName: "Lương hiện tại",
        width: 130,
        align: "right",
        headerAlign: "right",
        filterable: true,
      },
      {
        field: "trangThai",
        headerName: "Trạng thái",
        width: 130,
        renderCell: (params) => (
          <Chip
            label={params.value as string}
            size="small"
            sx={{
              bgcolor: isDark ? "rgba(22, 163, 74, 0.2)" : "#dcfce7",
              color: isDark ? "#86efac" : "#166534",
              fontWeight: 600,
            }}
          />
        ),
        filterable: true,
      },
    ];
  }, [isDark]);

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
      {/* <HeaderEmployeeRecord isDark={isDark} /> */}

      {/* Employee Table */}
      <EmpTable
        isDark={isDark}
        employeeDataSample={employeeDataSample}
        employeeColumns={employeeColumns}
        columnVisibilityModel={columnVisibilityModel}
        setColumnVisibilityModel={setColumnVisibilityModel}
        setSelectedEmployee={setSelectedEmployee}
        setDetailTabValue={setDetailTabValue}
      />

      {/* Detail Side Panel - Giữ nguyên từ code cũ */}
      <SidePanel
        isDark={isDark}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        detailTabValue={detailTabValue}
        handleDetailTabChange={handleDetailTabChange}
      />
    </Box>
  );
};

export default HoSoNhanVien;
