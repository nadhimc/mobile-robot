const mongoose = require("mongoose");

// Definisikan skema pengguna
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  tujuan: Boolean,
  scanner: Boolean,
  pengguna: Boolean,
});

module.exports = mongoose.model("User", userSchema);
