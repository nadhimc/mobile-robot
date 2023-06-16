void packDetect(){
  packageDetection = digitalRead(PACKAGE_DETECTION_PIN);
  // low ada barang
  if(packageDetection == HIGH){
    paket_state = 1;
  }
}