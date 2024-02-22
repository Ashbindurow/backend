import express from "express";
import User from "../../db/models/userSchema.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  if (user) {
    return res.status(403).json({ message: "Username already exists" });
  }
  if (body.password !== body.confirmPassword) {
    return res.status(403).json({ message: "Passwords don't match" });
  }
  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  await User.create(body);

  return res.status(201).json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(403).json({ message: "Username or Password incorrect" });
  }
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(403).json({ message: "Username or Password incorrect" });
  }

  const token = Jwt.sign(
    { role: "USER", id: user._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(201).json({ message: "Login successful", token: token });
});

//user get by id
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.password = "";
  res.status(200).json(user);
});

export default router;
