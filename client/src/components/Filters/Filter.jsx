import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Filter.css'
import * as FaIcons from 'react-icons/fa'

import { sortBy, filterByExistence, filterByTemperaments, getAllDogs } from "../../redux/actions/actions";
import { useState } from 'react';


const Filters = ({sort, CurrentPage}) => {

  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments)

  const [ showFilters, setShowFilters ] = useState(false)


  function handleClick(e){
    e.preventDefault()
    dispatch(getAllDogs())
    CurrentPage(1)
  }

  function handleSortBy(e){
      e.preventDefault()
      dispatch(sortBy(e.target.value))
      CurrentPage(1)
      sort(e.target.value)
  }

  function handleFilterTemp(e){
      dispatch(filterByTemperaments(e.target.value))
      CurrentPage(1)
  }

  function handleFilterExist(e){
      dispatch(filterByExistence(e.target.value))
      CurrentPage(1)
  }
  
  return  (
    <div className='mainFilters'>
        <button onClick={() => showFilters ? setShowFilters(false) : setShowFilters(true)} className='showFiltersBtn'><FaIcons.FaAngleDown size={16}/>Filters</button>
        <ul className={showFilters ? "containerFilter show" : "containerFilter notshow"}>
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
    </div>
  )
}

export default Filters;