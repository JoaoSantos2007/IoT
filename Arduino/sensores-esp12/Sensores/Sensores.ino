
#include "EspMQTTClient.h"
#include <ArduinoJson.h>
#include <DHT.h>

const char *SSID = "JPGamerPlay_2G";
const char *PASSWORD = "ALEK010203";
const char *BROKER_MQTT = "192.168.15.45";
const char *ID_MQTT = "cliente_1";
const bool DEBUG = false;

#define TOPIC_SUBSCRIBE "esp-1"
#define TOPIC_PUBLISH "global-iot"

//Sensor de Umidade e de Temperatura
#define DHTPIN 4 // pino sensor DHT
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

//Variáveis e constantes globais
const int DEVICE_ID = 1;
const int PIN_LUMINOSIDADE = A0;
const int PIN_PRESENCA = 5;

unsigned long previousMillis = 0;
const long interval = 900000;
bool wasPresence = false;

EspMQTTClient client(
  SSID,
  PASSWORD,
  BROKER_MQTT,
  ID_MQTT
);

//Prototypes
void init_serial(void);
//void init_conexoes(void);
void init_sensores(void);
void send_payload(void);

String readDHTTemperature()
{
  float t = dht.readTemperature();
  if (isnan(t))
  {
    return "0";
  }
  else
  {
    return String(t);
  }
}

String readDHTHumidity()
{
  float h = dht.readHumidity();
  if (isnan(h))
  {
    return "0";
  }
  else
  {
    return String(h);
  }
}

String readLDRLuminosidade()
{
  float v = analogRead(PIN_LUMINOSIDADE);
  if (isnan(v))
  {
    return "0";
  }
  else
  {
    return String(v);
  }
}

bool readPIRPresenca()
{
  bool p = digitalRead(PIN_PRESENCA);
  if (isnan(p))
  {
    return "0";
  }
  else
  {
    return p;
  }
}

//Implementações das funções
void setup()
{
  init_serial();
  delay(1000);
  //init_conexoes();
  delay(1000);
  init_sensores();
  delay(1000);
}

//inicializa comunicação serial
void init_serial()
{
  if (DEBUG) {
    Serial.begin(115200);
  }
}


//inicializa conexoes(WI-FI e MQTT)
void onConnectionEstablished() {
  client.subscribe(TOPIC_SUBSCRIBE, [](const String & payload) {
    if (DEBUG) {
      Serial.println(payload);
    }
  });
}

//inicializa configuraçoes sensores
void init_sensores()
{
  dht.begin();
  pinMode(PIN_LUMINOSIDADE, INPUT);
  pinMode(PIN_PRESENCA, INPUT);
}


//Mandar mensagem
void send_payload(String Umidade, String Temperatura, String Luminosidade, bool Presenca)
{
  StaticJsonDocument<256> doc;

  doc["deviceId"] = DEVICE_ID;
  doc["eventType"] = "read-sensor";

  //Add an object
  JsonObject sensor = doc.createNestedObject("sensor");
  sensor["temperatura"] = Temperatura;
  sensor["umidade"] = Umidade;
  sensor["luminosidade"] = Luminosidade;
  sensor["presenca"] = String(Presenca);

  //  //Add an array.
  //  JsonArray values = doc.createNestedArray("data");
  //  values.add(48.756080);
  //  values.add(2.302038);

  if (DEBUG) {
    Serial.print(F("Sending: "));
    serializeJson(doc, Serial);
  }

  char out[256];
  serializeJson(doc, out);
  client.publish(TOPIC_PUBLISH, out);
}

//programa principal
void loop()
{
  bool presenca = readPIRPresenca();
  unsigned long currentMillis = millis();
  if ((presenca == 1 && wasPresence == false) || (currentMillis - previousMillis >= interval))
  {
    previousMillis = currentMillis;
    send_payload(readDHTHumidity(),
                 readDHTTemperature(),
                 readLDRLuminosidade(),
                 presenca);
    delay(1000);
    if (presenca)
    {
      if (DEBUG) {
        Serial.println("Presence detected");
      }
      wasPresence = true;
    }
    else {
      wasPresence = false;
    }
  }
  client.loop();
}
