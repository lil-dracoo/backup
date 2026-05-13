import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
interface LoginPasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}
const LoginPass = (props: LoginPasswordProps) => {
  const { password, setPassword } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            mb: 1.2,
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.5px",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Password
        </Typography>

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          variant="outlined"
          value={password}
          onChange={handlePassword}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        color: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "56px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              color: "white",
              transition: "all 0.3s ease",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "&.Mui-focused": {
                background: "rgba(255,255,255,0.12)",
                boxShadow: "0 0 0 3px rgba(56,189,248,0.2)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#38bdf8",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255,255,255,0.5)",
              opacity: 1,
            },
          }}
        />
      </Box>
    </>
  );
};
export default LoginPass;
