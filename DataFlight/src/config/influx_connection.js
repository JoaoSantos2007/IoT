import influxDB from '@influxdata/influxdb-client'

const token = 't_DG9aU7ACVphCGeLWjY5KifVJYmzaGMP5X9NGSiJbiJl6w-ew4brUI9G1lWj-1mJ9ztEFtLmHN2dq31oOYn9A=='
const org = 'iot'
const bucket = 'IOTDB'

const client = new InfluxDB({url: 'http://IOTinflux:8086', token: token})