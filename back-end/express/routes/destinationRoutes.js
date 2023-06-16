const express = require("express");
const router = express.Router();

// Definisikan skema pengguna
const Destination = require("../models/Destination");
const { authenticateToken, checkTujuanAccess } = require("../middlewares/auth");

router.use(authenticateToken, checkTujuanAccess);

router.get("/", async (req, res) => {
  try {
    const data = await Destination.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Meng-handle POST request untuk membuat data baru
router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    const data = await Destination.create(newData);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Meng-handle PUT request untuk memperbarui data berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const data = await Destination.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!data) {
      res.status(404).json({ error: "Data not found" });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Meng-handle DELETE request untuk menghapus data berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Destination.findByIdAndDelete(id);
    if (!data) {
      res.status(404).json({ error: "Data not found" });
    } else {
      res.json({ message: "Data deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
