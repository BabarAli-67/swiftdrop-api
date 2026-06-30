import { Router } from "express";
import {getRiderEarnings} from "../controllers/analytics.controllers.js";
import {verifyJWT, authorizeRoles} from "../middlewares/auth.middleware.js"

const router = Router();
router.get("/rider-earnings", verifyJWT, authorizeRoles("Rider"), getRiderEarnings);
export default router;