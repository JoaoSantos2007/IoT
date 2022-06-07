# Libs
import json
import firebase_admin  # Firebase
import threading
from firebase_admin import credentials, firestore
from paho.mqtt import client as mqtt_client
from datetime import datetime  # tempo
from pytz import timezone

# Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Variáveis para conectar com o MQTT(broker)
broker = 'iotwebserver.hopto.org'
port = 1883
topic = "global-iot"
client_id = f'python-rules'


# Conectar ao mqtt
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


client = connect_mqtt()
# client.loop_forever()
# print("OK")


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        # carregar mensagem .json
        data = json.loads(msg.payload)
        apply_rules(client, data)

    client.subscribe(topic)
    client.on_message = on_message


def publish(deviceId, tipo, currentValue, name, location, topico_envio):
    mensagem = {"deviceId": deviceId, "name": name, "location": location,
           "type": tipo, "currentValue": currentValue}
    mensagem = json.dumps(mensagem)
    result = client.publish(topico_envio, mensagem)
    status = result[0]
    if status == 0:
        print(f"Send `{mensagem}` to topic `{topico_envio}`")
    else:
        print(f"Failed to send message to topic {topico_envio}")

def apply_rules(client, data):

    data['timestamp'] = datetime.now().astimezone(
        timezone('America/Sao_Paulo'))
    deviceId = data.get("deviceId")

    # Executar se o tipo de evento for de leitura de sensor
    if data.get("eventType") == "read-sensor":
        name = data.get("name")
        document_add('events', data)
        sensores = data.get("sensor")
        # Atualizar Firebase
        for type, value in sensores.items():
            document_update(deviceId, type, value, name)

def document_add(collection, data):
    db.collection(f'{collection}').add(data)


def document_update(deviceId, type, value, name):

    lastUpdateDate = datetime.now().astimezone(timezone('America/Sao_Paulo'))
    if name == None:
        snapshots = list(db.collection(u'devices').where(u'deviceId', u'==', int(deviceId)).where(u'type', u'==', type).get())
    else:
        snapshots = list(db.collection(u'devices').where(u'deviceId', u'==', int(deviceId)).where(u'type', u'==', type).where(u'name',u'==',str(name)).get())
    for snapshot in snapshots:
        document_id = snapshot.id
        document = db.collection(u'devices').document(document_id)
        document.update({u'currentValue': value,u'lastUpdateDate': lastUpdateDate})


# Create an Event for notifying main thread.
# delete_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    for change in changes:
        # if change.type.name == 'ADDED':
        if change.type.name == 'MODIFIED':
            key = change.document.id
            deviceId = change.document.get('deviceId')
            type = change.document.get('type')
            name = change.document.get('name')
            location = change.document.get('location')
            currentValue = change.document.get('currentValue')
            topico_envio = "esp-" + str(deviceId)
            if(type == "light"):
                publish(deviceId, type, currentValue,name, location, topico_envio)

        # elif change.type.name == 'REMOVED':
        #     print("removed")
        #     delete_done.set()


#Collection
col_query = db.collection(u'devices')
# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)

#LOOP

# Wait for the callback captures the deletion.
threading.Event()
subscribe(client)
client.loop_forever()

#FIM

# delete_done.wait()
query_watch.unsubscribe()