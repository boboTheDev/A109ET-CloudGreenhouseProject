#include "ultrasonic_distance.h"

void ultrasonic_init(int trigger, int echo){
  pinMode(trigger, OUTPUT);
  pinMode(echo, INPUT);
}

int measure_distance(int trigger, int echo){
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger,HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
  long duration = pulseIn(echo, HIGH);
  int distance = duration * 0.034 / 2;
  pulseIn(echo, LOW);
  return distance;
}

int measure_waterlevel(int trigger, int echo, int sensor_water_gap, int tank_height){
  digitalWrite(trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger,HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger, LOW);
  long duration = pulseIn(echo, HIGH);
  int distance = duration * 0.034 / 2;

  // int water_level =  100 - ((100 * (distance - sensor_water_gap)) / tank_height);
  int water_level = map(distance, 0, tank_height, (100 * tank_height)/(tank_height-sensor_water_gap) ,0);

  if (water_level <=0){
    int exit = 1;
    return exit;
  } 
  return water_level;
}