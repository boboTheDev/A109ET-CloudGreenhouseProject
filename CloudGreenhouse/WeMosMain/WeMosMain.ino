#include <Arduino.h>
#include <SoftwareSerial.h>

#include <ESP8266WiFi.h>

#include <ESP8266HTTPClient.h>

#define SERVER_IP ****
#define WIFI_NAME ****
#define WIFI_PW ****

SoftwareSerial s_serial(8,9); //rx,tx

void setup(){
  Serial.begin(9600);
  s_serial.begin(9600);

  WiFi.begin(WIFI_NAME, WIFI_PW);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop(){

  if(Serial.available() && WiFi.status() == WL_CONNECTED){
    String income_string = Serial.readString();
    if (income_string.startsWith("{")){
      db_log(income_string);
    }
    if (income_string.startsWith("conditions")){
      check_for_conditions();
    }
    if (income_string.startsWith("commands")){
      check_for_commands();
    }
  }
  
}

void check_for_conditions(){
 
  WiFiClient client;
  HTTPClient http;
  http.begin(client, SERVER_IP "/conditions");
  int httpCode = http.GET();
  delay(5000);

  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      const String& payload = http.getString();
      Serial.println(payload);
   
    }
  } else {
      Serial.println("ERROR");
    }
  http.end();
}

void check_for_commands(){
  WiFiClient client;
  HTTPClient http;
  http.begin(client, SERVER_IP "/commands");
  int httpCode = http.GET();
  delay(5000);
  
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      const String& payload = http.getString();
      Serial.println(payload);
    }
  } else {
      Serial.println("ERROR");
    }
  http.end();
}


void db_log(String serial_income){
    serial_income.trim();
    
    WiFiClient client;
    HTTPClient http;
    
    http.begin(client, SERVER_IP "/db_log");

    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(serial_income);
    delay(5000);
    http.end();
}