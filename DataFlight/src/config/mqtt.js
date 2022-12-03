import mosquitto from "mqtt"

const host = process.env.MQTT_HOST
const port = process.env.MQTT_PORT
const clientId = process.env.MQTT_CLIENTID
const connectURL = `mqtt://${host}:${port}`

const mqtt = mosquitto.connect(connectURL, {
    clientId,
})

//Connected!
mqtt.on('connect',() => {
    console.log("Connection estabilished with mqtt")

    mqtt.subscribe("IOT_main", (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
})

export default mqtt