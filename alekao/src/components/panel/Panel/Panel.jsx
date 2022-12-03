import React from 'react'
import FanPanel from '../FanPanel'
import HumidityPanel from '../HumidityPanel'
import LightPanel from '../LightPanel'
import LuminosityPanel from '../LuminosityPanel'
import TemperaturePanel from '../TemperaturePanel'
import TvPanel from '../TvPanel'
import "./Panel.css"



export const Panel = (props) => {
    const getPanel = (type,device) => {
        let panel = ""

        switch(type){
            case "light":
                panel=<LightPanel device={device} />
                break
            case "tv":
                panel=<TvPanel />
                break
            case "fan":
                panel=<FanPanel device={device} />
                break
            case "temperature":
                panel=<TemperaturePanel device={device} />
                break
            case "humidity":
                panel=<HumidityPanel device={device} />
                break
            case "luminosity":
                panel=<LuminosityPanel device={device} />
                break
            default:
                panel=''
        }

        return panel
    }

    return(
        <section className='panel'>
            {getPanel(props.device.type,props.device)}
        </section>
    )
}