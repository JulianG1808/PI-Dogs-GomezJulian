import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

//import actions
import { sortBy, filterByExistence, filterByTemperaments, getAllDogs, getTemperaments } from "../../redux/actions/actions";

//import components
import Card from '../Card/Card.jsx'
import Paginated from "../Paginated/Paginated.jsx";
import SearchBar from "../SearchBar/SearchBar";

//import css
import './Home.css'
import '../Card/Card.css'
import '../Paginated/Paginated.css'

//-------------------------------------------------------------------------------------------------------------
export default function Home (){
//-----------------------------------------------Conexiones----------------------------------------------------
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments)

//-------------------------------------componentDidMount - didUpdate--------------------------------------------
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    },[dispatch])

//-----------------------------------------------Paginado------------------------------------------------------
const [currentPage, setCurrentPage] = useState(1);
const [dogsPerPage, /* setDogsPerPage */] = useState(8);
const [/* sort */, setSort] = useState('')

const indexLastDogPerPage = currentPage * dogsPerPage; // 8
const indexFirstDogPerPage = indexLastDogPerPage - dogsPerPage; //0
const currentDogs = allDogs.slice(indexFirstDogPerPage, indexLastDogPerPage); //(0, 8)

const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
}

//-----------------------------------------Handler Functions---------------------------------------------------
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllDogs())
        setCurrentPage(1)
    }

    function handleSortBy(e){
        e.preventDefault()
        dispatch(sortBy(e.target.value))
        setCurrentPage(1)
        setSort(e.target.value)
    }

    function handleFilterTemp(e){
        dispatch(filterByTemperaments(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterExist(e){
        dispatch(filterByExistence(e.target.value))
        setCurrentPage(1)
    }

//------------------------------------------------Render-------------------------------------------------------
    return (
        <div>
        {!allDogs.length ?
            <div className="loadingInfo">
                <button onClick={e => {handleClick(e)}}>Recargar perros</button>
                <img src='http://northerntechmap.com/assets/img/loading-dog.gif' alt='gif not found'/>
            </div>
        :
        <div className="backgroundHOME">
            <div className="conteinerFilter">
                <label for='sortBy' className="labelFilter">Ordenar por: </label>
                <select name='sortBy' onChange={(e) => handleSortBy(e)}>
                    <option value='aToZ'>A - Z</option>
                    <option value='zToA'>Z - A</option>
                    <option value='weightAsc'>Liviano a Pesado</option>
                    <option value='weightDesc'>Pesado a Liviano</option>
                </select>
                <label for='temperaments' className="labelFilter">Filtrar por temperamentos: </label>
                <select name='temperaments' onChange={(e) => handleFilterTemp(e)}>
                    <option value='allTemps'>Todos</option>
                    {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                                return (
                                    <option key={temp.id} value={temp.name}>{temp.name}</option>
                                )
                            })}
                </select>
                <label for='existence' className="labelFilter">Filtrar por existencias: </label>
                <select name= 'existence' onChange={(e) => handleFilterExist(e)}>
                    <option value='allExist'>Todos</option>
                    <option value='existent'>Razas Existentes</option>
                    <option value='created'>Razas Creadas</option>
                </select>
            </div>
            <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} currentPage={currentPage}/>
            <div className="cardConteiner">
                {currentDogs?.map((e) => {
                    return (
                        <div key={e.id}>
                            <Link to={`/home/${e.id}`} style={{ textDecoration: 'none', color: 'black'}}>
                                <Card 
                                image={e.image}
                                name={e.name}
                                temperaments={e.temperaments}
                                weightMin={e.weightMin}
                                weightMax={e.weightMax}
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    }
    </div>
)  
}