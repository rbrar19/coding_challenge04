import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../controllers/userController";
import { authenticate } from "../middleware/authenticate";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get("/profile", authenticate, getUserProfile);

/** Route to delete a user - requires authentication and admin role */
router.delete("/:id", authenticate, deleteUser);

export default router;