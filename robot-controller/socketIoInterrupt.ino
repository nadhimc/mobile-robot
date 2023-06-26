void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    //      USE_SERIAL.printf("[IOc] Disconnected!\n");
    desiredSpeed = 0;
    break;
  case sIOtype_CONNECT:
    //      USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

    // join default namespace (no auto join in Socket.IO V3)
    socketIO.send(sIOtype_CONNECT, "/");
    break;
  case sIOtype_EVENT:
  {
    char *sptr = NULL;
    int id = strtol((char *)payload, &sptr, 10);
    //        USE_SERIAL.printf("[IOc] get event: %s id: %d\n", payload, id);
    if (id)
    {
      payload = (uint8_t *)sptr;
    }
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error)
    {
      //          USE_SERIAL.print(F("deserializeJson() failed: "));
      //          USE_SERIAL.println(error.c_str());
      return;
    }

    String eventName = doc[0];
    float variable = doc[1];
    if (eventName == "leftpwm")
    {
      //          USE_SERIAL.printf("Left Duty Cycle Change: %u\n", variable);
      dutyCycle = (int)variable;
    }
    if (eventName == "rightpwm")
    {
      //          USE_SERIAL.printf("Right Duty Cycle Change: %u\n", variable);
      rightDutyCycle = (int)variable;
    }
    if (eventName == "speed")
    {
      //          USE_SERIAL.printf("Desired Speed Change: %u\n", variable);
      desiredSpeed = (int)variable;
      rightDesiredSpeed = (int)variable;
      leftDesiredSpeed = (int)variable;
    }
    if (eventName == "rightspeed")
    {
      //          USE_SERIAL.printf("Desired Speed Change: %u\n", variable);
      rightDesiredSpeed = (int)variable;
    }
    if (eventName == "leftspeed")
    {
      //          USE_SERIAL.printf("Desired Speed Change: %u\n", variable);
      leftDesiredSpeed = (int)variable;
    }
    if (eventName == "correction-speed")
    {
      //          USE_SERIAL.printf("Correction Desired Speed Change: %u\n", variable);
      correctionDesiredSpeed = (int)variable;
    }
    if (eventName == "leftkp")
    {
      //          USE_SERIAL.printf("Kp Change: %u\n", variable);
      leftKp = variable;
    }
    if (eventName == "leftki")
    {
      //          USE_SERIAL.printf("Ki Change: %u\n", variable);
      leftKi = variable;
    }
    if (eventName == "leftkd")
    {
      //          USE_SERIAL.printf("Kd Change: %u\n", variable);
      leftKd = variable;
    }
    if (eventName == "rightkp")
    {
      //          USE_SERIAL.printf("Kp Change: %u\n", variable);
      rightKp = variable;
    }
    if (eventName == "rightki")
    {
      rightKi = variable;
    }
    if (eventName == "rightkd")
    {
      rightKd = variable;
    }
    if (eventName == "lfkp")
    {
      PidLFKp = variable;
    }
    if (eventName == "lfki")
    {
      PidLFKi = variable;
    }
    if (eventName == "lfkd")
    {
      PidLFKd = variable;
    }
    if (eventName == "mpukp")
    {
      PidMpuKp = variable;
    }
    if (eventName == "mpuki")
    {
      PidMpuKi = variable;
    }
    if (eventName == "mpukd")
    {
      PidMpuKd = variable;
    }
    if (eventName == "dump")
    {
      dumpState = variable;
    }
    if (eventName == "destination")
    {
      destination = doc[1].as<String>();
      destination_state = 1;
    }
    if (eventName == "rfidreset")
    {
      rfid_reset = variable;
    }
    if (eventName == "mpureset")
    {
      mpu_reset = variable;
    }
    if (eventName == "resetpid")
    {
      resetPID = variable;
    }
    if(eventName == "modepwm")
    {
      modePwm = (int)variable;
    }
    if(eventName == "pidmode")
    {
      pid_mode = (int)variable;
    }
    if(eventName == "turningleftdelay")
    {
      turningLeftDelayTime = (int)variable;
    }
    //        USE_SERIAL.printf("[IOc] event name: %s\n", eventName.c_str());

    // Message Includes a ID for a ACK (callback)
    if (id)
    {
      // creat JSON message for Socket.IO (ack)
      DynamicJsonDocument docOut(1024);
      JsonArray array = docOut.to<JsonArray>();

      // add payload (parameters) for the ack (callback function)
      JsonObject param1 = array.createNestedObject();
      param1["now"] = millis();

      // JSON to String (serializion)
      String output;
      output += id;
      serializeJson(docOut, output);

      // Send event
      socketIO.send(sIOtype_ACK, output);
    }
  }
  break;
  case sIOtype_ACK:
    //      USE_SERIAL.printf("[IOc] get ack: %u\n", length);
    break;
  case sIOtype_ERROR:
    //      USE_SERIAL.printf("[IOc] get error: %u\n", length);
    break;
  case sIOtype_BINARY_EVENT:
    //      USE_SERIAL.printf("[IOc] get binary: %u\n", length);
    break;
  case sIOtype_BINARY_ACK:
    //      USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
    break;
  }
}
