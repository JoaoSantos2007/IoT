# ChildEventListener
import firebase_admin 
from firebase_admin import credentials, firestore
cred = credentials.Certificate("/home/joao/Arquivos/IOT/rules/pubsub/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
db.collection("devices").onSnapshot(function(documentos) {
    documentos.docChanges().forEach(function(changes) {
        if changes.type === "added":

        else if (changes.type == = "modified") {

        } else if (changes.type == = "removed") {

        }
    })
})
