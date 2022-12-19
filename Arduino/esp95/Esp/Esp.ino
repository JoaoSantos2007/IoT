//Import libraries
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>


//Instance wifi and mqtt objects
WiFiClient espClient;
PubSubClient client(espClient);


//WIFI variables
char* ssid = "xiaomi_2G"; // SSID
char* password = "JP010203";
long lastWIFIReconnectAttempt = 0;


//MQTT variables
#define SUBSCRIBE_TOPIC "IOT_98"
#define PUBLISH_TOPIC "IOT_main"
#define ID_MQTT  "esp98"
const char* broker = "192.168.15.45";
const int port = 1883;
bool mqttInited = false;
long lastMQTTReconnectAttempt = 0;


int breakTimeToConnect = 10000;


/*
=================================
    Arduino Communication
=================================
*/


//Handle a message from arduino
void handleMessage(){
  if(Serial.available()){
    String msg = String(Serial.read());
    if(msg) publishMessage(msg);
  }
}


//Send a message to arduino
void sendMessage(String msg){
  if(Serial.available()){
    Serial.print(msg);
  }
}

/*
==============================
      MQTT Functions
==============================
*/


//Receive a broker message
void mqtt_callback(char* topic, byte* payload, unsigned int length){
  String msg;
  //obtem a string do payload recebido
  for (int i = 0; i < length; i++){
    char c = (char)payload[i];
    msg += c;
  }

  sendMessage(msg);
}


//Publish a message
void publishMessage(String msg){
  char payload[256];
  msg.toCharArray(payload, 256);

  client.publish(PUBLISH_TOPIC, payload);
}


/*
=================================
    Wifi and Mqtt Connections
=================================
*/


//Verif wifi connection
bool verifWIFI(){
  if(WiFi.status() != WL_CONNECTED){
    if((millis() - lastWIFIReconnectAttempt) >= breakTimeToConnect){
      WiFi.begin(ssid, password);

      lastWIFIReconnectAttempt = millis();
    }

    return false;
  }

  return true;
}


//Verif mqtt connection
bool verifMQTT(){
  if(!client.connected()){
    if((millis() - lastMQTTReconnectAttempt) >= breakTimeToConnect){
      if(client.connect(ID_MQTT)){
        client.subscribe(SUBSCRIBE_TOPIC);
      }

      lastMQTTReconnectAttempt = millis();
    }

    return false;
  }

  return true;
}


//Verif wifi and mqtt connetions
bool verifConnections(){

  if(!verifWIFI()) return false;

  //Init MQTT
  if(!mqttInited){
    client.setServer(broker, port);
    client.setCallback(mqtt_callback);
  }
    
  if(!verifMQTT()) return false;
    
  client.loop(); //Keep mqtt connected

  return true;
}


/*
======================================
           Arduino Functions
======================================
*/


//Setup function
void setup(){
  Serial.begin(9600);
}


//Loop function
void loop(){
  handleMessage();
  verifConnections();
}