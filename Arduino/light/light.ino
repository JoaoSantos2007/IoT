//Bibliotecas
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
//#include <NTPClient.h>
#include <WiFiUdp.h>


//MQTT
#define TOPICO_SUBSCRIBE "esp-5"
#define TOPICO_PUBLISH   "publish-IOT"
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

//Funções Globais
void init_mqtt(void);
void reconnect_wifi(void);
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void verif_internet(void);
void send_payload(void);
void recive_payload(byte* payload);


void setup()
{
  Serial.begin(115200);
  reconnect_wifi();
  init_mqtt();
}

void send_payload()
{
  StaticJsonDocument<256> doc;

  doc["deviceId"] = DEVICE_ID;
  doc["eventType"] = "read-sensor";

  //Add an object
  JsonObject sensor = doc.createNestedObject("sensor");
  //Add an array.
  //  JsonArray values = doc.createNestedArray("data");
  //  values.add(48.756080);
  //  values.add(2.302038);

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
    } else {
    }

  }
}

void init_mqtt(void) {
  //Inicia o Mqtt
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(mqtt_callback);
  void mqtt_callback(char* topic, byte * payload, unsigned int length) {
    recive_payload(payload, length);
  }
}

void reconnect_mqtt(void)
{
  while (!MQTT.connected())
  {
    Serial.print("* Tentando se conectar ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);
    if (MQTT.connect(ID_MQTT))
    {
      Serial.println("Conectado com sucesso ao broker MQTT!");
      MQTT.subscribe(TOPICO_SUBSCRIBE);
    }
    else
    {
      Serial.println("Falha ao reconectar no broker.");
      Serial.println("Havera nova tentativa de conexao em 2s");
      delay(2000);
    }
  }
}

void reconnect_wifi(){
  if (WiFi.status() == WL_CONNECTED)return;

  Serial.println("Fazendo a conexão com a Internet!");
  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED){
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Conectado");
//  Serial.println("IP obtido: ");
//  Serial.println(WiFi.localIP());
}

void verif_internet(void){
  reconnect_wifi();
  /* se não há conexão com o Broker, a conexão é refeita */
  if (!MQTT.connected())
    reconnect_mqtt();
}

void loop(){
  //Verifica a conexão com a internet e com o mqtt
  verif_internet();

  MQTT.loop();
}
