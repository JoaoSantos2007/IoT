# Libs
import threading
import firebase_admin
from firebase_admin import credentials, firestore


# Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Create an Event for notifying main thread.


# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    print(u'Callback received query snapshot.')
    print(u'Current cities in California: ')
    for change in changes:
        if change.type.name == 'ADDED':
            key = change.document.id
            db.collection(u'events').document(key).delete()
        elif change.type.name == 'MODIFIED':
            print(f'Modified city: {change.document.id}')
        elif change.type.name == 'REMOVED':
            print(f'Removed city: {change.document.id}')
            #delete_done.set()

col_query = db.collection(u'events')

# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)

event = threading.Event()
event.wait()
query_watch.unsubscribe()