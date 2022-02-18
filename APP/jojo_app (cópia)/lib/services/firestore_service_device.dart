import 'package:jojo_app/models/device.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirestoreService {
  FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> saveDevice(Device device) {
    return _db.collection('devices').doc(device.id).set(device.toMap());
  }

  Future<void> saveEvent(Map<String, dynamic> event) {
    return _db.collection('events').add(event);
  }

  Stream<List<Device>> getDevices() {
    return _db.collection('devices').snapshots().map((snapshot) => snapshot.docs
        .map((document) => Device.fromFirestore(document.data()))
        .toList());
  }

  Future<void> removeDevice(String id) {
    return _db.collection('devices').doc(id).delete();
  }

  Stream<List> getEvents(int id) {
    return _db
        .collection('events')
        .where('deviceId', isEqualTo: id)
        .orderBy('timestamp')
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((document) => document.data()['sensor'])
            .toList());
  }

  // Future<List> getEvents(int id) {
  //   var result = _db
  //       .collection("events")
  //       .where("deviceId", isEqualTo: id.toString())
  //       .get();

  //   Future.delayed(const Duration(milliseconds: 2000), () {
  //     print(result.toString());
  //   });

  //   return null;
  // }
}
