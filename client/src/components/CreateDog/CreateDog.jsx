import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from "../../redux/actions/actions";

//------------------------------------------Formulario controlado----------------------------------------------------------
function formControl(input){
    let check = {}
    //name
    if(!input.name){check.name = 'Deberia tener un nombre'}
    //altura minima
    else if(!input.heightMin){check.heightMin = 'Deberia tener una altura minima'}
    else if(isNaN(parseInt(input.heightMin))){check.heightMin = 'La altura minima deberia ser un numero'}
    else if(parseInt(input.heightMin) > parseInt(input.heightMax)) {check.heightMin = 'La altura minima deberia ser menor a la altura maxima'}
    //altura maxima
    else if(!input.heightMax){check.heightMax = 'Deberia tener una altura maxima'}
    else if(isNaN(parseInt(input.heightMax))){check.heightMax = 'La altura maxima deberia ser un numero'}
    //else if(parseInt(input.heightMax) > parseInt(input.heightMin)) {check.heightMax = 'La altura maxima deberia ser mayor a la altura minima'}
    //peso minimo
    else if(!input.weightMin){check.weightMin = 'Deberia tener un peso minimo'}
    else if(isNaN(parseInt(input.weightMin))){check.weightMin = 'El peso minimo deberia ser un numero'}
    else if(parseInt(input.weightMin) > parseInt(input.weightMax)) {check.weightMin = 'el peso minimo deberia ser menor al peso maximo'}
    //peso maximo
    else if(!input.weightMax){check.weightMax = 'Deberia tener un peso maximo'}
    else if(isNaN(parseInt(input.weightMax))){check.weightMax = 'El peso maximo deberia ser un numero'}
    //else if(parseInt(input.weightMax) > parseInt(input.weightMin)) {check.weightMax = 'el peso maximo deberia ser mayor a el peso minimo'}
    //años de vida
    else if(isNaN(parseInt(input.lifeSpan))){check.lifeSpan = 'Los años de vida deben ser numeros'}

    return check;
}

export default function CreateDog(){
//-----------------------------------------------Conexiones---------------------------------------------------
    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

//-----------------------------------------------Estados------------------------------------------------------
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        image: '',
        temperaments: []
    })

    const [check, setCheck] = useState({})

//-----------------------------------------------didMount------------------------------------------------------
    useEffect(() =>{
        dispatch(getTemperaments())
    },[dispatch])

//-----------------------------------------Handler Functions---------------------------------------------------
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setCheck(formControl({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        if(!input.temperaments.includes(e.target.value)){
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
        }
    }

    function handleDelete(tempDel){
        setInput({
            ...input,
            temperaments: input.temperaments.filter((temp) => temp !== tempDel)
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(!check.name && !check.heightMin && !check.heightMax && !check.weightMin && !check.weightMax && !check.lifeSpan) {
            dispatch(postDog(input))
            alert('Raza creada')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                lifeSpan: '',
                image: '',
                temperaments: []
            })
        }
        else {
            alert('Faltan datos para poder crear el perro')
        }
        history.push('/home')
    }

//------------------------------------------------Render-------------------------------------------------------
    return(
        <div>
            
            <h1>Crea tu propia raza de perro</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type='text' name='name' value={input.name} onChange={e => handleChange(e)}/>
                    {check.name && (
                    <p>{check.name}</p>
                    )}
                </div>
                <div>
                    <label>Altura minima: </label>
                    <input type='text' name='heightMin' value={input.heightMin} onChange={e => handleChange(e)}/>
                    {check.heightMin && (
                    <p>{check.heightMin}</p>
                    )}
                </div>
                <div>
                    <label>Altura maxima: </label>
                    <input type='text' name='heightMax' value={input.heightMax} onChange={e => handleChange(e)}/>
                    {check.heightMax && (
                    <p>{check.heightMax}</p>
                    )}
                </div>
                <div>
                    <label>Peso minimo: </label>
                    <input type='text' name='weightMin' value={input.weightMin} onChange={e => handleChange(e)}/>
                    {check.weightMin && (
                    <p>{check.weightMin}</p>
                    )}
                </div>
                <div>
                    <label>Peso maximo: </label>
                    <input type='text' name='weightMax' value={input.weightMax} onChange={e => handleChange(e)}/>
                    {check.weightMax && (
                    <p>{check.weightMax}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida estimados: </label>
                    <input type='text' name='lifeSpan' value={input.lifeSpan} onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type='text' name='image' value={input.image} onChange={e => handleChange(e)}/>
                </div>
                <div>
                <select name='temperaments' onChange={(e) => handleSelect(e)}>
                    <option value='selected'>Temperaments</option>
                    {allTemperaments?.map(e => {
                                return (
                                    <option key={e.id} value={e.name}>
                                        {e.name}
                                    </option>
                                )
                            })}
                </select>
                {input.temperaments.map(e => (
                    <ul>
                        <li>
                            <p>{e}</p>
                            <button onClick={() => handleDelete(e)}> X </button>
                        </li>
                    </ul>
                ))}
                </div>
                <div>
                <button type='submit'>
                    Crear raza de perro
                </button>
                <Link to='/home'>
                    <button>
                        Cancelar
                    </button>
                </Link>
                </div>
            </form>
        </div>
    )


}