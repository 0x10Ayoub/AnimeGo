import { act } from "react-dom/test-utils";

const FilterTypes = Object.freeze({
    SEARCH: "SEARCH",
    YEAR: "YEAR",
    SEASON: "SEASON",
    FORMATS: "FORMATS",
    TAGS: "TAGS",
    GENRES: "GENRES",
    STATUS: "STATUS",
});
const OperationTypes = { ADD: "ADD", DELETE: "DELETE", UPDATE: "UPDATE" }
let INITIAL_STATE = {
    search: "",
    year: "",
    season: "",
    formats: [],
    genres: [],
    status: "",
    filterCollection: []
}


const filterReducer = (state, action) => {
    const filter = action.type.toLowerCase();
    const newState = { ...state }

    if (action.type === FilterTypes.GENRES || action.type === FilterTypes.FORMATS)
        newState[filter] = updateCollection(state[filter], action.payload, action.operation)
    else if (action.type in FilterTypes)
        newState[filter] = action.payload
    handleFilterCollection(newState, action)
    return newState;
}

function updateCollection(collection, value, operation) {

    let hasValue = collection.includes(value);
    if (operation === OperationTypes.ADD && !hasValue)
        collection.push(value)
    else if (operation === OperationTypes.DELETE && hasValue)
        collection.splice(collection.indexOf(value), 1)
    return collection;
}

function handleFilterCollection(state, action) {


    const filter = action.type.toLowerCase();
    let data = state[filter];
    let filterCollection = state.filterCollection;
    let isRemove = ([FilterTypes.GENRES, FilterTypes.FORMATS].includes(action.type) && data.length == 0)
        || !action.payload;
    let hasTypeInCollection = filterCollection.includes(action.type);
    
    if (isRemove && hasTypeInCollection)
        filterCollection.splice(filterCollection.indexOf(action.type), 1)
    else if (!isRemove && !hasTypeInCollection)
        filterCollection.push(action.type);
    console.log(filterCollection)

}
export { INITIAL_STATE, FilterTypes, OperationTypes, filterReducer };