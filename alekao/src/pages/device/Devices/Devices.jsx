import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Devices.css'
import api from '../../../assets/services/api.js'
import DeviceCard from '../../../components/device/DeviceCard'

import addBTN from '../../../assets/img/add.png'

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
        navigate("/device/create")
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