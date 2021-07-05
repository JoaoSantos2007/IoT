import 'package:app_iot/models/device.dart';
import 'package:app_iot/screens/device_detail.dart';
import 'package:app_iot/screens/device_form.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primaryColor: Color.fromRGBO(58, 66, 86, 1.0),
        fontFamily: 'Raleway',
      ),
      home: new DeviceList(title: 'Devices'),
    );
  }
}

class DeviceList extends StatefulWidget {
  final String title;
  DeviceList({Key key, this.title}) : super(key: key);

  @override
  _ListPageState createState() => _ListPageState();
}

class _ListPageState extends State<DeviceList> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final devices = Provider.of<List<Device>>(context);

    ListTile makeListTile(Device device) => ListTile(
          contentPadding:
              EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
          //selected: device.action,
          leading: Container(
            padding: EdgeInsets.only(right: 12.0),
            decoration: new BoxDecoration(
              border: new Border(
                right: new BorderSide(
                  width: 1.0,
                  color: Colors.white24,
                ),
              ),
            ),
            child: getIcon(device.action, device.type, 30.0),
          ),
          title: Text(
            device.name,
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          subtitle: Row(
            children: <Widget>[
              Expanded(
                flex: 4,
                child: Padding(
                  padding: EdgeInsets.only(left: 10.0),
                  child: Text(
                    device.location,
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
              Expanded(
                flex: 4,
                child: Padding(
                  padding: EdgeInsets.only(left: 10.0),
                  child: Text(
                    device.currentValue,
                    style: TextStyle(
                      color: Colors.blue[100],
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
          trailing: IconButton(
            icon: Icon(
              Icons.more_vert,
              size: 30,
            ),
            alignment: Alignment.centerRight,
            color: Colors.white,
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => DeviceForm(device: device),
                ),
              );
            },
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DeviceDetail(device: device),
              ),
            );
          },
        );

    Card makeCard(Device device) => Card(
          elevation: 8.0,
          margin: new EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
          child: Container(
            decoration: BoxDecoration(color: Color.fromRGBO(64, 75, 96, .9)),
            child: makeListTile(device),
          ),
        );

    final makeBody = Container(
      decoration: BoxDecoration(color: Color.fromRGBO(58, 66, 86, 1.0)),
      child: ListView.builder(
        scrollDirection: Axis.vertical,
        shrinkWrap: true,
        itemCount: devices == null ? 0 : devices.length,
        itemBuilder: (BuildContext context, int index) {
          return makeCard(devices[index]);
        },
      ),
    );

    final makeBottom = Container(
      height: 55.0,
      child: BottomAppBar(
        color: Color.fromRGBO(58, 66, 86, 1.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            IconButton(
              icon: Icon(
                Icons.home_outlined,
                color: Colors.white,
              ),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(
                Icons.lightbulb_outline,
                color: Colors.white,
              ),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(
                Icons.tv,
                color: Colors.white,
              ),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(
                Icons.sensors,
                color: Colors.white,
              ),
              onPressed: () {},
            )
          ],
        ),
      ),
    );

    final topAppBar = AppBar(
      elevation: 0.1,
      backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
      title: Text(widget.title),
      actions: <Widget>[
        IconButton(
          icon: Icon(Icons.add),
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => DeviceForm(),
              ),
            );
          },
          //onPressed: () {},
        )
      ],
    );

    return Scaffold(
      backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
      appBar: topAppBar,
      //body: makeBody,
      body: (devices != null)
          ? makeBody
          : Center(
              child: CircularProgressIndicator(),
            ),
      bottomNavigationBar: makeBottom,
    );
  }
}

Icon getIcon(bool value, String age, _size) {
  var _color;
  if (value) {
    _color = Colors.blue;
  } else {
    _color = Colors.white;
  }

  switch (age) {
    case 'light':
      return Icon(
        Icons.lightbulb,
        color: _color,
        size: _size,
      );
      break;
    case 'tv':
      return Icon(
        Icons.tv,
        color: _color,
        size: _size,
      );
      break;
    case 'air':
      return Icon(
        Icons.ac_unit,
        color: _color,
        size: _size,
      );
      break;
    case 'fan':
      return Icon(
        Icons.air_outlined,
        color: _color,
        size: _size,
      );
      break;
    case 'temperatura':
      return Icon(
        Icons.thermostat,
        color: _color,
        size: _size,
      );
      break;
    case 'proximidade':
      return Icon(
        Icons.directions_run_outlined,
        color: _color,
        size: _size,
      );
      break;
    case 'umidade':
      return Icon(
        Icons.bathroom_outlined,
        color: _color,
        size: _size,
      );
      break;
    default:
      return Icon(
        Icons.sentiment_dissatisfied,
        color: Colors.teal,
        size: _size,
      );
  }
}
