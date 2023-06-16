void ISR_INT0()
{
  int pinA, pinB;
  pinA = digitalRead(CHANNEL_A_LEFT);
  pinB = digitalRead(CHANNEL_B_LEFT);
  if (pinA == LOW && pinB == LOW)
  {
    posisiLeft--; // CCW
  }
  if (pinA == LOW && pinB == HIGH)
  {
    posisiLeft++;
  }
  if (pinA == HIGH && pinB == LOW)
  {
    posisiLeft++; // CCW
  }
  if (pinA == HIGH && pinB == HIGH)
  {
    posisiLeft--; // CCW
  }
}

void ISR_INT1()
{
  int pinA, pinB;
  pinA = digitalRead(CHANNEL_A_LEFT);
  pinB = digitalRead(CHANNEL_B_LEFT);
  if (pinA == LOW && pinB == LOW)
  {
    posisiLeft++; // CCW
  }
  if (pinA == LOW && pinB == HIGH)
  {
    posisiLeft--;
  }

  if (pinA == HIGH && pinB == LOW)
  {
    posisiLeft--; // CCW
  }
  if (pinA == HIGH && pinB == HIGH)
  {
    posisiLeft++; // CCW
  }
}

void ISR_INT2()
{
  int pinA, pinB;
  pinA = digitalRead(CHANNEL_A_RIGHT);
  pinB = digitalRead(CHANNEL_B_RIGHT);
  if (pinA == LOW && pinB == LOW)
  {
    posisiRight--; // CCW
  }
  if (pinA == LOW && pinB == HIGH)
  {
    posisiRight++;
  }
  if (pinA == HIGH && pinB == LOW)
  {
    posisiRight++; // CCW
  }
  if (pinA == HIGH && pinB == HIGH)
  {
    posisiRight--; // CCW
  }
}

void ISR_INT3()
{
  int pinA, pinB;
  pinA = digitalRead(CHANNEL_A_RIGHT);
  pinB = digitalRead(CHANNEL_B_RIGHT);
  if (pinA == LOW && pinB == LOW)
  {
    posisiRight++; // CCW
  }
  if (pinA == LOW && pinB == HIGH)
  {
    posisiRight--;
  }

  if (pinA == HIGH && pinB == LOW)
  {
    posisiRight--; // CCW
  }
  if (pinA == HIGH && pinB == HIGH)
  {
    posisiRight++; // CCW
  }
}
