int turnState = 0;
int turnLeftState = 0;
unsigned long turnLeftDelay = 0;
unsigned long turningLeftDelayTime = 2000;
int prohibitedTurn = 0;
float turnLeftSpeed = 3;
float turnRightSpeed = -3;

void LineFolPid()
{
  //  KIRI
  if (desiredSpeed == 0)
  {
    turnState = 0;
    turnLeftState = 0;
    turnLeftDelay = 0;
    prohibitedTurn = 0;
    return;
  }
  if ((Line_fol[1] == 0 && Line_fol[4] == 0))
  {
    if(prohibitedTurn==0){
      turnState=1;
      turnLeftState = 0; 
    }
    return;
  }
  else if (Line_fol[1] == 0)
  {
    PidLFError = 1;
  }
  else if (Line_fol[4] == 0)
  {
    PidLFError = -1;
  }
  else
  {
    PidLFError = 0;
  }
  if(now - turnLeftDelay > turningLeftDelayTime){
      prohibitedTurn = 0;
  }
  PidLFIntegralTerm += PidLFError;
  PidLFDerivativeTerm = PidLFError - PidLFPreviousError;
  LFPIDControl = (PidLFKp * PidLFError) + (PidLFKi * PidLFIntegralTerm) + (PidLFKd * PidLFDerivativeTerm);
  leftDesiredSpeed = desiredSpeed - LFPIDControl;
  rightDesiredSpeed = desiredSpeed + LFPIDControl;
}

void turnLeft()
{
  if(turnLeftState==0){

    if(Line_fol[1]==1 || Line_fol[4]==1){
      turnLeftState=1;
    }
    
    leftDesiredSpeed = turnLeftSpeed;
    rightDesiredSpeed = turnRightSpeed;
  }else if(turnLeftState==1){
    if(Line_fol[1]==0 && Line_fol[4]==0){
      turnLeftDelay = now;
      turnLeftState=2;
    }
    
    leftDesiredSpeed = turnLeftSpeed;
    rightDesiredSpeed = turnRightSpeed;
  }else if(turnLeftState==2){
    prohibitedTurn = 1;
    turnState = 0;
    leftDesiredSpeed = desiredSpeed;
    rightDesiredSpeed = desiredSpeed;
//    TEST
leftIntegralTerm = 0.0;
    leftDerivativeTerm = 0.0;
    leftPreviousError = 0.0; 
    leftError = 0.0;

    rightIntegralTerm = 0.0;
    rightDerivativeTerm = 0.0;
    rightPreviousError = 0.0; 
    rightError = 0.0;

    PidLFError = 0.0;
    PidLFIntegralTerm = 0.0;
    PidLFDerivativeTerm = 0.0;
    PidLFPreviousError = 0.0;
  }
}

void navigation()
{
  if(turnState==1){
    turnLeft();
  }else{
    LineFolPid();
  }
}
