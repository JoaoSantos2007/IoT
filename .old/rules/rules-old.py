# Libs
print("OK")
import json
import string  # .json
import firebase_admin  # Firebase
from datetime import datetime  # tempo
from pytz import timezone

from firebase_admin import credentials, firestore
from paho.mqtt import client as mqtt_client

# Credencias do Firebase

cred = credentials.Certificate("rules/serviceAccountKey.json")

# Inicia Firebase instância
firebase_admin.initialize_app(cred)
firestore_db = firestore.client()

# Variáveis para conectar com o MQTT(broker)
broker = '192.168.31.45'
port = 1883
topic = "test"
client_id = f'python-rules'



# Conectar ao MQTT(x1)
def connect_mqtt() -> mqtt_client:

    # DEF verificar conexão
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    # Objeto mqtt
    client = mqtt_client.Client(client_id)

    #client.username_pw_set(username, password)

    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        # carregar mensagem .json
        data = json.loads(msg.payload)
        apply_rules(client, data)

    client.subscribe(topic)
    client.on_message = on_message

# Aplicar Regras


def apply_rules(client, data):

    data['timestamp'] = datetime.now().astimezone(
        timezone('America/Sao_Paulo'))
    deviceId = data.get("deviceId")

    # Executar se o tipo de evento for de leitura de sensor
    if data.get("eventType") == "read-sensor":
        document_add('events', data)
        sensores = data.get("sensor")
        # Atualizar Firebase
        for type, value in sensores.items():
            document_update(deviceId, type, value)

    # Executar se o tipo de evento for uma ação
    if data.get("eventType") == "action-device":
        topic_envio = "topico-" + str(deviceId)
        print(topic_envio)
        publish(client, topic_envio, data)


# DEF atualiza Database
def document_update(deviceId, type, value):

    lastUpdateDate = datetime.now().astimezone(timezone('America/Sao_Paulo'))

    snapshots = list(firestore_db.collection(u'devices').where(
        u'deviceId', u'==', int(deviceId)).where(u'type', u'==', type).get())

    for snapshot in snapshots:
        document_id = snapshot.id
        document = firestore_db.collection(u'devices').document(document_id)
        document.update({u'currentValue': value,u'lastUpdateDate': lastUpdateDate})


def publish(client, topic, data):

    msg = json.dumps(data)
    result = client.publish(topic, msg)
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")

# add data


def document_add(collection, data):
    firestore_db.collection(f'{collection}').add(data)

# read data


def document_read():
    snapshots = list(firestore_db.collection(u'devices').get())
    for snapshot in snapshots:
        print(snapshot.to_dict())


def run():
    client = connect_mqtt()  # ok
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()