import React, { useState, useEffect } from "react";
import { Grid, ThemeProvider } from "@mui/material";
import { User } from "@/interfaces/user";
import { useAppDispatch } from "@/store/hooks";
import { updateUserData } from "@/store/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PublicIcon from "@mui/icons-material/Public";

import theme from "@/theme";
import FormContainer from "./FormContainer";
import UserProfileHeader from "./UserProfileHeader";
import FormField from "./FormField";
import FormButton from "./FormButton";
import ScrollableContainer from "./ScrollableContainer";
import StatusDropdown from "./StatusDropdown";

interface UserEditFormProps {
  user: User;
  onCancel: () => void;
  updateStatus: string;
}

const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  onCancel,
  updateStatus,
}) => {
  const dispatch = useAppDispatch();

  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(user.username || "");
  const [status, setStatus] = useState<
    "online" | "offline" | "in-game" | "away"
  >(user.status || "offline");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [bio, setBio] = useState(user.bio || "");
  const [favoriteGames, setFavoriteGames] = useState(user.favoriteGames || "");
  const [preferredRegions, setPreferredRegions] = useState(
    user.preferredRegions || ""
  );
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");

  // Reset form when user changes
  useEffect(() => {
    setDisplayName(user.displayName || "");
    setEmail(user.email || "");
    setUsername(user.username || "");
    setStatus(user.status || "offline");
    setPhoneNumber(user.phoneNumber || "");
    setBio(user.bio || "");
    setFavoriteGames(user.favoriteGames || "");
    setPreferredRegions(user.preferredRegions || "");
    setPhotoURL(user.photoURL || "");
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      displayName,
      email,
      username,
      status,
      phoneNumber,
      bio,
      favoriteGames,
      preferredRegions,
      photoURL,
    };

    dispatch(updateUserData({ userId: user.id, userData }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setPhotoURL(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as "online" | "offline" | "in-game" | "away");
  };

  // Field configuration for consistent styling
  const fields = [
    {
      name: "displayName",
      label: "Display Name",
      value: displayName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDisplayName(e.target.value),
      icon: <PersonIcon />,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "email",
      label: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      icon: <EmailIcon />,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "username",
      label: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      icon: <AccountCircleIcon />,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "status",
      type: "status",
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      value: phoneNumber,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhoneNumber(e.target.value),
      icon: <PhoneIcon />,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "bio",
      label: "Bio",
      value: bio,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setBio(e.target.value),
      icon: <InfoIcon />,
      multiline: true,
      gridSize: { xs: 12 },
    },
    {
      name: "favoriteGames",
      label: "Favorite Games",
      value: favoriteGames,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFavoriteGames(e.target.value),
      icon: <GamepadIcon />,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "preferredRegions",
      label: "Preferred Regions",
      value: preferredRegions,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPreferredRegions(e.target.value),
      icon: <PublicIcon />,
      gridSize: { xs: 12, sm: 6 },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <FormContainer onSubmit={handleSubmit}>
        <UserProfileHeader
          photoURL={photoURL}
          displayName={displayName || user.displayName}
          username={username || user.username}
          onImageUpload={handleImageUpload}
        />

        <ScrollableContainer>
          <Grid container spacing={2}>
            {fields.map((field) =>
              field.name === "status" ? (
                <StatusDropdown
                  key={field.name}
                  value={status}
                  onChange={handleStatusChange}
                  gridSize={field.gridSize}
                />
              ) : (
                <FormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  onChange={field.onChange}
                  icon={field.icon}
                  multiline={field.multiline}
                  gridSize={field.gridSize}
                />
              )
            )}
          </Grid>
        </ScrollableContainer>
        <FormButton onCancel={onCancel} updateStatus={updateStatus} />
      </FormContainer>
    </ThemeProvider>
  );
};

export default UserEditForm;
