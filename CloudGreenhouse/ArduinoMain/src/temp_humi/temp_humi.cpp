#include "temp_humi.h"

#define DHTTYPE DHT11
DHT dht(5, DHTTYPE);

void temp_humi_init(){
  dht.begin();
}

int measure_temp(){
  float t = dht.readTemperature();
  int t_int = t;
  return t_int;
}

int measure_humi(){
  float h = dht.readHumidity();
  int h_int = h;
  return h_int;
}

void fan_init(int fan){
  pinMode(fan, OUTPUT);
}

void fan_mode(int fan, int pwm_value ){
  if (pwm_value){
    analogWrite(fan, pwm_value);
  } else {
    analogWrite(fan, 0);
  }
}

void temp_humi_adjust(int fan1, int fan2, int temp, int humi, int temp_thres, int humidity_thres){
  int pwm_value;
  if (temp > temp_thres || humi > humidity_thres) {
    if (temp > temp_thres){
      pwm_value = map(temp - temp_thres, 0, 10, 70, 200);
      fan_mode(fan1, pwm_value);
      fan_mode(fan2, pwm_value);
    }
    if (humi > humidity_thres){
      pwm_value = map(humi - humidity_thres, 0, 40, 70, 200);
      fan_mode(fan1, pwm_value);
      fan_mode(fan2, pwm_value);
    }
  } else{
    fan_mode(fan1, 0);
    fan_mode(fan2, 0);
  }
}
