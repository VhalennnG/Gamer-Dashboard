import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

interface FormButtonProps {
  onCancel: () => void;
  updateStatus: string;
}

const FormButton: React.FC<FormButtonProps> = ({ onCancel, updateStatus }) => {
  return (
    <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}>
      <Button
        variant='outlined'
        color='secondary'
        onClick={onCancel}
        disabled={updateStatus === "loading"}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}>
        Cancel
      </Button>

      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={updateStatus === "loading"}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
            transform: "translateX(-100%)",
            transition: "transform 0.6s ease-in-out",
          },
          "&:hover::after": {
            transform: "translateX(100%)",
          },
        }}>
        {updateStatus === "loading" ? (
          <CircularProgress size={24} color='inherit' />
        ) : (
          "Save"
        )}
      </Button>
    </Box>
  );
};

export default FormButton;
