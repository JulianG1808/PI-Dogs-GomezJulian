import React from "react";

//import css
import './Paginated.css'

//-------------------------------------------------------------------------------------------------------------
export default function Paginated ({dogsPerPage, allDogs, paginated}){
//--------------------------------------------Paginado---------------------------------------------------
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage) ; i++) {
        pageNumbers.push(i)
    }
//--------------------------------------------Render-----------------------------------------------------
    return (
        <nav> 
            <ul className='pagination'>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <button className='btnPag' onClick={() => paginated(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}