import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./DeviceCardModify.css"

export const DeviceCardModify = (props) => {
    class alter{
        static id(event){
            setId(event.target.value)
        }

        static name(event){
            setName(event.target.value)
        }

        static type(event){
            setType(event.target.value)
        }

        static roomID(event){
            setRoomID(event.target.value)
        }

        static mqttID(event){
            setMqttID(event.target.value)
        }
    }

    const navigate = useNavigate()

    const device = props.device ? props.device : {
        "id": "",
        "name": "",
        "type": "",
        "roomID": "",
        "mqttID": ""
    }

    const [id,setId] = useState(device.id) 
    const [name,setName] = useState(device.name)
    const [type,setType] = useState(device.type)
    const [roomID,setRoomID] = useState(device.roomID)
    const [mqttID,setMqttID] = useState(device.mqttID)
    
    const submit = (event) => {
        event.preventDefault()
        const data = {
            id,
            name,
            type,
            roomID,
            mqttID
        }
        
        props.save(data)
    }

    const cancel = () => {
        navigate(-1)
    }

    return(
        <form className="deviceForm" onSubmit={submit}>
            <input type="text" className="deviceForm__id" onChange={alter.id} value={id} placeholder="randomID"/>
            <input type="text" className="deviceForm__name" onChange={alter.name} value={name} placeholder="name" />
            <input type="text" className="deviceForm__type" onChange={alter.type} value={type} placeholder="type" />
            <input type="text" className="deviceForm__roomID" onChange={alter.roomID} value={roomID} placeholder="roomID" />
            <input type="text" className="deviceForm__mqttID" onChange={alter.mqttID} value={mqttID} placeholder="mqttID" />

            <div className="deviceForm__footer">
                <input className="deviceForm__submit" type="submit" value="Done"/>
                <input className="deviceForm__cancel" type="button" value="Cancel" onClick={cancel}/>
            </div>
        </form>
    )
}