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

    useEffect(() => {
        api.get(`/devices/${id}`)
        .then((res) => {
            setDevice(res.data)
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

    if(!device) return <Loader />


    return(
        <>
            <main className='container device'>
                <section className="device__header">
                    <div className="device__controls">
                        <div className="device__controls__btn">
                            <img src={editIcon} alt="edit btn" onClick={updateDevice}/>
                            <img src={deleteIcon} alt="delete btn" onClick={deleteDevice}/>
                        </div>
                    </div>
                    <div className="device__name__div">
                        <p className="device__name">{device.name}</p>
                    </div>
                </section>

                <Panel type={device.type} device={device}/>
            </main>
        </>
    )
}