# Libs
import firebase_admin  # Firebase
import threading
from firebase_admin import credentials, firestore
from paho.mqtt import client as mqtt_client

#Firebase
cred = credentials.Certificate("rules/pubsub/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Variáveis para conectar com o MQTT(broker)
broker = '192.168.31.45'
port = 1883
topic = "test"
client_id = f'python-rules'


#Conectar ao mqtt
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
# Create an Event for notifying main thread.
delete_done = threading.Event()


# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    for change in changes:
        # if change.type.name == 'ADDED':    
        if change.type.name == 'MODIFIED': 
            document_id = change.document.id
            deviceId = change.document.get('deviceId')
            currentValue = change.document.get('currentValue')
            print(deviceId)
            print(currentValue)
            print(document_id)

        # elif change.type.name == 'REMOVED':
        #     print("removed")
        #     delete_done.set()


col_query = db.collection(u'devices')


# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)


# Wait for the callback captures the deletion.
delete_done.wait()
query_watch.unsubscribe()
