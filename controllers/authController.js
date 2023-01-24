import User from "../models/User.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Udfyld alle felterne.");
  }

  const duplicateUser = await User.findOne({ email });

  if (duplicateUser) {
    throw new BadRequestError("Der findes allerede en bruger med denne mail.");
  }

  const user = await User.create({ name, email, password });
  const token = user.JWT();
  res.status(201).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.area,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Udfyld alle felter");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Intastede oplysninger er forkerte.");
  }

  const correctPassword = await user.checkPassword(password);
  if (!correctPassword) {
    throw new UnauthorizedError("Intastede oplysninger er forkerte.");
  }
  const token = user.JWT();

  // Setting password to undefined, as we don't want to passed the hashed password around.
  user.password = undefined;

  res.status(200).json({
    user,
    token,
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, area } = req.body;
  if (!email || !name || !lastName || !area) {
    throw new BadRequestError("Udfyld alle felter.");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.area = area;

  await user.save();

  const token = user.JWT();

  res.status(200).json({ user, token, area: user.area });
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new NotFoundError("Bruger ikke fundet.");
  }
  await user.remove();
  res.status(200).json({ msg: "Bruger slettet." });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "Logget ud" });
};

export { register, login, updateUser, logout, deleteUser };
