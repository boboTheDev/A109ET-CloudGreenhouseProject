#include "photosensor_led.h"

int photosensor;

void photosensor_led_init(int led_1, int led_2){
  pinMode(led_1, OUTPUT);
  pinMode(led_2, OUTPUT);
}

int measure_photosensor(int sensor_pin, int max_light){
  photosensor = analogRead(sensor_pin);
  int light_percent = map(photosensor, 0, max_light , 0, 100);
  return light_percent;
}

void led_mode(int led_pin, int pwm_value){
  if(pwm_value){
    analogWrite(led_pin, pwm_value);
  } else {
    analogWrite(led_pin, 0);
  }
}

void light_adjust(int led_1, int led_2, int light, int light_thres){
  int light_loss = light_thres - light;
  int pwm_value = map(light_loss, 0, light_thres-30, 100, 255);
  
  if(light < light_thres){
    led_mode(led_1, pwm_value);
    // led_mode(led_2, pwm_value);
  } else {
    led_mode(led_1, 0);
    // led_mode(led_2, 0);
  }
}