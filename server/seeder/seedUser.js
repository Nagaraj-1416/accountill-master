import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"; // Adjust the import path as needed

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

    // Clear existing data
    await User.deleteMany({});
    console.log("Existing users cleared.");

    // Hash the password once
    const hashedPassword = await bcrypt.hash("123456", 12);
    console.log("Password hashed successfully.");

    // Generate 50 user records
    const users = Array.from({ length: 50 }, (_, i) => ({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: hashedPassword,
      role: (i % 2) + 1, // Alternates between 1 and 2
      status: 1, // Random status between 0 and 2
      resetToken: null,
      expireToken: null,
    }));

    // Insert all users into the collection
    await User.insertMany(users);
    console.log("Users seeded successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    console.log("Disconnecting from the database...");
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
};

seedUsers();
