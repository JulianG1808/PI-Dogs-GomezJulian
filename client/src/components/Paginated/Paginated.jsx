import React from "react";

//import css
import './Paginated.css'
import * as GrIcons from "react-icons/gr";

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
                <li><button 
                 className="inactive" 
                 onClick={() => paginated(currentPage - 1)} 
                 disabled={currentPage === 1}>
                    <GrIcons.GrPrevious />
                </button></li>
                <li><button className={currentPage === 1 ? 'active' : 'inactive'}onClick={() => paginated(1)}>1</button></li>
                {currentPage > 5 ? 
                    <button className="inactive" onClick={() => paginated(currentPage-4)}>
                        ...
                    </button> 
                    : null
                }
                {
                    pageNumbers?.map(number => {
                        let active = (currentPage === number)
                        return (
                        <li key={number}>
                            {number !== 1 && number !== Math.ceil(allDogs/dogsPerPage) ? 
                                <button 
                                 className={active ? 'active' : 'inactive'} 
                                 onClick={() => paginated(number)}>{number}
                                </button> 
                                : null
                            }
                        </li>
                        )
                    }
                    ).slice(currentPage-1, currentPage+4)
                }
                {currentPage+2 < Math.ceil(allDogs / dogsPerPage) - 3 ?
                    <button className="inactive" onClick={() => paginated(currentPage+5)}>
                        ...
                    </button> 
                    : null
                }
                <button 
                 className={Math.ceil(currentPage) !== Math.ceil(allDogs / dogsPerPage) ? 'inactive' : 'active'} 
                 onClick={() => paginated(allDogs / dogsPerPage)}
                >
                    {Math.ceil(allDogs / dogsPerPage)}
                </button>
                <button 
                 className="inactive" 
                 onClick={() => paginated(currentPage + 1)} 
                 disabled={Math.ceil(currentPage) === Math.ceil(allDogs / dogsPerPage)}><GrIcons.GrNext /></button>
            </ul>
        </nav>
    )
}