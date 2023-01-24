import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const BCRYPT_SALT = 15;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Udfyld navn"],
    minlength: 3,
    maxlength: 25,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Udfyld email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Indtast gyldig email",
    },
  },
  password: {
    type: String,
    select: false, // Vi frasortere passwordet i vores json response
    required: [true, "Udfyld kodeord."],
    minlength: 6,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 25,
    trim: true,
    default: "Ikke oplyst",
  },
  area: {
    type: String,
    minlength: 3,
    maxlength: 25,
    trim: true,
    default: "Ikke oplyst",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  } else {
    const salt = await bcrypt.genSalt(BCRYPT_SALT);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.checkPassword = async function (enteredPassword) {
  const correctPassword = await bcrypt.compare(enteredPassword, this.password);
  return correctPassword;
};

UserSchema.methods.JWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
