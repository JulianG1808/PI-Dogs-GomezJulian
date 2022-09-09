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
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

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
        <div className="HOME">
            <NavBar />
            <ul className="containerFilter">
                <li className="EachFilter">
                    <label for='sortBy' className="labelFilter">Order by: </label>
                    <select name='sortBy' onChange={(e) => handleSortBy(e)}>
                        <option value='aToZ'>A - Z</option>
                        <option value='zToA'>Z - A</option>
                        <option value='weightAsc'>Lighter to Heavier</option>
                        <option value='weightDesc'>Heavier to Lighter</option>
                    </select>
                </li>
                <li className="EachFilter">
                    <label for='temperaments' className="labelFilter">Filter by temperaments: </label>
                    <select name='temperaments' onChange={(e) => handleFilterTemp(e)}>
                        <option value='allTemps'>All</option>
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
                </li>
                <li className="EachFilter">
                    <label for='existence' className="labelFilter">Filter by existence: </label>
                    <select name= 'existence' onChange={(e) => handleFilterExist(e)}>
                        <option value='allExist'>All</option>
                        <option value='existent'>Existent</option>
                        <option value='created'>Created</option>
                    </select>
                </li>
                <li className="EachFilter">
                    <button className="resetFilters" onClick={e => {handleClick(e)}}>Reset Filters</button>
                </li>
            </ul>
            <div className="cardContainer">
                <ul className="navigationPart">
                    <li className="searchbar">
                        <SearchBar />
                    </li>
                    <li className="paginated">
                        <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} currentPage={currentPage}/>
                    </li>
                    
                </ul>
                <div className="cards">
                    {!allDogs.length ?
                        <div className="loadingInfo">
                            <img src='https://i.gifer.com/origin/c4/c46888cc22f835845757ee46a242ea8e_w200.gif' alt='gif not found'/>
                        </div>
                        : currentDogs?.map((e) => {
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
            <Footer />
        </div>
)  
}