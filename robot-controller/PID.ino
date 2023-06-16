void getPidData()
{
  kecepatanLeft = abs((((float)posisiLeft) / tick * 2 * M_PI / timeDiff));
  leftCurrentSpeed = kecepatanLeft;
  posisiLeft = 0;
  kecepatanRight = abs((((float)posisiRight) / tick * 2 * M_PI / timeDiff));
  rightCurrentSpeed = kecepatanRight;
  posisiRight = 0;

  //    START PID

  // Left PID calculation
  leftError = leftDesiredSpeed - leftCurrentSpeed;
  leftIntegralTerm += leftError;
  leftDerivativeTerm = leftError - leftPreviousError;

  // Left PID control
  float leftPIDControl = (leftKp * leftError) + (leftKi * leftIntegralTerm) + (leftKd * leftDerivativeTerm);
  if (leftPIDControl > 50)
  {
    leftPIDControl = 50;
  }
  // Update leftPreviousError for the next iteration
  leftPreviousError = leftError;

  // Right PID calculation
  rightError = rightDesiredSpeed - rightCurrentSpeed; // PID YANG BENAR
  rightIntegralTerm += rightError;
  rightDerivativeTerm = rightError - rightPreviousError;

  // Right PID control
  float rightPIDControl = (rightKp * rightError) + (rightKi * rightIntegralTerm) + (rightKd * rightDerivativeTerm);
  if (rightPIDControl > 50)
  {
    rightPIDControl = 50;
  }
  // Update rightPreviousError for the next iteration
  rightPreviousError = rightError;

  dutyCycle = (leftPIDControl >= 255) ? 255 : ((leftPIDControl <= 0) ? 0 : leftPIDControl);
  rightDutyCycle = (rightPIDControl >= 255) ? 255 : ((rightPIDControl <= 0) ? 0 : rightPIDControl);
}
