import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getDetail } from "../../redux/actions/actions";

export default function CardDetail(props){
    const dispatch = useDispatch()
    const dog = useSelector(state => state.detail)

    const id = props.match.params.id

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

    return (
        <div>
            <Link to='/home'><button>Volver al inicio</button></Link>
            {dog.length > 0 ?  
                <div>
                    <h1>{dog[0].name}</h1>
                    <img src={dog[0].image} alt='img not found' width='250px' height='250px'/>
                    <div>
                        <h3>Temperamentos: </h3>
                        <p>{
                        !dog[0].createdInDb ?
                                            dog[0].temperaments :
                                            dog[0].temperaments.map(e => e.name)}</p>
                    </div>
                    <div>
                        <h3>Altura: </h3>
                        <p>{dog[0].heightMin} - {dog[0].heightMax}</p>
                    </div>
                    <div>
                        <h3>Peso: </h3>
                        <p>{dog[0].weightMin} - {dog[0].weightMax}</p>
                    </div>
                    <div>
                        <h3>Años de vida estimados: </h3>
                        <p>{dog[0].lifeSpan}</p>
                    </div>
                </div> :
                <h1>Cargando el perro...</h1>
            }  
        </div>
    )
}
