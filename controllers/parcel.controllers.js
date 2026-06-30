import Parcel from "../models/parcel.models.js";

export const createParcel = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const getAvailableParcels = async (req, res) => {
  try {
    const getAllParcels = await Parcel.find();

    return res.status(200).json({
      message: "Available parcels fetched successfully",
      getAllParcels,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const parcelUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateData = { status };
    if (req.user.role === "Rider") {
      updateData.rider = req.user._id;
  }
    const updatedParcel = await Parcel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
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
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedParcel = await Parcel.findByIdAndDelete(id);
    if (!deletedParcel) {
      return res.status(404).json({
        message: "Parcel not found",
      });
    }
    return res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
