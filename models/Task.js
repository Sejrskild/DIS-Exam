import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Udfyld navn på opgave."],
      maxlength: 30,
    },
    description: {
      type: String,
      required: [true, "Beskriv opgaven."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Igangværende", "Ikke startet", "Udført"],
      default: "Ikke startet",
    },
    type: {
      type: String,
      enum: [
        "Skole",
        "Rengøring",
        "Indkøb",
        "Socialt",
        "Motion",
        "Gaver",
        "Fødselsdag",
        "Fest",
        "Privat",
      ],
      default: "Skole",
    },
    area: {
      type: String,
      default: "Min by",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Bruger nødvendig."],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', TaskSchema)
