const fs = require("fs");
const privateKey = fs.readFileSync("socket.key", "utf8");
const certificate = fs.readFileSync("socket.cert", "utf8");
const express = require("express");
const app = express();
const https = require("https");
const options = {
  key: privateKey,
  cert: certificate,
};

const http = require("http");
const server = http.createServer(app);
// const server = https.createServer(options, app);

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

module.exports = { app, server, io };
