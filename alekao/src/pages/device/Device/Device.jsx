import React, {useState,useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Device.css"
import api from '../../../assets/services/api.js'

import editIcon from "../../../assets/icon/edit.svg"
import deleteIcon from "../../../assets/icon/delete.svg"
import Panel from "../../../components/panel/Panel"

import Loader from "../../../components/Loader"



export const Device = () => {
    const navigate = useNavigate()
    const id = (useParams("id")).id

    const [device,setDevice] = useState()
    const [deviceColor,setDeviceColor] = useState()

    useEffect(() => {
        api.get(`/devices/${id}`)
        .then((res) => {
            setDevice(res.data)
        })
        .catch((err) => {
            console.error(err)
        })

        if(!device && !deviceColor) return

        api.get(`/rooms/${device.roomID}`)
        .then((res) => {
            setDeviceColor(res.data.colorID)
        })
        .catch((err) => {
            console.error(err)
        })
    })

    const updateDevice = () => {
        navigate(`/device/update/${device.id}`)
    }

    const deleteDevice = () => {
        const toDelete = window.confirm("Você deseja excluir este dispositivo?")

        if(toDelete){
            api.delete(`/devices/${id}`)
            .then((res) => {
                console.log(res.data)
                navigate(-1)
            })
            .catch((err) => {
                console.error(err)
            })     
        }
    }

    if(!device && !deviceColor) return <Loader />

    console.log(deviceColor)

    return(
        <>
            <main className='container device'>
                <section className='container__header' style={{"background": deviceColor}}>
                    <p className='container__name'>{device.name}</p>                    
                </section>

                <section className='device__header'>
                    <div className="device__controls">
                        <img src={editIcon} alt="edit room" onClick={updateDevice}/>
                        <img src={deleteIcon} alt="delete room" onClick={deleteDevice}/>
                    </div>       
                </section>

                <section className="device__main">
                    <Panel type={device.type} device={device}/>
                </section>
            </main>
        </>
    )
}