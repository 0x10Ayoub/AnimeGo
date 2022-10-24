import { useReducer } from "react"
import OpenSearch from "./filterOptions/OpenSearch"
import { INITIAL_STATE, filterReducer, FilterTypes } from "./FilterReducer"
import YearsFilter from "./filterOptions/YearsFilter";
import GenresFilter from "./filterOptions/GenresFilter";
import SeasonFilter from "./filterOptions/SeasonFilter";
import FormatFilter from "./filterOptions/FormatFilter";
import StatusFilter from "./filterOptions/StatusFilter";
import FilterTagsCollection from "./filterOptions/FilterTagsCollection";

export default function FilterOption() {
    const [state, dispatchFilter] = useReducer(filterReducer, INITIAL_STATE);
    return (
        <div className="container  m-auto mt-10">
            <div>
                <p>{FilterTypes.SEARCH + " : " + state.search}</p>
                <p>{FilterTypes.YEAR + " : " + state.year}</p>
                <p>{FilterTypes.SEASON + " : " + state.season}</p>
                <p>{FilterTypes.GENRES + " : " + state.genres.join(',')}</p>
                <p>{FilterTypes.TAGS + " : " + state.tags.join(',')}</p>
                <p>{FilterTypes.FORMATS + " : " + state.formats.join(',')}</p>
                <p>{FilterTypes.MEDIASTATUS + " : " + state.status}</p>
            </div>
            <div className="grid grid-cols-6  grid-rows-1">
                <OpenSearch className="col-span-1 row-span-1" dispatchFilter={dispatchFilter} />
                <GenresFilter className="col-span-1 row-span-1" FilterType={FilterTypes.GENRE} dispatchFilter={dispatchFilter} state={state}/>
                <YearsFilter className="col-span-1 row-span-1" FilterType={FilterTypes.YEAR} dispatchFilter={dispatchFilter} state={state}/>
                <SeasonFilter className="col-span-1 row-span-1" FilterType={FilterTypes.SEASON} dispatchFilter={dispatchFilter} state={state}/>
                <FormatFilter className="col-span-1 row-span-1" FilterType={FilterTypes.FORMATS} dispatchFilter={dispatchFilter} state={state}/>
                <StatusFilter className="col-span-1 row-span-1" FilterType={FilterTypes.STATUS} dispatchFilter={dispatchFilter} state={state}/>
            </div>
            <FilterTagsCollection  FilterType={""} dispatchFilter={dispatchFilter} state={state}/>
        </div>
    )
}