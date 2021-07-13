# Libs
import firebase_admin  # Firebase
import threading
from firebase_admin import credentials, firestore

#Firebase
cred = credentials.Certificate("rules/pubsub/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


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
