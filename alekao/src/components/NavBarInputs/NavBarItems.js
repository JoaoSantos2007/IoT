import "./NavBarItems.css"


export const NavBarItems = (props) => {
    const type = props.type
    const text = type.charAt(0).toUpperCase() + type.slice(1)

    return(
        <a className="items">
            <img src={type+".png"} alt=""/>
            <p>{text}</p>
        </a>
        
    )
}