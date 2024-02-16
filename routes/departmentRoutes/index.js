import express from "express";
import Department from "../../db/models/departmentSchema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const body = { ...req.body };
  await Department.create(body);
  res.status(201).json({ message: "Department added successfully" });
});

router.get("/", async (req, res) => {
  const departments = await Department.find();
  res.status(201).json(departments);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const department = await Department.findById(id);
  res.status(200).json(department);
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  await Department.findByIdAndUpdate(id, body);
  res.status(200).json({ message: "Department updated successfully" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Department.findByIdAndDelete(id);
  res.status(200).json({ message: "Department deleted" });
});

export default router;
