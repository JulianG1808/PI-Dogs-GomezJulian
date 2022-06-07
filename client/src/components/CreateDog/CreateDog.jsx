import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';

//import actions
import { postDog, getTemperaments } from "../../redux/actions/actions";

//import css
import './CreateDog.css'

const regExpImg = {
    img: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
}
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
    //peso minimo
    else if(!input.weightMin){check.weightMin = 'Deberia tener un peso minimo'}
    else if(isNaN(parseInt(input.weightMin))){check.weightMin = 'El peso minimo deberia ser un numero'}
    else if(parseInt(input.weightMin) > parseInt(input.weightMax)) {check.weightMin = 'El peso minimo deberia ser menor al peso maximo'}
    //peso maximo
    else if(!input.weightMax){check.weightMax = 'Deberia tener un peso maximo'}
    else if(isNaN(parseInt(input.weightMax))){check.weightMax = 'El peso maximo deberia ser un numero'}
    //años de vida
    else if(isNaN(parseInt(input.lifeSpan))){check.lifeSpan = 'Los años de vida deben ser numeros'}
    //image
    else if(!regExpImg.img.test(input.image)){check.image = 'La imagen debe ser una URL'}

    return check;
}

//--------------------------------------------Function Default------------------------------------------------
export default function CreateDog(){
//-----------------------------------------------Conexiones---------------------------------------------------
    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

//------------------------------------------------Estados------------------------------------------------------
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        image: '',
        temperament: []
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
            [e.target.name]: e.target.value,
        })

        setCheck(formControl({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    }

    function handleDelete(tempDel){
        setInput({
            ...input,
            temperament: input.temperament.filter((temp) => temp !== tempDel)
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(!check.name && !check.heightMin && !check.heightMax && !check.weightMin && !check.weightMax && !check.image) {
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
                temperament: []
            })
            history.push('/home')
        }
        else {
            alert('Faltan datos para poder crear el perro')
        }
    }

//------------------------------------------------Render-------------------------------------------------------
    return( 
        <div className="conteinerAllCreateDog">
            <form className="conteinerForm" onSubmit={e => handleSubmit(e)}>
            <h1>Crea tu propia raza de perro</h1>
                <section className="conteinerInputs">
                        <input type='text' name='name' value={input.name} onChange={e => handleChange(e)} placeholder='Ingrese nombre'/>
                        {check.name && (
                        <p className="errors">{check.name}</p>
                        )}
                        <input type='text' name='heightMin' value={input.heightMin} onChange={e => handleChange(e)} placeholder='Ingrese altura minima en cm'/>
                        {check.heightMin && (
                            <p className="errors">{check.heightMin}</p>
                            )}
                        <input type='text' name='heightMax' value={input.heightMax} onChange={e => handleChange(e)} placeholder='Ingrese altura maxima en cm'/>
                        {check.heightMax && (
                            <p className="errors">{check.heightMax}</p>
                            )}
                        <input type='text' name='weightMin' value={input.weightMin} onChange={e => handleChange(e)} placeholder='Ingrese peso minimo en kg'/>
                        {check.weightMin && (
                            <p className="errors">{check.weightMin}</p>
                            )}
                        <input type='text' name='weightMax' value={input.weightMax} onChange={e => handleChange(e)} placeholder='Ingrese peso maximo en kg'/>
                        {check.weightMax && (
                            <p className="errors">{check.weightMax}</p>
                            )}
                        <input type='text' name='lifeSpan' value={input.lifeSpan} onChange={e => handleChange(e) } placeholder='Ingrese años de vida estimados'/>
                        {check.lifeSpan && (
                            <p className="errors">{check.lifeSpan}</p>
                            )}
                        <input type='text' name='image' value={input.image} onChange={e => handleChange(e)} placeholder='Ingrese url de imagen'/>
                        {check.image && (
                            <p className="errors">{check.image}</p>
                            )}
                </section>
                <section>
                    <select className="select" name='temperaments' onChange={(e) => handleSelect(e)}>
                        <option value='selected'>Temperaments</option>
                        {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(temp => {
                                    return (
                                        <option key={temp.id} value={temp.name}>{temp.name}</option>
                                    )
                                })}
                    </select>
                </section>
                <section className="conteinerTemps">
                {input.temperament.map(e => (
                    <ul className="tempsList">
                        <li>
                            <p>{e}<button type='reset' onClick={() => handleDelete(e)}> X </button></p>
                        </li>
                    </ul>
                ))}
                </section>
                <section className="conteinerBtnForm">
                    <button type='submit' id='btnSubmit'>
                    Crear raza de perro
                    </button>
                    <Link to='/home'>
                        <button id='btnCancel'>
                            Cancelar
                        </button>
                    </Link>
                </section>
            </form>
        </div>
    )


}