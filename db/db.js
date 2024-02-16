import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/doctorBoking")
  .then(() => {
    console.log("DB IS CONNECTED");
  })
  .catch(e => {
    console.log(e.message);
  });

export default mongoose;
