import { styled } from "@mui/material/styles";
import { Button, TextField, Typography, Paper } from "@mui/material";

// Styled components for login form
export const CyberPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(135deg, #0f1923 0%, #1a2e3b 100%)",
  border: "2px solid #00f3ff",
  boxShadow: "0 0 20px rgba(0, 243, 255, 0.5), 0 0 40px rgba(0, 243, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(5),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: "linear-gradient(90deg, #00f3ff, #0077ff, #00f3ff)",
    animation: "glowingBorder 2s infinite linear",
  },
}));

export const CyberButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #00c3ff 0%, #0077ff 100%)",
  color: "#ffffff",
  fontWeight: "bold",
  letterSpacing: "1px",
  padding: "12px",
  textTransform: "uppercase",
  border: "none",
  borderRadius: "4px",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 0 15px rgba(0, 199, 255, 0.8)",
    transform: "translateY(-2px)",
    background: "linear-gradient(90deg, #00d4ff 0%, #0088ff 100%)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
    transform: "rotate(45deg)",
    animation: "glowingEffect 2s infinite",
  },
}));

export const CyberTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    backgroundColor: "rgba(16, 23, 41, 0.8)",
    color: "#ffffff",
    transition: "all 0.3s",
    "& fieldset": {
      borderColor: "#0088ff",
    },
    "&:hover fieldset": {
      borderColor: "#00f3ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00f3ff",
      borderWidth: "2px",
      boxShadow: "0 0 10px rgba(0, 243, 255, 0.5)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#adbac7",
    "&.Mui-focused": {
      color: "#00f3ff",
    },
  },
  "& .MuiInputAdornment-root": {
    color: "#00f3ff",
  },
}));

export const GlowingText = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: "bold",
  textAlign: "center",
  letterSpacing: "2px",
  position: "relative",
  textShadow:
    "0 0 10px rgba(0, 243, 255, 0.7), 0 0 20px rgba(0, 243, 255, 0.5)",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "3px",
    background: "linear-gradient(90deg, #0077ff, #00f3ff, #0077ff)",
  },
}));
