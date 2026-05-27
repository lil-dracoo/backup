import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/login";
import ProtectedRoute from "./protectedroute";
import HRDashboard from "../pages/hr/hrdashboard";
import MainLayout from "../layout/mainlayout";
import HoSoNhanVien from "../pages/hr/hosonhanvien";
import DuLieuTinhLuong from "../pages/hr/dulieutinhluong";
import ThietLapKhauTru from "../pages/admin/thietlapkhautru";
import DanhGiaNangLuc from "../pages/admin/thietlapdanhgia";
import HoSoChitiet from "../pages/hr/nhanvienchitiet";
import ADTrangChu from "../pages/admin/trangchu";
import QuanLyPhongBan from "../pages/admin/phongban";
import CauHinhKPI from "../pages/admin/thietlapKPI";
import ThietLapPhuCap from "../pages/admin/thietlapphucap";
import CauHinhLuongP1 from "../pages/admin/thietlapluongvitri";
import QuanLyPhongBanHR from "../pages/hr/chitietphongban";
import ChucVuCapBacHR from "../pages/hr/chucvucapbac";
import DanhGiaNangLucHR from "../pages/hr/danhgianangluc";
import KPIHRDashboard from "../pages/hr/kpi";
import BangChamCongHR from "../pages/hr/bangchamcong";
import QuyDoiHeSoP2 from "../pages/admin/khungnangluc";
import QuanLyChucVu from "../pages/admin/chucVu";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      > 

        <Route path="hr">
            <Route index element={<HRDashboard />} />
            <Route path="employees" element={<HoSoNhanVien />} />
            <Route path="employees/:id" element={<HoSoChitiet />} />
            <Route path="salary-data" element={<DuLieuTinhLuong />} />
            <Route path="departments" element={<QuanLyPhongBanHR />} />
            <Route path="competencies" element={<DanhGiaNangLucHR />} />
            <Route path="levels" element={<ChucVuCapBacHR />} />
            <Route path="kpi" element={<KPIHRDashboard />} />
            <Route  path="attendances" element={<BangChamCongHR />} />
        </Route>

       <Route path="admin">
        <Route  index element={<ADTrangChu />} />
        <Route  path="deductions" element={<ThietLapKhauTru />} />
        <Route  path="competency" element={<DanhGiaNangLuc />} />
        <Route  path="departments" element={<QuanLyPhongBan />} />
        <Route  path="kpi" element={<CauHinhKPI />} />
        <Route  path="allowances" element={<ThietLapPhuCap />} />
        <Route  path="salary-config" element={<CauHinhLuongP1 />} />
        <Route  path="competency-framework" element={<QuyDoiHeSoP2 />} />
        <Route  path="positions" element={<QuanLyChucVu />} />
       </Route>


        {/* <Route path="account" element={<AccountDashboard />} />
        <Route path="manager" element={<ManagerDashboard />} />
        <Route path="emp" element={<EmployeeDashboard />} />
        <Route path="board" element={<BoardDashboard />} /> */}
      </Route>
    </Routes>
  );
}
