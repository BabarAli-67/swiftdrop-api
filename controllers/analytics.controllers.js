import mongoose from "mongoose";
import Parcel from "../models/parcel.models.js";

export const getRiderEarnings = async (req, res, next) => {
  try {
    const riderId = req.user._id;
    const earningsPipeline = await Parcel.aggregate([
      {
        $match: {
          rider: new mongoose.Types.ObjectId(riderId),
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: "$rider",
          totalEarnings: { $sum: "$price" },
          totalJobs: { $sum: 1 },
        },
      },
    ]);
    if (earningsPipeline.length === 0) {
      return res.status(200).json({
        message: "No earnings data found for this rider.",
        totalEarnings: 0,
        totalJobs: 0,
      });
    }
    return res.status(200).json({
      message: "Rider earnings analytics compiled successfully",
      analytics: earningsPipeline[0],
    });
  } catch (error) {
    next(error);
  }
};
