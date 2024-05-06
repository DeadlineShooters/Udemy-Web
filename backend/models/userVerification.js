import mongoose, { Schema } from "mongoose";

const userVerificationSchema = mongoose.Schema({
  userId: { type: String },
  uniqueString: { type: String },
  createAt: {type: Date},
  expiresAt: {type: Date}
});

const UserVerification = mongoose.model("UserVerification", userVerificationSchema);
export default UserVerification;