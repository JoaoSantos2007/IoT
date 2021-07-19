# Libs
import json
import firebase_admin  # Firebase
import threading
from firebase_admin import credentials, firestore
from paho.mqtt import client as mqtt_client

# Firebase
cred = credentials.Certificate("rules/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Variáveis para conectar com o MQTT(broker)
broker = '192.168.31.45'
port = 1883
topic = "test"
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
        # apply_rules(client, data)

    client.subscribe(topic)
    client.on_message = on_message


def enviar(deviceId, tipo, currentValue, name, location, topico_envio):
    mensagem = {"deviceId": deviceId, "name": name, "location": location,
           "type": tipo, "currentValue": currentValue}
    mensagem = json.dumps(mensagem)
    result = client.publish(topico_envio, mensagem)
    status = result[0]
    if status == 0:
        print(f"Send `{mensagem}` to topic `{topico_envio}`")
    else:
        print(f"Failed to send message to topic {topico_envio}")


# Create an Event for notifying main thread.
delete_done = threading.Event()

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
                enviar(deviceId, type, currentValue,
                       name, location, topico_envio)

        # elif change.type.name == 'REMOVED':
        #     print("removed")
        #     delete_done.set()


col_query = db.collection(u'devices')


# Watch the collection query

query_watch = col_query.on_snapshot(on_snapshot)


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        # carregar mensagem .json
        data = json.loads(msg.payload)
        # apply_rules(client, data)

    client.subscribe(topic)
    client.on_message = on_message


# Wait for the callback captures the deletion.

delete_done
subscribe(client)
client.loop_forever()

# delete_done.wait()
query_watch.unsubscribe()

print("OK")
