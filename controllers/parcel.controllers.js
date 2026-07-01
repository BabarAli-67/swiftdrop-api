import Parcel from "../models/parcel.models.js";

export const createParcel = async (req, res, next) => {
  try {
    const { description, price } = req.body;
    const newParcel = new Parcel({
      description,
      price,
      merchant: req.user._id,
    });

    const savedParcel = await newParcel.save();
    return res.status(201).json({
      message: "Parcel created Sucessfuly",
      parcel: savedParcel,
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailableParcels = async (req, res, next) => {
  try {
    const getAllParcels = await Parcel.find({ status: "Pending" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Available parcels fetched successfully",
      getAllParcels,
    });
  } catch (error) {
    next(error);
  }
};

export const parcelUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateData = { status };
    if (req.user.role === "Rider") {
      updateData.rider = req.user._id;
    }
    const updatedParcel = await Parcel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedParcel) {
      return res.status(404).json({
        message: "No parcel matches the provided ID",
      });
    }
    return res.status(200).json({
      message: "Parcel status updated successfully",
      parcel: updatedParcel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteParcel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parcel = await Parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }
    if (parcel.merchant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own parcels" });
    }
    await Parcel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Parcel deleted successfully" });
    
  } catch (error) {
    next(error);
  }
};

export const getMerchantParcels = async (req, res, next) => {
  try {
    const parcels = await Parcel.find({ merchant: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, parcels });
  } catch (error) {
    next(error);
  }
};
