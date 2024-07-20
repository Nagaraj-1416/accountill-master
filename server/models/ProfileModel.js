import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: [{ type: String }],
  name: String,
  email: String,
  phoneNumber: String,
  businessName: String,
  contactAddress: String,
  logo: String,
  website: String,
  __v: Number,
});

const ProfileModel = mongoose.model("Profile", profileSchema);
export default ProfileModel;
