import React from "react";
import { Box, Typography } from "@mui/material";
import { User } from "@/interfaces/user";
interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const infoFields = [
    { label: "Display Name", value: user.displayName },
    { label: "Email", value: user.email },
    { label: "Username", value: user.username },
    { label: "Bio", value: user.bio || "No bio provided" },
    { label: "Favorite Games", value: user.favoriteGames || "None" },
    { label: "Preferred Regions", value: user.preferredRegions || "None" },
    { label: "Phone Number", value: user.phoneNumber || "Not provided" },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
      }}>
      {infoFields.map((field, index) => (
        <Box key={index}>
          <Typography variant='body2' color='text.secondary'>
            {field.label}
          </Typography>
          <Typography variant='body1'>{field.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default UserInfo;
