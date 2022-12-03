import React,{useEffect,useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./UpdateDevice.css"

import DeviceCardModify from "../../../components/device/DeviceCardModify"
import Loader from "../../../components/Loader"
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

    if(!device) return <Loader />

    return(
        <>
            <main className="container">
                <div className="container__header">
                    <h1 className="container__name">Update Device</h1>
                </div>
                
                <div className="updateDevice">
                    <DeviceCardModify save={onSave} key={id} id={id} device={device}/>
                </div>
                
            </main>
        </>
    )
}