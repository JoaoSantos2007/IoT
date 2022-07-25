//Import libraries
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

//Instance wifi and mqtt objects
WiFiClient espClient;
PubSubClient client(espClient);


//WIFI variables
char* ssid = "xiaomi_2G"; // SSID / nome da rede WI-FI que deseja se conectar
char* password = "JP010203";
long lastWIFIReconnectAttempt = 0;


//MQTT variables
#define SUBSCRIBE_TOPIC "device97"
#define PUBLISH_TOPIC "global-iot"
#define ID_MQTT  "esp97"
long lastMQTTReconnectAttempt = 0;
const char* broker = "192.168.15.45";
const int port = 1883;
void mqtt_callback(char* topic, byte* payload, unsigned int length);


//DHT sensor variables
#define DHTPIN 27 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11
DHT dht(DHTPIN, DHTTYPE);//Instance dht object


//Light variables
const int switch1_PIN = 34;
const int switch2_PIN = 26;
const int light1_PIN = 16;
const int light2_PIN = 17;
boolean switch1 = false;
boolean switch2 = false;


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



//Read temperature
float readTemperature(){
  return dht.readTemperature();
}


//Read humidity
float readHumidity(){
  return dht.readHumidity();
}


//update light state
void updateLightState(int light_pin,boolean stage){
  digitalWrite(light_pin,stage);
}


//read light switches
void readSwitches(){
  if(switch1 != digitalRead(switch1_PIN)){
    switch1 = digitalRead(switch1_PIN);
    updateLightState(light1_PIN,switch1);
  }

  if(switch2 != digitalRead(switch2_PIN)){
    switch2 = digitalRead(switch2_PIN);
    updateLightState(light2_PIN,switch2);
  }
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
  Serial.write("started");

  initWIFI();
  initMQTT();
  verifConnections();
  readSwitches();
}



//Loop function
void loop(){
  readSwitches();
  verifConnections();
}
