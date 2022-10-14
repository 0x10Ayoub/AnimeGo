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
        collection.push(value);
    return collection;
}
const filterReducer = (state,action) => {

    const filter = action.type.toLowerCase();
        if( action.type == FilterTypes.GENRES || action.type == FilterTypes.TAGS)
            return {
                    ...state,
                    [filter]:updateCollection(state[filter],action.payload)
                    }
        if(action.type == FilterTypes.SEARCH || action.type == FilterTypes.YEAR)
         return {
                ...state,
                [filter]:action.payload
            }
        return state;
}

export {INITIAL_STATE,FilterTypes,filterReducer};