import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

//import actions
import { /* sortByWeight */ sortBy, filterByExistence, filterByTemperaments, getAllDogs, getTemperaments } from "../../redux/actions/actions";

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

const indexLastDogPerPage = currentPage * dogsPerPage;
const indexFirstDogPerPage = indexLastDogPerPage - dogsPerPage;
const currentDogs = allDogs.slice(indexFirstDogPerPage, indexLastDogPerPage);

const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
}

//-----------------------------------------Handler Functions---------------------------------------------------
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllDogs())
    }

    function handleSortBy(e){
        e.preventDefault()
        dispatch(sortBy(e.target.value))
        setCurrentPage(1) //empieza a ordenar desde la pag 1
        setSort(e.target.value)
    }

    function handleFilterTemp(e){
        dispatch(filterByTemperaments(e.target.value))
    }

    function handleFilterExist(e){
        dispatch(filterByExistence(e.target.value))
    }


    // function handleSortWeight(e){
    //     e.preventDefault()
    //     dispatch(sortByWeight(e.target.value))
    //     setCurrentPage(1)
    //     setSort(e.target.value)
    // }
//------------------------------------------------Render-------------------------------------------------------
    return (
        <div className="backgroundHOME">
            <div className="conteinerNAV">
            <Link to = '/dog'><button>Crear raza de perro</button></Link>
            <button onClick={e => {handleClick(e)}}>Recargar perros</button>
            <SearchBar/>
            </div>
            <div className="conteinerFilter">
                <label for='sortBy' className="labelFilter">Ordenar por: </label>
                <select name='sortBy' onChange={(e) => handleSortBy(e)}>
                    <option value='aToZ'>A - Z</option>
                    <option value='zToA'>Z - A</option>
                    <option value='weightAsc'>Liviano a Pesado</option>
                    <option value='weightDesc'>Pesado a Liviano</option>
                </select>
                {/* <label for='weight'>Ordenar por peso</label> */}
                {/* <select name='weight' onChange={(e) => handleSortWeight(e)}>
                    <option value='asc'>Liviano a Pesado</option>
                    <option value='desc'>Pesado a Liviano</option>
                </select> */}
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
            <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
            <div className="cardConteiner">
                { 
                    currentDogs?.map((e) => {
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
                    })
                }
            </div>
        </div>
    )
}