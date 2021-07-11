# ChildEventListener
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate(
    "/home/joao/Arquivos/IOT/rules/pubsub/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
# db.collection("devices").onSnapshot(function(documentos) {
#     documentos.docChanges().forEach(function(changes) {
#         if changes.type === "added":

#         else if (changes.type == = "modified") {

#         } else if (changes.type == = "removed") {

#         }
#     })
# })

snapshots = db.collection('devices').get()
mudancas = snapshots.docChanges()
for mudanca in mudancas:
    if mudanca == "added":
        print("ok")
# for snapshot in snapshots:
#     if snapshot.type == "added":
#         print("ok")
