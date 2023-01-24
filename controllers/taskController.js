import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";
import Task from "../models/Task.js";
import permissions from "../utilities/permissions.js";
import moment from "moment";
import nodemailer from "nodemailer";

const createTask = async (req, res) => {
  const { description, task } = req.body;

  if (!description || !task) {
    throw new BadRequestError("Udfyld alle felter.");
  }

  req.body.createdBy = req.user.userId;
  const newTask = await Task.create({
    ...req.body,
    area: req.body.taskArea,
  });
  res.status(201).json({ newTask });
};

const getAllTasks = async (req, res) => {
  const { search, status, taskType, sort } = req.query;

  const query = {
    createdBy: req.user.userId,
  };

  if (status && status !== "alle") {
    query.status = status;
  }

  if (taskType && taskType !== "alle") {
    query.type = taskType;
  }

  if (search) {
    query.task = { $regex: search, $options: "i" };
  }

  let tempResult = Task.find(query);

  if (sort === "nyeste") {
    tempResult.sort("-createdAt");
  }
  if (sort === "ældste") {
    tempResult.sort("createdAt");
  }

  let tasks = await tempResult;

  res.status(200).json({ tasks, numberOfTasks: tasks.length, numOfPages: 1 });
};

const deleteTask = async (req, res) => {
  const { id: paramsID } = req.params;
  const taskDB = await Task.findOne({ _id: paramsID });

  if (!taskDB) {
    throw new NotFoundError("Opgaven kunne ikke lokaliseres");
  }

  permissions(req.user, taskDB.createdBy);

  await taskDB.remove();
  res.status(200).json({ msg: "Fjernet" });
};

const updateTask = async (req, res) => {
  const { id: paramsID } = req.params;

  const { task, description } = req.body;

  if (!task || !description) {
    throw new BadRequestError("Udfyld alle felter.");
  }

  const taskDB = await Task.findOne({ _id: paramsID });

  if (!taskDB) {
    throw new NotFoundError("Kunne ikke finde opgaven.");
  }

  permissions(req.user, taskDB.createdBy);

  const newTask = await Task.findOneAndUpdate({ _id: paramsID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ newTask });
};

const showStats = async (req, res) => {
  let stats = await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((prev, curr) => {
    const { _id: status, count } = curr;
    prev[status] = count;
    return prev;
  }, {});

  const userStats = {
    // if stats property is undefined, set it to 0
    igangvaerende: stats.Igangværende || 0,
    ikkeStartet: stats["Ikke startet"] || 0,
    udført: stats.Udført || 0,
  };

  let monthlyTasks = await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 10 },
  ]);

  monthlyTasks = monthlyTasks
    .map((task) => {
      const {
        _id: { year, month },
        count,
      } = task;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({ userStats, monthlyTasks });
};

// LIST OF TASKS FOR SPECIFIC USER SEND TO EMAIL

const sendMail = async (req, res) => {
  const { email } = req.body;

  const usersTasks = await Task.find({ createdBy: req.user.userId });

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Kontrol - hold styr på tingene!" <kontrol@sejrskild.com>',
    to: email,
    subject: "Dine opgaver - Kontrol",
    html: `
    <h1>Dine opgaver</h1>
    <p>Her er en liste over dine opgaver</p>
    <ul>
    ${usersTasks.map((task) => `<li>${task.task}</li>`).join("")}
    </ul>
    `,
  });

  res.status(200).json({ msg: "Mail sendt" });
};

// IMPROVEMENTS / SUGGESTIONS!!

const sendImprovementMail = async (req, res) => {
  const { improvement, email } = req.body;
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Foreslag sendt af : ${email}" <kontrol@sejrskild.com>`,
    to: "emil@sejrskild.com",
    subject: "Foreslag / forbedringer - Kontrol",
    text: improvement,
  });

  res.status(200).json({ msg: "Tak fordi du bidrager!" });
};

export {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  showStats,
  sendMail,
  sendImprovementMail,
};
