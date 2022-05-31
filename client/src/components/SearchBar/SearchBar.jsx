import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDog } from "../../redux/actions/actions";

export default function SearchBar(){
//-----------------------------------------------Conexiones----------------------------------------------------
    const dispatch = useDispatch()

//-----------------------------------------------Estados-------------------------------------------------------
    const [name, setName] = useState('')

//-----------------------------------------Handler Functions---------------------------------------------------
    const handleInputName = (e) => {
        e.preventDefault() 
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDog(name))
        setName('')
    }

//------------------------------------------------Render-------------------------------------------------------
    return(
        <div>
            <input type='text' placeholder='Buscar raza...' onChange={(e) => handleInputName(e)} value={name} onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}