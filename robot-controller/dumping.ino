void dump()
{
  // Manjang
   digitalWrite(33, LOW);
   digitalWrite(32, HIGH);
  // pcf.digitalWrite(P0, LOW);
  // pcf.digitalWrite(P2, HIGH);
}

void undump()
{
  // pendek
   digitalWrite(33, HIGH);
   digitalWrite(32, LOW);
  // pcf.digitalWrite(P0, HIGH);
  // pcf.digitalWrite(P2, LOW);
}

void dumpFunction()
{

  if (dumpState == 1)
  {
    dump();
  }
  else if(dumpState==0)
  {
    undump();
  }
  finished_state = 1;
  paket_state = 0;
}
