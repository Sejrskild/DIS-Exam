import express from "express";
import { rateLimit } from "express-rate-limit";
const router = express.Router();

const limiter = rateLimit({
  message:
    "Din IP-adresse har forsøgt for mange gange. Prøv igen om 15 minutter.",
  windowMs: 15 * 60 * 1000,
  max: 20,
});

import {
  register,
  login,
  updateUser,
  logout,
  deleteUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/authenticateUser.js";

router.post("/register", limiter, register);
router.post("/login", limiter, login);
router.patch("/updateUser", authenticateUser, updateUser);
router.delete("/deleteUser", authenticateUser, deleteUser);
router.get("/logout", logout);

export default router;
