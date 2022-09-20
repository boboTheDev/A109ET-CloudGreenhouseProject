#ifndef TEMP_HUMI_H
#define TEMP_HUMI_H
#include <DHT.h>
#include <Arduino.h>

void temp_humi_init();
int measure_temp();
int measure_humi();
void fan_init(int fan);
void fan_mode(int fan, int pwm_value);
void temp_humi_adjust(int fan1, int fan2, int temp, int humi, int temp_thres, int humidity_thres);

#endif