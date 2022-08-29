import React from "react";
import defaultIMG from '../../images/default-dog.jpg'

//import css
import './Card.css'

//-------------------------------------------------------------------------------------------------------------
export default function Card ({ name, image, temperaments, weightMin, weightMax}){
//------------------------------------------------Render-------------------------------------------------------
    return (
        <section className="container">
            <article>
                <h2>{name}</h2>
                <img src={image ? image : defaultIMG} alt='img not found' width='400px' height='300px'/>
                <h3>{`${weightMin ? weightMin : "¿¿"} - ${weightMax ? weightMax : "??"} kg`}</h3>
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