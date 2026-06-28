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
      min: [0, "price can't be negative"]
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "PickedUp", "Delivered", "Cancelled"],
        message: '{VALUE} is not a valid status',
      },
      default: "Pending",
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  { timestamps: true },
);

const Parcel = mongoose.model("Parcel", parcelSchema);
export default Parcel;