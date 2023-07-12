void setup()
{
  // USE_SERIAL.begin(921600);
  USE_SERIAL.begin(115200);

  Serial.setDebugOutput(true);
  USE_SERIAL.setDebugOutput(true);
  //
  //  USE_SERIAL.println();
  //  USE_SERIAL.println();
  //  USE_SERIAL.println();

  WiFiMulti.addAP("hospot", "11111111");

  // WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED)
  {
    delay(100);
  }

  String ip = WiFi.localIP().toString();
  USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  // server address, port and URL
  socketIO.begin("192.168.46.197", 3008, "/socket.io/?EIO=4");

  // event handler
  socketIO.onEvent(socketIOEvent);

  //        Robot
  // MOTOR
  pinMode(PWM_L, OUTPUT);
  pinMode(PWM_R, OUTPUT);

  pinMode(LPWM_L, OUTPUT);
  pinMode(RPWM_L, OUTPUT);
  pinMode(LPWM_R, OUTPUT);
  pinMode(RPWM_R, OUTPUT);

  // ATUR Channel PWM dan frequencynya, resolution bisa 1-16 bit
  ledcSetup(pwmChannel1, freq, resolution);
  ledcSetup(pwmChannel2, freq, resolution);

  // buat PWM_L dan PWM_R supaya dikontrol oleh pwmChannel
  ledcAttachPin(PWM_L, pwmChannel1);
  ledcAttachPin(PWM_R, pwmChannel2);

  pinMode(CHANNEL_A_LEFT, INPUT_PULLUP);
  pinMode(CHANNEL_B_LEFT, INPUT_PULLUP);
  pinMode(CHANNEL_A_RIGHT, INPUT_PULLUP);
  pinMode(CHANNEL_B_RIGHT, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(CHANNEL_A_LEFT), ISR_INT0, CHANGE);
  attachInterrupt(digitalPinToInterrupt(CHANNEL_B_LEFT), ISR_INT1, CHANGE);
  attachInterrupt(digitalPinToInterrupt(CHANNEL_A_RIGHT), ISR_INT2, CHANGE);
  attachInterrupt(digitalPinToInterrupt(CHANNEL_B_RIGHT), ISR_INT3, CHANGE);
  //===================== SENSOR DETEKSI PAKET
  pinMode(PACKAGE_DETECTION_PIN, INPUT);
  //============== LINE FOLLOWER
  pinMode(PIN_LF_0, INPUT);
  pinMode(PIN_LF_1, INPUT);
  // pinMode(PIN_LF_2, INPUT);
  // pinMode(PIN_LF_3, INPUT);
  pinMode(PIN_LF_4, INPUT);
  //============== RELAY LINEAR ACTUATOR
  // pcf.pinMode(P0, OUTPUT);
  // pcf.pinMode(P2, OUTPUT);
  // pcf.begin();

  pinMode(33, OUTPUT);
  pinMode(32, OUTPUT);
  //=============== HC-SR04
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  ///============== MPU6050
  Wire.begin();
  mpuInit();
  //=============== RFID
  while (!Serial)
    ;                 // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  SPI.begin();        // Init SPI bus
  rfidInit();
  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}
