import mqtt from "../config/mqtt.js"
import Devices from "../models/deviceModel.js"
import Events from "../models/eventModel.js"

class Fast{
  constructor(topic){
    this.topic = topic,
    this.rules = [],
    this.seeMessages()
  }

  //Catch all messages to IOT_main topic
  seeMessages = () => {
    mqtt.on("message",(topic,payload) => {
      this.receiveMessage(payload,topic)
    })
  }

  //Receive message from devices
  receiveMessage(payload,topic){
    console.log(`Receiving: ${payload.toString()} from ${topic}`)
    this.updateValues(payload)
  }

  //Update the values after receive a message from a device
  updateValues(payload){
    const data = JSON.parse(payload)

    //Find device
    Devices.findByPk(data.deviceID)
    .then((device) => {
      //Create event
      Events.create({
        "type": "read-sensor",
        "deviceID": device.id,
        "value": data.value
      })

      //Update device value
      device.update({
        "value": data.value
      })
    })
  }

  //Create a new event
  newEvent(event){
    Devices.findByPk(event.deviceID)
    .then((device) => {
      const data = device
      
      const topic = `IOT_${data.mqttID}`
      const msg = {
        "deviceID": device.id,
        "tag": event.tag,
      }

      console.log(msg,topic)

      this.sendMessage(topic,msg)
    })
  }

  //Send message to devices
  sendMessage(topic,message){
    message = JSON.stringify(message)
    mqtt.publish(topic, message)
  }

  //Add more rules
  use(rules){
    this.rules.push(rules)
  }
}

const fast = new Fast("IOT_main")

export default fast