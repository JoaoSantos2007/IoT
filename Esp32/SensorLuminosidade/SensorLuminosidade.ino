int Led = 13;
int Sensor = A4;
int valorLuz = 0; 

void setup() {
  pinMode(Led,OUTPUT);
  pinMode(Sensor,INPUT);
}
void loop() {
  valorLuz = analogRead(Sensor);
  Serial.println(valorLuz);
  if(valorLuz>750){
    digitalWrite(Led,HIGH);
  }else{
    digitalWrite(Led,LOW);
  }
}
