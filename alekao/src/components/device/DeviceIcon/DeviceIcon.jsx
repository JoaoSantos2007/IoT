import React from "react";
import lightIcon from '../../../assets/img/light.png'
import defaultIcon from '../../../assets/img/chip.png'

export const DeviceIcon = (props) => {
    const getDeviceIcon = (type) => {
        switch(type){
            case 'light':
                return lightIcon
            default:
                return defaultIcon
        }
    }

    return(
        <img src={getDeviceIcon(props.type)} alt={props.type} />
    )
}