const FilterTypes =Object.freeze( {
    SEARCH:"SEARCH",
    YEAR:"YEAR",
    SEASON:"SEASON",
    FORMAT:"FORMAT",
    TAG:"TAG",
    GENRE:"GENRE",
    MEDIASTATUS:"MEDIASTATUS"
});

let INITIAL_STATE = {
    search:"",
    year: 0,
    season:"",
    format:"",
    tag:"",
    genre:"",
    mediaStatus:""
}

const filterReducer = (state,action) => {

    const filter = action.type.toLowerCase();
    if(filter in INITIAL_STATE)
    {
        return {
            ...state,
            [filter]:action.payload
        }
    }
}

export {INITIAL_STATE,FilterTypes,filterReducer};