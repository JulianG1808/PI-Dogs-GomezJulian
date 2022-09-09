import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from 'react-router-dom';
import defaultIMG from '../../images/default-dog.jpg'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'


//import actions
import { deleteDog, getDetail } from "../../redux/actions/actions";

//import css
import './CardDetail.css'

//-------------------------------------------------------------------------------------------------------------
export default function CardDetail(){
//-----------------------------------------------Conexiones----------------------------------------------------
    const dispatch = useDispatch()
    const dog = useSelector(state => state.detail)
    const { id } = useParams()
    const navigate = useNavigate()

//-----------------------------------------------didMount------------------------------------------------------
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])
    

    function handleDeleteDog(idDog){
        function confirm (){
            let res = window.confirm(`¿Are you sure you want delete the ${dog[0].name} breed?`)
            if(res === true){
                dispatch(deleteDog(idDog))
                alert('Breed Deleted Successfully')
                navigate('/home')
            }
        }
        confirm()
    }
//------------------------------------------------Render-------------------------------------------------------
    return (
        <>
            <NavBar />
            <div className="containerDog">
                {dog.length ?  
                    <div className="Dog">
                        <h1>{dog[0].name ? dog[0].name : "No Name"}</h1>
                        <img src={dog[0].image ? dog[0].image : defaultIMG} alt='img not found' width='400px' height='400px'/>
                            <h3>Height: </h3>
                            <p>{`${dog[0].heightMin ? dog[0].heightMin : "¿¿"} - ${dog[0].heightMax ? dog[0].heightMax : "??"} cm`}</p>
                            <h3>Weight: </h3>
                            <p>{`${dog[0].weightMin ? dog[0].weightMin : "¿¿"} - ${dog[0].weightMax ? dog[0].weightMax : "??"} kg`}</p>
                            <h3>Life span: </h3>
                            <p>{dog[0].lifeSpan ? `${dog[0].lifeSpan} years old` : 'No info about years old'}</p>
                            <h3>Temperaments: </h3>
                            <p>{
                            !dog[0].createdInDb ?
                                                dog[0].temperaments :
                                                dog[0].temperaments.map(e => e.name).join(', ')}</p>
                            {dog[0].createdInDb && (
                                <div className="containerBtn">
                                    <Link to={`/edit/${id}`}><button>Edit Breed</button></Link>
                                    <button onClick={() => handleDeleteDog(id)}>Delete Breed</button>
                                </div>
                                )}
                    </div> :
                    <img className='gifLoad' src='https://i.gifer.com/origin/c4/c46888cc22f835845757ee46a242ea8e_w200.gif' alt='gif not found'/>
                }
            </div>
            <Footer />
        </>
    )
}
