#include "lcd_segmented.h"

LiquidCrystal_I2C lcd(0x27, 16, 2);

void lcd_init(){
  lcd.init();
  lcd.backlight();
}

void lcd_display(String txt1, String txt2, int wait_delay){
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(txt1);
  if (txt2){
    lcd.setCursor(0, 1);
  lcd.print(txt2);
  }
  if(wait_delay){
    delay(wait_delay);
  }
}

void lcd_segmented(String aa, int ab, String ba, int bb, String ca, int cb, String da, int db, char ac, char bc,char cc,char dc){
  lcd.clear();
  if (ab){
    lcd_display_group(aa,ab,1,ac);
  }
   if (bb){
    lcd_display_group(ba,bb,2,bc);
  }
   if (cb){
    lcd_display_group(ca,cb,3,cc);
  }
   if (db){
    lcd_display_group(da,db,4,dc);
  }
}

void lcd_display_group(String txt, int value, int slot, char metric){
  int position_y, position_x; 
  switch(slot){
    case 1:
      position_y = 0;
      position_x = 0;
      break;
    case 2:
      position_y = 9;
      position_x = 0;
      break;
    case 3:
      position_y = 0;
      position_x = 1;
      break;
    case 4:
      position_y = 9;
      position_x = 1;
      break;
  } 
  lcd.setCursor(position_y, position_x);
  lcd.print(txt+ ":");
  lcd.print(value);
  if(metric){
    switch (metric){
      case 'C':
        lcd.print(" ");
        lcd.print((char)223);
        lcd.print(metric);
        break;
      case 'P':
        lcd.print(" ");
        lcd.print((char)37);
        break;   
      default:
        lcd.print(" ");
        lcd.print(metric);
        break;
    }
  }
}