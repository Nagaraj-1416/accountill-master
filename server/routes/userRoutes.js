import express from "express";
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  createuser,
  //getusers,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
//router.get("/users", getusers);
router.post("/createuser", createuser);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);

export default router;
