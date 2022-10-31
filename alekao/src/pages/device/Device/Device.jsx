import React, {useState,useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Device.css"
import api from '../../../assets/services/api.js'

import editIcon from "../../../assets/img/edit.png"
import deleteIcon from "../../../assets/img/delete.png"



export const Device = () => {
    const navigate = useNavigate()
    const id = (useParams("id")).id

    const [device,setDevice] = useState({})

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

    return(
        <>
            <main className='container deviceMain'>
                <section className="deviceHeader">
                    <h1 className="deviceName">{device.name}</h1>
                    <div className="deviceControl">
                        <div className="editIcon" onClick={updateDevice}>
                            <img src={editIcon} alt="edit btn"/>
                        </div>
                        <div className="deleteIcon" onClick={deleteDevice}>
                            <img src={deleteIcon} alt="delete btn"/>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}