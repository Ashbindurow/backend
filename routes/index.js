import express from "express";
import doctorRoutes from "./doctorRoutes/index.js";
import departmentRoutes from "./departmentRoutes/index.js";
import imageRoute from "./imageRoute/index.js";
import userRoute from "./userRoutes/index.js";
import slotRoute from "./slotRoutes/index.js";
import appointmentRoute from "./appointmentRoutes/index.js";

const router = express.Router();

router.use("/doctor", doctorRoutes);
router.use("/department", departmentRoutes);
router.use("/upload", imageRoute);
router.use("/user", userRoute);
router.use("/slot", slotRoute);
router.use("/appointment", appointmentRoute);

export default router;
