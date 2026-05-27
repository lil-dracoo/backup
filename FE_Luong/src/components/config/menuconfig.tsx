import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import TuneIcon from "@mui/icons-material/Tune";
import { GiftOutlined } from "@ant-design/icons";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const MenuConfig: Record<string, any[]> = {
  hr: [
    {
      text: "Trang chủ",
      icon: HomeIcon,
      path: "/dashboard/hr",
    },
    {
      text: "Nhân Sự",
      icon: PeopleIcon,

      children: [
        {
          text: "Hồ sơ nhân viên",
          path: "/dashboard/hr/employees",
        },

        {
          text: "Chi tiết phòng ban",
          path: "/dashboard/hr/departments",
        },

        {
          text: "Chức vụ và cấp bậc",
          path: "/dashboard/hr/levels",
        },
      ],
    },
    {
      text: "Chấm công",
      icon: TuneIcon,

      children: [
        {
          text: "Bảng chấm công",
          path: "/dashboard/hr/attendances",
        },

        {
          text: "Ca làm việc",
          path: "/dashboard/hr/schedules",
        },

        {
          text: "Tăng ca (OT)",
          path: "/dashboard/hr/ot",
        },
        {
          text: "Quản lý nghỉ phép",
          path: "/dashboard/hr/leave",
        },
      ],
    },
    {
      text: "Tiền lương",
      icon: RequestQuoteIcon,

      children: [
        {
          text: "Dữ liệu tính lương",
          path: "/dashboard/hr/salary-data",
        },

        {
          text: "Bảng lương",
          path: "/dashboard/hr/salary",
        },
      ],
    },
    {
      text: "Phúc lợi",
      icon: GiftOutlined,

      children: [
        {
          text: "Phụ cấp & khấu trừ",
          path: "/dashboard/hr/deductions",
        },
        {
          text: "Thưởng",
          path: "/dashboard/hr/bonuses",
        },
         {
          text: "Phạt",
          path: "/dashboard/hr/punishments",
        },
      ],
    },
    {
      text: "Đánh giá",
      icon: PsychologyIcon,

      children: [
        {
          text: "KPI",
          path: "/dashboard/hr/kpi",
        },

        {
          text: "Năng lực",
          path: "/dashboard/hr/competencies",
        },
        {
          text: "Xếp loại",
          path: "/dashboard/hr/ratings",
        },
      ],
    },
  ],

  emp: [
    {
      text: "Trang chủ",
      icon: HomeIcon,
      path: "/dashboard/employee",
    },
  ],

  admin: [
    {
      text: "Trang chủ",
      icon: HomeIcon,
      path: "/dashboard/admin",
    },

    // ================= TỔ CHỨC =================

    {
      text: "Quản lý tổ chức",
      icon: ApartmentIcon,

      children: [
        {
          text: "Phòng ban",
          path: "/dashboard/admin/departments",
        },

        {
          text: "Chức vụ",
          path: "/dashboard/admin/positions",
        },

        // {
        //   text: "Cấp bậc",
        //   path: "/dashboard/admin/levels",
        // },
      ],
    },

    // ================= LƯƠNG =================

    {
      text: "Lương & phụ cấp",
      icon: PaidIcon,

      children: [
        {
          text: "Lương vị trí",
          path: "/dashboard/admin/salary-config",
        },

        {
          text: "Phụ cấp",
          path: "/dashboard/admin/allowances",
        },

        {
          text: "Khấu trừ",
          path: "/dashboard/admin/deductions",
        },
      ],
    },

    // ================= KPI =================

    {
      text: "Đánh giá & KPI",
      icon: AutoGraphIcon,

      children: [
        {
          text: "Cấu hình nhóm năng lực",
          path: "/dashboard/admin/competency",
        },
        {
          text: "Cấu hình khung năng lực",
          path: "/dashboard/admin/competency-framework",
        },

        {
          text: "Cấu hình KPI",
          path: "/dashboard/admin/kpi",
        },
      ],
    },
    // ================= QUYỀN =================

    {
      text: "Quyền hệ thống",
      icon: AdminPanelSettingsIcon,

      children: [
        {
          text: "Vai trò",
          path: "/dashboard/admin/roles",
        },

        {
          text: "Phân quyền",
          path: "/dashboard/admin/permissions",
        },
      ],
    },
  ],
};
