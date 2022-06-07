import React,{Component} from 'react'
import "./Cloud.css"
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import imgReturn from '../../assets/back.png'
import gifLoading from '../../assets/loading.gif'

class Cloud extends Component{
    render(){
        document.title = 'Alekão - Storage Cloud'
        return(
            <div className='cloudContents'>
                <div>
                    <Link to="/" className='returnHome'>
                        <img src={imgReturn} alt="Imagem para retornar à página principal" />
                        <p>Return</p>
                    </Link>
                </div>
                <div className='loading'>
                    <p>Coming Soon</p>
                    <img src={gifLoading} alt="Imagem " height="64px" />
                </div>
                <Footer/>
            </div>
            
        )
    }

}

export default Cloud