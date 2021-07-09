
/* Headers */
#include <WiFi.h>         /* Header para uso das funcionalidades de wi-fi do ESP32 */
#include <PubSubClient.h> /*  Header para uso da biblioteca PubSubClient */
#include <ArduinoJson.h>

#include <NTPClient.h>
#include <WiFiUdp.h>

//Bibliotecas do sensor de Umidade/Temperatura
#include <DHT.h>

String DEVICE_ID = "1";
int PIN_LUMINOSIDADE = 35;
int PIN_PRESENCA = 26;

unsigned long previousMillis = 0;   
const long interval = 60000;
bool wasPresence = false;

//Definições do MQTT

//Tópico MQTT para recepção de informações do broker MQTT para ESP32
#define TOPICO_SUBSCRIBE "topico-1"

//Tópico MQTT para envio de informações do ESP32 para broker MQTT
#define TOPICO_PUBLISH "test"

/* id mqtt (para identificação de sessão)
   IMPORTANTE: este deve ser único no broker (ou seja, 
               se um client MQTT tentar entrar com o mesmo 
               id de outro já conectado ao broker, o broker 
               irá fechar a conexão de um deles).
*/

#define ID_MQTT "Cliente_MQTT"

//Variáveis e constantes globais

// SSID / nome da rede WI-FI que deseja se conectar
const char *SSID = "xiaomi_2G";
//Senha da rede WI-FI que deseja se conectar
const char *PASSWORD = "JP010203";

//URL do broker MQTT que deseja utilizar
const char *BROKER_MQTT = "192.168.31.45";
//Porta do Broker MQTT
int BROKER_PORT = 1883;

//Variáveis e objetos globais
WiFiClient espClient;
PubSubClient MQTT(espClient);

WiFiUDP ntpUDP;               // UDP client
NTPClient timeClient(ntpUDP); // NTP client

//Sensor de Umidade e de Temperatura
#define DHTPIN 27 // Pino digital conectado ao sensor DHT
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

String readDHTTemperature()
{
  float t = dht.readTemperature();
  if (isnan(t))
  {
    Serial.println("Falha ao ler o sensor DHT!");
    return "--";
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
    return "--";
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
    return "--";
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
    return "--";
  }
  else
  {
    return p;
  }
}

//Fim sensor de umidade

//Prototypes
void init_serial(void);
void init_wifi(void);
void init_mqtt(void);
void reconnect_wifi(void);
void verifica_conexoes_wifi_mqtt(void);
void send_payload(void);
void init_time(void);

void init_time()
{
  timeClient.begin();          // init NTP
  timeClient.setTimeOffset(0); // 0= GMT, 3600 = GMT+1
}

/* 
 *  Implementações das funções
 */
void setup()
{
  init_serial();
  init_wifi();
  init_mqtt();
  init_time();
  dht.begin();
  pinMode(2, OUTPUT); //Pino
  pinMode(PIN_LUMINOSIDADE, INPUT);
}

//Mandar mensagem
void send_payload(String Umidade, String Temperatura, String Luminosidade, bool Presenca)
{

  while (!timeClient.update())
  {
    timeClient.forceUpdate();
  }

  long unsigned int timestamp = timeClient.getEpochTime();
  StaticJsonDocument<256> doc;

  doc["deviceId"] = DEVICE_ID;
  doc["eventType"] = "read-sensor";
  doc["timestamp"] = timestamp;

  //Add an object
  JsonObject sensor = doc.createNestedObject("sensor");
  sensor["temperatura"] = Temperatura + "°C";
  sensor["umidade"] = Umidade + "%";
  sensor["proximidade"] = Luminosidade;
  sensor["presenca"] = String(Presenca);

  //  //Add an array.
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

/* Função: inicializa comunicação serial com baudrate 115200 (para fins de monitorar no terminal serial 
           o que está acontecendo.
  Parâmetros: nenhum
  Retorno: nenhum
*/
void init_serial()
{
  Serial.begin(115200);
}

/* Função: inicializa e conecta-se na rede WI-FI desejada
 * Parâmetros: nenhum
 * Retorno: nenhum
 */
void init_wifi(void)
{
  delay(10);
  Serial.println("------Conexao WI-FI------");
  Serial.print("Conectando-se na rede: ");
  Serial.println(SSID);
  Serial.println("Aguarde");
  reconnect_wifi();
}

/* Função: inicializa parâmetros de conexão MQTT(endereço do  
 *         broker, porta e seta função de callback)
 * Parâmetros: nenhum
 * Retorno: nenhum
 */
void init_mqtt(void)
{
  /* informa a qual broker e porta deve ser conectado */
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  /* atribui função de callback (função chamada quando qualquer informação do 
    tópico subescrito chega) */
}

/* Função: reconecta-se ao broker MQTT (caso ainda não esteja conectado ou em caso de a conexão cair)
 *          em caso de sucesso na conexão ou reconexão, o subscribe dos tópicos é refeito.
 * Parâmetros: nenhum
 * Retorno: nenhum
 */
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
      Serial.println("Havera nova tentatica de conexao em 2s");
      delay(2000);
    }
  }
}

/* Função: reconecta-se ao WiFi
 * Parâmetros: nenhum
 * Retorno: nenhum
*/
void reconnect_wifi()
{
  /* se já está conectado a rede WI-FI, nada é feito. 
       Caso contrário, são efetuadas tentativas de conexão */
  if (WiFi.status() == WL_CONNECTED)
    return;

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso na rede ");
  Serial.print(SSID);
  Serial.println("IP obtido: ");
  Serial.println(WiFi.localIP());
}

/* Função: verifica o estado das conexões WiFI e ao broker MQTT. 
 *         Em caso de desconexão (qualquer uma das duas), a conexão
 *         é refeita.
 * Parâmetros: nenhum
 * Retorno: nenhum
 */
void verifica_conexoes_wifi_mqtt(void)
{
  /* se não há conexão com o WiFI, a conexão é refeita */
  reconnect_wifi();
  /* se não há conexão com o Broker, a conexão é refeita */
  if (!MQTT.connected())
    reconnect_mqtt();
}

/* programa principal */
void loop()
{
  /* garante funcionamento das conexões WiFi e ao broker MQTT */
  verifica_conexoes_wifi_mqtt();

  /* keep-alive da comunicação com broker MQTT */
  MQTT.loop();

  String Umidade = readDHTHumidity();
  String Temperatura = readDHTTemperature();
  String Luminosidade = readLDRLuminosidade();
  bool Presenca = readPIRPresenca();
  unsigned long currentMillis = millis();
  if ((Presenca && !wasPresence) || (currentMillis - previousMillis >= interval))
  {
    Serial.println("Send payload");
    send_payload(Umidade, Temperatura, Luminosidade, Presenca);
    previousMillis = currentMillis;
    if (Presenca)
    {
      Serial.println("Presence detected");
      wasPresence = true;
    }
    else
    {
      wasPresence = false;
    }
  }
}
