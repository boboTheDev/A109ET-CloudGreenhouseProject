#ifndef ULTRASONIC_DISTANCE_H
#define ULTRASONIC_DISTANCE_H

#include <Wire.h>
#include <Arduino.h>

void ultrasonic_init(int trigger, int echo);
int measure_waterlevel(int trigger, int echo, int sensor_water_gap, int tank_height);
int measure_distance(int trigger, int echo);

#endif