import lightIMG from "../img/light.png"
import airIMG from "../img/air.png"
import tvIMG from "../img/tv.png"
import temperatureIMG from "../img/temperature.png"
import fanIMG from "../img/fan.png"
import humidityIMG from "../img/humidity.png"
import luminosityIMG from "../img/luminosity.png"
import defaultIMG from "../img/chip.png"

const deviceTypeList = [
    "light",
    "air",
    "tv",
    "temperature",
    "fan"
]

function getDeviceIcon(type){
    switch(type){
        case "light":
            return(lightIMG)
        case "air":
            return(airIMG)
        case "tv":
            return(tvIMG)
        case "temperature":
            return(temperatureIMG)
        case "fan":
            return(fanIMG)
        case "humidity":
            return(humidityIMG)
        case "luminosity":
            return(luminosityIMG)
        default:
            return(defaultIMG)
    }
}

export {deviceTypeList,getDeviceIcon}