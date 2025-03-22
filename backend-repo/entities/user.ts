// Define a single User interface
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  username: string;
  status: "online" | "offline" | "in-game" | "away";
  favoriteGames: string;
  bio: string;
  preferredRegions: string;
  createdAt: string;
  updatedAt: string;
}
