import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';
import defaultIMG from '../../images/default-dog.jpg'

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
    const history = useHistory()

//-----------------------------------------------didMount------------------------------------------------------
    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])
    

    function handleDeleteDog(idDog){
        function confirm (){
            let res = window.confirm(`¿Estas seguro de querer borrar la raza ${dog[0].name}?`)
            if(res === true){
                dispatch(deleteDog(idDog))
                alert('Raza eliminada correctamente')
                history.push('/home')
            }
        }
        confirm()
    }
//------------------------------------------------Render-------------------------------------------------------
    return (
        <div className="conteinerDog">
            <Link to='/home'><button className="btnHome">Volver al inicio</button></Link>
            {dog.length ?  
                <div className="Dog">
                    <h1>{dog[0].name}</h1>
                    <img src={dog[0].image ? dog[0].image : defaultIMG} alt='img not found' width='400px' height='400px'/>
                        <h3>Altura: </h3>
                        <p>{`${dog[0].heightMin ? dog[0].heightMin : "¿¿"} - ${dog[0].heightMax ? dog[0].heightMax : "??"} cm`}</p>
                        <h3>Peso: </h3>
                        <p>{`${dog[0].weightMin ? dog[0].weightMin : "¿¿"} - ${dog[0].weightMax ? dog[0].weightMax : "??"} kg`}</p>
                        <h3>Años de vida estimados: </h3>
                        <p>{dog[0].lifeSpan ? `${dog[0].lifeSpan} years old` : 'No info about years old'}</p>
                        <h3>Temperamentos: </h3>
                        <p>{
                        !dog[0].createdInDb ?
                                            dog[0].temperaments :
                                            dog[0].temperaments.map(e => e.name).join(', ')}</p>
                        {dog[0].createdInDb && (
                            <div>
                                <button onClick={() => handleDeleteDog(id)}>Borrar Raza</button>
                                <Link to={`/edit/${id}`}><button>Editar Raza</button></Link>
                            </div>
                            )}
                </div> :
                <img className='gifLoad' src='https://i.gifer.com/origin/c4/c46888cc22f835845757ee46a242ea8e_w200.gif' alt='gif not found'/>
            }
        </div>
    )
}
