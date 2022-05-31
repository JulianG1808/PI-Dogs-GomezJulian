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


export default function Home (){
//-----------------------------------------------Conexiones----------------------------------------------------
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments)

//-----------------------------------------------Paginado------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, /* setDogsPerPage */] = useState(8);
    const lastDogPerPage = currentPage * dogsPerPage;
    const firstDogPerPage = lastDogPerPage - dogsPerPage;
    const currentDogs = allDogs.slice(firstDogPerPage, lastDogPerPage);
    
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const [/* sort */, setSort] = useState('')

//-----------------------------------------------didMount------------------------------------------------------
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    },[dispatch])

//-----------------------------------------Handler Functions---------------------------------------------------
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllDogs())
    }

    function handleFilterTemp(e){
        dispatch(filterByTemperaments(e.target.value)) 
    }

    function handleFilterExist(e){
        dispatch(filterByExistence(e.target.value))
    }

    function handleSortBy(e){
        e.preventDefault()
        dispatch(sortBy(e.target.value))
        setCurrentPage(1) //empieza a ordenar desde la pag 1
        setSort(e.target.value)
    }

    // function handleSortWeight(e){
    //     e.preventDefault()
    //     dispatch(sortByWeight(e.target.value))
    //     setCurrentPage(1)
    //     setSort(e.target.value)
    // }
//------------------------------------------------Render-------------------------------------------------------
    return (
        <div>
            <Link to = '/dog'>Crear raza de perro</Link>
            <h1>PERROS</h1>
            <button onClick={e => {handleClick(e)}}>Recargar perros</button>
            <div>
                {/* <label for='sortBy'>Ordenar alfabeticamente</label> */}
                <select name='sortBy' onChange={(e) => handleSortBy(e)}>
                    <option value='aToZ'>A - Z</option>
                    <option value='zToA'>Z - A</option>
                    <option value='high'>Liviano a Pesado</option>
                    <option value='light'>Pesado a Liviano</option>
                </select>
                {/* <label for='weight'>Ordenar por peso</label> */}
                {/* <select name='weight' onChange={(e) => handleSortWeight(e)}>
                    <option value='asc'>Liviano a Pesado</option>
                    <option value='desc'>Pesado a Liviano</option>
                </select> */}
                {/* <label for='temperaments'>Filtrar por temperamentos</label> */}
                <select name='temperaments' onChange={(e) => handleFilterTemp(e)}>
                    <option value='all'>Todos</option>
                    {allTemperaments?.map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })}
                </select>
                {/* <label for='existence'>Filtrar por existencias</label> */}
                <select name= 'existence' onChange={(e) => handleFilterExist(e)}>
                    <option value='all'>Todos</option>
                    <option value='existent'>Razas Existentes</option>
                    <option value='created'>Razas Creadas</option>
                </select>
            </div>
            <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
            <SearchBar/>
            <div>
                {
                    currentDogs?.map((e) => {
                        return (
                            <div key={e.id}>
                                {/* <Link to={`/home/${e.id}`}> */}
                                    <Card 
                                    image={e.image}
                                    name={<Link to={`/home/${e.id}`}>{e.name}</Link>}
                                    temperaments={e.temperaments}
                                    weightMin={e.weightMin}
                                    weightMax={e.weightMax}
                                    />
                                {/* </Link> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}