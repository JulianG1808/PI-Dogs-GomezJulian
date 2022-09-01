import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'

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
    else if(parseInt(input.heightMin) < 0) {check.heightMin = 'La altura no puede ser menor a cero'}
    //altura maxima
    else if(!input.heightMax){check.heightMax = 'Deberia tener una altura maxima'}
    else if(isNaN(parseInt(input.heightMax))){check.heightMax = 'La altura maxima deberia ser un numero'}
    else if(parseInt(input.heightMax) < 0) {check.heightMax = 'La altura no puede ser menor a cero'}
    //peso minimo
    else if(!input.weightMin){check.weightMin = 'Deberia tener un peso minimo'}
    else if(isNaN(parseInt(input.weightMin))){check.weightMin = 'El peso minimo deberia ser un numero'}
    else if(parseInt(input.weightMin) > parseInt(input.weightMax)) {check.weightMin = 'El peso minimo deberia ser menor al peso maximo'}
    else if(parseInt(input.weightMin) < 0) {check.weightMin = 'El peso no puede ser menor a cero'}
    //peso maximo
    else if(!input.weightMax){check.weightMax = 'Deberia tener un peso maximo'}
    else if(isNaN(parseInt(input.weightMax))){check.weightMax = 'El peso maximo deberia ser un numero'}
    else if(parseInt(input.weightMax) < 0) {check.weightMax = 'El peso no puede ser menor a cero'}
    //años de vida
    else if(isNaN(parseInt(input.lifeSpan))){check.lifeSpan = 'Los años de vida deben ser numeros'}
    else if(parseInt(input.lifeSpan) < 0) {check.lifeSpan = 'Los años no pueden ser menor a cero'}
    //image
    else if(!regExpImg.img.test(input.image)){check.image = 'La imagen debe ser una URL'}

    return check;
}

//--------------------------------------------Function Default------------------------------------------------
export default function CreateDog(){
//-----------------------------------------------Conexiones---------------------------------------------------
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments);
    const navigate = useNavigate();

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
            alert('Breed created successfully')
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
            navigate('/home')
        }
        else {
            alert('Missing data to create the breed')
        }
    }

//------------------------------------------------Render-------------------------------------------------------
    return( 
        <div className="conteinerAllCreateDog">
            <NavBar />
            <form className="conteinerForm" onSubmit={e => handleSubmit(e)}>
            <h1>Create your own breed</h1>
                <section className="conteinerInputs">
                        <input type='text' name='name' value={input.name} onChange={e => handleChange(e)} placeholder='Insert name'/>
                        {check.name && (
                        <p className="errors">{check.name}</p>
                        )}
                        <input type='number' name='heightMin' value={input.heightMin} onChange={e => handleChange(e)} placeholder='Insert a minimum height in cm'/>
                        {check.heightMin && (
                            <p className="errors">{check.heightMin}</p>
                            )}
                        <input type='number' name='heightMax' value={input.heightMax} onChange={e => handleChange(e)} placeholder='Insert a maximum height in cm'/>
                        {check.heightMax && (
                            <p className="errors">{check.heightMax}</p>
                            )}
                        <input type='number' name='weightMin' value={input.weightMin} onChange={e => handleChange(e)} placeholder='Insert a minimum weight in kg'/>
                        {check.weightMin && (
                            <p className="errors">{check.weightMin}</p>
                            )}
                        <input type='number' name='weightMax' value={input.weightMax} onChange={e => handleChange(e)} placeholder='Insert a maximum weight in kg'/>
                        {check.weightMax && (
                            <p className="errors">{check.weightMax}</p>
                            )}
                        <input type='text' name='lifeSpan' value={input.lifeSpan} onChange={e => handleChange(e) } placeholder='insert estimated life years'/>
                        {check.lifeSpan && (
                            <p className="errors">{check.lifeSpan}</p>
                            )}
                        <input type='text' name='image' value={input.image} onChange={e => handleChange(e)} placeholder='Insert a URL image'/>
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
                        Create breed
                    </button>
                    <Link to='/home'>
                        <button id='btnCancel'>
                            Cancel
                        </button>
                    </Link>
                </section>
            </form>
        </div>
    )


}