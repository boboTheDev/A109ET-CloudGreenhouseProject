#ifndef PHOTOSENSOR_LED_H
#define PHOTOSENSOR_LED_H
#include <Arduino.h>

void photosensor_led_init(int led_1, int led_2);
int measure_photosensor(int sensor_pin,int max_light);
void led_mode(int led_pin, int pwm_value);
void light_adjust(int led_1, int led_2, int light, int light_thres);

#endif