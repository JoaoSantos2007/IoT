//Bibliotecas
#include "EspMQTTClient.h"
#include <ArduinoJson.h>


//MQTT
const char *SSID = "JPGamerPlay_2G";
const char *PASSWORD = "ALEK010203";
const char *BROKER_MQTT = "192.168.15.45";
const char *ID_MQTT = "cliente_6";
const bool DEBUG = false;

#define TOPIC_SUBSCRIBE "esp-6"
#define TOPIC_PUBLISH "global-iot"


//Variávies Globais
String DEVICE_ID = "6";//ESP_ID
int PIN_LAMPADA = 4;
int PIN_INTERRUPTOR = 5;

int estado_interruptor_atual = 0;
int estado_interruptor_anterior = 0;
int estado_lampada = 0;

String enviar = "";


//Funções Globais
void send_payload(String valor);
void recive_payload(byte* payload);

EspMQTTClient client(
  SSID,
  PASSWORD,
  BROKER_MQTT,
  ID_MQTT
);


void setup()
{
  if (DEBUG) Serial.begin(115200);
  pinMode(PIN_LAMPADA, OUTPUT);
  pinMode(PIN_INTERRUPTOR, INPUT);
}

void send_payload(String valor) {
  StaticJsonDocument<256> doc;
  doc["deviceId"] = DEVICE_ID;
  doc["eventType"] = "action-esp";

  //Add an object
  JsonObject sensor = doc.createNestedObject("sensor");
  sensor["light"] = valor;

  Serial.print(F("Sending: "));
  serializeJson(doc, Serial);
  Serial.println();

  char out[256];
  serializeJson(doc, out);
  client.publish(TOPIC_PUBLISH, out);
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

void alterar_estado_lampada() {
  estado_interruptor_anterior = !estado_interruptor_atual;
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

  estado_interruptor_atual = digitalRead(PIN_INTERRUPTOR);

  if (estado_interruptor_atual == estado_interruptor_anterior) {
    alterar_estado_lampada();
  }
  digitalWrite(PIN_LAMPADA, estado_lampada);
}
