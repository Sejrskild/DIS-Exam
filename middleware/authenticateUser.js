import { UnauthorizedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Du kunne ikke verficeres. Auth error: 401");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    throw new UnauthorizedError("Du kunne ikke verficeres. Auth error: 401");
  }
};

export default authenticateUser;
