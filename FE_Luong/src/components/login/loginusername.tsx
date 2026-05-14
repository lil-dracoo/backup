import { Box, TextField, Typography } from "@mui/material";
interface LoginUsernameProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}


const LoginUsername = (props: LoginUsernameProps) => {
  const { username, setUsername } = props;
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            mb: 1.2,
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.5px",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Username
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter your username"
          variant="outlined"
          value={username}
          onChange={handleUsername}
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
export default LoginUsername;
