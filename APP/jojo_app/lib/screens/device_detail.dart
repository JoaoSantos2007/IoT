import 'package:flutter/rendering.dart';
import 'package:flutter_sparkline/flutter_sparkline.dart';
import 'package:jojo_app/models/device.dart';
import 'package:jojo_app/providers/device_provider.dart';
import 'package:jojo_app/screens/device_list.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:jojo_app/services/firestore_service_device.dart';
import 'package:provider/provider.dart';

class DeviceDetail extends StatefulWidget {
  final Device device;
  final dataEventos;

  DeviceDetail({Key key, this.device, this.dataEventos}) : super(key: key);

  @override
  _State createState() => new _State();
}

class _State extends State<DeviceDetail> {
  //Mqtt mqtt = Mqtt.getInstance();
  bool _switch = false;
  bool isLoading = false;
  @override
  void initState() {
    super.initState();
  }

  bottonAll(String tag) {
    Map<String, dynamic> event = {};
    DateTime dateTime = DateTime.now();

    event.addAll({
      "eventType": "action-device",
      "deviceId": widget.device.deviceId,
      "deviceType": "${widget.device.type}",
      "deviceOrigem": "jojo-app",
      "action": {"$tag": "${widget.device.settings[tag]}"},
      "timestamp": dateTime.toUtc(),
    });
    FirestoreService().saveEvent(event);
  }

//---------------------------------------------------------------------------
  @override
  Widget build(BuildContext context) {
    final deviceProvider = Provider.of<DeviceProvider>(context);
    final Map<String, dynamic> settings =
        widget.device == null ? {} : widget.device.settings;

    // List<double> createDataChart(String type) {
    //   List<double> _f = [];
    //   var events = FirestoreService().getEvents(1);
    //   events.forEach((element) {
    //     element.forEach((element) {
    //       _f.add(double.parse(element[type]));
    //       print(element[type]);
    //     });
    //   });
    //   return _f;
    // }

    // data1 = createDataChart('umidade');
    // Future.delayed(const Duration(milliseconds: 2000), () {
    //   print(data1);
    // });

    final bottonLight = Expanded(
      child: ListView.builder(
        itemCount: settings == null ? 0 : settings.length,
        itemBuilder: (context, index) {
          final item = settings[index];

          _switch = settings.values.elementAt(index) == 'false' ? false : true;

          return Dismissible(
            key: Key(item),
            direction: DismissDirection.startToEnd,
            child: SwitchListTile(
                title: Text(settings.keys.elementAt(index)),
                subtitle: Text(settings.values.elementAt(index).toString()),
                secondary: Icon(Icons.lightbulb),
                value: _switch,
                selected: _switch,
                onChanged: (bool value) {
                  setState(() {
                    _switch = value;
                    print(deviceProvider.toMap());
                    settings[settings.keys.elementAt(index)] =
                        _switch.toString();

                    deviceProvider.changeId(widget.device.id);
                    deviceProvider.changeDeviceId(widget.device.deviceId);
                    deviceProvider.changeName(widget.device.name);
                    deviceProvider.changeType(widget.device.type);
                    deviceProvider.changeLocation(widget.device.location);
                    deviceProvider.changeCurrentValue(value.toString());
                    deviceProvider.changeSettings(settings);
                    deviceProvider.saveDevice();

                    bottonAll(settings.keys.elementAt(index));
                  });
                }),
            onDismissed: (direction) {
              setState(() {
                settings.keys.elementAt(index);
              });
            },
          );
        },
      ),
    );

    final bottomTV = Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly, // spaceAround,
          children: [
            IconButton(
              alignment: Alignment.topRight,
              onPressed: () {
                bottonAll('tagPower');
              },
              icon: Icon(
                Icons.power_settings_new,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagSource');
              },
              icon: Icon(
                Icons.import_export_outlined,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagMenu');
              },
              icon: Icon(
                Icons.menu,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              'Power',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Source',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Menu',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
          ],
        ),
        SizedBox(height: 20.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              onPressed: () {
                bottonAll('tagUpC');
              },
              icon: Icon(
                Icons.add,
                size: 40,
                color: Colors.black45,
              ),
            ),
            Text('CANAL',
                style: TextStyle(
                  color: Colors.black54,
                )),
            IconButton(
              onPressed: () {
                bottonAll('tagDnC');
              },
              icon: Icon(
                Icons.remove,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
        SizedBox(height: 20.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              onPressed: () {
                bottonAll('tagUpV');
              },
              icon: Icon(
                Icons.add,
                size: 40,
                color: Colors.black45,
              ),
            ),
            Text(
              'VOLUME',
              style: TextStyle(
                color: Colors.black54,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagDnV');
              },
              icon: Icon(
                Icons.remove,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
      ],
    );

    final bottomFan = Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly, // spaceAround,
          children: [
            IconButton(
              alignment: Alignment.topRight,
              onPressed: () {
                bottonAll('tagPower');
              },
              icon: Icon(
                Icons.power_settings_new,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagSource');
              },
              icon: Icon(
                Icons.import_export_outlined,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagTime');
              },
              icon: Icon(
                Icons.timer,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              'Power',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Invert',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Time',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
          ],
        ),
        SizedBox(height: 40.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              onPressed: () {
                bottonAll('tagUpV');
              },
              icon: Icon(
                Icons.add,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagDnV');
              },
              icon: Icon(
                Icons.remove,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
      ],
    );

    final bottomAir = Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              alignment: Alignment.topRight,
              onPressed: () {
                bottonAll('tagPower');
              },
              icon: Icon(
                Icons.power_settings_new,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagMode');
              },
              icon: Icon(
                Icons.menu_outlined,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagTime');
              },
              icon: Icon(
                Icons.timer,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              'Power',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Invert',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Time',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
          ],
        ),
        SizedBox(height: 40.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              alignment: Alignment.topRight,
              onPressed: () {
                bottonAll('tagPower');
              },
              icon: Icon(
                Icons.power_settings_new,
                size: 40,
                color: Colors.black45,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagSwing');
              },
              icon: Icon(
                Icons.timer,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              'Sleep',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
            Text(
              'Swing',
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.black54,
              ),
            ),
          ],
        ),
        SizedBox(height: 40.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              onPressed: () {
                bottonAll('tagUpV');
              },
              icon: Icon(
                Icons.add,
                size: 40,
                color: Colors.black45,
              ),
            ),
            Text(
              'TEMP',
              style: TextStyle(
                color: Colors.black54,
              ),
            ),
            IconButton(
              onPressed: () {
                bottonAll('tagDnV');
              },
              icon: Icon(
                Icons.remove,
                size: 40,
                color: Colors.black45,
              ),
            ),
          ],
        ),
      ],
    );

    final courseFaixa = Container(
      padding: const EdgeInsets.all(7.0),
    );

    final topContentText = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 120.0),
        getIcon(
          widget.device.type,
          50.0,
        ),
        Container(
          width: 55.0,
          child: new Divider(color: Colors.green),
        ),
        SizedBox(height: 10.0),
        Text(
          widget.device.type,
          style: TextStyle(
            color: Colors.white,
            fontSize: 45.0,
          ),
        ),
        SizedBox(height: 30.0),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Expanded(
              flex: 6,
              child: Padding(
                padding: EdgeInsets.only(left: 10.0),
                child: Text(
                  widget.device.name,
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
            Expanded(flex: 1, child: courseFaixa)
          ],
        ),
      ],
    );

    final topContent = Stack(
      children: <Widget>[
        Container(
          padding: EdgeInsets.only(left: 10.0),
          height: MediaQuery.of(context).size.height * 0.5,
          decoration: new BoxDecoration(),
        ),
        Container(
          height: MediaQuery.of(context).size.height * 0.5,
          padding: EdgeInsets.all(40.0),
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(color: Color.fromRGBO(58, 66, 86, .9)),
          child: Center(
            child: topContentText,
          ),
        ),
        Positioned(
          left: 8.0,
          top: 60.0,
          child: InkWell(
            onTap: () {
              //mqtt.disconnect();
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back, color: Colors.white),
          ),
        )
      ],
    );

    final bottomContentText = Text(
      "atualizado em: ${widget.device.lastUpdateDate.toDate()}",
      style: TextStyle(
        fontSize: 13.0,
        color: Colors.grey[500],
      ),
    );

    final readButton = Container(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      width: MediaQuery.of(context).size.width,
    );

    final bottomContent = Container(
      width: MediaQuery.of(context).size.width,
      //padding: EdgeInsets.all(40.0),
      child: Center(
        child: Column(
          children: <Widget>[bottomContentText, readButton],
        ),
      ),
    );

    String getPrefix(String type) {
      switch (type) {
        case 'umidade':
          return ' %';
          break;
        case 'temperatura':
          return ' ºC';
          break;
        default:
          return '';
      }
    }

    final bottomSensor = Column(
      children: [
        SizedBox(height: 30.0),
        Padding(
          padding: EdgeInsets.all(1.0),
          child: Text(
            widget.device.currentValue + getPrefix(widget.device.type),
            style: TextStyle(
              fontSize: 40.0,
              color: Colors.grey[600],
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        SizedBox(height: 40.0),
        Padding(
          padding: EdgeInsets.all(30.0),
          child: new Sparkline(
            data: widget.dataEventos.isEmpty ? [0.0] : widget.dataEventos,
            lineColor: Colors.grey[600],
            //pointsMode: PointsMode.all,
            pointSize: 8.0,
            pointColor: Colors.grey[600],
            fillMode: FillMode.below,
            fillGradient: new LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Colors.grey[600], Colors.grey[500]],
            ),
          ),
        ),
      ],
    );

    getBottom(String type) {
      switch (type) {
        case 'light':
          return bottonLight;
          break;
        case 'tv':
          return bottomTV;
          break;
        case 'air':
          return bottomAir;
          break;
        case 'fan':
          return bottomFan;
          break;
        default:
          return bottomSensor;
      }
    }

    return Scaffold(
      body: Column(
        children: <Widget>[
          topContent,
          bottomContent,
          getBottom(widget.device.type),
        ],
      ),
    );
  }
}
