import React from "react";
import { Avatar, SxProps, Theme } from "@mui/material";

interface UserAvatarProps {
  photoURL?: string | null;
  displayName: string;
  sx?: SxProps<Theme>;
  width: number;
  height: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  photoURL,
  displayName,
  sx,
  width,
  height,
}) => {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const generateAvatarColor = (name: string) => {
    const colors = [
      "linear-gradient(135deg, #5D4157 0%, #A8CABA 100%)",
      "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)",
      "linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)",
      "linear-gradient(135deg, #0052D4 0%, #65C7F7 100%)",
      "linear-gradient(135deg, #20002c 0%, #cbb4d4 100%)",
      "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
      "linear-gradient(135deg, #F37335 0%, #FDC830 100%)",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Convert base64 to data URL if needed
  const getBase64Src = (photoURL?: string | null) => {
    if (!photoURL) return undefined;

    if (photoURL.startsWith("data:image")) {
      return photoURL;
    }

    // Default assume PNG; adjust if necessary
    return `data:image/png;base64,${photoURL}`;
  };

  return (
    <Avatar
      src={getBase64Src(photoURL)}
      alt={displayName}
      sx={{
        bgcolor: "transparent",
        background: generateAvatarColor(displayName),
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        fontWeight: 500,
        fontSize: "0.9rem",
        fontFamily: '"Rajdhani", sans-serif',
        width: width,
        height: height,
        ...sx,
      }}>
      {getInitials(displayName)}
    </Avatar>
  );
};

export default UserAvatar;
