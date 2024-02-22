import express from "express";
import Department from "../../db/models/departmentSchema.js";
import checkToken from "../../middlewares/checkToken.js";
import Doctor from "../../db/models/doctorSchema.js";

const router = express.Router();

//add department
router.post("/", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const body = { ...req.body };
  await Department.create(body);
  res.status(201).json({ message: "Department added successfully" });
});

// list all departments
router.get("/", checkToken(["DOCTOR", "USER"]), async (req, res) => {
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

//list doctors by department
router.get("/dotor/:id", checkToken("USER"), async (req, res) => {
  const { id } = req.params;
  const doctors = await Doctor.find({ department: id });
  res.status(200).json(doctors);
});

export default router;
