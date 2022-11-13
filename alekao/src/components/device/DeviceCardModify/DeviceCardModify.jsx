import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./DeviceCardModify.css"

import confirmIcon from "../../../assets/icon/confirm.svg"
import cancelIcon from "../../../assets/icon/cancel.svg"

import { deviceTypeList,getDeviceIcon } from "../../../assets/services/device.js";

export const DeviceCardModify = (props) => {
    const navigate = useNavigate()

    const device = props.device ? props.device : {
        "name": "",
        "locationID": "",
        "type": ""
    }

    const [name,setName] = useState(device.name)
    const [locationID,setLocationID] = useState(device.locationID)
    const [type,setType] = useState(device.type)

    const confirm = () => {
        const data = {
            "name": name,
            "type": type,
            "locationID": locationID
        }
        
        props.save(data)
    }

    const cancel = () => {
        navigate(-1)
    }

    const alterName = (event) => {
        setName(event.target.value)
    }

    const alterLocationID = (event) => {
        setLocationID(event.target.value)
    }


    const alterType = (event) => {
        setType(event.target.value)
    }

    return(
        <form>
            
        </form>
    )
}