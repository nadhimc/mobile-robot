const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = (req, res, next) => {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Menyimpan data pengguna ke objek req untuk digunakan di rute berikutnya
    req.user = user;
    next();
  });
};

const checkTujuanAccess = async (req, res, next) => {
  // Mendapatkan akses pengguna dari data pengguna yang disimpan di objek req
  const { username } = req.user;
  let userDetail = await User.findOne({ username });
  let confirm = userDetail.tujuan;
  // Mengecek apakah pengguna memiliki akses terkait destinations
  if (!confirm) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};

const checkUserAccess = async (req, res, next) => {
  // Mendapatkan akses pengguna dari data pengguna yang disimpan di objek req
  const { username } = req.user;
  let userDetail = await User.findOne({ username });
  let confirm = userDetail.pengguna ?? false;
  // Mengecek apakah pengguna memiliki akses terkait destinations
  if (!confirm) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};

module.exports = { authenticateToken, checkTujuanAccess, checkUserAccess };
