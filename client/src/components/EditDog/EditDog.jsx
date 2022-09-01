import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'

//import actions
import { editDog, getTemperaments, getDetail } from "../../redux/actions/actions";

//import css
import './EditDog.css'

const regExpImg = {
    img: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
}
//------------------------------------------Formulario controlado----------------------------------------------------------
function formControl(input){
    let check = {}
    //name
    if(!input.name){check.name = 'The breed should have a name'}
    //altura minima
    else if(!input.heightMin){check.heightMin = 'Should have a minimum height'}
    else if(isNaN(parseInt(input.heightMin))){check.heightMin = 'The minimum height should be a number'}
    else if(parseInt(input.heightMin) > parseInt(input.heightMax)) {check.heightMin = 'The minimum height should be less than the maximum height'}
    else if(parseInt(input.heightMin) < 0) {check.heightMin = 'Height should not be less than zero'}
    //altura maxima
    else if(!input.heightMax){check.heightMax = 'Should have a maximum height'}
    else if(isNaN(parseInt(input.heightMax))){check.heightMax = 'The maximum height should be a number'}
    else if(parseInt(input.heightMax) < 0) {check.heightMax = 'Height should not be less than zero'}
    //peso minimo
    else if(!input.weightMin){check.weightMin = 'Should have a minimum weight'}
    else if(isNaN(parseInt(input.weightMin))){check.weightMin = 'The minimum weight should be a number'}
    else if(parseInt(input.weightMin) > parseInt(input.weightMax)) {check.weightMin = 'The minimum weight should be less than the maximum weight'}
    else if(parseInt(input.weightMin) < 0) {check.weightMin = 'Weight should not be less than zero'}
    //peso maximo
    else if(!input.weightMax){check.weightMax = 'Should have a maximum weight'}
    else if(isNaN(parseInt(input.weightMax))){check.weightMax = 'The maximum weight should be a number'}
    else if(parseInt(input.weightMax) < 0) {check.weightMax = 'Weight should not be less than zero'}
    //años de vida
    else if(isNaN(parseInt(input.lifeSpan))){check.lifeSpan = 'The years of life must be numbers'}
    else if(parseInt(input.lifeSpan) < 0) {check.lifeSpan = 'The years of life should not be less than zero'}
    //image
    else if(!regExpImg.img.test(input.image)){check.image = 'The image must be a URL'}

    return check;
}

//--------------------------------------------Function Default------------------------------------------------
export default function CreateDog(){
//-----------------------------------------------Hooks---------------------------------------------------
    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments);
    const navigate = useNavigate();
    const { id } = useParams()
    const dog = useSelector(state => state.detail)

//---------------------------------------------Info Dog Detail-------------------------------------------------
    const nameDog = dog[0].name
    const heightMin = dog[0].heightMin
    const heightMax = dog[0].heightMax
    const weightMin = dog[0].weightMin
    const weightMax = dog[0].weightMax
    const lifeSpan = dog[0].lifeSpan
    const imageDog = dog[0].image
    const temperamentsDetailDog = dog[0].temperaments.map(e => e.name)

//------------------------------------------------LocalStates------------------------------------------------------
    const [input, setInput] = useState({
        name: nameDog,
        heightMin: heightMin,
        heightMax: heightMax,
        weightMin: weightMin,
        weightMax: weightMax,
        lifeSpan: lifeSpan,
        image: imageDog,
        temperament: temperamentsDetailDog
    })

    const [check, setCheck] = useState({})

//-----------------------------------------------didMount------------------------------------------------------
    useEffect(() =>{
        dispatch(getTemperaments())
        dispatch(getDetail(id))
    },[dispatch, id])

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
        dispatch(editDog(id, input))
        alert('Breed edit successfully')
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

//------------------------------------------------Render-------------------------------------------------------
    return( 
        <div className="conteinerAllCreateDog">
            <NavBar />
            <form className="conteinerForm" onSubmit={e => handleSubmit(e)}>
            <h1>Edit your own breed</h1>
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
                        Confirm edit
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