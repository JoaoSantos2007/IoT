import React,{Component} from "react";
import "./Login.css"
import Footer from "../../components/Footer";
import imgLogin from "../../assets/iot.png"
import imgEmail from "../../assets/email.png"
import imgPassword from "../../assets/view.png"

class Login extends Component{
    render(){
        document.title = 'Alekão - Login'
        return(
            <div className="loginContents">
                <img src={imgLogin} alt="Imagem para decoração da tela de login" className="img-principal" />

                <section className="login">

                    <p className="login-text">Login do Usuário</p>
                
                    <div className="email">
                        <img src={imgEmail} alt="" />
                        <input type="email" id="email" placeholder="Email" />
                    </div>
                    
                    <div className="password">
                        <img src={imgPassword} alt="" id="img-pasword" />
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    
                    <input type="button" value="Login" className="botao" onclick="login()" />
                </section>
                <div className="divFooterLogin">
                    <Footer/>
                </div>
            </div>
            
        )
    }

}

export default Login