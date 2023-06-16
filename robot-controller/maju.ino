void maju() {
  // kanan CW Kiri CCW berarti
  // kanan CW
  digitalWrite(LPWM_R, HIGH);
  digitalWrite(RPWM_R, LOW);
  // kiri CCW
  digitalWrite(LPWM_L, LOW);
  digitalWrite(RPWM_L, HIGH);

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
