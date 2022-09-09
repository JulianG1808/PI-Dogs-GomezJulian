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
                <button 
                 className="functions arrowPrev" 
                 onClick={() => paginated(currentPage - 1)} 
                 disabled={currentPage === 1}>
                    <GrIcons.GrPrevious />
                </button>
                <li><button className={currentPage === 1 ? 'active' : 'inactive'}onClick={() => paginated(1)}>1</button></li>
                {currentPage > 5 ? 
                    <li><button className="functions more" onClick={() => paginated(currentPage-4)}>
                        <GrIcons.GrMore />
                    </button></li> 
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
                    <li><button className="functions more" onClick={() => paginated(currentPage+5)}>
                        <GrIcons.GrMore />
                    </button></li> 
                    : null
                }
                <li><button 
                 className={Math.ceil(currentPage) !== Math.ceil(allDogs / dogsPerPage) ? 'inactive' : 'active'} 
                 onClick={() => paginated(allDogs / dogsPerPage)}
                >
                    {Math.ceil(allDogs / dogsPerPage)}
                </button></li>
                <button 
                 className="functions arrowNext" 
                 onClick={() => paginated(currentPage + 1)} 
                 disabled={Math.ceil(currentPage) === Math.ceil(allDogs / dogsPerPage)}><GrIcons.GrNext /></button>
            </ul>
        </nav>
    )
}