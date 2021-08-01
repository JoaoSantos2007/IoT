import 'package:jojo_app/models/device.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirestoreService {
  FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> saveDevice(Device device) {
    return _db.collection('devices').doc(device.id).set(device.toMap());
  }

  Stream<List<Device>> getDevices() {
    return _db.collection('devices').snapshots().map((snapshot) => snapshot.docs
        .map((document) => Device.fromFirestore(document.data()))
        .toList());
  }

  Future<void> removeDevice(String id) {
    return _db.collection('devices').doc(id).delete();
  }

  // Stream<List<Event>> getEventsOld() {
  //   return _db.collection('events').snapshots().map((snapshot) => snapshot.docs
  //       .map((document) => Event.fromFirestore(document.data()))
  //       .toList());
  // }

  Stream<List> getEvents(String id) {
    return _db.collection('events').where('deviceId'==id).orderBy('timestamp').snapshots().map(
        (snapshot) => snapshot.docs
            .map((document) => document.data()['sensor'])
            .toList());
  }

  // Stream<List> getEvents() {
  //   return _db.collection('events').orderBy('timestamp').snapshots().map(
  //       (snapshot) => snapshot.docs
  //           .map((document) => document.data()['sensor'])
  //           .toList());
  // }
}
