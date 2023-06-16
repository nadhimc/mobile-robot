const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Definisikan skema pengguna
const User = require("../models/User");

// Handler untuk registrasi pengguna baru
router.post("/register", async (req, res) => {
  try {
    const { username, password, tujuan, scanner, pengguna } = req.body;

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = new User({
      username,
      password: hashedPassword,
      tujuan: tujuan || false,
      scanner: scanner || false,
      pengguna: pengguna || false,
    });
    await user.save();

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
  }
});

// Handler untuk login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari pengguna berdasarkan username
    const user = await User.findOne({ username });

    if (user) {
      // Periksa kecocokan password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Buat token JWT
        const token = jwt.sign({ username: user.username }, jwtSecret);

        res.status(200).json({ message: "Login berhasil", token });
      } else {
        res.status(400).json({ message: "Password salah" });
      }
    } else {
      res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
});

module.exports = router;
