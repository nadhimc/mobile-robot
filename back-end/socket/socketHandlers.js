const fs = require("fs/promises");

function handleSocketConnections(socket) {
  console.log("Client connected", socket.id);

  socket.on("correction-speed", (value) => {
    console.log(`correction-speed value: ${value}`);
    socket.broadcast.emit("correction-speed", value);
  });

  socket.on("rightpwm", (value) => {
    console.log(`rightpwm value: ${value}`);
    socket.broadcast.emit("rightpwm", value);
  });

  socket.on("robotevent", (value) => {
    // console.log("robotevent", value);
    socket.broadcast.emit("robotevent", value);
    let timeStamp = new Date().getTime();
    let content = `${timeStamp};`;
    Object.entries(sensorData || { status: "Belum terkoneski" })?.map(
      ([namaEntry, valueEntry]) => {
        content = content + `;${valueEntry}`;
      }
    );
    content = content + "\n";
    fs.appendFile("../log/robotevent.csv", content);
  });

  socket.on("speed", (value) => {
    console.log("speed", value);
    socket.broadcast.emit("speed", value);
  });

  socket.on("leftpwm", (value) => {
    console.log(`leftpwm value: ${value}`);
    socket.broadcast.emit("leftpwm", value);
  });

  socket.on("kp", (value) => {
    console.log(`kp value: ${value}`);
    socket.broadcast.emit("kp", value);
  });

  socket.on("ki", (value) => {
    console.log(`ki value: ${value}`);
    socket.broadcast.emit("ki", value);
  });

  socket.on("kd", (value) => {
    console.log(`kd value: ${value}`);
    socket.broadcast.emit("kd", value);
  });

  socket.on("leftkp", (value) => {
    console.log(`kp value: ${value}`);
    socket.broadcast.emit("leftkp", value);
  });

  socket.on("leftki", (value) => {
    console.log(`ki value: ${value}`);
    socket.broadcast.emit("leftki", value);
  });

  socket.on("leftkd", (value) => {
    console.log(`kd value: ${value}`);
    socket.broadcast.emit("leftkd", value);
  });

  socket.on("rightkp", (value) => {
    console.log(`kp value: ${value}`);
    socket.broadcast.emit("rightkp", value);
  });

  socket.on("rightki", (value) => {
    console.log(`ki value: ${value}`);
    socket.broadcast.emit("rightki", value);
  });

  socket.on("rightkd", (value) => {
    console.log(`kd value: ${value}`);
    socket.broadcast.emit("rightkd", value);
  });

  socket.on("dump", (value) => {
    console.log(`dump value: ${value}`);
    socket.broadcast.emit("dump", value);
  });

  socket.on("destination", (value) => {
    console.log(`destination value: ${value}`);
    socket.broadcast.emit("destination", value);
  });

  socket.on("event_name", (value) => {
    console.log("EVENT NAME", value);
  });

  socket.on("lfkp", (value) => {
    console.log("lfkp", value);
    socket.broadcast.emit("lfkp", value);
  });

  socket.on("lfki", (value) => {
    console.log("lfki", value);
    socket.broadcast.emit("lfki", value);
  });

  socket.on("lfkd", (value) => {
    console.log("lfkd", value);
    socket.broadcast.emit("lfkd", value);
  });

  socket.on("mpukp", (value) => {
    console.log("mpukp", value);
    socket.broadcast.emit("mpukp", value);
  });

  socket.on("mpuki", (value) => {
    console.log("mpuki", value);
    socket.broadcast.emit("mpuki", value);
  });

  socket.on("mpukd", (value) => {
    console.log("mpukd", value);
    socket.broadcast.emit("mpukd", value);
  });

  socket.on("rfidreset", (value) => {
    socket.broadcast.emit("rfidreset", value);
  });

  socket.on("resetpid", (value) => {
    socket.broadcast.emit("resetpid", value);
  });

  socket.on("rightspeed", (value) => {
    socket.broadcast.emit("rightspeed", value);
  });

  socket.on("leftspeed", (value) => {
    socket.broadcast.emit("leftspeed", value);
  });

  socket.on("modepwm", (value) => {
    socket.broadcast.emit("modepwm", value);
  });

  socket.on("mpureset", (value) => {
    socket.broadcast.emit("mpureset", value);
  });

  socket.on("pidmode", (value) => {
    socket.broadcast.emit("pidmode", value);
  });

  socket.on("turnleftspeed", (value) => {
    socket.broadcast.emit("turnleftspeed", value);
  });

  socket.on("turnrightspeed", (value) => {
    socket.broadcast.emit("turnrightspeed", value);
  });

  socket.on("turningleftdelay", (value) => {
    socket.broadcast.emit("turningleftdelay", value);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
}

module.exports = handleSocketConnections;
