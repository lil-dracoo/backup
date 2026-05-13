import { Box, Typography } from "@mui/material";
const HeaderEmployeeRecord = (props : {isDark : boolean}) => {
    const { isDark } = props;
    return (
        <Box sx={{ mb: 3, flexShrink: 0 }}>
        <Typography
          sx={{
            fontSize: { xs: "1.6rem", md: "2rem" },
            fontWeight: 800,
            color: isDark ? "#e2e8f0" : "#0f172a",
            letterSpacing: "-0.04em",
          }}
        >
          Hồ sơ nhân viên
        </Typography>
        <Typography sx={{ color: isDark ? "#94a3b8" : "#64748b", mt: 0.5 }}>
          Xem chi tiết thông tin, lịch sử và năng lực của nhân viên
        </Typography>
      </Box>
    )
}
export default HeaderEmployeeRecord;