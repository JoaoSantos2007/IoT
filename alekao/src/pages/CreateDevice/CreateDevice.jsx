import React from "react";
import { useNavigate } from "react-router-dom";
import { DeviceCardModify } from "../../components/DeviceCardModify/DeviceCardModify";
import api from "../../services/api.js";
import "./CreateDevice.css"

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
            <main className="CreateDevice_Main">
                <h1>New Device</h1>
                <DeviceCardModify save={onSave}/>
            </main>
        </>
    )
}