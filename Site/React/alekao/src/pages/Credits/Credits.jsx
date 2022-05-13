import React,{Component} from "react";
import './Credits.css'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

class Credits extends Component{
    render(){
        document.title = 'Alekão - Credits'
        return(
            <div>
                <Navbar/>
                <div className="divCredits">
                    <p className="color1">Made By:</p>
                    <p className="name">João Pedro Tomaz dos Santos</p>
                    <p className="color2">and</p>
                    <p className="name">Aleksandro Santos</p>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Credits