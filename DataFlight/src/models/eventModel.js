import {Point} from "@influxdata/influxdb-client"
import {org,bucket} from "../config/influx.js"

class eventModel{

    static addEvent(){
        const writeApi = client.getWriteApi(org, bucket)
        
        const point = new Point('')
        .stringField("value","")
        writeApi.writePoint(point)
        
        return writeApi
            .close()
            .then(() => {
                console.log('FINISHED')
            })
            .catch(err => {
                console.error(err)
                console.log('Finished ERROR')
            })
    }

    static readEvent(){
        const queryApi = client.getQueryApi(org)

        const query = `from(bucket: "IOTDB") |> range(start: -1h)`
        
        queryApi.queryRows(query, {
            next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`)
            },
            error(error) {
            console.error(error)
            console.log('Finished ERROR')
            },
            complete() {
            console.log('Finished SUCCESS')
            },
        })
        
    }
}

export default eventModel