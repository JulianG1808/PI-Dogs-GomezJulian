import React from "react";

export default function Card ({ name, image, temperaments, weightMin, weightMax}){
    return (
        <div>
            <h3>{name}</h3>
            <h3>{temperaments}</h3>
            <h3>{weightMin} - {weightMax}</h3>
            <img src={image} alt='img not found' width='250px' height='250px'/>
        </div>
    )
}