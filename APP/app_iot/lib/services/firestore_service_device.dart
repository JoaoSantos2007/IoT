import 'package:app_iot/models/device.dart';
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
}
