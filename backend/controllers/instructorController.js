import Instructor from "../models/instructor.js";
import User from "../models/user.js";

export const getProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await Instructor.findById(id);

  if (!profile) {
    return res.status(404).json({ message: "Instructor profile not found" });
  }

  res.status(200).json(profile);
}