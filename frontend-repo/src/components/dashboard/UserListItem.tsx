// components/dashboard/UserListItem.tsx
import React from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Box,
  Typography,
} from "@mui/material";
import { User } from "@/interfaces/user";
import UserAvatar from "./UserAvatar";
import { userListItemStyles } from "@/styles/ListStyle";

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  isSelected,
  onSelect,
}) => {
  return (
    <ListItemButton
      selected={isSelected}
      onClick={onSelect}
      sx={userListItemStyles.listItemButton(isSelected)}>
      <ListItemAvatar>
        <Box sx={userListItemStyles.avatarContainer}>
          <UserAvatar
            width={40}
            height={40}
            photoURL={user.photoURL}
            displayName={user.displayName}
            sx={userListItemStyles.avatar(isSelected)}
          />
        </Box>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography sx={userListItemStyles.primaryText(isSelected)}>
            {user.displayName}
          </Typography>
        }
        secondary={
          <Typography sx={userListItemStyles.secondaryText}>
            {user.email}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default UserListItem;
