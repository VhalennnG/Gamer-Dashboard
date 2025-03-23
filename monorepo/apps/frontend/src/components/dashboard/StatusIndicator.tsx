import React from "react";
import { Box } from "@mui/material";

interface StatusIndicatorProps {
  status: "online" | "offline" | "in-game" | "away";
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  // Define status configurations
  const statusConfig = {
    online: {
      color: "success.main",
      label: "Online",
    },
    offline: {
      color: "text.disabled",
      label: "Offline",
    },
    "in-game": {
      color: "primary.main",
      label: "In-Game",
    },
    away: {
      color: "warning.main",
      label: "Away",
    },
  };

  const { color, label } = statusConfig[status];

  return (
    <Box
      component='span'
      sx={{
        color: color,
        display: "inline-flex",
        alignItems: "center",
      }}>
      <Box
        component='span'
        sx={{
          width: 8,
          height: 8,
          bgcolor: color,
          borderRadius: "50%",
          display: "inline-block",
          mr: 0.5,
        }}
      />
      {label}
    </Box>
  );
};

export default StatusIndicator;
