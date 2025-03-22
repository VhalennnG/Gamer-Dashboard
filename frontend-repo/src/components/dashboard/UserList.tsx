// components/dashboard/UserList.tsx
import React from "react";
import { Typography, List, Divider, Box } from "@mui/material";
import { User } from "@/interfaces/user";
import UserListItem from "./UserListItem";
import { cyberStyles } from "@/styles/CyberTheme";

interface UserListProps {
  usersList: User[];
  selectedUserId: string | null;
  onUserSelect: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  usersList,
  selectedUserId,
  onUserSelect,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <Box
        sx={{
          p: 2,
          borderBottom: cyberStyles.borders.glow,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
        }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "#05d1f5",
            textTransform: "uppercase",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            "&::before": {
              content: '""',
              width: "15px",
              height: "2px",
              backgroundColor: "#00bcd4",
              display: "inline-block",
              marginRight: "8px",
            },
            "&::after": {
              content: '""',
              width: "15px",
              height: "2px",
              backgroundColor: "#00bcd4",
              display: "inline-block",
              marginLeft: "8px",
            },
          }}>
          Users
        </Typography>
      </Box>

      {/* User list with cyber styling - auto-adjusting list */}
      <List
        sx={{
          p: 0,
          flexGrow: 1,
          overflowY: "auto", // Always enable scrolling when needed
          ...cyberStyles.scrollbar.thin,
        }}>
        {usersList.map((user) => (
          <React.Fragment key={user.id}>
            <UserListItem
              user={user}
              isSelected={selectedUserId === user.id}
              onSelect={() => onUserSelect(user.id)}
            />
            <Divider sx={{ opacity: 0.3 }} />
          </React.Fragment>
        ))}
      </List>

      {/* Status indicator at bottom */}
      <Box
        sx={{
          p: 1,
          borderTop: cyberStyles.borders.glow,
          fontSize: "0.75rem",
          color: "rgba(224, 224, 224, 0.7)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.2)",
        }}>
        <Box>{usersList.length} users found</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#4caf50",
              boxShadow: "0 0 5px #4caf50",
            }}
          />
          <span>System Online</span>
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;
