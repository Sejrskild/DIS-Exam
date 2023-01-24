import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const PORT = process.env.PORT || 3007;
import morgan from "morgan";
import "express-async-errors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const __dirname = dirname(fileURLToPath(import.meta.url));

// MongoDB
import connectToDB from "./db/connect.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Middleware
import middlewareNotFound from "./middleware/not-found.js";
import handleErrorMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/authenticateUser.js";

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/tasks", authenticateUser, taskRoutes);
app.use("/api/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(middlewareNotFound);
app.use(handleErrorMiddleware);

const startServer = async () => {
  try {
    await connectToDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT : ${PORT}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
