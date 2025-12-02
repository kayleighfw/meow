import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String // Let op: nog niet gehashed!
});

export const User = mongoose.model("User", userSchema);
