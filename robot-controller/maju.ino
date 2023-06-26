void maju() {
  // kanan CW Kiri CCW berarti
  // kanan CW
  if(rightDesiredSpeed>=0){
    digitalWrite(LPWM_R, HIGH);
    digitalWrite(RPWM_R, LOW);
  }else{
    digitalWrite(LPWM_R, LOW);
    digitalWrite(RPWM_R, HIGH);
  }
  
  // kiri CCW
  if(leftDesiredSpeed>=0){
    digitalWrite(LPWM_L, LOW);
    digitalWrite(RPWM_L, HIGH);
  }else{
    digitalWrite(LPWM_L, HIGH);
    digitalWrite(RPWM_L, LOW);
  }
  

  // pakai analogWrite
  //  analogWrite(PWM_R, dutyCycle);
  //  int rightDutyCycle = int((-b+sqrt(b*b-(4*a*(rc-51.3))))/(-b+sqrt(b*b-(4*a*(lc-51.3))))) * dutyCycle;
  //  analogWrite(PWM_L, rightDutyCycle);
  //analogWrite(PWM_R, 30);
  //analogWrite(PWM_L, 48);

  // pakai ledcWrite
  ledcWrite(pwmChannel1, dutyCycle);
  ledcWrite(pwmChannel2, rightDutyCycle);

  // for(int dutyCycle=110; dutyCycle<130; dutyCycle++){
  //     ledcWrite(pwmChannel1, dutyCycle);
  //     ledcWrite(pwmChannel2, dutyCycle);
  // }
  // dutyCycle=110;
}

void motorStop(){
  digitalWrite(LPWM_R, LOW);
  digitalWrite(RPWM_R, LOW);
  digitalWrite(LPWM_L, LOW);
  digitalWrite(RPWM_L, LOW);
  // pakai ledcWrite
  ledcWrite(pwmChannel1, 0);
  ledcWrite(pwmChannel2, 0);
}
