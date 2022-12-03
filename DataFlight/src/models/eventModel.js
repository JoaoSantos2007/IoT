import {Point} from "@influxdata/influxdb-client"
import {client,org,bucket} from "../config/influx.js"

class Events{
    static create(event){
        const writeApi = client.getWriteApi(org, bucket)
        
        const point = new Point('IOT')
        .stringField("type", event.type)
        .stringField("deviceID", event.deviceID)
        .stringField("tag", event.tag)
        .stringField("value", event.value)

        writeApi.writePoint(point)
        
        return writeApi.close()
    }

    static findAll(){
        const queryApi = client.getQueryApi(org)
        const query = `from(bucket: "IOTDB") |> range(start: -24h)`
        
        return new Promise((resolve, reject) => {
            const obj = {}

            queryApi.queryRows(query,{
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row)
    
                    //Converte dados para objeto
                    if(!obj[o._time]) obj[o._time] = {}
                    obj[o._time][o._field] = o._value
                },            
                error(err) {
                    reject(err)
                },
                complete() {
                    let data = []

                    //Convert a object array in a array
                    Object.keys(obj).forEach((timestamp) => {
                        let event = obj[timestamp]
                        event.timestamp = timestamp
                        
                        data.push(event)
                    })

                    resolve(data)
                },
            })  
        })
    }
}

export default Events