
const FilterTypes =Object.freeze( {
    SEARCH:"SEARCH",
    YEAR:"YEAR",
    SEASON:"SEASON",
    FORMATS:"FORMATS",
    TAGS:"TAGS",
    GENRES:"GENRES",
    STATUS:"STATUS",
});

let INITIAL_STATE = {
    search:"",
    year: 0,
    season:"",
    formats:[],
    tags:[],
    genres:[],
    status:"",
    filterCollection : []
}


const filterReducer = (state,action) => {
    const filter = action.type.toLowerCase();

    handleFilterCollection(state,action)
    if( action.type === FilterTypes.GENRES || 
        action.type === FilterTypes.TAGS || 
        action.type === FilterTypes.FORMATS
    ) {
        let collection = updateCollection(state[filter],action.payload); 
        return {
            ...state,
            [filter]: collection
        }
    }
    
    if(action.type in FilterTypes)
        return {
            ...state,
            [filter]:action.payload
        }
    return state;
}

function updateCollection(collection,value){
    if(!collection.includes(value))
        collection.push(value)
    else 
        collection.splice(collection.indexOf(value),1)
    return collection;
}
function handleFilterCollection (state,action) {
    const filter = action.type.toLowerCase();

    let filterCollection = state.filterCollection;
    if ( action.type === FilterTypes.GENRES || 
        action.type === FilterTypes.TAGS || 
        action.type === FilterTypes.FORMATS
    ) {
        if(filterCollection[action.payload])
            delete filterCollection[action.payload]
        else
            filterCollection[action.payload] = action.type;
        return
    } 
    console.log("something")
     if(filterCollection[state[filter]]) 
        delete filterCollection[state[filter]]
    filterCollection[action.payload] = action.type;

    
}
export {INITIAL_STATE,FilterTypes,filterReducer};