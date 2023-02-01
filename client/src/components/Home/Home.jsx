import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

//import actions
import { getAllDogs, getTemperaments } from "../../redux/actions/actions";

//import components
import Card from '../Card/Card.jsx'
import Paginated from "../Paginated/Paginated.jsx";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import Filters from '../Filters/Filter'

//import css
import './Home.css'
import '../Card/Card.css'
import '../Paginated/Paginated.css'

export default function Home (){

//-----------------------------------------------Conexiones----------------------------------------------------

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

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

//------------------------------------------------Render-------------------------------------------------------
    return (
        <>
            <NavBar />
            <div className="HOME">
                <div className="cardContainer">
                    <ul className="navigationPart">
                        <li className="filter">
                            <Filters sort={setSort} CurrentPage={setCurrentPage}/>
                        </li>
                        <li className="paginated">
                            <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} currentPage={currentPage}/>
                        </li>
                        <li className="searchbar">
                            <SearchBar />
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
            </div>
            <Footer />
        </>
)  
}