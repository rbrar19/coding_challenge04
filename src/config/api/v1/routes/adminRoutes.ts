import express, { Router } from "express";
import { setCustomClaims, getUserDetails } from "../controllers/adminController";

const router: Router = express.Router();

// Endpoint to set user custom claims (role)
router.post("/setCustomClaims", setCustomClaims);

// Endpoint to get user details by UID
router.get("/user/:id", getUserDetails); // 'id' used here, matches controller!

export default router;
