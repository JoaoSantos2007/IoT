import React from "react"
import NavBarItems from "../NavBarInputs"
import "./NavBar.css"

import iotIMG from '../../../assets/icon/iot.svg'
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
    return(
        <nav className="NavBar">
            <img className="NavBar__logo" src={iotIMG} alt="iot logo"/>
            <NavBarItems type="home" img = {homeIMG}/>
            <NavBarItems type="dashboard" img = {dashboardIMG}/>
            <NavBarItems type="devices" img = {deviceIMG}/>
            <NavBarItems type="packages" img = {packagesIMG}/>
            <NavBarItems type="tasks" img = {tasksIMG}/>
            <NavBarItems type="events" img = {eventsIMG}/>
            <NavBarItems type="messages" img = {messagesIMG}/>
            <hr />
            <NavBarItems type="settings" img = {settingsIMG}/>
            <div className="teste">
                <NavBarItems type="account" img = {accountIMG}/>
            </div>
            
        </nav>
    )
}