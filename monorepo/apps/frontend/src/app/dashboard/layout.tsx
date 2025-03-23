// src/app/dashboard/layout.tsx
"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <Box component='main' sx={{ p: 2 }}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
