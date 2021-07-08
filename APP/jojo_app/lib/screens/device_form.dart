import 'package:jojo_app/models/device.dart';
import 'package:jojo_app/providers/device_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class DeviceForm extends StatefulWidget {
  final Device device;

  DeviceForm({Key key, this.device}) : super(key: key);

  @override
  _EditDeviceState createState() => _EditDeviceState();
}

String _isOpen = '';
var selectedCurrency, selectedType;
List<String> _deviceType = <String>[
  '',
  'air',
  'fan',
  'light',
  'tv',
  'umidade',
  'temperatura',
  'proximidade'
];
bool isChecked = false;

class _EditDeviceState extends State<DeviceForm> {
  final nameController = TextEditingController();
  final deviceIdController = TextEditingController();
  final typeController = TextEditingController();
  final locationController = TextEditingController();
  final tagIdController = TextEditingController();
  final tagValueController = TextEditingController();

  @override
  void dispose() {
    nameController.dispose();
    deviceIdController.dispose();
    typeController.dispose();
    locationController.dispose();
    tagIdController.dispose();
    tagValueController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    if (widget.device == null) {
      //New Record
      nameController.text = "";
      deviceIdController.text = "";
      typeController.text = "";
      locationController.text = "";
      tagIdController.text = "";
      tagValueController.text = "";
      isChecked = false;
      _isOpen = "";
      new Future.delayed(Duration.zero, () {
        final deviceProvider =
            Provider.of<DeviceProvider>(context, listen: false);
        deviceProvider.loadValues(Device());
      });
    } else {
      //Controller Update
      nameController.text = widget.device.name;
      deviceIdController.text = widget.device.deviceId.toString();
      typeController.text = widget.device.type;
      locationController.text = widget.device.location;
      isChecked = widget.device.action;
      _isOpen = widget.device.type;

      //State Update
      new Future.delayed(Duration.zero, () {
        final deviceProvider =
            Provider.of<DeviceProvider>(context, listen: false);
        deviceProvider.loadValues(widget.device);
      });
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final deviceProvider = Provider.of<DeviceProvider>(context);
    final Map<String, dynamic> settings =
        widget.device == null || widget.device.settings == null
            ? {}
            : widget.device.settings;

    addItemToList() {
      setState(() {
        if (tagIdController.text != "" && tagValueController.text != "") {
          settings.addAll(
              {'${tagIdController.text}': '${tagValueController.text}'});

          deviceProvider.changeSettings(settings);
          print(deviceProvider.toMap());

          tagIdController.clear();
          tagValueController.clear();
        }
      });
    }

    final bottonSettings = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Divider(
          height: 20.0,
          color: Colors.white,
        ),
        Text('Settings:'),
        Row(children: [
          Flexible(
            child: TextField(
              decoration: InputDecoration(labelText: 'tagId:'),
              controller: tagIdController,
              onSubmitted: (text) {
                addItemToList();
              },
            ),
          ),
          Text('    '),
          Flexible(
            child: TextField(
              decoration: InputDecoration(labelText: 'tagValue'),
              controller: tagValueController,
              onSubmitted: (text) {
                addItemToList();
              },
            ),
          ),
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () => setState(() {
              addItemToList();
            }),
          ),
        ]),
      ],
    );

    final listSettings = Expanded(
      child: ListView.builder(
          itemCount: settings.length, //settings == null ? 0 : settings.length,
          itemBuilder: (context, index) {
            final item = settings[index];
            return Dismissible(
                key: Key(item),
                direction: DismissDirection.startToEnd,
                child: ListTile(
                  title: Text(settings.keys.elementAt(index)),
                  subtitle: Text(settings.values.elementAt(index)),
                  trailing: IconButton(
                    icon: Icon(Icons.delete_forever),
                    onPressed: () {
                      setState(() {
                        settings.remove(settings.keys.elementAt(index));
                      });
                    },
                  ),
                ),
                onDismissed: (direction) {
                  setState(() {
                    settings.keys.elementAt(index);
                  });
                });
          }),
    );

    return Scaffold(
      //backgroundColor: Color.fromRGBO(64, 75, 96, .9),
      appBar: AppBar(
        title: Text('Edit Device'),
        actions: <Widget>[
          // IconButton(
          //   icon: Icon(Icons.highlight_remove),
          //   onPressed: () {
          //     print(widget.device.toMap().toString());
          //     deviceProvider.removeDevice(widget.device.id);
          //     Navigator.of(context).pop();
          //   },
          // ),

          IconButton(
            icon: Icon(Icons.delete),
            color: Colors.red,
            onPressed: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  title: Text('Device'),
                  content: Text('Deseja realmente excluir esse dispositivo?'),
                  actions: <Widget>[
                    FlatButton(
                      child: Text('Não'),
                      onPressed: () => Navigator.of(context).pop(false),
                    ),
                    FlatButton(
                      child: Text('Sim'),
                      onPressed: () => Navigator.of(context).pop(true),
                    ),
                  ],
                ),
              ).then((confimed) {
                if (confimed) {
                  deviceProvider.removeDevice(widget.device.id);
                  Navigator.of(context).pop();
                }
              });
            },
          ),
          IconButton(
            icon: Icon(Icons.save),
            onPressed: () {
              deviceProvider.saveDevice();
              Navigator.of(context).pop();
            },
          )
        ],
      ),
      body: Container(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            TextField(
              controller: deviceIdController,
              decoration: InputDecoration(labelText: 'ID'),
              onChanged: (value) =>
                  deviceProvider.changeDeviceId(int.parse(value)),
            ),
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Name'),
              onChanged: (value) {
                deviceProvider.changeName(value);
              },
            ),
            InputDecorator(
              decoration: InputDecoration(
                labelText: 'Type',
                //errorText: devices.hasError ? devices.errorText : null,
              ),
              isEmpty: _isOpen == '',
              child: new DropdownButtonHideUnderline(
                child: new DropdownButton(
                  value: _isOpen,
                  isDense: true,
                  onChanged: (String value) {
                    setState(() {
                      _isOpen = value;
                      deviceProvider.changeType(value);
                    });
                  },
                  items: _deviceType.map((String value) {
                    return new DropdownMenuItem(
                      value: value,
                      child: new Text(value),
                    );
                  }).toList(),
                ),
              ),
            ),
            TextField(
              controller: locationController,
              decoration: InputDecoration(labelText: 'Location'),
              onChanged: (value) => deviceProvider.changeLocation(value),
            ),
            // CheckboxListTile(
            //   title: Text('Action'),
            //   value: isChecked,
            //   subtitle: Text('Status do device'),
            //   onChanged: (bool value) {
            //     setState(() {
            //       isChecked = value;
            //       deviceProvider.changeAction(isChecked);
            //     });
            //   },
            // ),
            bottonSettings,
            listSettings,
          ],
        ),
      ),
    );
  }
}
