import express from "express";
import { createParcel, getAvailableParcels, parcelUpdate, deleteParcel } from "../controllers/parcel.controllers.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", verifyJWT, authorizeRoles("Merchant"), createParcel);
router.get("/", verifyJWT, authorizeRoles("Rider"), getAvailableParcels);
router.put("/:id", verifyJWT, authorizeRoles("Rider"), parcelUpdate);
router.delete("/:id", verifyJWT, authorizeRoles("Merchant"), deleteParcel);
export default router;