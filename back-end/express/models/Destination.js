const mongoose = require("mongoose");

// Definisikan skema pengguna
const destinationScheme = new mongoose.Schema({
  jumlah: Number,
  kode: { type: String, unique: true },
  label: String,
  urutan: String,
  rfid: String,
});

module.exports = mongoose.model("Destination", destinationScheme);
