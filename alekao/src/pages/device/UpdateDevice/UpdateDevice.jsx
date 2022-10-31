import React,{useEffect,useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./UpdateDevice.css"
import DeviceCardModify from "../../../components/device/DeviceCardModify"
import api from "../../../assets/services/api.js"

export const UpdateDevice = () => {
    const navigate = useNavigate()
    const id = (useParams("id")).id

    const [device,setDevice] = useState()

    useEffect(()=>{
        api.get(`/devices/${id}`)
        .then((res) => {
            setDevice(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    },[])

    const onSave = (data) => {
        api.put(`/devices/${id}`,data)
        .then((res) => {
            console.log(res.data)
            navigate(-1)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    if(!device) return ""

    return(
        <>
            <main className="UpdateDevice_Main">
                <h1>Update Device</h1>
                <DeviceCardModify save={onSave} key={id} id={id} device={device}/>

            </main>
        </>
    )
}