import React from "react";
import { Box, Paper } from "@mui/material";

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
}) => {
  return (
    <Box component='form' onSubmit={onSubmit} sx={{ height: "100%" }}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 20px)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00b8d4, #00e5ff, #9c27b0)",
          },
        }}>
        {children}
      </Paper>
    </Box>
  );
};

export default FormContainer;
