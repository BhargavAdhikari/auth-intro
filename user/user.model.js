import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, maxlength: 50, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, minlength: 4, required: true, trim: true },
});

export const User = mongoose.model("User", userSchema);
