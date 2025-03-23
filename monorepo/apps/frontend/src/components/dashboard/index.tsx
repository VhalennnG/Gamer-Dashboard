"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Alert,
  CircularProgress,
  Snackbar,
  ThemeProvider,
  CssBaseline,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAllUsers,
  fetchUserDetails,
  resetUpdateStatus,
} from "@/store/userSlice";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import UserEditForm from "./UserEditForm";
import { cyberTheme, cyberStyles } from "@/styles/CyberTheme";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usersList, selectedUser, loading, error, updateStatus } =
    useAppSelector((state) => state.user);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Fetch all users when component mounts
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // Fetch selected user details when a user is selected
    if (selectedUserId) {
      dispatch(fetchUserDetails(selectedUserId));
      setEditMode(false);
    }
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    // Show feedback when update is complete
    if (updateStatus === "succeeded") {
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarOpen(true);
      setEditMode(false);
      dispatch(resetUpdateStatus());
    } else if (updateStatus === "failed") {
      setSnackbarMessage(error ?? "Failed to update profile");
      setSnackbarOpen(true);
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, error, dispatch]);

  const handleUserSelect = (userId: string) => {
    if (editMode && selectedUser && selectedUser.id !== userId) {
      if (
        window.confirm("You have unsaved changes. Do you want to discard them?")
      ) {
        setSelectedUserId(userId);
      }
    } else {
      setSelectedUserId(userId);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={cyberTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: cyberStyles.gradients.background,
          backgroundImage: cyberStyles.backgrounds.dotPattern,
          padding: 3,
        }}>
        <Paper
          sx={{
            p: 0,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: cyberStyles.backgrounds.glassPanel,
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: "calc(100vh - 120px)",
              position: "relative",
            }}>
            {loading && !usersList ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  p: 4,
                }}>
                <CircularProgress size={60} thickness={5} />
              </Box>
            ) : error && !editMode ? (
              <Box sx={{ p: 4, width: "100%" }}>
                <Alert
                  severity='error'
                  sx={{
                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                    border: "1px solid rgba(211, 47, 47, 0.3)",
                  }}>
                  {error}
                </Alert>
              </Box>
            ) : !usersList || usersList.length === 0 ? (
              <Box sx={{ p: 4, width: "100%" }}>
                <Alert
                  severity='info'
                  sx={{
                    backgroundColor: "rgba(0, 188, 212, 0.1)",
                    border: "1px solid rgba(0, 188, 212, 0.3)",
                    color: "#00bcd4",
                  }}>
                  No users available
                </Alert>
              </Box>
            ) : (
              <>
                {/* Set a fixed height for the parent container in desktop view */}
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: { xs: "auto", md: "calc(100vh - 120px)" },
                  }}>
                  {/* User list sidebar with fixed width but full height */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "300px" },
                      flexShrink: 0,
                      borderRight: { md: cyberStyles.borders.subtle },
                      bgcolor: "rgba(18, 18, 30, 0.5)",
                      display: "flex",
                      flexDirection: "column",
                      height: { xs: "500px", md: "100%" }, // Fixed height on mobile, full height on desktop
                    }}>
                    <UserList
                      usersList={usersList}
                      selectedUserId={selectedUserId}
                      onUserSelect={handleUserSelect}
                    />
                  </Box>

                  {/* Content area - will expand to fill available space */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      overflow: "auto",
                      background:
                        "radial-gradient(circle at center, rgba(0, 188, 212, 0.03) 0%, transparent 50%)",
                    }}>
                    {loading && selectedUserId ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}>
                        <CircularProgress />
                      </Box>
                    ) : selectedUser ? (
                      editMode ? (
                        <UserEditForm
                          user={selectedUser}
                          onCancel={() => setEditMode(false)}
                          updateStatus={updateStatus}
                        />
                      ) : (
                        <UserDetails
                          user={selectedUser}
                          onEditClick={handleEditToggle}
                        />
                      )
                    ) : (
                      <Alert
                        severity='info'
                        sx={{
                          width: "100%",
                          maxWidth: "500px",
                          backgroundColor: "rgba(0, 188, 212, 0.1)",
                          border: "1px solid rgba(0, 188, 212, 0.2)",
                          color: "#00bcd4",
                          mt: 4,
                        }}>
                        Select a user from the list to view details
                      </Alert>
                    )}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          ContentProps={{
            sx: {
              background: "rgba(0, 188, 212, 0.9)",
              backdropFilter: "blur(8px)",
              borderRadius: "4px",
              color: "#000",
              fontWeight: "medium",
              boxShadow: "0 4px 20px rgba(0, 188, 212, 0.5)",
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
