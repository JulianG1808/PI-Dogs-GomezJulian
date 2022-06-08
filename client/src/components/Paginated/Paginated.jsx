import React from "react";

//import css
import './Paginated.css'

//-------------------------------------------------------------------------------------------------------------
export default function Paginated ({dogsPerPage, allDogs, paginated, currentPage}){
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
                    pageNumbers?.map(number => {
                        let active = (currentPage === number)
                        return (
                        <li key={number}>
                            <button className={active ? 'active' : 'inactive'} onClick={() => paginated(number)}>{number}</button>
                        </li>
                        )
                    }
                    )
                }
            </ul>
        </nav>
    )
}