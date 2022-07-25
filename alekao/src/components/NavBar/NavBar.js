import Logo from "../Logo"
import NavBarItems from "../NavBarInputs"
import "./NavBar.css"

export const NavBar = () => {
    return(
        <section className="NavBar">
            <Logo />
            <NavBarItems type="home" />
            <NavBarItems type="dashboard" />
            <NavBarItems type="packages" />
            <NavBarItems type="tasks" />
            <NavBarItems type="events" />
            <NavBarItems type="messages" />
            <hr />
            <NavBarItems type="settings" />
            <NavBarItems type="account" />
            <img className="close" src="/close.png" />
        </section>
    )
}