import influxDB from '@influxdata/influxdb-client'

const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG
const bucket = process.env.INFLUX_BUCKET

const client = new influxDB({url: 'http://localhost:8086', token: token})

export{client,org,bucket,token}