import React, { useState } from "react"
import NavBarItems from "../NavBarInputs"
import "./NavBar.css"

import iotIMG from '../../../assets/img/iot.png'
import homeIMG from '../../../assets/icon/home.svg'
import dashboardIMG from '../../../assets/icon/dashboard.svg'
import deviceIMG from '../../../assets/icon/device.svg'
import packagesIMG from '../../../assets/icon/packages.svg'
import tasksIMG from '../../../assets/icon/tasks.svg'
import eventsIMG from '../../../assets/icon/events.svg'
import messagesIMG from '../../../assets/icon/messages.svg'
import settingsIMG from '../../../assets/icon/settings.svg'
import accountIMG from '../../../assets/icon/account.svg'


export const NavBar = () => {
    const [mode,setMode] = useState("retract")

    const alterMode = () => {
        if(mode === "extend") setMode("retract")
        else setMode("extend")
    }

    return(
        <>
            <nav className="NavBar">
                <img className="NavBar__logo" src={iotIMG} alt="iot logo"/>
                
                <NavBarItems type="home" mode={mode} img = {homeIMG}/>
                <NavBarItems type="devices" mode={mode} img = {deviceIMG}/>
                <NavBarItems type="dashboard" mode={mode} img = {dashboardIMG}/>
                <NavBarItems type="packages" mode={mode} img = {packagesIMG}/>
                <NavBarItems type="tasks" mode={mode} img = {tasksIMG}/>
                <NavBarItems type="events" mode={mode} img = {eventsIMG}/>
                <NavBarItems type="messages" mode={mode} img = {messagesIMG}/>

                <hr/>

                <NavBarItems type="settings" mode={mode} img = {settingsIMG}/>
                <NavBarItems type="account" mode={mode} img = {accountIMG}/>
                <img className={`NavBar__mode NavBar__mode__${mode}`} onClick={alterMode} alt="change mode"/>
            </nav>
        </>
    )
}