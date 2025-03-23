"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GamepadIcon from "@mui/icons-material/Gamepad";

import {
  CyberPaper,
  CyberButton,
  CyberTextField,
  GlowingText,
} from "@/styles/LoginFormStyle";

import "@/styles/login-animation.css";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [glowEffect, setGlowEffect] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setGlowEffect((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);

      console.log("user token : ", token);

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b1219 0%, #172436 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        padding: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${
            50 + Math.sin(glowEffect / 10) * 20
          }% ${
            50 + Math.cos(glowEffect / 10) * 20
          }%, rgba(0, 199, 255, 0.15), transparent 50%)`,
          pointerEvents: "none",
        },
      }}>
      <CyberPaper>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <GamepadIcon
            sx={{
              fontSize: 80,
              color: "#00f3ff",
              filter: "drop-shadow(0 0 10px rgba(0, 243, 255, 0.7))",
              animation: "pulse 2s infinite ease-in-out",
            }}
          />
        </Box>

        <GlowingText variant='h4' gutterBottom>
          ^ _ ^
        </GlowingText>

        <Typography
          variant='subtitle1'
          sx={{
            textAlign: "center",
            color: "#adbac7",
            mb: 4,
            fontFamily: '"Rajdhani", sans-serif',
          }}>
          Login to access main dashboard
        </Typography>

        {error && (
          <Typography
            color='#ff4757'
            sx={{
              mb: 2,
              textAlign: "center",
              backgroundColor: "rgba(255, 71, 87, 0.1)",
              border: "1px solid rgba(255, 71, 87, 0.3)",
              borderRadius: "4px",
              padding: "8px",
              fontFamily: '"Rajdhani", sans-serif',
            }}>
            {error}
          </Typography>
        )}

        <Box component='form' onSubmit={handleLogin} noValidate>
          <CyberTextField
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: "#00f3ff" }} />,
            }}
          />

          <CyberTextField
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: "#00f3ff" }} />,
            }}
          />

          <CyberButton type='submit' fullWidth disabled={loading}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "ACCESS NOW"
            )}
          </CyberButton>
        </Box>
      </CyberPaper>
    </Box>
  );
};

export default LoginForm;
