import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "PickedUp", "Delivered", "Cancelled"],
        message: "{VALUE} is not a valid status",
      },
      default: "Pending",
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);
parcelSchema.index({
  rider: 1,
  status: 1,
});
parcelSchema.index({
  status: 1,
  createdAt: -1,
});
const Parcel = mongoose.model("Parcel", parcelSchema);
export default Parcel;
