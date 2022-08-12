import axios from 'axios';

export function getAllDogs(){
    return async function(dispatch){
        try {
            let res = await axios.get(`/dogs`)
    
            return dispatch({
                type: 'GET_ALL_DOGS',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDog(name){
    return async function(dispatch){
        try {
            let res = await axios.get(`/dogs?name=${name}`)

            return dispatch({
                type: 'GET_DOG',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function getTemperaments(){
    return async function(dispatch){
        try {
            let res = await axios.get('http://localhost:3001/temperaments')

            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let res = await axios.get(`http://localhost:3001/dogs/${id}`)

            return dispatch({
                type: 'GET_DETAIL',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog(payload){
    return async function(dispatch){
        try {
            const res = await axios.post('http://localhost:3001/dog', payload)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteDog(id){
    return async function(dispatch){
        try {
            const res = await axios.delete(`http://localhost:3001/clear/${id}`)

            return dispatch({
                type: 'DELETE_DOG',
                payload: res
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByTemperaments(temp){
    return{
        type: 'FILTER_TEMPERAMENTS',
        payload: temp
    }
}

export function filterByExistence(exist){
    return{
        type: 'FILTER_EXISTENCE',
        payload: exist
    }
}

export function sortBy(value){
    return{
        type: 'SORT_BY',
        payload: value
    }
}