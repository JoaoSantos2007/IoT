import "./UserIMG.css"

export const UserIMG = (props) => {
    return(
        <div className="UserIMG">
            <img src="/user.png" width={props.width} height={props.height} alt="usuario" />
        </div>
    )
}