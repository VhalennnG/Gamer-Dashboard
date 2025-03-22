import db from "../config/firebaseConfig";
import { User } from "../entities/user";

// Membuat collection reference
const usersCollection = db.collection("USERS");

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await usersCollection.get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const docRef = await usersCollection.doc(id).get();

    if (!docRef.exists) {
      return null;
    }

    return { id: docRef.id, ...docRef.data() } as User;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  try {
    await usersCollection.doc(id).update({
      ...userData,
      updatedAt: new Date().toString(),
    });

    const updatedUserDoc = await usersCollection.doc(id).get();

    if (!updatedUserDoc.exists) {
      throw new Error("User not found after update");
    }

    const updatedUser = {
      id: updatedUserDoc.id,
      ...updatedUserDoc.data(),
    } as User;
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Create user
export const createUser = async (user: User): Promise<string> => {
  try {
    const docRef = await usersCollection.add({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActive: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
