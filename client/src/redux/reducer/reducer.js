
const initialState = {
    dogs: [],
    backupDogs: [],
    temperaments: [],
    detail: []
}

function rootReducer(state= initialState, action) {
    switch(action.type){
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs: action.payload,
                backupDogs: action.payload
            }
        case 'GET_DOG':
            return{
                ...state,
                dogs: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
        case 'GET_DETAIL':
            return{ 
                ...state,
                detail: action.payload
            }
        case 'POST_DOG':
            return{
                ...state
            }
        case 'FILTER_TEMPERAMENTS':
            const allDogsTemps = state.backupDogs
            const filterTemp = action.payload === 'allTemps' ? allDogsTemps : 
            allDogsTemps.filter((dog) => {for (let i = 0; i < dog.temperaments.length; i++) {
                if(dog.temperaments[i].name === action.payload) {return true}
                else if(dog.temperaments.includes(action.payload)) {return true}
            }
            return false
            })
            // dog.temperaments?.includes(action.payload))

            return {
                ...state,
                dogs: filterTemp 
            }
        case 'FILTER_EXISTENCE':
            const allDogs = state.backupDogs
            const filterExist = action.payload === 'allExist' ? allDogs : 
            action.payload === 'created' ? allDogs.filter(dog => dog.createdInDb) :
            allDogs.filter(dog => !dog.createdInDb)

            return {
                ...state,
                dogs: filterExist
            }
        case 'SORT_BY':
            const sortBy = action.payload === 'aToZ' ?
                state.dogs.sort(function (a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1
                    }
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return -1
                    }
                    return 0
                }) : //sino
                action.payload === 'zToA' ?
                state.dogs.sort(function (a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1
                    }
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return 1
                    }
                    return 0
                }) :
                action.payload === 'weightAsc' ?
                state.dogs.sort(function (a, b){
                    const PromA = (parseInt(a.weightMin) + parseInt(a.weightMax)) / 2
                    const PromB = (parseInt(b.weightMin) + parseInt(b.weightMax)) / 2
                    if(PromA > PromB){
                        return 1
                    }
                    if(PromA < PromB) {
                        return -1
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b){
                    const PromA = (parseInt(a.weightMin) + parseInt(a.weightMax)) / 2
                    const PromB = (parseInt(b.weightMin) + parseInt(b.weightMax)) / 2
                    if(PromA > PromB){
                        return -1
                    }
                    if(PromA < PromB) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs: sortBy
            }
        // case 'SORT_WEIGHT':
        //     const sortWeight = action.payload === 'asc' ?
        //         state.dogs.sort(function (a, b){
        //             const PromA = (parseInt(a.weightMin) + parseInt(a.weightMax)) / 2
        //             const PromB = (parseInt(b.weightMin) + parseInt(b.weightMax)) / 2
        //             if(PromA > PromB){
        //                 return 1
        //             }
        //             if(PromA < PromB) {
        //                 return -1
        //             }
        //             return 0
        //         }) : //sino
        //         state.dogs.sort(function (a, b){
        //             const PromA = (parseInt(a.weightMin) + parseInt(a.weightMax)) / 2
        //             const PromB = (parseInt(b.weightMin) + parseInt(b.weightMax)) / 2
        //             if(PromA > PromB){
        //                 return -1
        //             }
        //             if(PromA < PromB) {
        //                 return 1
        //             }
        //             return 0
        //         })
        //     return {
        //         ...state,
        //         dogs: sortWeight
        //     }
        default:
            return state;
        }
    }

export default rootReducer;