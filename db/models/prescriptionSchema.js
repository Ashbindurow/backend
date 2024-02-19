import { Schema, model } from "mongoose";

const prescriptionSchema = Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
  message: String,

  medication: [{ type: Schema.Types.ObjectId, ref: "Pharmacy" }],
});

const Prescription = model("Prescription", prescriptionSchema);

export default Prescription;
