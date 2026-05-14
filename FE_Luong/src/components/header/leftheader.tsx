import { Box, Typography } from "@mui/material";
import { usePageTitle } from "../../hooks/usepagetitle";
interface LeftHeaderProps {
  isDark: boolean;
}
const LeftHeader = (props: LeftHeaderProps) => {
  const { isDark } = props;
  const title = usePageTitle();
  return (
    <Box sx={{ minWidth: "200px" }}>
      <Typography
        sx={{
          fontWeight: 600,
          color: isDark ? "#e2e8f0" : "#111827",
          fontSize: "25px",
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
export default LeftHeader;
