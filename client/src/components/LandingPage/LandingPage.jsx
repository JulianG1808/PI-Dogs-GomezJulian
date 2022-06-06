import {React} from 'react'
import {Link} from 'react-router-dom'

//import css
import './LandingPage.css'

//-------------------------------------------------------------------------------------------------------------
export default function LandingPage() {
//-----------------------------------------------Render---------------------------------------------------
    return(
        <div className='conteinerLP'>
            <div class='position'>
                <h1>Bienvenido a mi PI-DOGS</h1>
                    <Link to='/home'>
                        <button>Ir al inicio</button>
                    </Link>
            </div>
        </div>
    )
}