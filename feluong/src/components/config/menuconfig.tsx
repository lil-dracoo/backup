import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import TuneIcon from '@mui/icons-material/Tune';
export const MenuConfig: Record<string, any[]> = {
  hr: [
    { text: "Trang chủ", icon: HomeIcon, path: "/dashboard/hr" },
    {
      text: "Hồ sơ nhân viên",
      icon: PeopleIcon,
      path: "/dashboard/hr/employees",
    },
    {
      text: "Dữ liệu lương tháng",
      icon: RequestQuoteIcon,
      path: "/dashboard/hr/salary-data",
    },
    {
      text: "Thiết lập khấu trừ",
      icon: TuneIcon,
      path: "/dashboard/hr/deductions",
    },
    {
      text: "Thiết lập khung năng lực",
      icon: AutoGraphIcon,
      path: "/dashboard/hr/evaluation",
    },
    {
      text: "Đánh giá năng lực",
      icon: PsychologyIcon,
      path: "/dashboard/hr/competencies",
    },
  ],
  emp: [{ text: "Trang chủ", icon: HomeIcon, path: "/dashboard/employee" }],
};
