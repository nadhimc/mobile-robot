/*
 WebSocketClientSocketIOack.ino

  Created on: 20.07.2019

*/

#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

WiFiMulti WiFiMulti;
SocketIOclient socketIO;

#define USE_SERIAL Serial

#define PWM_R 16
#define PWM_L 4

#define LPWM_L 25
#define RPWM_L 26
#define RPWM_R 14
#define LPWM_R 12

// channel A kiri putih
#define CHANNEL_A_LEFT 36
#define CHANNEL_B_LEFT 39

#define CHANNEL_A_RIGHT 3
#define CHANNEL_B_RIGHT 1

// DEFINE STEP
#define tick 534

//==================== DEFINE LINE FOLLOWER
#include "PCF8574.h"
#include <Wire.h>

//===================== PCF8574
#define PCF8574_ADDR (0x20) // I2C Slave Address CEK DULU
PCF8574 pcf(PCF8574_ADDR);

//===================== DEFINE RFID
// #include <Wire.h>
#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 17                // Configurable, see typical pin layout above
#define SS_PIN 5                  // Configurable, see typical pin layout above
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

//===================== LINE FOLLOWER
#define PIN_LF_0 13
#define PIN_LF_1 27
// #define PIN_LF_2 33
// #define PIN_LF_3 32
#define PIN_LF_4 34

//===================== MPU6050
#include <Wire.h>
#include <MPU6050_tockn.h>

MPU6050 mpu6050(Wire);

//===================== DEFINE SENSOR OBSTACLE DETECTION : HC-SR04 cm/uS
#define SOUND_SPEED 0.034
#define TRIG 2
#define ECHO 15

//===================== SENSOR DETEKSI PAKET
#define PACKAGE_DETECTION_PIN 35

// MOTOR
const int freq = 490; // kalo 30000 lambat, nanti coba 1500
const int pwmChannel1 = 0;
const int pwmChannel2 = 1;
const int resolution = 8; // 0-255
int dutyCycle = 0;
int rightDutyCycle = 0;

float kecepatanLeft = 0.0;
long int posisiLeft = 0;
float kecepatanRight = 0.0;
long int posisiRight = 0;
int timerinterrupt = 0;

// PID VARIABLES

float desiredSpeed = 0.0;

// Left PID Variables
float leftDesiredSpeed = 0.0;
float leftCurrentSpeed = 0.0;
float leftError = 0.0;
float leftKp = 8.0;
float leftKi = 0.3;
float leftKd = 0.0;
float leftIntegralTerm = 0.0;
float leftDerivativeTerm = 0.0;
float leftPreviousError = 0.0;

// Right PID Variables
float rightDesiredSpeed = 0.0;
float rightCurrentSpeed = 0.0;
float rightError = 0.0;
float rightKp = 8.0;
float rightKi = 0.3;
float rightKd = 0.0;
float rightIntegralTerm = 0.0;
float rightDerivativeTerm = 0.0;
float rightPreviousError = 0.0;
// END PID VARIABLES

// SENSOR LINE FOLLOWER
int Line_fol[5] = {0, 0, 0, 0, 0};
int correctionDesiredSpeed = 2;
String lineFolString = "";
// END SENSOR LINE FOLLOWER

unsigned long messageTimestamp = 0;
uint64_t now;
float timeDiff;

// RFID
String content = "";
// END RFID

// MPU6050
float gyroZ;

// DUMPING SYSTEM
int dumpState = 0;

// SENSOR HC-SR04
long duration;
float distanceCm;
float distanceInch;

// Package Detection
int packageDetection;

int destination_state;
int paket_state;
int finished_state;
int state = 0;

String destination = "";

  // rfid reset
  int rfid_reset = 0;

void loop()
{
  socketIO.loop();
  now = millis();
 
  lineFol();
  mpuDetect();
  packDetect();

  dumpFunction();
  UsSensor();
  RFID();
  // stateManagement();
  // stateAction();
  if(rfid_reset==1){
    mfrc522.PCD_Init(); // Init MFRC522
    mfrc522.PCD_SetRegisterBitMask(mfrc522.RFCfgReg, (0x07 << 4));
    delay(4);                          // Optional delay. Some board do need more time after init to be ready, see Readme
    mfrc522.PCD_DumpVersionToSerial(); // Show details of PCD - MFRC522 Card Reader details
    rfid_reset=2;
  }

  if (rightDesiredSpeed == 0 && leftDesiredSpeed == 0){
    float leftIntegralTerm = 0.0;
    float leftDerivativeTerm = 0.0;
    float leftPreviousError = 0.0; 
    float leftError = 0.0;

    float rightIntegralTerm = 0.0;
    float rightDerivativeTerm = 0.0;
    float rightPreviousError = 0.0; 
    float rightError = 0.0;
    motorStop();
  }else{
    maju();
  }

  if (now - messageTimestamp > 100)
  {
    timeDiff = (now - messageTimestamp) / 1000.0;
    messageTimestamp = now;
    getPidData();
    socketSendData();
  }
}
