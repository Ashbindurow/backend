import express from "express";
import Doctor from "../../db/models/doctorSchema.js";
import bcrypt from "bcrypt";

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

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

export default router;
