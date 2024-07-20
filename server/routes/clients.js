import express from "express";
import {
  getClients,
  createClient,
  updateClient,
  updateUser,
  deleteClient,
  getClientsByUser,
  getusers,
  deleteUser,
} from "../controllers/clients.js";

const router = express.Router();

router.get("/", getClients);
router.get("/getusers", getusers);
router.get("/user", getClientsByUser);
router.post("/", createClient);
router.patch("/:id", updateClient);
router.patch("/user/:id", updateUser);
router.delete("/:id", deleteClient);
router.delete("/user/:id", deleteUser);

export default router;
