// State

void stateManagement(){
  if(destination_state == 0 && paket_state == 0 && finished_state == 0){
    state=0;
  }
  else if(destination_state == 1 && paket_state == 0 && finished_state == 0){
    state=1;
  }
  else if(destination_state == 1 && paket_state == 1 && finished_state == 0){
    state=2;
  }
  else if(destination_state == 1 && paket_state == 1 && finished_state == 1){
    state=3;
  }
   else if(destination_state == 0 && paket_state == 0 && finished_state == 1){
    state=4;
  }
}

void stateAction(){
  
  if(distanceCm < 30){
    rightDesiredSpeed=0;
    leftDesiredSpeed=0;
  }else{
    if(state == 0){
      rightDesiredSpeed=0;
      leftDesiredSpeed=0;
    }
    else if(state == 1){
      rightDesiredSpeed=0;
      leftDesiredSpeed=0;
    }
    else if(state == 2){
      rightDesiredSpeed=4;
      leftDesiredSpeed=4;
    }
    else if(state == 3){
      rightDesiredSpeed=4;
      leftDesiredSpeed=4;
    }
    else if(state == 4){
      rightDesiredSpeed=4;
      leftDesiredSpeed=4;
    }
  }
  
}