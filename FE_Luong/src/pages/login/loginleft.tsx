import { Box, Typography } from "@mui/material";

const LoginLeft = () => {
    return(
        <>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3.5rem",
                lg: "4rem",
              },
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-2px",
              maxWidth: "600px",
            }}
          >
            Welcome to Payroll Management System
          </Typography>
        </Box>
        </>
    )
}
export default LoginLeft;