import mongoose from "mongoose";
import dotenv from "dotenv";
import ClientModel from "../models/ClientModel.js"; // Adjust the import path as needed

dotenv.config();

const DB_URL = process.env.DB_URL;

const seedClients = async () => {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");

    // Clear existing data
    await ClientModel.deleteMany({});
    console.log("Existing clients cleared.");

    // Generate 30 client records
    const clients = Array.from({ length: 30 }, (_, i) => ({
      name: `Client ${i + 1}`,
      email: `client${i + 1}@example.com`,
      phone: `784512${(i + 1000).toString().slice(1)}`,
      address: `Client ${i + 1} Test Address`,
      status: Math.floor(Math.random() * 2), // Random status between 0 and 2
      userId: [`669a50247019a80d98e00c${(i % 10).toString().padStart(2, "0")}`],
      createdAt: new Date(),
    }));

    // Insert all clients into the collection
    await ClientModel.insertMany(clients);
    console.log("Clients seeded successfully.");
  } catch (error) {
    console.error("Error seeding clients:", error);
  } finally {
    console.log("Disconnecting from the database...");
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
};

seedClients();
