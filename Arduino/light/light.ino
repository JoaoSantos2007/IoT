//Bibliotecas
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
//#include <NTPClient.h>
#include <WiFiUdp.h>


//MQTT
#define TOPICO_SUBSCRIBE "esp-5"
#define TOPICO_PUBLISH   "global-iot"
#define ID_MQTT  "esp32-5"
const char* BROKER_MQTT = "192.168.15.54";
int BROKER_PORT = 1883;


//WIFI
const char* SSID = "JPGamerPlay_2G";
const char* PASSWORD = "ALEK010203";


//Objetos globais
WiFiClient espClient;
PubSubClient MQTT(espClient);
WiFiUDP ntpUDP; // UDP client
//NTPClient timeClient(ntpUDP); // NTP client


//Variávies Globais
String DEVICE_ID = "5";//ESP_ID
int wifi_time = 300000;
int last_wifi_time = 0;
bool exec_once_time = true;
int interruptor1 = 26;
int estado_inte_ant1 = 0;
int estado_inte_at1 = 0;
int interruptor2 = 25;
int estado_inte_ant2;
int estado_inte_at2;
int estado_lamp1 = 0;
int estado_lamp2 = 0;
int lamp1 = 14;
int lamp2 = 27;
String enviar = "";
bool mqtt_desconectado;

//Funções Globais
void init_mqtt(void);
void reconnect_wifi(void);
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void verif_internet(void);
void send_payload(String nome, String valor);
void recive_payload(byte* payload);


void setup()
{
  Serial.begin(115200);
  reconnect_wifi();
  init_mqtt();
  pinMode(lamp1, OUTPUT);
  pinMode(lamp2, OUTPUT);
  pinMode(interruptor1, INPUT);
  pinMode(interruptor2, INPUT);
  estado_inte_at1 = digitalRead(interruptor1);
  estado_inte_at2 = digitalRead(interruptor2);
  if (estado_inte_at1 == 1) {
    alterar1();
  } else {
    estado_inte_ant1 = !estado_inte_at1;
  }

  if (estado_inte_at2 == 1) {
    alterar2();
  } else {
    estado_inte_ant2 = !estado_inte_at2;
  }
}

void send_payload(String nome, String valor) {
  StaticJsonDocument<256> doc;
  doc["deviceId"] = DEVICE_ID;
  doc["eventType"] = "read-sensor";
  doc["name"] = nome;
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
    if (doc["name"] == "Lampada1") {
      if (doc["currentValue"] == "true") {
        estado_lamp1 = 1;
      } else {
        estado_lamp1 = 0;
      }
    } else if (doc["name"] == "Lampada2") {
      if (doc["currentValue"] == "true") {
        estado_lamp2 = 1;
      } else {
        estado_lamp2 = 0;
      }
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
  if (!MQTT.connected()) {
    Serial.print("-");
  }
  if (MQTT.connect(ID_MQTT))
  {
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

  if (WiFi.status() != WL_CONNECTED) Serial.print(".");
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
      if (mqtt_desconectado == true) {
        if (estado_lamp1 == 1) {
          enviar = "true";
        } else {
          enviar = "false";
        }
        send_payload("Lampada1", enviar);

        if (estado_lamp2 == 1) {
          enviar = "true";
        } else {
          enviar = "false";
        }
        send_payload("Lampada2", enviar);
        mqtt_desconectado = false;
      }
    }
  }
}

void alterar1() {
  estado_lamp1 = !estado_lamp1;
  if (estado_lamp1 == 1) {
    enviar = "true";
  } else {
    enviar = "false";
  }
  send_payload("Lampada1", enviar);
}

void alterar2() {
  estado_lamp2 = !estado_lamp2;
  if (estado_lamp2 == 1) {
    enviar = "true";
  } else {
    enviar = "false";
  }
  send_payload("Lampada2", enviar);
}

void loop() {
  //Verifica a conexão com a internet e com o mqtt
  verif_internet();
  estado_inte_at1 = digitalRead(interruptor1);
  estado_inte_at2 = digitalRead(interruptor2);
  if (estado_inte_at1 == estado_inte_ant1) {
    alterar1();
    estado_inte_ant1 = !estado_inte_ant1;
  }
  if (estado_inte_at2 == estado_inte_ant2) {
    alterar2();
    estado_inte_ant2 = !estado_inte_ant2;
  }
  digitalWrite(lamp1, estado_lamp1);
  digitalWrite(lamp2, estado_lamp2);
  MQTT.loop();
}
