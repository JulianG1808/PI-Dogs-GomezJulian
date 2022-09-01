import {React} from 'react'
import {Link} from 'react-router-dom'

//import css
import './LandingPage.css'

//-------------------------------------------------------------------------------------------------------------
export default function LandingPage() {
//-----------------------------------------------Render---------------------------------------------------
    return(
        <div className='containerLP'>
            <div class='position'>
                <h1>Welcome to the DOGSAPP</h1>
                    <Link to='/home'>
                        <button>Start</button>
                    </Link>
            </div>
        </div>
    )
}