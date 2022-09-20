#ifndef WEMOS_LIB_H
#define WEMOS_LIB_H
#include <Arduino.h>

void wifi_init(int speed);
void db_log(int temp, int humi, int soil, int water, int light);
char *request_for_conditions();
char *check_for_commands();

//helpers
char *get_response();

#endif