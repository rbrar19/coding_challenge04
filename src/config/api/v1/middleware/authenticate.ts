import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Middleware to verify Firebase ID Token.
 * Ensures only authenticated users can access protected routes.
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        error: "Missing or invalid Authorization header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    // store user info for the next middleware/controller
    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role || "user";

    next();
  } catch (error: any) {
    console.error("Authentication Error:", error.message);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: "Invalid or expired token",
      details: error.message,
    });
  }
};
