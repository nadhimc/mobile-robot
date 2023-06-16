//--------------RFID--------------------------
void RFID()
{
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  /*Select Card*/
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }
  /*Show UID for Card/Tag on serial monitor*/
  Serial.print("UID tag :");
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    //  Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    //  Serial.print(mfrc522.uid.uidByte[i], HEX);
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  //  Serial.println();
  // Serial.print("Message : ");
  content.toUpperCase();
  // String text="coba";
  //  Serial.println(content.substring(1));
}
//--------------RFID END---------------------
