import React, { useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UserAvatar from "./UserAvatar";

interface UserProfileHeaderProps {
  photoURL: string;
  displayName: string;
  username: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  photoURL,
  displayName,
  username,
  onImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 100 * 1024;
    if (file.size > maxSize) {
      setErrorMessage(
        "The file size is too large. The maximum allowed size is 100kB."
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setErrorMessage("");
    onImageUpload(e);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
            photoURL={photoURL}
            displayName={displayName}
            width={100}
            height={100}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(30, 30, 47, 0.9)",
              "&:hover": {
                backgroundColor: "rgba(30, 30, 47, 0.95)",
                transform: "scale(1.1)",
              },
              transition: "transform 0.2s ease-in-out",
              border: "2px solid #00e5ff",
            }}
            onClick={triggerFileInput}>
            <PhotoCameraIcon />
          </IconButton>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: "none" }}
            accept='image/*'
            onChange={handleImageChange}
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
            {displayName}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: "primary.main",
              fontFamily: "monospace",
              fontWeight: 500,
            }}>
            @{username}
          </Typography>
        </Box>
      </Box>

      {/* Tampilkan pesan error jika ada */}
      {errorMessage && (
        <Typography
          variant='body2'
          sx={{
            color: "error.main",
            mt: 1,
            ml: 2,
            fontWeight: 500,
          }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default UserProfileHeader;
