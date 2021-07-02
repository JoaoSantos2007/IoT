// Importar bibliotecas necessárias
#include <Adafruit_Sensor.h>
#include <DHT.h>

#define DHTPIN 27     // Pino digital conectado ao sensor DHT

#define DHTTYPE    DHT11

DHT dht(DHTPIN, DHTTYPE);


String Temperatura;
String Umidade;


String readDHTTemperature() {
  float t = dht.readTemperature();
  if (isnan(t)) {    
    Serial.println("Falha ao ler o sensor DHT!");
    return "--";
  }
  else {
    return String(t);
  }
}

String readDHTHumidity() {
  float h = dht.readHumidity();
  if (isnan(h)) {
    return "--";
  }
  else {
    return String(h);
  }
}



void setup(){
  // Porta serial para fins de depuração
  Serial.begin(115200);

  dht.begin();
  
}

 
void loop(){
  Umidade = readDHTHumidity();
  Temperatura = readDHTTemperature();
  Serial.println("Temperatura: "+Temperatura);
  Serial.println("Umidade: "+Umidade);
  delay(2000);
}
