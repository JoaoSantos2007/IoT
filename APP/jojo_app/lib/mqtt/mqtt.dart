import 'package:mqtt_client/mqtt_client.dart';
import 'package:typed_data/typed_buffers.dart';

class Mqtt {
  String server = '192.168.31.45';
  int port = 1883;
  String clientIdentifier = 'mobile-test';
  String subTopic = 'test';
  String publishTopic = 'test';
  MqttQos qos = MqttQos.exactlyOnce;
  MqttClient mqttClient;
  static Mqtt _instance;

  Mqtt._() {
    mqttClient = MqttClient.withPort(server, clientIdentifier, port);

    /// success callback connection
    mqttClient.onConnected = _onConnected;

    /// disconnect callback
    mqttClient.onDisconnected = _onDisconnected();

    /// Subscribe success callback
    mqttClient.onSubscribed = _onSubscribed;

    /// Subscribe failure callback
    mqttClient.onSubscribeFail = _onSubscribeFail;

    /// message listener
    //mqttClient.updates.listen(_onData);
  }

  static Mqtt getInstance() {
    if (_instance == null) {
      _instance = Mqtt._();
    }
    return _instance;
  }

  ///connection
  connect() {
    mqttClient.connect();
    _log("connecting");
  }

  ///Disconnect
  disconnect() {
    mqttClient.disconnect();
    _log("disconnect");
  }

  ///release the news
  publishMessage(String msg) {
    /// int array
    Uint8Buffer uint8buffer = Uint8Buffer();

    /// string turn into String.getBytes int array similar to the java?
    var codeUnits = msg.codeUnits;
    //uint8buffer.add()
    uint8buffer.addAll(codeUnits);
    mqttClient.publishMessage(publishTopic, qos, uint8buffer);
  }

  // /// message listener
  // _onData(List<MqttReceivedMessage<MqttMessage>> data) {
  //   Uint8Buffer uint8buffer = Uint8Buffer();
  //   var messageStream = MqttByteBuffer(uint8buffer);
  //   data.forEach((MqttReceivedMessage<MqttMessage> m) {
  //     /// writing data to the array messageStream
  //     m.payload.writeTo(messageStream);

  //     ///print it out
  //     print(uint8buffer.toString());
  //   });
  // }

  // void _onData(List<MqttReceivedMessage> event) {
  //   print(event.length);
  //   final MqttPublishMessage recMess = event[0].payload as MqttPublishMessage;
  //   final String message =
  //       MqttPublishPayload.bytesToStringAsString(recMess.payload.message);
  //   print('[MQTT client] MQTT message: topic is <${event[0].topic}>, '
  //       'payload is <-- ${message} -->');
  //   print(mqttClient.connectionState);
  //   print("[MQTT client] message with topic: ${event[0].topic}");
  //   print("[MQTT client] message with message: ${message}");
  //   // setState(
  //   //   () {
  //   //     //_temp = double.parse(message);
  //   //   },
  //   // );
  // }

  _onConnected() {
    _log("_onConnected");

    /// when the connection is successful subscription news
    mqttClient.subscribe(subTopic, qos);
  }

  _onDisconnected() {
    _log("_onDisconnect");
  }

  _onSubscribed(String topic) {
    _log("_onConnected");
  }

  _onSubscribeFail(String topic) {
    _log("_onSubscribeFail");
  }

  _log(String msg) {
    print("MQTT-->$msg");
  }
}
