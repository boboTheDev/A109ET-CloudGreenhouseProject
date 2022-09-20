#include "soil_moisture.h"

void soil_init(int soil_vcc){
  pinMode(soil_vcc, OUTPUT);
  digitalWrite(soil_vcc, LOW);
}

int measure_soil_moisture(int soil_vcc, int soil_input){
  digitalWrite(soil_vcc, HIGH);
  delay(10);
  int value = analogRead(soil_input);
  digitalWrite(soil_vcc, LOW);
  value = map(value, 1000, 500, 1, 100);
  return value;
}

void pump_init(int pump_pin){
  pinMode(pump_pin, OUTPUT);
}

void pump_mode(int pump_pin, int on_off){
  if(on_off){
    digitalWrite(pump_pin, HIGH);
  } else {
    digitalWrite(pump_pin, LOW); 
  }
}

void soil_adjust(int pump_pin, int soil_moisture, int soil_thres){
  if(soil_moisture < soil_thres){
    pump_mode(pump_pin, 1);
    delay(5000);
    pump_mode(pump_pin, 0);
  }
}