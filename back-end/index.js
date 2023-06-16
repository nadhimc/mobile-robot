const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const https = require("https");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3002;
require("dotenv").config();
const { server, io } = require("./socket/app");
const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const options = {
  key: privateKey,
  cert: certificate,
};

// Koneksi ke MongoDB lokal
mongoose
  .connect("mongodb://localhost:27017/proyek-ta", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB terhubung");
  })
  .catch((err) => {
    console.error("Kesalahan koneksi MongoDB:", err);
  });

const User = require("./express/models/User");
const Destination = require("./express/models/Destination");

app.use(express.json());
app.use(cors());

// Create HTTPS server using SSL credentials
const httpsServer = https.createServer(options, app);

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Routes
const authRoutes = require("./express/routes/authRoutes");
const destinationRoutes = require("./express/routes/destinationRoutes");
const userRoutes = require("./express/routes/userRoutes");
const handleSocketConnections = require("./socket/socketHandlers");
app.use("/api/auth", authRoutes);
app.use("/api/destination", destinationRoutes);
app.use("/api/user", userRoutes);
app.get("/api/myinfo", async (req, res) => {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Menyimpan data pengguna ke objek req untuk digunakan di rute berikutnya
    const { username } = user;
    let userDetail = await User.findOne({ username });
    return res
      .status(200)
      .json({ message: "Berhasil mendapatkan myInfo", data: userDetail });
  });
});

app.get("/api/scanner", async (req, res) => {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Menyimpan data pengguna ke objek req untuk digunakan di rute berikutnya
    const { username } = user;
    let userDetail = await User.findOne({ username });
    if (!userDetail.scanner) {
      return res.status(403).json({ error: "Access denied" });
    }
    try {
      const data = await Destination.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

io.on("connection", handleSocketConnections);

server.listen(3008, () => {
  console.log("Server started on port 3008");
});
