import { Request, Response } from "express";
import * as userRepo from "../repository/userCollection";

// Get all users
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    // Fetch all users from repository
    const usersData = await userRepo.getAllUsers();

    if (!usersData || usersData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Sort users by updatedAt in descending order (newest first)
    const sortedUsers = usersData.sort((a, b) => {
      // Parse string dates to timestamps
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();

      // If dates are invalid, handle the case
      if (isNaN(dateA) || isNaN(dateB)) {
        // Fallback comparison if dates are invalid
        return String(a.updatedAt).localeCompare(String(b.updatedAt)) * -1;
      }

      return dateB - dateA; // Descending order (newest first)
    });

    res.status(200).json({ users: sortedUsers });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific user by ID
export const fetchUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch user data from repository
    const userData = await userRepo.getUserById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user data
export const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await userRepo.updateUser(userId, userData);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or update failed" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
