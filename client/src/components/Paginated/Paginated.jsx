import React from "react";

export default function Paginated ({dogsPerPage, allDogs, paginated}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage) ; i++) {
        pageNumbers.push(i)
        
    }

    return (
        <nav> 
            <ul>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <button onClick={() => paginated(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}