import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';

//import actions
import { getDetail } from "../../redux/actions/actions";

//import css
import './CardDetail.css'

//-------------------------------------------------------------------------------------------------------------
export default function CardDetail(){
//-----------------------------------------------Conexiones----------------------------------------------------
    const dispatch = useDispatch()
    const { id } = useParams()
    const dog = useSelector(state => state.detail)

//-----------------------------------------------didMount------------------------------------------------------
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])
    
//------------------------------------------------Render-------------------------------------------------------
    return (
        <div className="conteinerDog">
            <Link to='/home'><button className="btnHome">Volver al inicio</button></Link>
            {dog.length ?  
                <div className="Dog">
                    <h1>{dog[0].name}</h1>
                    <img src={dog[0].image} alt='img not found' width='400px' height='400px'/>
                        <h3>Altura: </h3>
                        <p>{dog[0].heightMin} - {dog[0].heightMax} cm</p>
                        <h3>Peso: </h3>
                        <p>{dog[0].weightMin} - {dog[0].weightMax} kg</p>
                        <h3>Años de vida estimados: </h3>
                        <p>{dog[0].lifeSpan} años</p>
                        <h3>Temperamentos: </h3>
                        <p>{
                        !dog[0].createdInDb ?
                                            dog[0].temperaments :
                                            dog[0].temperaments.map(e => e.name).join(', ')}</p>
                </div> :
                <img className='gifLoad' src='https://i.gifer.com/origin/c4/c46888cc22f835845757ee46a242ea8e_w200.gif'/>
            }
        </div>
    )
}
