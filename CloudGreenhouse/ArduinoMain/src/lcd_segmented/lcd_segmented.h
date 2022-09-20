#ifndef LCD_SEGMENTED_H
#define LCD_SEGMENTED_H
#include <LiquidCrystal_I2C.h>
#include <Arduino.h>

void lcd_segmented(String aa, int ab, String ba, int bb, String ca, int cb, String da, int db, char ac, char bc, char cc, char dc);
void lcd_init();
void lcd_display_group(String txt, int value, int slot, char metric);
void lcd_display(String txt1, String txt2, int wait_delay);

#endif