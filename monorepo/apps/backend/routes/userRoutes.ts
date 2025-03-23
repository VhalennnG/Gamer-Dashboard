import { Router } from "express";
import {
  fetchAllUsers,
  fetchUserById,
  updateUserData,
} from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// Define endpoints
router.get("/fetch-user-data", fetchAllUsers);
router.get("/fetch-user-data/:userId", fetchUserById);
router.post("/update-user-data/:userId", updateUserData);

export default router;
