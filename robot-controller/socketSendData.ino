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
  param1["LFKp"] = PidLFKp;
  param1["LFKi"] = PidLFKi;
  param1["LFKd"] = PidLFKd;
  param1["MpuKp"] = PidMpuKp;
  param1["MpuKi"] = PidMpuKi;
  param1["MpuKd"] = PidMpuKd;
  param1["rfidReset"] = rfid_reset;
  param1["lfkiri"] = Line_fol[1];
  param1["lfkanan"] = Line_fol[4];
  param1["lfpidcontrol"] = LFPIDControl;
  param1["leftdesiredspeed"] = leftDesiredSpeed;
  param1["rightdesiredspeed"] = rightDesiredSpeed;
  param1["leftPIDControl"] = leftPIDControl;
  param1["rightPIDControl"] = rightPIDControl;
  param1["resetpid"] = resetPID;
  param1["modePwm"] = modePwm;
  param1["mpu_reset"] = mpu_reset;
  param1["mpuSetPoint"] = mpuSetPoint;
  param1["pid_mode"] = pid_mode;
  param1["turningLeftDelayTime"] = turningLeftDelayTime;
  content = "";

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // Send event
  socketIO.sendEVENT(output);

  // Print JSON for debugging
  //    USE_SERIAL.println(output);
}
