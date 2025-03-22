import React from "react";
import { Box } from "@mui/material";

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        pr: 1,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(30, 30, 47, 0.5)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#05d1f5",
          borderRadius: "10px",
        },
      }}>
      {children}
    </Box>
  );
};

export default ScrollableContainer;
