#ifndef SOIL_MOISTURE_H
#define SOIL_MOISTURE_H
#include <Arduino.h>

void soil_init(int soil_vcc);
int measure_soil_moisture(int soil_vcc, int soil_input);
void pump_init(int pump_pin);
void pump_mode(int pump_pin, int on_off);
void soil_adjust(int pump_pin, int soil_moisture, int soil_thres);

#endif