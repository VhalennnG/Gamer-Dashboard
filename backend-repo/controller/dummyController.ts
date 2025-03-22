import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { User } from "../entities/user";

const db = admin.firestore();

export const insertDummyUsers = async (req: Request, res: Response) => {
  try {
    const dummyUsers: Omit<User, "id">[] = [
      {
        email: "playerone@example.com",
        displayName: "PlayerOne",
        photoURL: "photoURL1...",
        phoneNumber: "+6281234567890",
        username: "playerone",
        status: "offline",
        favoriteGames: "Valorant",
        bio: "Just another gamer",
        preferredRegions: "Rusia",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "chessmaster@example.com",
        displayName: "ChessMaster",
        photoURL: "photoURL2...",
        phoneNumber: "",
        username: "chessmaster",
        status: "online",
        favoriteGames: "Auto chess",
        bio: "Pro chess player",
        preferredRegions: "France",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "shooterx@example.com",
        displayName: "ShooterX",
        photoURL: "photoURL3...",
        phoneNumber: "+628111111111",
        username: "shooterx",
        status: "away",
        favoriteGames: "Call of Duty",
        bio: "FPS fanboy",
        preferredRegions: "North America",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "rpgqueen@example.com",
        displayName: "RPGQueen",
        photoURL: "photoURL4...",
        phoneNumber: "",
        username: "rpgqueen",
        status: "online",
        favoriteGames: "Final Fantasy",
        bio: "Loves RPGs",
        preferredRegions: "Japan",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "strategist99@example.com",
        displayName: "Strategist99",
        photoURL: "photoURL5...",
        phoneNumber: "+628122222222",
        username: "strategist99",
        status: "offline",
        favoriteGames: "Civilization VI",
        bio: "Strategy addict",
        preferredRegions: "China",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "casualgamer@example.com",
        displayName: "CasualGamer",
        photoURL: "photoURL6...",
        phoneNumber: "",
        username: "casualgamer",
        status: "online",
        favoriteGames: "Candy Crush",
        bio: "Casual player",
        preferredRegions: "South Korea",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "brmaster@example.com",
        displayName: "BRMaster",
        photoURL: "photoURL7...",
        phoneNumber: "+628133333333",
        username: "brmaster",
        status: "away",
        favoriteGames: "PUBG",
        bio: "Battle royale king",
        preferredRegions: "Oceania",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "mobapro@example.com",
        displayName: "MobaPro",
        photoURL: "photoURL8...",
        phoneNumber: "",
        username: "mobapro",
        status: "online",
        favoriteGames: "Dota 2",
        bio: "MOBA warrior",
        preferredRegions: "Singapore",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
      {
        email: "indiedev@example.com",
        displayName: "IndieDev",
        photoURL: "photoURL9...",
        phoneNumber: "+628144444444",
        username: "indiedev",
        status: "offline",
        favoriteGames: "Hollow Knight",
        bio: "Indie game dev",
        preferredRegions: "Turkey",
        createdAt: "",
        updatedAt: "",
        lastActive: "",
      },
    ];

    const batch = db.batch();

    dummyUsers.forEach((user) => {
      const userRef = db.collection("USERS").doc(); // generate random ID
      batch.set(userRef, user);
    });

    await batch.commit();

    res.status(201).json({ message: "Dummy users inserted successfully!" });
  } catch (error) {
    console.error("Error inserting dummy users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
