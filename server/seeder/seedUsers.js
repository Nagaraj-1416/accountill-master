import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Profile from "../models/profileModel.js"; // Import the Profile model

dotenv.config();

const DB_URL = process.env.DB_URL;

const seedUsers = async () => {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");

    const hashedPassword = await bcrypt.hash("123456", 12);
    console.log("Password hashed successfully.");

    const user = new User({
      name: "Nagaraj Gurusamy",
      email: "nagaraj161400@gmail.com",
      password: hashedPassword,
      role: 1,
    });

    const savedUser = await user.save();
    console.log("User seeded successfully.");

    const profile = new Profile({
      name: "Nagaraj Gurusamy",
      email: "nagaraj161400@gmail.com",
      userId: [savedUser._id.toString()],
    });

    await profile.save();
    console.log("Profile created successfully.");
  } catch (error) {
    console.error("Error seeding user or profile:", error);
  } finally {
    console.log("Disconnecting from the database...");
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
};

seedUsers();
