import {InfluxDB} from "@influxdata/influxdb-client"

const host = process.env.INFLUX_HOST
const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG
const bucket = process.env.INFLUX_BUCKET

const client = new InfluxDB({url: `http://${host}:8086`, token: token})

export{client,org,bucket,token}