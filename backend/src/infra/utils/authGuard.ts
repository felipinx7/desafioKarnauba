import { authMiddleware } from "../http/middleware/authMiddleware";

export const authGuard = {preHandler: authMiddleware};