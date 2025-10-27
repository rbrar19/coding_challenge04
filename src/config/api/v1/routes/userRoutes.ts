import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../controllers/userController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get("/profile", authenticate, getUserProfile);

/** Route to delete a user - requires authentication and admin role or same user */
router.delete(
  "/:id",
  authenticate,
  authorize({ roles: ["admin"], allowSameUser: true }),
  deleteUser
);

export default router;
