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

  socket.on("rfidreset", (value) => {
    socket.broadcast.emit("rfidreset", value);
  });

  socket.on("rightspeed", (value) => {
    socket.broadcast.emit("rightspeed", value);
  });

  socket.on("leftspeed", (value) => {
    socket.broadcast.emit("leftspeed", value);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
}

module.exports = handleSocketConnections;