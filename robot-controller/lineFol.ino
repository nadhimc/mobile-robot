void lineFol(){
    Line_fol[0] = digitalRead(PIN_LF_0);
    Line_fol[1] = digitalRead(PIN_LF_1);
    // Line_fol[2] = digitalRead(PIN_LF_2);
    // Line_fol[3] = digitalRead(PIN_LF_3);
    Line_fol[4] = digitalRead(PIN_LF_4);
    lineFolString = "";
    for (int i = 0; i < 5; i++)
    {
      lineFolString += String(Line_fol[i]);
    }

    if (lineFolString == "00000"){
      finished_state == 0;
    }
}
