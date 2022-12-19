#include <ArduinoJson.h>
#include <DHT.h>

//DHT variables
#define DHTPIN A0 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11
DHT dht(DHTPIN, DHTTYPE);//Instance dht object

//Sensor pin
const int switch1_PIN = 6;
const int switch2_PIN = 7;
const int light1_PIN = 8;
const int light2_PIN = 9;
const int PIN_LUMINOSITY = A1;
const int PIN_PRESENCE = A2;

//Light values
int switch1 = 0;
int switch2 = 0;

//Sensor IDs
String light1ID = "xuglNeOB090txQR8CGUFRzDO4";
String light2ID = "nxMnT7LWL1X1vUH4qowm6To0f";
String temperatureID = "DfcGoUL0ekm3nHld05nO92aet";
String humidityID = "80zaKecCN3BHoySpqeyFKP6aq";
String luminosityID = "rajnlBHMTZTp7ExxR06OjjQyT";
String presenceID = "mf0Zl2dadFnz607ipnZ4MAqve";

//Delay time
long lastDebounceTime = 0;
long debounceDelay = 10000;


/*
===================================
      Communication Esp8266
===================================
*/


//Handle a message from esp
void handleMessage(){
  if(Serial.available()){
    String msg = String(Serial.read());

    if(!msg) return;

    StaticJsonDocument<2048> doc;
    deserializeJson(doc, msg);
  }
}


//Send a message to esp
void sendMessage(String deviceID, String value){
  StaticJsonDocument<256> doc;

  doc["deviceID"] = deviceID;
  doc["type"] = "read-sensor";
  doc["value"] = value;

  char out[256];
  serializeJson(doc, out);

  Serial.print(out);
}


/*
======================================
          Sensor Functions
======================================
*/


//Read sensors
void readSensors(){
  String temperature = readTemperature();
  sendMessage(temperatureID, temperature);

  String humdity = readHumidity();
  sendMessage(humidityID, humdity);

  String luminosity = readLuminosity();
  sendMessage(luminosityID, luminosity);

  String presence = readPresence();
  sendMessage(presenceID, presence);
}


//Read light switches
void readSwitches(){
  if(switch1 != digitalRead(switch1_PIN)){
    switch1 = !switch1;

    updateLightState(light1_PIN);
    sendMessage(light1ID, String(digitalRead(light1_PIN)));
  }

  if(switch2 != digitalRead(switch2_PIN)){
    switch2 = !switch2;
    
    updateLightState(light2_PIN);
    sendMessage(light2ID, String(digitalRead(light2_PIN)));
  }
}


//Update light state
void updateLightState(int light_pin){
  int newState = !digitalRead(light_pin);
  digitalWrite(light_pin,newState);
}


//Read temperature
String readTemperature()
{
  float t = dht.readTemperature();

  if (isnan(t)){
    return "0";
  }else{
    return String(t);
  }
}


//Read humidity
String readHumidity(){
  float h = dht.readHumidity();

  if (isnan(h)){
    return "0";
  }else{
    return String(h);
  }
}


//Read luminosity
String readLuminosity(){
  float v = analogRead(PIN_LUMINOSITY);

  if (isnan(v)){
    return "0";
  }else{
    return String(v);
  }
}


//Read presence
String readPresence(){
  bool p = digitalRead(PIN_PRESENCE);

  if (isnan(p)){
    return "0";
  }else{
    return String(p);
  }
}



/*
======================================
           Arduino Functions
======================================
*/


//Setup function
void setup(){
  pinMode(switch1_PIN, INPUT);
  pinMode(switch2_PIN, INPUT);
  pinMode(light1_PIN, OUTPUT);
  pinMode(light2_PIN, OUTPUT);
  pinMode(PIN_LUMINOSITY, INPUT);
  pinMode(PIN_PRESENCE, INPUT);

  Serial.begin(9600);
}


//Loop function
void loop(){
  handleMessage();
  readSwitches();
  
  if((millis() - lastDebounceTime) >= debounceDelay){
    readSensors();

    lastDebounceTime = millis();
  }
}