import 'package:app_iot/models/device.dart';
import 'package:app_iot/services/firestore_service_device.dart';
import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

class DeviceProvider with ChangeNotifier {
  final firestoreService = FirestoreService();
  String _id;
  int _deviceId;
  String _name;
  String _type;
  String _location;
  bool _action;
  String _currentValue = "";
  Map<String, dynamic> _settings;
  var uuid = Uuid();

  //Getters
  String get id => _id;
  int get deviceId => _deviceId;
  String get name => _name;
  String get type => _type;
  String get location => _location;
  String get currentValue => _currentValue = "";
  bool get action => _action = false;
  Map<String, dynamic> get settings => _settings;

  //Setters
  changeDeviceId(int value) {
    _deviceId = value;
    notifyListeners();
  }

  changeName(String value) {
    _name = value;
    notifyListeners();
  }

  changeType(String value) {
    _type = value;
    notifyListeners();
  }

  changeLocation(String value) {
    _location = value;
    notifyListeners();
  }

  changeAction(bool value) {
    _action = value;
    notifyListeners();
  }

  changeCurrentValue(String value) {
    _currentValue = value;
    notifyListeners();
  }

  changeSettings(Map<String, dynamic> value) {
    _settings = value;
    notifyListeners();
  }

  loadValues(Device device) {
    _id = device.id;
    _deviceId = device.deviceId;
    _name = device.name;
    _type = device.type;
    _location = device.location;
    _action = device.action;
    _currentValue = device.currentValue;
    _settings = device.settings;
  }

  saveDevice() {
    print(_id);
    if (_id == null) {
      var newDevice = Device(
        id: uuid.v4(),
        deviceId: deviceId,
        name: name,
        type: type,
        location: location,
        action: action,
        currentValue: currentValue,
        settings: settings,
      );
      firestoreService.saveDevice(newDevice);
    } else {
      //Update
      var updatedDevice = Device(
        id: _id,
        deviceId: _deviceId,
        name: _name,
        type: _type,
        location: _location,
        action: _action,
        currentValue: _currentValue,
        settings: _settings,
      );
      firestoreService.saveDevice(updatedDevice);
    }
  }

  removeDevice(String id) {
    firestoreService.removeDevice(id);
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'deviceId': deviceId,
      'name': name,
      'type': type,
      'location': location,
      'action': action,
      'currentValue': currentValue,
      'settings': settings,
    };
  }
}
