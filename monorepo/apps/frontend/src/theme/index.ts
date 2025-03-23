import { createTheme, alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00e5ff",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#121212",
      paper: "#1e1e2f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#304050",
            },
            "&:hover fieldset": {
              borderColor: "#00b8d4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00e5ff",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#b0b0b0",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#00e5ff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "linear-gradient(45deg, #00b8d4 30%, #00e5ff 90%)",
          boxShadow: "0 3px 5px 2px rgba(0, 229, 255, .3)",
        },
        outlinedSecondary: {
          borderColor: "#9c27b0",
          color: "#9c27b0",
          "&:hover": {
            borderColor: "#bd58c6",
            backgroundColor: alpha("#9c27b0", 0.1),
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(to bottom right, #1e1e2f, #2a2a45)",
          borderLeft: "1px solid #304050",
          borderTop: "1px solid #304050",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#00e5ff",
          "&:hover": {
            backgroundColor: alpha("#00e5ff", 0.1),
          },
        },
      },
    },
  },
});

export default theme;
