import express from "express";
import { rateLimit } from "express-rate-limit";
const limiter = rateLimit({
  message:
    "Du kan maks. sende 2 forbedringsforslag pr. dag. Prøv igen i morgen!",
  windowMs: 60 * 1000 * 60 * 24,
  max: 2,
});
const router = express.Router();

import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  showStats,
  sendMail,
  sendImprovementMail,
} from "../controllers/taskController.js";

router.get("/", getAllTasks);
router.post("/", createTask);

router.post("/mail", sendMail);
router.post("/improvement", limiter, sendImprovementMail);
router.get("/stats", showStats);

router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

export default router;
