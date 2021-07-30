import 'package:cloud_firestore/cloud_firestore.dart';

class Device {
  final String id;
  final int deviceId;
  final String name;
  final String type;
  final String location;
  final String currentValue;
  final Timestamp lastUpdateDate;
  final Map<String, dynamic> settings;

  Device({
    this.id,
    this.deviceId,
    this.name,
    this.type,
    this.location,
    this.currentValue,
    this.lastUpdateDate,
    this.settings,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'deviceId': deviceId,
      'name': name,
      'type': type,
      'location': location,
      'currentValue': currentValue,
      'lastUpdateDate': lastUpdateDate,
      'settings': settings,
    };
  }

  Device.fromFirestore(Map<String, dynamic> firestore)
      : id = firestore['id'],
        deviceId = firestore['deviceId'],
        name = firestore['name'],
        type = firestore['type'],
        location = firestore['location'],
        currentValue = firestore['currentValue'],
        lastUpdateDate = firestore['lastUpdateDate'],
        settings = firestore['settings'];
}
