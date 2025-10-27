import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Authorization middleware
 * 
 * @param options.roles - array of allowed roles (e.g., ["admin"])
 * @param options.allowSameUser - allows users to access their own data
 * 
 * Example usage:
 * router.get("/:id", authenticate, authorize({ roles: ["admin"], allowSameUser: true }), getUser);
 */
interface AuthOptions {
  roles?: string[];
  allowSameUser?: boolean;
}

export const authorize =
  (options: AuthOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUserId = res.locals.uid;
      const currentUserRole = res.locals.role;
      const targetUserId = req.params.id;

      // If allowSameUser is true and the user is accessing their own resource
      if (options.allowSameUser && currentUserId === targetUserId) {
        return next();
      }

      // If roles are specified, check if user has one of them
      if (options.roles && !options.roles.includes(currentUserRole)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          error: "Access denied. Insufficient permissions.",
        });
      }

      // Passed all checks
      next();
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Authorization error" });
    }
  };
