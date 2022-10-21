import { cloneElement } from "react";

const FilterTypes =Object.freeze( {
    SEARCH:"SEARCH",
    YEAR:"YEAR",
    SEASON:"SEASON",
    FORMAT:"FORMAT",
    TAGS:"TAGS",
    GENRES:"GENRES",
    MEDIASTATUS:"MEDIASTATUS"
});

let INITIAL_STATE = {
    search:"",
    year: 0,
    season:"",
    format:[],
    tags:[],
    genres:[],
    mediaStatus:""
}

function updateCollection(collection,value){
    if(!collection.includes(value))
        collection.push(value)
    else 
        collection.splice(collection.indexOf(value),1)
    return collection;
}
const filterReducer = (state,action) => {
    const filter = action.type.toLowerCase();
        if( action.type == FilterTypes.GENRES || action.type == FilterTypes.TAGS) {
            let collection = updateCollection(state[filter],action.payload); 
            return {
                ...state,
                [filter]: collection
            }
        }
            
        if(action.type == FilterTypes.SEARCH || action.type == FilterTypes.YEAR)
         return {
                ...state,
                [filter]:action.payload
            }
        return state;
}

export {INITIAL_STATE,FilterTypes,filterReducer};