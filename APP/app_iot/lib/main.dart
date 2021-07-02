import 'package:firebase_core/firebase_core.dart';
import 'package:firestore_crud/providers/device_provider.dart';
import 'package:firestore_crud/screens/device_list.dart';
import 'package:firestore_crud/services/firestore_service_device.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    final firestoreService = FirestoreService();

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => DeviceProvider()),
        StreamProvider(create: (context) => firestoreService.getDevices()),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(primaryColor: Color.fromRGBO(58, 66, 86, 1.0)),
        // theme: ThemeData(
        //   primarySwatch: Colors.blue,
        // ),
        home: DeviceList(title: 'Devices'),
      ),
    );
  }
}
