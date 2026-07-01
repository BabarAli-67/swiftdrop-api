import express from "express";
import { createParcel, getAvailableParcels, parcelUpdate, deleteParcel, getMerchantParcels } from "../controllers/parcel.controllers.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", verifyJWT, authorizeRoles("Merchant"), createParcel);
router.get("/", verifyJWT, authorizeRoles("Rider"), getAvailableParcels);
router.get('/merchant-parcels', verifyJWT, authorizeRoles('Merchant'), getMerchantParcels);
router.put("/:id", verifyJWT, authorizeRoles("Rider"), parcelUpdate);
router.delete("/:id", verifyJWT, authorizeRoles("Merchant"), deleteParcel);
export default router;