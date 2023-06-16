void mpuDetect(){
  mpu6050.update();
  gyroZ = fmod(fabs(mpu6050.getAngleZ()), 360.0);
}