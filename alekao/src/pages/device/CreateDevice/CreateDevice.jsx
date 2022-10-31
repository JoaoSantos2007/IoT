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
                <h1>New Device</h1>
                <DeviceCardModify save={onSave}/>
            </main>
        </>
    )
}