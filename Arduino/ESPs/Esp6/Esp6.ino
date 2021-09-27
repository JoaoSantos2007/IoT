//Bibliotecas
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>


//MQTT
#define TOPICO_SUBSCRIBE "esp-6"
#define TOPICO_PUBLISH   "global-iot"
#define ID_MQTT  "esp32-6"
const char* BROKER_MQTT = "192.168.15.45";
int BROKER_PORT = 1883;


//WIFI
const char* SSID = "JPGamerPlay_2G";
const char* PASSWORD = "ALEK010203";


//Objetos globais
WiFiClient espClient;
PubSubClient MQTT(espClient);

//Variávies Globais
String DEVICE_ID = "6";//ESP_ID
int wifi_time = 300000;
int last_wifi_time = 0;
bool exec_once_time = true;
int interruptor = 5;
int estado_inte_ant = 0;
int estado_inte_at = 0;
int estado_lamp = 0;
int lamp = 4;
String enviar = "";
bool mqtt_desconectado;

//Funções Globais
void init_mqtt(void);
void reconnect_wifi(void);
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void verif_internet(void);
void send_payload(String valor);
void recive_payload(byte* payload);


void setup()
{
  Serial.begin(115200);
  reconnect_wifi();
  init_mqtt();
  pinMode(lamp, OUTPUT);
  pinMode(interruptor, INPUT);
  estado_inte_at = digitalRead(interruptor);
  if (estado_inte_at == 1) {
    alterar();
  } else {
    estado_inte_ant = !estado_inte_at;
  }
}

void send_payload(String valor) {
  StaticJsonDocument<256> doc;
  doc["deviceId"] = DEVICE_ID;
  doc["eventType"] = "read-sensor";
  //Add an object
  JsonObject sensor = doc.createNestedObject("sensor");
  sensor["light"] = valor;

  Serial.print(F("Sending: "));
  serializeJson(doc, Serial);
  Serial.println();

  char out[256];
  serializeJson(doc, out);
  MQTT.publish(TOPICO_PUBLISH, out);
}

void recive_payload(byte * payload, int length)
{
  String msg;
  //obtem a string do payload recebido
  for (int i = 0; i < length; i++)
  {
    char c = (char)payload[i];
    msg += c;
  }

  Serial.print(F("Receiving: "));
  Serial.println(msg);
  apply_rule(payload);

}

void apply_rule(byte * payload)
{
  StaticJsonDocument<2048> doc;
  deserializeJson(doc, payload);
  if (doc["type"] == "light") {
    String valor = doc["currentValue"];
      if (doc["currentValue"] == "true") {
        estado_lamp = 1;
      } else {
        estado_lamp = 0;
      }
  }
}


void init_mqtt(void) {
  //Inicia o Mqtt
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(mqtt_callback);
}

void mqtt_callback(char* topic, byte * payload, unsigned int length) {
  recive_payload(payload, length);
}


void reconnect_mqtt(void) {
  if (MQTT.connect(ID_MQTT)){
    Serial.println("Conectado com sucesso ao broker MQTT!");
    MQTT.subscribe(TOPICO_SUBSCRIBE);
  }
}

void reconnect_wifi() {
  if ((exec_once_time == true) || ((millis() - last_wifi_time) >= wifi_time)) {
    exec_once_time = false;
    last_wifi_time = millis();
    Serial.println("Fazendo a conexão com a Internet!");
    WiFi.begin(SSID, PASSWORD);
  }

  if (WiFi.status() != WL_CONNECTED);
  //  Serial.println(WiFi.localIP());
}

void verif_internet(void) {
  if (WiFi.status() != WL_CONNECTED) {
    reconnect_wifi();
  } else {
    if (!MQTT.connected()) {
      reconnect_mqtt();
      mqtt_desconectado = true;
    } else {
      if (mqtt_desconectado == false) {
        if (estado_lamp == 1) {
          enviar = "true";
        } else {
          enviar = "false";
        }
        send_payload(enviar);
        mqtt_desconectado = false;
      }
    }
  }
}

void alterar() {
  estado_lamp = !estado_lamp;
  if (estado_lamp == 1) {
    enviar = "true";
  } else {
    enviar = "false";
  }
  if(mqtt_desconectado == true){
    send_payload(enviar);
  }
}

void loop() {
  //Verifica a conexão com a internet e com o mqtt
  verif_internet();
  estado_inte_at = digitalRead(interruptor);
  if (estado_inte_at == estado_inte_ant) {
    alterar();
    estado_inte_ant = !estado_inte_ant;
  }
  digitalWrite(lamp, estado_lamp);
  MQTT.loop();
}
