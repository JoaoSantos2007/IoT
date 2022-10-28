import React from "react"
import "./Device.css"
import editIcon from "../../assets/edit.png"
import deleteIcon from "../../assets/delete.png"
import { useState } from "react"
import { useEffect } from "react"
import api from '../../services/api.js'
import { useNavigate, useParams } from "react-router-dom"

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
            <main className='deviceMain'>
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