import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//import actions
import { getDog } from "../../redux/actions/actions";

//import css
import './SearchBar.css'

//-------------------------------------------------------------------------------------------------------------
export default function SearchBar(){
//-----------------------------------------------Conexiones----------------------------------------------------
    const dispatch = useDispatch()
    const navigate = useNavigate()

//-----------------------------------------------Estados-------------------------------------------------------
    const [name, setName] = useState('')

//-----------------------------------------Handler Functions---------------------------------------------------
    const handleInputName = (e) => {
        e.preventDefault() 
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/home`)
        dispatch(getDog(name))
        setName('')
    }

//------------------------------------------------Render-------------------------------------------------------
    return(
        <div className="containerSearch">
            <input type='text' placeholder='Search breed...' onChange={(e) => handleInputName(e)} value={name} onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}