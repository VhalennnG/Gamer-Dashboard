import { SxProps, Theme, alpha } from "@mui/material";

type UserListItemStyles = {
  listItemButton: (isSelected: boolean) => SxProps<Theme>;
  avatarContainer: SxProps<Theme>;
  avatar: (isSelected: boolean) => SxProps<Theme>;
  primaryText: (isSelected: boolean) => SxProps<Theme>;
  secondaryText: SxProps<Theme>;
};

export const userListItemStyles: UserListItemStyles = {
  listItemButton: (isSelected: boolean) => ({
    py: 1.5,
    px: 2,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s",
    "&::before": isSelected
      ? {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          backgroundColor: "#00bcd4",
          boxShadow: "0 0 8px #00bcd4",
        }
      : {},
    "&::after": isSelected
      ? {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          background:
            "radial-gradient(circle at left center, rgba(0, 188, 212, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }
      : {},
    "&:hover": {
      backgroundColor: alpha("#00bcd4", 0.08),
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        background:
          "radial-gradient(circle at left center, rgba(0, 188, 212, 0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      },
    },
  }),
  avatarContainer: {
    position: "relative",
  },
  avatar: (isSelected: boolean) => ({
    border: isSelected ? "2px solid #00bcd4" : "2px solid transparent",
    transition: "all 0.2s",
    boxShadow: isSelected ? "0 0 8px rgba(0, 188, 212, 0.5)" : "none",
  }),
  primaryText: (isSelected: boolean) => ({
    fontWeight: isSelected ? 600 : 400,
    color: isSelected ? "#05d1f5" : "#e0e0e0",
    fontSize: "0.9rem",
    letterSpacing: "0.01em",
    transition: "all 0.2s",
  }),
  secondaryText: {
    color: alpha("#e0e0e0", 0.7),
    fontSize: "0.75rem",
    mt: 0.2,
  },
};
