//Import libraries
#include <WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>

//Instance wifi and mqtt objects
WiFiClient espClient;
PubSubClient client(espClient);


//WIFI variables
char* ssid = "xiaomi_2G"; // SSID / nome da rede WI-FI que deseja se conectar
char* password = "JP010203";
long lastWIFIReconnectAttempt = 0;


//MQTT variables
#define SUBSCRIBE_TOPIC "IOT_98"
#define PUBLISH_TOPIC "IOT_main"
#define ID_MQTT  "esp98"
long lastMQTTReconnectAttempt = 0;
const char* broker = "192.168.15.45";
const int port = 1883;
void mqtt_callback(char* topic, byte* payload, unsigned int length);

long lastDebounceTime = 0;
long debounceDelay = 0;

//Light variables
const int switch1_PIN = 32;
const int switch2_PIN = 33;
const int light1_PIN = 27;
const int light2_PIN = 26;
String light1ID = "xuglNeOB090txQR8CGUFRzDO4";
String light2ID = "nxMnT7LWL1X1vUH4qowm6To0f";
int switch1 = 0;
int switch2 = 0;


//Verif wifi and mqtt connetions
void verifConnections(){
  
  //Verif WIFI
  if (!verifWIFI()) {
    long now = millis();
    if (now - lastWIFIReconnectAttempt > 10000) {
      lastWIFIReconnectAttempt = now;
      
      // Attempt to reconnect
      if (reconnectWIFI()) {
        lastWIFIReconnectAttempt = 0;
      }
    }
  }
  

  //Verif MQTT
  if (!verifMQTT()) {
    long now = millis();
    if (now - lastMQTTReconnectAttempt > 5000) {
      lastMQTTReconnectAttempt = now;
      
      // Attempt to reconnect
      if (reconnectMQTT()) {
        lastMQTTReconnectAttempt = 0;
      }
    }
  }else{
    client.loop();//Keep mqtt connected
  }
}



/*
=========================================
            WIFI FUNCTIONS
=========================================
*/



//Init WIFI
void initWIFI(){
  reconnectWIFI();

  lastWIFIReconnectAttempt = 0;
}


//Verif WIFI connection
boolean verifWIFI(){
  if(WiFi.status() == WL_CONNECTED){
    return true;
  }else{
    return false;
  }
}


//Reconnect WIFI connection
boolean reconnectWIFI(){
  WiFi.begin(ssid, password); // Conecta na rede WI-FI
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.write("wifi");
  return verifWIFI();
}



/*
=========================================
            MQTT FUNCTIONS
=========================================
*/


//Receive a broker message
void mqtt_callback(char* topic, byte* payload, unsigned int length){
  String msg;
  //obtem a string do payload recebido
  for (int i = 0; i < length; i++)
  {
    char c = (char)payload[i];
    msg += c;
  }

  Serial.print(F("Receiving: "));
  Serial.println(msg);

  StaticJsonDocument<2048> doc;
  deserializeJson(doc, payload);

  if(doc["deviceID"] == light1ID){
    if(doc["tag"] == "#lightBTN"){
      updateLightState(light1_PIN);
      sendSwitch1();
    }
  }else if(doc["deviceID"] == light2ID){
    if(doc["tag"] == "#lightBTN"){
      updateLightState(light2_PIN);
      sendSwitch2();
    }
  }
}


//Init MQTT
void initMQTT(){
  client.setServer(broker, port);
  client.setCallback(mqtt_callback);
  
  lastMQTTReconnectAttempt = 0;
}


//Verif MQTT connection
boolean verifMQTT(){
  return client.connected();
}


//Reconnect MQTT connection
boolean reconnectMQTT() {
  if (client.connect(ID_MQTT)){
    client.subscribe(SUBSCRIBE_TOPIC);
    Serial.write("mqtt");
  }
  
  return client.connected();
}



/*
======================================
          Sensor Functions
======================================
*/


//update light state
void updateLightState(int light_pin){
  int newState = !digitalRead(light_pin);
  digitalWrite(light_pin,newState);
}


//read light switches
void readSwitches(){
  if(switch1 != digitalRead(switch1_PIN)){
    switch1 = !switch1;
    updateLightState(light1_PIN);
    sendSwitch1();
  }

  if(switch2 != digitalRead(switch2_PIN)){
    switch2 = !switch2;
    updateLightState(light2_PIN);
    sendSwitch2();
  }
}


//Send
void sendSwitch1(){
  StaticJsonDocument<256> doc;

  doc["deviceID"] = light1ID;
  doc["type"] = "read-sensor";
  doc["value"] = digitalRead(light1_PIN);

  sendMessage(doc);
}

void sendSwitch2(){
  StaticJsonDocument<256> doc;

  doc["deviceID"] = light2ID;
  doc["type"] = "read-sensor";
  doc["value"] = digitalRead(light2_PIN);

  sendMessage(doc);
}

void sendMessage(StaticJsonDocument<256> doc){
  char out[256];
  serializeJson(doc, out);
  client.publish(PUBLISH_TOPIC, out);
}

/*
======================================
           Arduino Functions
======================================
*/



//Setup function
void setup(){
  pinMode(switch1_PIN,INPUT);
  pinMode(switch2_PIN,INPUT);
  pinMode(light1_PIN,OUTPUT);
  pinMode(light2_PIN,OUTPUT);
  Serial.begin(115200);
  Serial.println("started");

  initWIFI();
  initMQTT();
  verifConnections();
}



//Loop function
void loop(){
  readSwitches();
  verifConnections();
}