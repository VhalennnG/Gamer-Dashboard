"use client";

import React from "react";
import { Box, Button, Container, useMediaQuery, Theme } from "@mui/material";
import { Email } from "@mui/icons-material";

const Footer = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleEmailClick = () => {
    // Buka Gmail dengan alamat email yang sudah diisi
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=fanydanny237@gmail.com",
      "_blank"
    );
  };

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: "#1a1a2e",
        color: "#ffffff",
        py: 2,
        borderTop: "1px solid #292945",
        boxShadow: "0px -5px 20px rgba(0, 240, 255, 0.1)",
      }}>
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='center' alignItems='center' py={2}>
          <Button
            variant='outlined'
            startIcon={<Email />}
            onClick={handleEmailClick}
            sx={{
              color: "#00f0ff",
              border: "1px solid #00f0ff",
              borderRadius: "8px",
              padding: isMobile ? "8px 16px" : "8px 24px",
              textTransform: "none",
              fontSize: isMobile ? "14px" : "16px",
              "&:hover": {
                background: "#00f0ff",
                color: "#1a1a2e",
                boxShadow: "0 0 10px #00f0ff",
              },
            }}>
            Send Me Email
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
