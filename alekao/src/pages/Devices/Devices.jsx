import React from 'react'
import './Devices.css'
import { DeviceCard } from '../../components/DeviceCard/DeviceCard'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../services/api.js'
import addBTN from '../../assets/add.png'
import { useNavigate } from 'react-router-dom'

export const Devices = () => {
    const [devices,setDevices] = useState([{}])

    useEffect(() => {
        api.get("/devices")
        .then(res => {
            setDevices(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    },[])

    const navigate = useNavigate()

    const goCreateDevice = () => {
        navigate("/device/add")
    }

    return(
        <>
            <main className='deviceContent'>
                <h1>Devices</h1>
                <section className='deviceCards'>
                    {devices.map((device) => {
                        return <DeviceCard key={device.id} id={device.id} name={device.name} type={device.type} colorID={device.colorID} locationID={device.locationID}/>
                    })} 
                </section>
                <img className='addDeviceBTN' src={addBTN} alt="add btn" onClick={goCreateDevice}/>
            </main>
        </>
    )
}