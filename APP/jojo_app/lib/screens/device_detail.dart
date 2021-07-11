import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_sparkline/flutter_sparkline.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:jojo_app/models/device.dart';
import 'package:jojo_app/mqtt/mqtt.dart';
import 'package:jojo_app/providers/device_provider.dart';
import 'package:jojo_app/screens/device_list.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class DeviceDetail extends StatefulWidget {
  final Device device;

  DeviceDetail({Key key, this.device}) : super(key: key);

  @override
  _State createState() => new _State();
}

class _State extends State<DeviceDetail> {
  Mqtt mqtt = Mqtt.getInstance();
  bool _switch = false;

  void initState() {
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => mqtt.connect(),
    );

    new Future.delayed(Duration.zero, () {
      final deviceProvider =
          Provider.of<DeviceProvider>(context, listen: false);
      deviceProvider.loadValues(widget.device);
    });

    super.initState();
  }

  bottonAll(String tag) {
    Map<String, dynamic> event = {};
    event.addAll({
      '"eventType"': '"action-device"',
      '"deviceId"': '${widget.device.deviceId}',
      '"deviceType"': '"${widget.device.type}"',
      '"deviceOrigem"': '"jojo-app"',
      '"action"': {'"$tag"': '"${widget.device.settings[tag]}"'},
    });

    mqtt.publishMessage(
      event.toString(),
    );

    print(event.toString());
  }

//---------------------------------------------------------------------------
  @override
  Widget build(BuildContext context) {
    var data = [0.0, 1.0, 1.5, 2.0, 0.0, 0.0, -0.5, -1.0, -0.5, 0.0, 0.0];
    final deviceProvider = Provider.of<DeviceProvider>(context);
    final Map<String, dynamic> settings =
        widget.device == null ? {} : widget.device.settings;

    final bottonOnOff = Expanded(
      child: ListView.builder(
        itemCount: settings == null ? 0 : settings.length,
        itemBuilder: (context, index) {
          final item = settings[index];

          _switch = settings.values.elementAt(index) == 'false' ? false : true;

          return Dismissible(
            key: Key(item),
            direction: DismissDirection.startToEnd,
            //             Padding(
            //   padding: const EdgeInsets.all(8.0),
            //   child: mychart1Items("Sales by Month","421.3M","+12.9% of target"),
            // ),
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
      //mychart1Items('','',''),
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

    // final bottonOnOff = Container(
    //   child: CupertinoSwitch(
    //     value: _switch, //widget.device.action,
    //     onChanged: (bool newValue) {
    //       setState(
    //         () {
    //           _switch = newValue;
    //           deviceProvider.changeAction(_switch);
    //           deviceProvider.saveDevice();
    //           bottonAll(_switch.toString());
    //         },
    //       );
    //     },
    //   ),
    // );

    final courseFaixa = Container(
      padding: const EdgeInsets.all(7.0),
    );

    final topContentText = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 120.0),
        getIcon(
          widget.device.action,
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
              mqtt.disconnect();
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back, color: Colors.white),
          ),
        )
      ],
    );

    Timestamp now = Timestamp.now();
    DateTime dateNow = now.toDate();

    final bottomContentText = Text(
      "Ultima atualização: ${widget.device.lastUpdateDate.toDate()}",
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

    Material mychart1Items(String title, String priceVal, String subtitle) {
      return Material(
        color: Colors.white,
        elevation: 14.0,
        borderRadius: BorderRadius.circular(24.0),
        shadowColor: Color(0x802196F3),
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.all(1.0),
                      child: Text(
                        title,
                        style: TextStyle(
                          fontSize: 20.0,
                          color: Colors.blueAccent,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(1.0),
                      child: Text(
                        priceVal,
                        style: TextStyle(
                          fontSize: 30.0,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(1.0),
                      child: Text(
                        subtitle,
                        style: TextStyle(
                          fontSize: 20.0,
                          color: Colors.blueGrey,
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(1.0),
                      child: new Sparkline(
                        data: data,
                        lineColor: Color(0xffff6101),
                        pointsMode: PointsMode.all,
                        pointSize: 8.0,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      );
    }

    final bottomDefault2 = Container(
      color: Color(0xffE5E5E5),
      child: StaggeredGridView.count(
        crossAxisCount: 1,
        crossAxisSpacing: 12.0,
        mainAxisSpacing: 12.0,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child:
                mychart1Items("Sales by Month", "421.3M", "+12.9% of target"),
          ),
        ],
        staggeredTiles: [
          StaggeredTile.extent(4, 250.0),
        ],
      ),
    );

    final bottomDefault3 = Column(
      children: [
        SizedBox(height: 30.0),
        // Text(
        //   widget.device.currentValue,
        //   style: TextStyle(
        //     color: Colors.black45,
        //     fontSize: 45.0,
        //   ),
        // ),
        //SizedBox(height: 50.0),
        // Container(
        //   width: 300.0,
        //   height: 100.0,
        //   child: new Sparkline(
        //     data: data,
        //     lineColor: Color.fromRGBO(58, 66, 86, .9),
        //     fillMode: FillMode.below,
        //     fillColor: Color.fromRGBO(58, 66, 86, .9),
        //     // fillGradient: new LinearGradient(
        //     //   begin: Alignment.topCenter,
        //     //   end: Alignment.bottomCenter,
        //     //   colors: [Colors.grey[800], Colors.grey[200]],
        //     // ),
        //   ),
        // ),
        // Padding(
        //   padding: EdgeInsets.all(1.0),
        //   child: Text(
        //     widget.device.name,
        //     style: TextStyle(
        //       fontSize: 20.0,
        //       color: Colors.blueAccent,
        //     ),
        //   ),
        // ),
        Padding(
          padding: EdgeInsets.all(1.0),
          child: Text(
            widget.device.currentValue,
            style: TextStyle(fontSize: 40.0, color: Colors.grey[600]),
          ),
        ),
        // Padding(
        //   padding: EdgeInsets.all(1.0),
        //   child: Text(
        //     'ultima atualização: 10/07/2021 - 16:20',
        //     style: TextStyle(
        //       fontSize: 15.0,
        //       color: Colors.blueGrey,
        //     ),
        //   ),
        // ),
        SizedBox(height: 40.0),
        Padding(
          padding: EdgeInsets.all(30.0),
          child: new Sparkline(
            data: data,
            lineColor: Colors.grey[500],
            pointsMode: PointsMode.all,
            pointSize: 8.0,
            pointColor: Colors.grey[700],
            // fillMode: FillMode.below,
            // fillGradient: new LinearGradient(
            //   begin: Alignment.topCenter,
            //   end: Alignment.bottomCenter,
            //   colors: [Colors.grey[800], Colors.grey[200]],
            // ),
          ),
        ),
      ],
    );

    final bottomDefault = Row(
      children: [
        Container(
          width: 20.0,
          //child: new Divider(color: Colors.green),
        ),
        SizedBox(height: 10.0),
        Text(
          widget.device.currentValue,
          style: TextStyle(
            color: Colors.black45,
            fontSize: 45.0,
          ),
        ),
        SizedBox(height: 30.0),
      ],
    );

    getBottom(String type) {
      switch (type) {
        case 'light':
          //return bottonOnOff;
          return bottonOnOff;
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
          return bottomDefault3;
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
