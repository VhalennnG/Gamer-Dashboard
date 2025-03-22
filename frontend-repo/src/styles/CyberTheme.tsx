// styles/cyberTheme.tsx
import { createTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

// Cyber Gaming Theme
export const cyberTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#7e57c2",
    },
    background: {
      default: "#121212",
      paper: alpha("#1a1a2e", 0.8),
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#00bcd4",
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: "0.05em",
      color: "#05d1f5",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.05) 0%, transparent 25%, transparent 100%)",
          backdropFilter: "blur(4px)",
          borderRadius: "8px",
          border: "1px solid rgba(0, 188, 212, 0.12)",
          boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(0, 188, 212, 0.15)",
            borderLeft: "3px solid #00bcd4",
            "&:hover": {
              backgroundColor: "rgba(0, 188, 212, 0.25)",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(0, 188, 212, 0.08)",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 188, 212, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #0088a3 30%, #00bcd4 90%)",
          boxShadow: "0 3px 10px 0 rgba(0, 188, 212, 0.3)",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#00bcd4",
        },
      },
    },
  },
});

// Common styles that can be reused
export const cyberStyles = {
  gradients: {
    background: "linear-gradient(135deg, #121212 0%, #1a1a2e 100%)",
    header: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)",
    buttonPrimary: "linear-gradient(45deg, #0088a3 30%, #00bcd4 90%)",
  },
  borders: {
    glow: "1px solid rgba(0, 188, 212, 0.2)",
    subtle: "1px solid rgba(0, 188, 212, 0.1)",
  },
  effects: {
    textGlow: "0 0 10px rgba(0, 188, 212, 0.5)",
    boxGlow: "0 0 8px rgba(0, 188, 212, 0.3)",
    avatarGlow: "0 0 8px rgba(0, 188, 212, 0.5)",
  },
  backgrounds: {
    dotPattern: `
      radial-gradient(circle at 10% 20%, rgba(0, 188, 212, 0.03) 0%, transparent 20%), 
      radial-gradient(circle at 90% 80%, rgba(126, 87, 194, 0.03) 0%, transparent 20%),
      linear-gradient(135deg, #121212 0%, #1a1a2e 100%)
    `,
    glassPanel: "rgba(18, 18, 30, 0.7)",
  },
  scrollbar: {
    thin: {
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: alpha("#000", 0.2),
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#05d1f5",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: alpha("#05d1f5", 0.6),
      },
    },
  },
};
