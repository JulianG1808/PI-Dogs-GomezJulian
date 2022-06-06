import React from "react";

//import css
import './Card.css'

//-------------------------------------------------------------------------------------------------------------
export default function Card ({ name, image, temperaments, weightMin, weightMax}){
//------------------------------------------------Render-------------------------------------------------------
    return (
        <section className="container">
            <article>
                <h2>{name}</h2>
                <img src={image} alt='img not found' width='400px' height='300px'/>
                <h3>{weightMin} - {weightMax} kg</h3>
                <p>{function (temperaments) {
                    if (typeof (temperaments) === 'string') {
                        return temperaments;
                    }
                    if (Array.isArray(temperaments)) {
                        let temps = temperaments.map(el => el.name);
                        return temps.join(', ');
                    }
                }(temperaments)}</p>
            </article>
        </section>
    )
} 