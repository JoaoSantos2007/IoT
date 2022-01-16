class Event {
  final String id;
  final int deviceId;
  final Map<String, dynamic> sensor;

  Event({
    this.id,
    this.deviceId,
    this.sensor,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'deviceId': deviceId,
      'sensor': sensor,
    };
  }

  Event.fromFirestore(Map<String, dynamic> firestore)
      : id = firestore['id'],
        deviceId = firestore['deviceId'],
        sensor = firestore['sensor'];
}
