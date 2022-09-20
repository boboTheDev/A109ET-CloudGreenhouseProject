#include <Arduino.h>
#include <SoftwareSerial.h>
#include "wemos_lib.h"
                                     

SoftwareSerial s_serial(8,9); //rx,tx
int buffer_word_size = 200;

void wifi_init( int speed){
  s_serial.begin(speed);
  delay(1000);
}

void db_log(int temp, int humi, int soil, int water, int light){
  s_serial.print("{\"temp\":");
  s_serial.print(temp);
  s_serial.print(",");
  s_serial.print("\"humi\":");
  s_serial.print(humi);
  s_serial.print(",");
  s_serial.print("\"soil\":");
  s_serial.print(soil);
  s_serial.print(",");
  s_serial.print("\"water\":");
  s_serial.print(water);
  s_serial.print(",");
  s_serial.print("\"light\":");
  s_serial.print(light);
  s_serial.println("}");
}

char * request_for_conditions(){
  s_serial.println("conditions");
  while(!s_serial.available()){
  }
  if (s_serial.available()){
    delay(1);
    char *response = get_response();
    return response;
  }
  
}

char * check_for_commands(){
  s_serial.println("commands");
   while(!s_serial.available()){
  }
  if (s_serial.available()){
    delay(1);
    char *response = get_response();
     return response;
  } 
}




// helpers

char * get_response(){
  char *response = (char *)malloc(buffer_word_size);
  free(response);
  int i = 0;
  while (s_serial.available()){
    response[i] = s_serial.read();
    i++;
    delay(1);
  }
  
  response[i] = NULL;
  return response;
}