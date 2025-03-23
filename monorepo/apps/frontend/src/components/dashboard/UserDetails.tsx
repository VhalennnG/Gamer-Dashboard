import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  alpha,
} from "@mui/material";
import { User } from "@/interfaces/user";
import UserAvatar from "./UserAvatar";
import StatusIndicator from "./StatusIndicator";
import EditIcon from "@mui/icons-material/Edit";
import theme from "@/theme";

// Create a theme matching your edit screen

interface UserDetailsProps {
  user: User;
  onEditClick: () => void;
}

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant='body2'
      sx={{
        color: "text.secondary",
        fontSize: "0.85rem",
        mb: 0.5,
      }}>
      {label}
    </Typography>
    <Typography
      variant='body1'
      sx={{
        fontWeight: 500,
        color: "text.primary",
      }}>
      {value}
    </Typography>
  </Box>
);

const UserDetails: React.FC<UserDetailsProps> = ({ user, onEditClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          position: "relative",
          width: "100%",
          overflow: "hidden",
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
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}>
          <Button
            variant='contained'
            color='primary'
            onClick={onEditClick}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
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
            <EditIcon sx={{ mr: 1, fontSize: 18 }} />
            EDIT
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #00e5ff, #9c27b0)",
                zIndex: -1,
              },
            }}>
            <UserAvatar
              photoURL={user.photoURL}
              displayName={user.displayName}
              width={100}
              height={100}
            />
          </Box>
          <Box sx={{ ml: 3 }}>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 600,
                background: "linear-gradient(to right, #00e5ff, #9c27b0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              {user.displayName}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                color: "primary.main",
                fontFamily: "monospace",
                fontWeight: 500,
              }}>
              @{user.username}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    user.status === "online"
                      ? "#4caf50"
                      : user.status === "away"
                      ? "#ff9800"
                      : user.status === "in-game"
                      ? "#2196f3"
                      : "#bdbdbd",
                  mr: 1,
                }}
              />
              <Typography variant='body2' sx={{ color: "text.secondary" }}>
                {user.status === "online"
                  ? "Online"
                  : user.status === "away"
                  ? "Away"
                  : user.status === "in-game"
                  ? "In Game"
                  : "Offline"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography
          variant='h6'
          gutterBottom
          sx={{
            mb: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            pb: 1,
            color: theme.palette.primary.main,
          }}>
          User Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}>
          <InfoItem label='Display Name' value={user.displayName} />
          <InfoItem label='Email' value={user.email || "Not provided"} />
          <InfoItem label='Username' value={user.username} />
          <InfoItem
            label='Phone Number'
            value={user.phoneNumber || "Not provided"}
          />
          <InfoItem
            label='Favorite Games'
            value={user.favoriteGames || "None"}
          />
          <InfoItem
            label='Preferred Regions'
            value={user.preferredRegions || "Indonesia"}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant='body2'
            sx={{
              color: "text.secondary",
              fontSize: "0.85rem",
              mb: 0.5,
            }}>
            Bio
          </Typography>
          <Typography
            variant='body1'
            sx={{
              backgroundColor: alpha("#1e1e2f", 0.5),
              p: 2,
              borderRadius: 1,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
            {user.bio || "No bio provided"}
          </Typography>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default UserDetails;
