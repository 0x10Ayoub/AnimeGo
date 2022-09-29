import { useReducer } from "react"
import OpenSearch from "./FilterOptions/OpenSearch"
import {INITIAL_STATE,filterReducer,FilterTypes} from "./FilterReducer"
export default function FilterOption()
{
    const [state,dispatchFilter] = useReducer(filterReducer,INITIAL_STATE);
    return (
        <div className="container  m-auto mt-10">
            <div>
                <p>{FilterTypes.SEARCH + " : " + state.search}</p>
                <p>{FilterTypes.YEAR + " : " + state.year}</p>
                <p>{FilterTypes.SEASON + " : " + state.season}</p>
                <p>{FilterTypes.GENRE + " : " + state.genre}</p>
                <p>{FilterTypes.TAG + " : " + state.tag}</p>
                <p>{FilterTypes.MEDIASTATUS + " : " + state.mediastatus}</p>
            </div>
            <OpenSearch  dispatchFilter={dispatchFilter}/>
        </div>
    )
}