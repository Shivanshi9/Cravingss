import User from "../models/user.model.js";
import cloudinary from "../config/claudinary.config.js";
import streamifier from "streamifier";

export const EditUserProfile = async (req, res, next) => {
  try {
    const { FullName, phone, gender, DOB } = req.body;

    const user = req.user;

    user.FullName = FullName || user.FullName;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.DOB = DOB || user.DOB;

    // Upload image to Cloudinary
    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            {
              folder: "Craving/ProfilePhotos",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(upload);
        });

      const result = await uploadFromBuffer();

      user.photo = result.secure_url;
    }

    await user.save();

    const { password, ...updatedUser } = user.toObject();

    res.status(200).json({
      message: "Profile Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};