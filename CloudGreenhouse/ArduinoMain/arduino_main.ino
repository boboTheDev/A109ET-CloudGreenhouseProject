#include "src/lcd_segmented/lcd_segmented.h"
#include "src/ultrasonic_distance/ultrasonic_distance.h"
#include "src/soil_moisture/soil_moisture.h"
#include "src/photosensor_led/photosensor_led.h"
#include "src/temp_humi/temp_humi.h"
#include "src/wemos_lib/wemos_lib.h"


// 8 , 9 -> rx, tx
#define serial_speed 9600

//ultrasonic 
#define trigger 12
#define echo 13
int sensor_water_gap = 3;
int tank_height = 17;
int water_level;

//soil moisture
#define soil_vcc 4
int soil_input = A3;
int soil_moisture;

//led photosensor
#define photosensor_pin1 A0
int light;
// int accepted_light = 60; // light we can accept before turning on LEDs
int max_light = 103; // light in normal condition in the room

//temp_humi
//sensor pin is 5
int temp;
int humi;

//fans
int fan_1 = 10;
int fan_2 = 11;
int fan_status = 0;
//pump
int pump = 7;
int pump_status = 0;

//leds
int led_1 = 3;
int led_2 = 2;
int led_status = 0;

int camera_status = 0;

int manual = 0; // manual mode check
int check_delay = 10000; //default 15000
char *check_command = (char *)malloc(4);

// Predefined CONDITIONS
int temp_thres = 25;
int humidity_thres = 50;
int soil_thres = 60;
int water_thres = 30;
int light_thres = 80;

//time
unsigned long start_time;
unsigned long current_time;
unsigned long db_log_delay = 15000; //default 900000

void setup()
{
  lcd_init();
  ultrasonic_init(trigger, echo);
  soil_init(soil_vcc);
  photosensor_led_init(led_1, led_2);
  wifi_init(serial_speed);
  temp_humi_init();
  fan_init(fan_1);
  fan_init(fan_2);

  Serial.begin(serial_speed);

  start_time = millis();  // start counting time
}


void loop() {
  condition_setter();

  current_time = millis();

  collect_and_display();

  // make adjustments based on conditions
  soil_adjust(pump, soil_moisture, soil_thres);
  light_adjust(led_1, led_2, light, light_thres);
  temp_humi_adjust(fan_1, fan_2, temp, humi, temp_thres, humidity_thres);

// log the current measurements to the db, every set period

  if ((current_time - start_time) >= db_log_delay)
  {
    Serial.println("db_log...");
    lcd_display("LOGGING...", ".", 0);
    db_log( temp, humi, soil_moisture, water_level, light);
    start_time = millis();
  }

// check if there is any manual control
  delay(check_delay);
  command_setter();

  // if there is manual control, loop
  while(manual){
     Serial.println("Manual Mode");

    lcd_segmented("MANUAL", 1, "FANS", fan_status, "LEDS", led_status, "PUMP", pump_status, 0, 0, 0, 0);

  
    if (fan_status){
      fan_mode(fan_1, 200);
      fan_mode(fan_2, 200);
    }
    if (led_status){
       led_mode(led_1, 255);
        // led_mode(led_2, 255);
    }
   
   if (pump_status){
    pump_mode(pump, 1);
    delay(5000);
    pump_mode(pump, 0);
   }
    

    // collect_and_display();

    delay(check_delay);
   
    command_setter();
  }
}

// FUNCTIONS SPECIFIC TO THE MAIN LOOP



void collect_and_display(){
  // measure conditions
  water_level = measure_waterlevel(trigger, echo, sensor_water_gap, tank_height);
  soil_moisture = measure_soil_moisture(soil_vcc, soil_input);
  light = measure_photosensor(photosensor_pin1,max_light);
  temp = measure_temp();
  humi = measure_humi();

  Serial.print("Temerature: ");
  Serial.println(temp);
  Serial.print("Humidity: ");
  Serial.println(humi);
  Serial.print("Soil Moisture: ");
  Serial.println(soil_moisture);
  Serial.print("Water Tank: ");
  Serial.println(water_level);
  Serial.print("Lighting: ");
  Serial.println(light);
  Serial.println("----------------------");

  // display on the lcd 
  lcd_segmented("T",temp,"H",humi,"S",soil_moisture,"L",light,'C','P','P','P');

}

void command_setter(){
  lcd_display("REQUESTING", "COMMANDS...", 0);
  char *commands = check_for_commands();
   if(commands[0]=="\"" && commands[1]=="E"){
    //do something for error
  }
  char buffer_array[8];
  for (int i = 0; i <= 6; i++){
    buffer_array[i] = commands[i + 9];
  }
  buffer_array[7] = NULL;

  char *t_led_status = strtok(buffer_array, "-");
  char *t_pump_status = strtok(NULL, "-");
  char *t_fan_status = strtok(NULL, "-");
  char *t_camera_status = strtok(NULL, "-");

  led_status = atoi(t_led_status);
  pump_status = atoi(t_pump_status);
  fan_status = atoi(t_fan_status);
  camera_status = atoi(t_camera_status);

  if(led_status || pump_status || fan_status || camera_status){
      manual = 1;
    } else {
      manual = 0;
    }
}

void condition_setter (){
  lcd_display("REQUESTING", "CONDITIONS...", 0);
  char *conditions_data = request_for_conditions();

  if(conditions_data[0]=="\"" && conditions_data[1]=="E"){
    //do something for error
  }

  char buffer_array[15];
  for (int i = 0; i <= 13; i++){
    buffer_array[i] = conditions_data[i + 9];
  }
  buffer_array[14] = NULL;

  char *t_temp = strtok(buffer_array, "-");
  char *t_humi = strtok(NULL, "-");
  char *t_soil = strtok(NULL, "-");
  char *t_water = strtok(NULL, "-");
  char *t_light = strtok(NULL, "-");

  temp_thres = atoi(t_temp);
  humidity_thres = atoi(t_humi);
  soil_thres = atoi(t_soil);
  water_thres = atoi(t_water);
  light_thres = atoi(t_light);
}

