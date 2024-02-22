import express from "express";
import Doctor from "../../db/models/doctorSchema.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const doctor = await Doctor.findOne({ username: body.username });
  if (doctor) {
    res.status(403).json({ message: "Username already exists" });
  }
  if (body.password !== body.confirmPassword) {
    res.status(403).json({ message: "Passwords don't match" });
  }
  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  await Doctor.create(body);

  res.status(201).json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const doctor = await Doctor.findOne({ username: body.username });
  if (!doctor) {
    return res.status(403).json({ message: "Username or Password incorrect" });
  }
  const isMatching = await bcrypt.compare(body.password, doctor.password);
  if (!isMatching) {
    return res.status(403).json({ message: "Username or Password incorrect" });
  }

  const token = Jwt.sign(
    { role: "DOCTOR", id: doctor._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(201).json({ message: "Login successful", token: token });
});

//doctor get by id
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  // const doctor = await Doctor.findById(id).populate("department");
  const doctor = await Doctor.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "departments", //fropm which collection
        localField: "department", // which field you need to populate
        foreignField: "_id", // fieldname used to connect
        as: "departmentDetails", //to save as
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        image: 1,
        specialization: 1,
        departmentDetails: 1,
      },
    },
  ]);

  doctor.password = "";
  res.status(200).json(doctor);
});

export default router;
