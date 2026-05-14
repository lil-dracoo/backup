import { Box, Typography } from "@mui/material";
interface IHeaderProps {
  isDark: boolean;
}
const Header = (props: IHeaderProps) => {
  const { isDark } = props;
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: { xs: "1.6rem", md: "2rem" },
          fontWeight: 800,
          color: isDark ? "#e2e8f0" : "#0f172a",
          letterSpacing: "-0.04em",
        }}
      >
        HR Dashboard Overview
      </Typography>
      <Typography sx={{ color: isDark ? "#94a3b8" : "#64748b", mt: 0.5 }}>
        Theo dõi nhân sự, quỹ lương, thưởng hiệu suất và KPI phòng ban trong một
        màn hình.
      </Typography>
    </Box>
  );
};
export default Header;
