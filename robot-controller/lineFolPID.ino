int turnState = 0;
int turnLeftState = 0;
unsigned long turnLeftDelay = 0;
unsigned long turningLeftDelayTime = 2000;
int prohibitedTurn = 0;

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
    
    leftDesiredSpeed = -1 * desiredSpeed;
    rightDesiredSpeed = desiredSpeed;
  }else if(turnLeftState==1){
    if(Line_fol[1]==0 && Line_fol[4]==0){
      turnLeftDelay = now;
      turnLeftState=2;
    }
    
    leftDesiredSpeed = -1 * desiredSpeed;
    rightDesiredSpeed = desiredSpeed;
  }else if(turnLeftState==2){
    prohibitedTurn = 1;
    turnState = 0;
    leftDesiredSpeed = desiredSpeed;
    rightDesiredSpeed = desiredSpeed;
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
