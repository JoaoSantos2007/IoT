import firebase_admin

from firebase_admin import credentials, firestore
# initialize sdk
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
# initialize firestore instance
firestore_db = firestore.client()

# update data
def document_update(data):

    deviceId = data.get("deviceId")
    currentValue = data.get("currentValue")
    currentValue = "22°"

    snapshots = list(firestore_db.collection(
        u'devices').where(u'deviceId', u'==', deviceId).get())
    for snapshot in snapshots:
        document_id = snapshot.id
        document = firestore_db.collection(
            u'devices').document(document_id)
        document.update({u'currentValue': currentValue})

        print(f'{snapshot.id}')
        print(snapshot.to_dict())

# add data
def document_add(data):
    firestore_db.collection(u'devices').add(data)

# read data
def document_read():
    snapshots = list(firestore_db.collection(u'devices').get())
    for snapshot in snapshots:
        print(snapshot.to_dict())


data = {"event_type": "action-device", "device_target": 1, "deviceId": 1,
        "deviceType": "light", "deviceOrigem": "app-mobile", "action": {"false": "0"}}
document_update(data)

