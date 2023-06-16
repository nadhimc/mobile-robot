void UsSensor()
{
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(ECHO, HIGH);

  // Calculate the distance
  distanceCm = duration * SOUND_SPEED / 2;
}
