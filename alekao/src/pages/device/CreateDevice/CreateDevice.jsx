import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateDevice.css"

import DeviceCardModify from "../../../components/device/DeviceCardModify";
import api from "../../../assets/services/api.js";


export const CreateDevice = () => {
    const navigate = useNavigate()

    const onSave = (data) => {
        api.post("/devices",data)
        .then((res) => {
            console.log(res.data)
            navigate(-1)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <>
            <main className="container">
                <div className="container__header">
                    <h1 className="container__name">New Device</h1>
                </div>
                
                <DeviceCardModify save={onSave}/>
            </main>
        </>
    )
}