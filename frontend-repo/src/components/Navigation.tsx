"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  Theme,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { Menu, LogOut } from "lucide-react";

const Navigation: React.FC = () => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src='/logo.png'
            alt='App Logo'
            width={180}
            height={180}
            style={{ marginRight: "12px", objectFit: "contain" }}
          />
        </Box>

        {isMobile ? (
          <>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={handleDrawerToggle}
              sx={{
                color: "#00f0ff",
                "&:hover": { color: "#f72585" },
              }}>
              <Menu />
            </IconButton>
            <Drawer
              anchor='right'
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 200,
                  background: "#1a1a2e",
                  color: "#00f0ff",
                  boxShadow: "0px 0px 20px #00f0ff",
                },
              }}>
              <List>
                <ListItem>
                  <Button
                    fullWidth
                    startIcon={<LogOut />}
                    onClick={handleLogout}
                    sx={{
                      color: "#00f0ff",
                      border: "1px solid #00f0ff",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      textTransform: "none",
                      "&:hover": {
                        background: "#00f0ff",
                        color: "#1a1a2e",
                        boxShadow: "0 0 10px #00f0ff",
                      },
                    }}>
                    Logout
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Button
            onClick={handleLogout}
            startIcon={<LogOut />}
            sx={{
              color: "#00f0ff",
              border: "1px solid #00f0ff",
              borderRadius: "8px",
              padding: "10px 16px",
              textTransform: "none",
              "&:hover": {
                background: "#00f0ff",
                color: "#1a1a2e",
                boxShadow: "0 0 10px #00f0ff",
              },
            }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
