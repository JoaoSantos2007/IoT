class DeviceType {
  int id;
  String name;

  DeviceType(this.id, this.name);

  static List<DeviceType> getCompanies() {
    return <DeviceType>[
      DeviceType(1, 'Apple'),
      DeviceType(2, 'Google'),
      DeviceType(3, 'Samsung'),
      DeviceType(4, 'Sony'),
      DeviceType(5, 'LG'),
    ];
  }
}
