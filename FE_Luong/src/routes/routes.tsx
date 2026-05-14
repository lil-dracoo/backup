import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/login";
import ProtectedRoute from "./protectedroute";
import HRDashboard from "../pages/hr/hrdashboard";
import AccountDashboard from "../pages/account/acdashboard";
import ManagerDashboard from "../pages/manager/manadashboard";
import EmployeeDashboard from "../pages/employee/empldashboard";
import BoardDashboard from "../pages/board/dashboard";
import MainLayout from "../layout/mainlayout";
import HoSoNhanVien from "../pages/hr/hosonhanvien";
import DuLieuTinhLuong from "../pages/hr/dulieutinhluong";
import ThietLapKhauTru from "../pages/hr/thietlapkhautru";
import DanhGiaNangLuc from "../pages/hr/thietlapdanhgia";
import NhapDanhGiaNangLuc from "../pages/hr/danhgianangluc";

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
            <Route path="salary-data" element={<DuLieuTinhLuong />} />
            <Route path="deductions" element={<ThietLapKhauTru />} />
            <Route path="evaluation" element={<DanhGiaNangLuc />} />
            <Route path="competencies" element={<NhapDanhGiaNangLuc />} />
        </Route>





        <Route path="account" element={<AccountDashboard />} />
        <Route path="manager" element={<ManagerDashboard />} />
        <Route path="emp" element={<EmployeeDashboard />} />
        <Route path="board" element={<BoardDashboard />} />
      </Route>
    </Routes>
  );
}
