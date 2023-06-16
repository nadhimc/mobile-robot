void socketSendData()
{
  // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  // add evnet name
  // Hint: socket.on('event_name', ....
  array.add("robotevent");

  // add payload (parameters) for the event
  JsonObject param1 = array.createNestedObject();
  param1["kecepatanLeft"] = leftCurrentSpeed;
  param1["kecepatanRight"] = rightCurrentSpeed;
  param1["rfid"] = content.substring(1);
  param1["mpu"] = gyroZ;
  param1["lineFollower"] = lineFolString;
  param1["distanceSensor"] = distanceCm;
  param1["keberadaanPaket"] = packageDetection;
  param1["destinasi"] = String(destination);
  param1["leftKp"] = leftKp;
  param1["leftKi"] = leftKi;
  param1["leftKd"] = leftKd;
  param1["rightKp"] = rightKp;
  param1["rightKi"] = rightKi;
  param1["rightKd"] = rightKd;
  param1["rfidReset"] = rfid_reset;
  param1["lfkiri"] = Line_fol[1];
  param1["lfkanan"] = Line_fol[4];
  content = "";

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // Send event
  socketIO.sendEVENT(output);

  // Print JSON for debugging
  //    USE_SERIAL.println(output);
}
