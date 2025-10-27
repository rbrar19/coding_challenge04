import express, { Router } from "express";
import { setCustomClaims, getUserDetails } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router: Router = express.Router();

// Endpoint to set user custom claims (role) — protected for admin only
router.post(
  "/setCustomClaims",
  authenticate,
  authorize({ roles: ["admin"] }),
  setCustomClaims
);

// Endpoint to get user details by UID — protected for admin only
router.get(
  "/user/:id",
  authenticate,
  authorize({ roles: ["admin"] }),
  getUserDetails
);

export default router;
