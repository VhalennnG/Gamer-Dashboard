"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import EmulatorTest from "@/components/EmulatorTest";
import { Container, Paper, Typography } from "@mui/material";

export default function EmulatorTestPage() {
  return (
    <Provider store={store}>
      <Container maxWidth='md' style={{ marginTop: 32, marginBottom: 32 }}>
        <Paper style={{ padding: 24 }}>
          <Typography variant='h4' gutterBottom>
            Firebase Emulator Test Page
          </Typography>
          <Typography variant='body1' paragraph>
            This page tests the connection between your Next.js frontend and the
            Firebase Functions Emulator. Make sure you've started the emulator
            with the command: <code>npm run test-with-emulator</code>
          </Typography>

          <EmulatorTest />
        </Paper>
      </Container>
    </Provider>
  );
}
