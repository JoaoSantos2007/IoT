//Import libraries
#include <WiFi.h>
#include <ArduinoJson.h>
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
#define SUBSCRIBE_TOPIC "IOT_97"
#define PUBLISH_TOPIC "IOT_main"
#define ID_MQTT  "esp97"
long lastMQTTReconnectAttempt = 0;
const char* broker = "192.168.15.45";
const int port = 1883;
void mqtt_callback(char* topic, byte* payload, unsigned int length);

//DHT variables
#define DHTPIN 16 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11
DHT dht(DHTPIN, DHTTYPE);//Instance dht object
String tempID = "mgLHEmGgS9FTsw2ma3JDSzM8J";
String humidityID = "rnwagTOTzyMuq3fcvc1UgO5gn";
String luminosityID = "8prfQoLy0Q12GigDr63xc9FJj";
int ldr = 27;

long lastDebounceTime = 0;
long debounceDelay = 10000;



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

float readLuminosity(){
  return analogRead(ldr);
};

void readSensors(){
  String temp = String(readTemperature());
  String humidity = String(readHumidity());
  String luminosity = String(readLuminosity());

  Serial.println(readLuminosity());

  sendTemp(temp);
  sendHumidity(humidity);
  sendLuminosity(luminosity);
}


/*
===============================
        Send Messages
===============================
*/

//Send temp
void sendTemp(String temp){
  StaticJsonDocument<256> doc;

  doc["deviceID"] = tempID;
  doc["type"] = "read-sensor";
  doc["value"] = temp;

  sendMessage(doc);
}

void sendHumidity(String humidity){
  StaticJsonDocument<256> doc;

  doc["deviceID"] = humidityID;
  doc["type"] = "read-sensor";
  doc["value"] = humidity;

  sendMessage(doc);
}

void sendLuminosity(String luminosity){
  StaticJsonDocument<256> doc;

  doc["deviceID"] = luminosityID;
  doc["type"] = "read-sensor";
  doc["value"] = luminosity;

  sendMessage(doc);
}

//Send
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
  pinMode(ldr, INPUT);
  Serial.begin(115200);
  Serial.println("started");

  initWIFI();
  initMQTT();
  verifConnections();
}



//Loop function
void loop(){
  verifConnections();
  if((millis() - lastDebounceTime) >= debounceDelay){
    readSensors();
    lastDebounceTime = millis();
  }
}